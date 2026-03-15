"use strict";

const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const tls = require("tls");

const root = __dirname;
const env = loadEnvFile(path.join(root, ".env"));
const dataDir = process.env.DATA_DIR || env.DATA_DIR || path.join(root, "data");
const port = Number(process.env.PORT || process.argv[2] || 4173);
const defaultBindHost = process.env.RENDER ? "0.0.0.0" : "127.0.0.1";
const BIND_HOST = process.argv[3] || process.env.BIND_HOST || env.BIND_HOST || defaultBindHost;
const EXTERNAL_ORIGIN = process.env.RENDER_EXTERNAL_URL || env.RENDER_EXTERNAL_URL || "";
const defaultOriginHost = BIND_HOST === "0.0.0.0" ? "localhost" : BIND_HOST;
const APP_ORIGIN = EXTERNAL_ORIGIN || process.env.APP_ORIGIN || env.APP_ORIGIN || `http://${defaultOriginHost}:${port}`;
const APP_NAME = "Selah Journey";
const SESSION_COOKIE = "kbc_session";
const OAUTH_STATE_COOKIE = "kbc_google_state";
const USERS_FILE = path.join(dataDir, "users.json");

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8"
};

const ACCOUNT_DEFAULT_SETTINGS = {
  defaultPanel: "home",
  readingLanguage: "eng",
  displayMode: "study",
  theme: "sepia",
  textSize: "comfortable",
  motion: "enhanced",
  readerWidth: "standard",
  showVerseNumbers: true,
  resumeLastReference: false,
  pushNotifications: false,
  emailNotifications: false,
  speechVoice: "",
  speechRate: 1,
  autoSync: true,
  welcomeEmails: true,
  securityEmails: true,
  studyEmails: false
};

const CONFIG = {
  sessionSecret: process.env.SESSION_SECRET || env.SESSION_SECRET || "kbc-dev-secret-change-me",
  googleClientId: process.env.GOOGLE_CLIENT_ID || env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || env.GOOGLE_CLIENT_SECRET || "",
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI || env.GOOGLE_REDIRECT_URI || "",
  gmailEmail: process.env.GMAIL_SMTP_EMAIL || env.GMAIL_SMTP_EMAIL || "",
  gmailAppPassword: process.env.GMAIL_SMTP_APP_PASSWORD || env.GMAIL_SMTP_APP_PASSWORD || "",
  mailFrom: process.env.MAIL_FROM || env.MAIL_FROM || process.env.GMAIL_SMTP_EMAIL || env.GMAIL_SMTP_EMAIL || ""
};

ensureStorage();

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url || "/", APP_ORIGIN);

  try {
    if (await handleApiRequest(request, response, requestUrl)) {
      return;
    }

    if (await handleAuthRoute(request, response, requestUrl)) {
      return;
    }

    const filePath = resolvePath(requestUrl.pathname);
    if (!filePath) {
      sendText(response, 403, "403 Forbidden");
      return;
    }

    sendFile(filePath, response);
  } catch (error) {
    console.error(error);
    sendJson(response, 500, {
      error: "server_error",
      message: error.message || "Unexpected server error."
    });
  }
});

server.listen(port, BIND_HOST, () => {
  console.log(`Serving ${root} at ${APP_ORIGIN} (bound to ${BIND_HOST}:${port})`);
  console.log(`Google OAuth: ${CONFIG.googleClientId && CONFIG.googleClientSecret ? "configured" : "not configured"}`);
  console.log(`Gmail signup email: ${CONFIG.gmailEmail && CONFIG.gmailAppPassword ? "configured" : "not configured"}`);
});

async function handleApiRequest(request, response, requestUrl) {
  const pathname = requestUrl.pathname;
  const method = request.method || "GET";

  if (pathname === "/healthz" && method === "GET") {
    sendJson(response, 200, {
      ok: true,
      app: APP_NAME
    });
    return true;
  }

  if (pathname === "/api/auth/session" && method === "GET") {
    const user = getAuthenticatedUser(request);
    sendJson(response, 200, {
      user: user ? toPublicUser(user) : null,
      config: getPublicConfig(request)
    });
    return true;
  }

  if (pathname === "/api/auth/signup" && method === "POST") {
    const body = await readJsonBody(request);
    const email = normalizeEmail(body.email);
    const displayName = sanitizeDisplayName(body.displayName);
    const password = String(body.password || "");

    if (!email || !isValidEmail(email)) {
      sendJson(response, 400, { error: "invalid_email", message: "Enter a valid email address." });
      return true;
    }

    if (password.length < 8) {
      sendJson(response, 400, { error: "weak_password", message: "Use at least 8 characters for the password." });
      return true;
    }

    const store = loadUsersStore();
    if (store.users.some((user) => normalizeEmail(user.email) === email)) {
      sendJson(response, 409, { error: "email_exists", message: "That email already has an account." });
      return true;
    }

    const now = new Date().toISOString();
    const user = {
      id: `usr_${crypto.randomBytes(12).toString("hex")}`,
      email,
      displayName: displayName || email.split("@")[0],
      passwordHash: hashPassword(password),
      providers: ["local"],
      googleSub: "",
      photoUrl: "",
      emailVerified: false,
      googleEmailVerified: false,
      settings: { ...ACCOUNT_DEFAULT_SETTINGS },
      studyState: createEmptyStudyState(),
      verification: null,
      passwordReset: null,
      welcomeEmailSentAt: null,
      createdAt: now,
      updatedAt: now
    };

    store.users.push(user);
    const mailResult = await issueVerificationChallenge(store, user);
    sendJson(response, 200, {
      user: toPublicUser(user),
      config: getPublicConfig(request),
      verificationRequired: true,
      verificationEmail: user.email,
      message: mailResult.sent
        ? "Account created. Enter the 6-digit Gmail code on the website or use the email link to verify the account."
        : "Account created, but the verification email could not be sent because Gmail SMTP is not fully configured.",
      mailResult
    }, {
      "Set-Cookie": createSessionCookie(user.id)
    });
    return true;
  }

  if (pathname === "/api/auth/request-password-reset" && method === "POST") {
    const body = await readJsonBody(request);
    const email = normalizeEmail(body.email);
    const store = loadUsersStore();
    const user = store.users.find((entry) => normalizeEmail(entry.email) === email);

    if (user) {
      const resetRecord = createPasswordResetRecord();
      user.passwordReset = resetRecord.record;
      user.updatedAt = new Date().toISOString();
      saveUsersStore(store);
      await sendPasswordResetEmail(user, resetRecord.token);
    }

    sendJson(response, 200, {
      ok: true,
      message: "If that account exists, a password reset link has been sent."
    });
    return true;
  }

  if (pathname === "/api/auth/login" && method === "POST") {
    const body = await readJsonBody(request);
    const email = normalizeEmail(body.email);
    const password = String(body.password || "");
    const store = loadUsersStore();
    const user = store.users.find((entry) => normalizeEmail(entry.email) === email);

    if (!user) {
      sendJson(response, 401, { error: "invalid_credentials", message: "Email or password is incorrect." });
      return true;
    }

    if (!user.passwordHash) {
      sendJson(response, 400, {
        error: "google_only_account",
        message: "This account uses Google sign-in. Sign in with Google or add a password from Account Settings."
      });
      return true;
    }

    if (!verifyPassword(password, user.passwordHash)) {
      sendJson(response, 401, { error: "invalid_credentials", message: "Email or password is incorrect." });
      return true;
    }

    let mailResult = null;
    let message = "Signed in.";
    let verificationRequired = false;

    if (!user.emailVerified) {
      verificationRequired = true;
      mailResult = await issueVerificationChallenge(store, user);
      message = mailResult.sent
        ? "Signed in. Enter the Gmail verification code on the website to finish verifying this account."
        : "Signed in, but the verification email could not be sent because Gmail SMTP is not fully configured.";
    }

    sendJson(response, 200, {
      user: toPublicUser(user),
      config: getPublicConfig(request),
      verificationRequired,
      verificationEmail: verificationRequired ? user.email : "",
      mailResult,
      message
    }, {
      "Set-Cookie": createSessionCookie(user.id)
    });
    return true;
  }

  if (pathname === "/api/auth/logout" && method === "POST") {
    sendJson(response, 200, { ok: true, message: "Signed out." }, {
      "Set-Cookie": clearCookie(SESSION_COOKIE)
    });
    return true;
  }

  if (pathname === "/api/auth/reset-password" && method === "POST") {
    const body = await readJsonBody(request);
    const token = String(body.token || "");
    const newPassword = String(body.newPassword || "");

    if (newPassword.length < 8) {
      sendJson(response, 400, { error: "weak_password", message: "Use at least 8 characters for the new password." });
      return true;
    }

    const store = loadUsersStore();
    const tokenHash = hashVerificationToken(token);
    const user = store.users.find((entry) => {
      if (!entry.passwordReset || entry.passwordReset.tokenHash !== tokenHash) {
        return false;
      }
      return new Date(entry.passwordReset.expiresAt).getTime() > Date.now();
    });

    if (!user) {
      sendJson(response, 400, { error: "invalid_reset_token", message: "That reset link is invalid or has expired." });
      return true;
    }

      user.passwordHash = hashPassword(newPassword);
      user.passwordReset = null;
      user.providers = Array.from(new Set([...(user.providers || []), "local"]));
      user.updatedAt = new Date().toISOString();
      saveUsersStore(store);
      await maybeSendSecurityEmail(user, {
        subject: `Your ${APP_NAME} password was changed`,
        title: "Password updated",
        intro: "This is a confirmation that your account password was changed successfully.",
        detail: "If you did not request this change, open the Account page and reset your password again immediately."
      });

      sendJson(response, 200, {
        user: toPublicUser(user),
        message: "Password reset complete. You are now signed in."
    }, {
      "Set-Cookie": createSessionCookie(user.id)
    });
    return true;
  }

  if (pathname === "/api/auth/resend-verification" && method === "POST") {
    const body = await readJsonBody(request);
    const store = loadUsersStore();
    const requestedEmail = normalizeEmail(body.email);
    let user = getAuthenticatedUser(request);

    if (user) {
      user = store.users.find((entry) => entry.id === user.id) || null;
    }

    if (!user && requestedEmail) {
      user = store.users.find((entry) => normalizeEmail(entry.email) === requestedEmail) || null;
    }

    if (!user) {
      sendJson(response, 200, {
        ok: true,
        verificationRequired: true,
        verificationEmail: requestedEmail,
        message: "If that account exists, a fresh verification email has been sent."
      });
      return true;
    }

    if (user.emailVerified) {
      sendJson(response, 200, { ok: true, message: "That email address is already verified." });
      return true;
    }

    const mailResult = await issueVerificationChallenge(store, user);
    sendJson(response, 200, {
      ok: true,
      verificationRequired: true,
      verificationEmail: user.email,
      message: mailResult.sent
        ? "Verification email sent. Enter the code on the website or use the link in Gmail."
        : "Verification email could not be sent because Gmail SMTP is not fully configured.",
      mailResult
    });
    return true;
  }

  if (pathname === "/api/auth/verify-code" && method === "POST") {
    const body = await readJsonBody(request);
    const email = normalizeEmail(body.email);
    const code = normalizeVerificationCode(body.code);

    if (!email || !code) {
      sendJson(response, 400, {
        error: "missing_verification_fields",
        message: "Enter both the email address and the verification code."
      });
      return true;
    }

    const store = loadUsersStore();
    const user = store.users.find((entry) => normalizeEmail(entry.email) === email);

    if (!user) {
      sendJson(response, 400, {
        error: "invalid_verification_code",
        message: "That verification code is invalid or has expired."
      });
      return true;
    }

    if (user.emailVerified) {
      sendJson(response, 200, {
        user: toPublicUser(user),
        config: getPublicConfig(request),
        message: "That account is already verified."
      }, {
        "Set-Cookie": createSessionCookie(user.id)
      });
      return true;
    }

    if (!isValidVerificationRecord(user.verification) || user.verification.codeHash !== hashVerificationCode(code)) {
      sendJson(response, 400, {
        error: "invalid_verification_code",
        message: "That verification code is invalid or has expired."
      });
      return true;
    }

      user.emailVerified = true;
      user.verification = null;
      user.updatedAt = new Date().toISOString();
      saveUsersStore(store);
      await maybeSendWelcomeEmail(store, user);

      sendJson(response, 200, {
        user: toPublicUser(user),
        config: getPublicConfig(request),
      message: "Email verified. You are now signed in."
    }, {
      "Set-Cookie": createSessionCookie(user.id)
    });
    return true;
  }

  if (pathname === "/api/account/settings" && method === "POST") {
    const store = loadUsersStore();
    const user = requireUser(request, response, store);
    if (!user) {
      return true;
    }

    const body = await readJsonBody(request);
    user.displayName = sanitizeDisplayName(body.displayName) || user.displayName;
    user.settings = sanitizeAccountSettings(body.settings || user.settings);
    user.updatedAt = new Date().toISOString();
    saveUsersStore(store);

    sendJson(response, 200, {
      user: toPublicUser(user),
      message: "Account settings updated."
    });
    return true;
  }

  if (pathname === "/api/account/notifications/test" && method === "POST") {
    const store = loadUsersStore();
    const user = requireUser(request, response, store);
    if (!user) {
      return true;
    }

    const settings = sanitizeAccountSettings(user.settings || {});
    if (settings.emailNotifications !== true && settings.studyEmails !== true && settings.securityEmails !== true) {
      sendJson(response, 400, {
        error: "email_notifications_disabled",
        message: "Enable email notifications in Account settings before sending a test email."
      });
      return true;
    }

    const mailResult = await sendAccountEmail(user, {
      subject: `${APP_NAME} notification test`,
      preview: "Your email notification system is working.",
      kicker: "Notification Test",
      title: "Email notifications are working",
      intro: "This is a test message from the notification center in your study workspace.",
      detail: "If you received this email, your account can receive reminder and study notification emails from this PC.",
      ctaLabel: "Open settings",
      ctaUrl: `${getPreferredAppOrigin()}/?panel=account`,
      footerNote: "You can turn these emails off at any time from Account settings."
    }, "Notification test email could not be delivered.");

    sendJson(response, 200, {
      ok: true,
      mailResult,
      message: mailResult.sent
        ? "Test email notification sent."
        : "Test email could not be sent because Gmail SMTP is not fully configured."
    });
    return true;
  }

  if (pathname === "/api/account/notifications/event" && method === "POST") {
    const store = loadUsersStore();
    const user = requireUser(request, response, store);
    if (!user) {
      return true;
    }

    const settings = sanitizeAccountSettings(user.settings || {});
    if (settings.emailNotifications !== true) {
      sendJson(response, 200, {
        ok: true,
        skipped: true,
        message: "Email notifications are disabled for this account."
      });
      return true;
    }

    const body = await readJsonBody(request);
    const title = String(body.title || "Study notification").slice(0, 140);
    const detail = String(body.message || "").slice(0, 1200);
    const mailResult = await sendAccountEmail(user, {
      subject: `${APP_NAME}: ${title}`,
      preview: title,
      kicker: "Study Notification",
      title,
      intro: "A new study notification was generated from your Selah Journey workspace.",
      detail,
      ctaLabel: "Open workspace",
      ctaUrl: `${getPreferredAppOrigin()}/?panel=account`,
      footerNote: "Turn off email notifications any time from Account settings."
    }, "Notification email could not be delivered.");

    sendJson(response, 200, {
      ok: true,
      mailResult,
      message: mailResult.sent ? "Notification email sent." : "Notification email could not be sent."
    });
    return true;
  }

  if (pathname === "/api/account/password" && method === "POST") {
    const store = loadUsersStore();
    const user = requireUser(request, response, store);
    if (!user) {
      return true;
    }

    const body = await readJsonBody(request);
    const currentPassword = String(body.currentPassword || "");
    const newPassword = String(body.newPassword || "");

    if (newPassword.length < 8) {
      sendJson(response, 400, { error: "weak_password", message: "Use at least 8 characters for the new password." });
      return true;
    }

    if (user.passwordHash && !verifyPassword(currentPassword, user.passwordHash)) {
      sendJson(response, 401, { error: "invalid_password", message: "Current password is incorrect." });
      return true;
    }

      user.passwordHash = hashPassword(newPassword);
      user.providers = Array.from(new Set([...(user.providers || []), "local"]));
      user.updatedAt = new Date().toISOString();
      saveUsersStore(store);
      await maybeSendSecurityEmail(user, {
        subject: `Your ${APP_NAME} password was changed`,
        title: "Password changed",
        intro: "Your account password was updated from the Account settings panel.",
        detail: "If this was not you, reset the password immediately and review your sign-in methods."
      });

      sendJson(response, 200, {
        user: toPublicUser(user),
        message: user.googleSub
        ? "Password saved. You can now use Google or email sign-in."
        : "Password updated."
    });
    return true;
  }

  if (pathname === "/api/account" && method === "DELETE") {
    const store = loadUsersStore();
    const user = requireUser(request, response, store);
    if (!user) {
      return true;
    }

    store.users = store.users.filter((entry) => entry.id !== user.id);
    saveUsersStore(store);

    sendJson(response, 200, {
      ok: true,
      message: "Account deleted from this PC. Local browser study data was not removed."
    }, {
      "Set-Cookie": clearCookie(SESSION_COOKIE)
    });
    return true;
  }

  if (pathname === "/api/account/study-state" && method === "GET") {
    const store = loadUsersStore();
    const user = requireUser(request, response, store);
    if (!user) {
      return true;
    }

    sendJson(response, 200, {
      studyState: user.studyState || createEmptyStudyState(),
      updatedAt: user.studyState?.updatedAt || null
    });
    return true;
  }

  if (pathname === "/api/account/study-state" && method === "POST") {
    const store = loadUsersStore();
    const user = requireUser(request, response, store);
    if (!user) {
      return true;
    }

    const body = await readJsonBody(request);
    user.studyState = sanitizeStudyState(body, { touch: true });
    user.updatedAt = new Date().toISOString();
    saveUsersStore(store);

    sendJson(response, 200, {
      ok: true,
      updatedAt: user.studyState.updatedAt,
      message: "Study state synced."
    });
    return true;
  }

  return false;
}

async function handleAuthRoute(request, response, requestUrl) {
  const pathname = requestUrl.pathname;
  const method = request.method || "GET";

  if (pathname === "/auth/google/start" && method === "GET") {
      const googleIssue = getGoogleConfigIssue(request);
      if (googleIssue) {
        sendRedirect(response, `/?panel=account&auth_message=${encodeURIComponent(googleIssue)}`);
        return true;
      }

    const redirectUri = resolveOAuthRedirectUri(request);
    const nonce = crypto.randomBytes(16).toString("hex");
    const stateCookie = signPayload({
      purpose: "google",
      nonce,
      exp: Date.now() + (10 * 60 * 1000)
    });

    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set("client_id", CONFIG.googleClientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", "openid email profile");
    authUrl.searchParams.set("state", nonce);
    authUrl.searchParams.set("prompt", "select_account");

    sendRedirect(response, authUrl.toString(), {
      "Set-Cookie": createCookie(OAUTH_STATE_COOKIE, stateCookie, {
        maxAge: 10 * 60,
        path: "/",
        httpOnly: true,
        sameSite: "Lax"
      })
    });
    return true;
  }

  if (pathname === "/auth/google/callback" && method === "GET") {
    const code = requestUrl.searchParams.get("code") || "";
    const state = requestUrl.searchParams.get("state") || "";
    const googleError = requestUrl.searchParams.get("error") || "";
    const googleErrorDescription = requestUrl.searchParams.get("error_description") || "";
    const redirectUri = resolveOAuthRedirectUri(request);
    const cookies = parseCookies(request);
    const statePayload = verifySignedPayload(cookies[OAUTH_STATE_COOKIE]);

    if (googleError) {
      const message = encodeURIComponent(`Google sign-in failed: ${googleErrorDescription || googleError}`);
      sendRedirect(response, `/?panel=account&auth_message=${message}`, {
        "Set-Cookie": clearCookie(OAUTH_STATE_COOKIE)
      });
      return true;
    }

    if (!code || !statePayload || statePayload.purpose !== "google" || statePayload.nonce !== state) {
      sendRedirect(response, "/?panel=account&auth_message=Google%20sign-in%20could%20not%20be%20verified.", {
        "Set-Cookie": clearCookie(OAUTH_STATE_COOKIE)
      });
      return true;
    }

    const tokenResponse = await requestJson("POST", "https://oauth2.googleapis.com/token", {
      "Content-Type": "application/x-www-form-urlencoded"
    }, new URLSearchParams({
      code,
      client_id: CONFIG.googleClientId,
      client_secret: CONFIG.googleClientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    }).toString());

    if (!tokenResponse.ok || !tokenResponse.body.access_token) {
      const reason = tokenResponse.body?.error_description || tokenResponse.body?.error || "Google token exchange failed.";
      sendRedirect(response, `/?panel=account&auth_message=${encodeURIComponent(reason)}`, {
        "Set-Cookie": clearCookie(OAUTH_STATE_COOKIE)
      });
      return true;
    }

    const profileResponse = await requestJson("GET", "https://openidconnect.googleapis.com/v1/userinfo", {
      Authorization: `Bearer ${tokenResponse.body.access_token}`
    });

    const profile = profileResponse.body || {};
    if (!profile.sub || !profile.email) {
      sendRedirect(response, "/?panel=account&auth_message=Google%20did%20not%20return%20a%20usable%20profile.", {
        "Set-Cookie": clearCookie(OAUTH_STATE_COOKIE)
      });
      return true;
    }

    const store = loadUsersStore();
    const email = normalizeEmail(profile.email);
    let user = store.users.find((entry) => entry.googleSub === profile.sub);

    if (!user) {
      user = store.users.find((entry) => normalizeEmail(entry.email) === email);
    }

    if (!user) {
      user = {
        id: `usr_${crypto.randomBytes(12).toString("hex")}`,
        email,
        displayName: sanitizeDisplayName(profile.name) || email.split("@")[0],
        passwordHash: "",
        providers: ["google"],
        googleSub: profile.sub,
        photoUrl: String(profile.picture || ""),
        emailVerified: false,
        googleEmailVerified: Boolean(profile.email_verified),
        settings: { ...ACCOUNT_DEFAULT_SETTINGS },
        studyState: createEmptyStudyState(),
        verification: null,
        passwordReset: null,
        welcomeEmailSentAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      store.users.push(user);
    } else {
      user.displayName = sanitizeDisplayName(profile.name) || user.displayName;
      user.googleSub = profile.sub;
      user.photoUrl = String(profile.picture || user.photoUrl || "");
      user.googleEmailVerified = Boolean(user.googleEmailVerified) || Boolean(profile.email_verified);
      user.providers = Array.from(new Set([...(user.providers || []), "google"]));
      user.updatedAt = new Date().toISOString();
    }

    let authMessage = "Google sign-in connected.";
    let redirectTarget = "/?panel=account&auth_message=Google%20sign-in%20connected.";

    if (!user.emailVerified) {
      const mailResult = await issueVerificationChallenge(store, user);
      authMessage = mailResult.sent
        ? "Google connected. Enter the 6-digit Gmail code on the website to finish verification."
        : "Google connected, but the Gmail verification message could not be sent because Gmail SMTP is not fully configured.";
      redirectTarget = `/?panel=account&verify_email=${encodeURIComponent(user.email)}&auth_message=${encodeURIComponent(authMessage)}`;
    } else {
      saveUsersStore(store);
    }

    sendRedirect(response, redirectTarget, {
      "Set-Cookie": [
        createSessionCookie(user.id),
        clearCookie(OAUTH_STATE_COOKIE)
      ]
    });
    return true;
  }

  if (pathname === "/auth/verify-email" && method === "GET") {
    const token = requestUrl.searchParams.get("token") || "";
    if (!token) {
      sendRedirect(response, "/?panel=account&auth_message=Verification%20token%20is%20missing.");
      return true;
    }

    const store = loadUsersStore();
    const tokenHash = hashVerificationToken(token);
    const user = store.users.find((entry) => {
      if (!entry.verification || entry.verification.tokenHash !== tokenHash) {
        return false;
      }
      return new Date(entry.verification.expiresAt).getTime() > Date.now();
    });

    if (!user) {
      sendRedirect(response, "/?panel=account&auth_message=Verification%20link%20is%20invalid%20or%20expired.");
      return true;
    }

      user.emailVerified = true;
      user.verification = null;
      user.updatedAt = new Date().toISOString();
      saveUsersStore(store);
      await maybeSendWelcomeEmail(store, user);

      sendRedirect(response, "/?panel=account&auth_message=Email%20verified.", {
        "Set-Cookie": createSessionCookie(user.id)
      });
    return true;
  }

  if (pathname === "/auth/reset-password" && method === "GET") {
    const token = requestUrl.searchParams.get("token") || "";
    if (!token) {
      sendRedirect(response, "/?panel=account&auth_message=Password%20reset%20token%20is%20missing.");
      return true;
    }

    sendRedirect(
      response,
      `/?panel=account&reset_token=${encodeURIComponent(token)}&auth_message=Choose%20a%20new%20password.`
    );
    return true;
  }

  return false;
}

function resolvePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath || "/");
  const relativePath = cleanPath === "/" ? "index.html" : cleanPath.replace(/^\/+/, "");
  const fullPath = path.resolve(root, relativePath);

  if (!fullPath.startsWith(root)) {
    return null;
  }

  if (!isPublicFile(relativePath)) {
    return null;
  }

  return fullPath;
}

function isPublicFile(relativePath) {
  if (!relativePath || relativePath === ".env") {
    return false;
  }

  const normalized = relativePath.replace(/\\/g, "/");
  if (normalized === "data/snapshot-data.json") {
    return true;
  }

  if (normalized.startsWith("data/")) {
    return false;
  }

  return true;
}

function sendFile(filePath, response) {
  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      sendText(response, 404, "404 Not Found");
      return;
    }

    const contentType = MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    response.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(response);
  });
}

function sendJson(response, statusCode, payload, extraHeaders) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store, no-cache, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    ...normalizeHeaders(extraHeaders)
  });
  response.end(JSON.stringify(payload));
}

function sendText(response, statusCode, text, extraHeaders) {
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    ...normalizeHeaders(extraHeaders)
  });
  response.end(text);
}

function sendRedirect(response, location, extraHeaders) {
  response.writeHead(302, {
    Location: location,
    "Cache-Control": "no-store, no-cache, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    ...normalizeHeaders(extraHeaders)
  });
  response.end();
}

function normalizeHeaders(value) {
  return value || {};
}

function parseCookies(request) {
  const header = request.headers.cookie || "";
  return header.split(";").reduce((accumulator, item) => {
    const [rawKey, ...rest] = item.trim().split("=");
    if (!rawKey) {
      return accumulator;
    }
    accumulator[rawKey] = decodeURIComponent(rest.join("="));
    return accumulator;
  }, {});
}

function createCookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  parts.push(`Path=${options.path || "/"}`);
  if (typeof options.maxAge === "number") {
    parts.push(`Max-Age=${options.maxAge}`);
  }
  if (options.httpOnly) {
    parts.push("HttpOnly");
  }
  if (options.sameSite) {
    parts.push(`SameSite=${options.sameSite}`);
  }
  if (options.secure) {
    parts.push("Secure");
  }
  return parts.join("; ");
}

function clearCookie(name) {
  return createCookie(name, "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "Lax",
    secure: shouldUseSecureCookies()
  });
}

function createSessionCookie(userId) {
  const token = signPayload({
    userId,
    exp: Date.now() + (30 * 24 * 60 * 60 * 1000)
  });

  return createCookie(SESSION_COOKIE, token, {
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true,
    sameSite: "Lax",
    secure: shouldUseSecureCookies()
  });
}

function getAuthenticatedUser(request) {
  const cookies = parseCookies(request);
  const payload = verifySignedPayload(cookies[SESSION_COOKIE]);
  if (!payload?.userId) {
    return null;
  }

  const store = loadUsersStore();
  return store.users.find((user) => user.id === payload.userId) || null;
}

function requireUser(request, response, store) {
  const cookies = parseCookies(request);
  const payload = verifySignedPayload(cookies[SESSION_COOKIE]);
  if (!payload?.userId) {
    sendJson(response, 401, { error: "unauthorized", message: "Sign in first." });
    return null;
  }

  const user = store.users.find((entry) => entry.id === payload.userId);
  if (!user) {
    sendJson(response, 401, { error: "unauthorized", message: "Session is invalid." }, {
      "Set-Cookie": clearCookie(SESSION_COOKIE)
    });
    return null;
  }

  return user;
}

function signPayload(payload) {
  const json = JSON.stringify(payload);
  const encoded = toBase64Url(Buffer.from(json, "utf8"));
  const signature = toBase64Url(createSignature(encoded));
  return `${encoded}.${signature}`;
}

function verifySignedPayload(token) {
  if (!token || !token.includes(".")) {
    return null;
  }

  const [encoded, signature] = token.split(".");
  const expected = toBase64Url(createSignature(encoded));
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(signature || "");

  if (expectedBuffer.length !== actualBuffer.length || !crypto.timingSafeEqual(expectedBuffer, actualBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(fromBase64Url(encoded)).toString("utf8"));
    if (payload.exp && payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch (error) {
    return null;
  }
}

function createSignature(value) {
  return crypto.createHmac("sha256", CONFIG.sessionSecret).update(value).digest();
}

function toBase64Url(buffer) {
  return Buffer.from(buffer)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value) {
  const normalized = String(value).replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4 || 4)) % 4);
  return Buffer.from(padded, "base64");
}

function loadUsersStore() {
  const raw = fs.readFileSync(USERS_FILE, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed.users)) {
    return { users: [] };
  }
  parsed.users.forEach((user) => {
    user.settings = sanitizeAccountSettings(user.settings || {});
    user.studyState = sanitizeStudyState(user.studyState || {});
    user.providers = Array.isArray(user.providers) ? user.providers : [];
    user.emailVerified = Boolean(user.emailVerified);
    user.googleEmailVerified = Boolean(user.googleEmailVerified);
    user.verification = sanitizeVerificationRecord(user.verification);
    user.welcomeEmailSentAt = typeof user.welcomeEmailSentAt === "string" ? user.welcomeEmailSentAt : null;
  });
  return parsed;
}

function saveUsersStore(store) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(store, null, 2));
}

function ensureStorage() {
  fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2));
  }
}

function sanitizeAccountSettings(settings) {
  const defaultPanel = typeof settings.defaultPanel === "string" ? settings.defaultPanel : ACCOUNT_DEFAULT_SETTINGS.defaultPanel;
  const readingLanguage = typeof settings.readingLanguage === "string" && settings.readingLanguage.trim()
    ? settings.readingLanguage.trim().toLowerCase().slice(0, 8)
    : ACCOUNT_DEFAULT_SETTINGS.readingLanguage;
  const displayMode = ["study", "simple"].includes(settings.displayMode) ? settings.displayMode : ACCOUNT_DEFAULT_SETTINGS.displayMode;
  const theme = ["sepia", "light", "dark"].includes(settings.theme) ? settings.theme : ACCOUNT_DEFAULT_SETTINGS.theme;
  const textSize = ["compact", "comfortable", "large"].includes(settings.textSize) ? settings.textSize : ACCOUNT_DEFAULT_SETTINGS.textSize;
  const motion = ["enhanced", "subtle", "reduced"].includes(settings.motion) ? settings.motion : ACCOUNT_DEFAULT_SETTINGS.motion;
  const readerWidth = ["narrow", "standard", "wide"].includes(settings.readerWidth) ? settings.readerWidth : ACCOUNT_DEFAULT_SETTINGS.readerWidth;
  const speechRate = Number.isFinite(Number(settings.speechRate)) ? Number(settings.speechRate) : ACCOUNT_DEFAULT_SETTINGS.speechRate;
  return {
    defaultPanel,
    readingLanguage,
    displayMode,
    theme,
    textSize,
    motion,
    readerWidth,
    showVerseNumbers: typeof settings.showVerseNumbers === "boolean" ? settings.showVerseNumbers : ACCOUNT_DEFAULT_SETTINGS.showVerseNumbers,
    resumeLastReference: typeof settings.resumeLastReference === "boolean" ? settings.resumeLastReference : ACCOUNT_DEFAULT_SETTINGS.resumeLastReference,
    pushNotifications: typeof settings.pushNotifications === "boolean" ? settings.pushNotifications : ACCOUNT_DEFAULT_SETTINGS.pushNotifications,
    emailNotifications: typeof settings.emailNotifications === "boolean" ? settings.emailNotifications : ACCOUNT_DEFAULT_SETTINGS.emailNotifications,
    speechVoice: typeof settings.speechVoice === "string" ? settings.speechVoice.slice(0, 160) : ACCOUNT_DEFAULT_SETTINGS.speechVoice,
    speechRate: speechRate > 0 ? speechRate : ACCOUNT_DEFAULT_SETTINGS.speechRate,
    autoSync: typeof settings.autoSync === "boolean" ? settings.autoSync : ACCOUNT_DEFAULT_SETTINGS.autoSync,
    welcomeEmails: typeof settings.welcomeEmails === "boolean" ? settings.welcomeEmails : ACCOUNT_DEFAULT_SETTINGS.welcomeEmails,
    securityEmails: typeof settings.securityEmails === "boolean" ? settings.securityEmails : ACCOUNT_DEFAULT_SETTINGS.securityEmails,
    studyEmails: typeof settings.studyEmails === "boolean" ? settings.studyEmails : ACCOUNT_DEFAULT_SETTINGS.studyEmails
  };
}

function sanitizeStudyState(input, options = {}) {
  const bookmarks = Array.isArray(input.bookmarks)
    ? input.bookmarks.filter((item) => typeof item === "string").slice(0, 300)
    : [];

  const highlights = {};
  if (input.highlights && typeof input.highlights === "object") {
    Object.entries(input.highlights).slice(0, 500).forEach(([key, value]) => {
      if (typeof key === "string" && ["gold", "olive", "rose"].includes(value)) {
        highlights[key] = value;
      }
    });
  }

  const notes = {};
  if (input.notes && typeof input.notes === "object") {
    Object.entries(input.notes).slice(0, 500).forEach(([key, value]) => {
      if (typeof key === "string" && typeof value === "string") {
        notes[key] = value.slice(0, 6000);
      }
    });
  }

  const studyDesk = input.studyDesk && typeof input.studyDesk === "object"
    ? input.studyDesk
    : createEmptyStudyState().studyDesk;

  return {
    bookmarks,
    highlights,
    notes,
    studyDesk,
    updatedAt: options.touch ? new Date().toISOString() : (typeof input.updatedAt === "string" ? input.updatedAt : null)
  };
}

function createEmptyStudyState() {
  return {
    bookmarks: [],
    highlights: {},
    notes: {},
    studyDesk: {
      title: "",
      questions: "",
      outline: "",
      prayer: "",
      activeJourneyId: "",
      completedJourneySteps: {},
      savedSearches: [],
      recentReferences: [],
      recentWordStudies: [],
      recentPlaces: [],
      lastReference: null
    },
    updatedAt: null
  };
}

function toPublicUser(user) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    photoUrl: user.photoUrl || "",
    emailVerified: Boolean(user.emailVerified),
    googleEmailVerified: Boolean(user.googleEmailVerified),
    verificationPending: !user.emailVerified && isValidVerificationRecord(user.verification),
    providers: Array.isArray(user.providers) ? user.providers : [],
    hasPassword: Boolean(user.passwordHash),
    settings: sanitizeAccountSettings(user.settings || {}),
    studyStateMeta: {
      updatedAt: user.studyState?.updatedAt || null
    }
  };
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function sanitizeDisplayName(value) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, 80);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${derived}`;
}

function verifyPassword(password, storedHash) {
  const [scheme, salt, expected] = String(storedHash || "").split("$");
  if (scheme !== "scrypt" || !salt || !expected) {
    return false;
  }
  const derived = crypto.scryptSync(password, salt, 64);
  const expectedBuffer = Buffer.from(expected, "hex");
  return derived.length === expectedBuffer.length && crypto.timingSafeEqual(derived, expectedBuffer);
}

function createVerificationRecord() {
  const timedRecord = createTimedTokenRecord(24 * 60 * 60 * 1000);
  const code = createVerificationCode();
  return {
    token: timedRecord.token,
    code,
    record: {
      ...timedRecord.record,
      codeHash: hashVerificationCode(code)
    }
  };
}

function createPasswordResetRecord() {
  return createTimedTokenRecord(60 * 60 * 1000);
}

function createTimedTokenRecord(ttlMs) {
  const token = crypto.randomBytes(24).toString("hex");
  return {
    token,
    record: {
      tokenHash: hashVerificationToken(token),
      expiresAt: new Date(Date.now() + ttlMs).toISOString()
    }
  };
}

function hashVerificationToken(token) {
  return crypto.createHash("sha256").update(String(token || "")).digest("hex");
}

function createVerificationCode() {
  return String(crypto.randomInt(0, 1000000)).padStart(6, "0");
}

function normalizeVerificationCode(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 6);
}

function hashVerificationCode(code) {
  return crypto.createHash("sha256").update(normalizeVerificationCode(code)).digest("hex");
}

function sanitizeVerificationRecord(record) {
  if (!record || typeof record !== "object") {
    return null;
  }

  return {
    tokenHash: typeof record.tokenHash === "string" ? record.tokenHash : "",
    codeHash: typeof record.codeHash === "string" ? record.codeHash : "",
    expiresAt: typeof record.expiresAt === "string" ? record.expiresAt : ""
  };
}

function isValidVerificationRecord(record) {
  return Boolean(
    record &&
    typeof record.tokenHash === "string" &&
    typeof record.codeHash === "string" &&
    typeof record.expiresAt === "string" &&
    new Date(record.expiresAt).getTime() > Date.now()
  );
}

async function issueVerificationChallenge(store, user) {
  const verification = createVerificationRecord();
  user.verification = verification.record;
  user.updatedAt = new Date().toISOString();
  saveUsersStore(store);
  return sendVerificationEmail(user, verification);
}

async function maybeSendWelcomeEmail(store, user) {
  const settings = sanitizeAccountSettings(user.settings || {});
  if (!user.emailVerified || settings.welcomeEmails === false || user.welcomeEmailSentAt) {
    return { sent: false, reason: "welcome_disabled" };
  }

  const mailResult = await sendWelcomeEmail(user);
  if (mailResult.sent) {
    user.welcomeEmailSentAt = new Date().toISOString();
    user.updatedAt = new Date().toISOString();
    saveUsersStore(store);
  }
  return mailResult;
}

async function maybeSendSecurityEmail(user, options) {
  const settings = sanitizeAccountSettings(user.settings || {});
  if (settings.securityEmails === false) {
    return { sent: false, reason: "security_disabled" };
  }
  return sendSecurityNoticeEmail(user, options);
}

async function sendVerificationEmail(user, verification) {
  const verifyUrl = `${getPreferredAppOrigin()}/auth/verify-email?token=${encodeURIComponent(verification.token)}`;
  return sendAccountEmail(user, {
    subject: `Verify your ${APP_NAME} account`,
    preview: "Finish verification with the website code or the email link.",
    kicker: "Account Verification",
    title: "Finish your account setup",
    intro: "Use the 6-digit code below on the Account page, or tap the verification button to finish signing in.",
    detail: `Website verification code: ${verification.code}`,
    ctaLabel: "Verify account",
    ctaUrl: verifyUrl,
    footerNote: "If you did not request this account, you can ignore this email."
  }, "Verification email could not be delivered.");
}

async function sendPasswordResetEmail(user, token) {
  const resetUrl = `${getPreferredAppOrigin()}/auth/reset-password?token=${encodeURIComponent(token)}`;
  return sendAccountEmail(user, {
    subject: `Reset your ${APP_NAME} password`,
    preview: "Use this secure link to choose a new password.",
    kicker: "Password Reset",
    title: "Reset your password",
    intro: "Use the button below to open the reset screen and choose a new password.",
    detail: "For your security, this reset link expires automatically after one hour.",
    ctaLabel: "Choose a new password",
    ctaUrl: resetUrl,
    footerNote: "If you did not request a password reset, you can ignore this email."
  }, "Password reset email could not be delivered.");
}

async function sendWelcomeEmail(user) {
  return sendAccountEmail(user, {
    subject: `Welcome to ${APP_NAME}`,
    preview: "Your study account is ready.",
    kicker: "Welcome",
    title: "Your Bible study account is ready",
    intro: `Welcome to ${APP_NAME}. Your account is verified and ready to save notes, bookmarks, and your study desk.`,
    detail: "Start by opening the reader, saving a verse, and letting the study desk become your running notebook.",
    ctaLabel: "Open the study workspace",
    ctaUrl: `${getPreferredAppOrigin()}/?panel=desk`,
    footerNote: "May your reading stay grounded in the text and rich in understanding."
  }, "Welcome email could not be delivered.");
}

async function sendSecurityNoticeEmail(user, options) {
  return sendAccountEmail(user, {
    subject: options.subject,
    preview: options.title,
    kicker: "Security Notice",
    title: options.title,
    intro: options.intro,
    detail: options.detail,
    ctaLabel: "Open account settings",
    ctaUrl: `${getPreferredAppOrigin()}/?panel=account`,
    footerNote: "If this activity was not yours, secure the account from the Account page right away."
  }, "Security notice email could not be delivered.");
}

async function sendAccountEmail(user, content, warningLabel) {
  if (!CONFIG.gmailEmail || !CONFIG.gmailAppPassword || !CONFIG.mailFrom) {
    return {
      sent: false,
      reason: "gmail_not_configured"
    };
  }

  const compiled = buildAccountEmailContent(user, content);

  try {
    await sendSmtpMail({
      host: "smtp.gmail.com",
      port: 465,
      username: CONFIG.gmailEmail,
      password: CONFIG.gmailAppPassword,
      from: CONFIG.mailFrom,
      to: user.email,
      subject: content.subject,
      text: compiled.text,
      html: compiled.html
    });

    return {
      sent: true,
      reason: "gmail_smtp"
    };
  } catch (error) {
    console.warn(warningLabel, error.message || error);
    return {
      sent: false,
      reason: "gmail_delivery_failed"
    };
  }
}

function buildAccountEmailContent(user, content) {
  const recipientName = user.displayName || user.email;
  const safe = {
    preview: escapeEmailHtml(content.preview || ""),
    kicker: escapeEmailHtml(content.kicker || APP_NAME),
    title: escapeEmailHtml(content.title || ""),
    intro: escapeEmailHtml(content.intro || ""),
    detail: escapeEmailHtml(content.detail || ""),
    ctaLabel: escapeEmailHtml(content.ctaLabel || "Open"),
    ctaUrl: escapeEmailHtml(content.ctaUrl || APP_ORIGIN),
    footerNote: escapeEmailHtml(content.footerNote || ""),
    recipientName: escapeEmailHtml(recipientName)
  };

  const text = [
    `Hello ${recipientName},`,
    "",
    content.title || "",
    "",
    content.intro || "",
    content.detail || "",
    "",
    content.ctaLabel && content.ctaUrl ? `${content.ctaLabel}: ${content.ctaUrl}` : "",
    "",
    content.footerNote || ""
  ].filter(Boolean).join("\r\n");

  const ctaHtml = content.ctaLabel && content.ctaUrl ? `
    <div style="margin-top:28px;">
      <a href="${safe.ctaUrl}" style="display:inline-block;padding:14px 22px;border-radius:999px;background:#8f6a35;color:#fff7eb;text-decoration:none;font-weight:700;letter-spacing:0.02em;">${safe.ctaLabel}</a>
    </div>
  ` : "";

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#efe4d1;color:#2f241c;font-family:Georgia,'Times New Roman',serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${safe.preview}</div>
    <div style="max-width:680px;margin:0 auto;padding:28px 16px 42px;">
      <div style="background:linear-gradient(180deg,#5d4628,#2f241c);border-radius:28px;padding:28px 30px 24px;color:#f8efdf;box-shadow:0 22px 50px rgba(47,36,28,0.18);">
        <div style="font-size:11px;letter-spacing:0.24em;text-transform:uppercase;opacity:0.78;margin-bottom:14px;">${safe.kicker}</div>
        <h1 style="margin:0 0 10px;font-size:34px;line-height:1.04;font-weight:700;">${safe.title}</h1>
        <p style="margin:0;color:rgba(248,239,223,0.84);font-size:17px;line-height:1.7;">${safe.intro}</p>
      </div>
      <div style="background:#fffaf2;border:1px solid rgba(100,77,49,0.12);border-radius:0 0 28px 28px;padding:30px;box-shadow:0 18px 30px rgba(47,36,28,0.08);">
        <div style="font-size:15px;color:#5f4a34;line-height:1.8;">Hello ${safe.recipientName},</div>
        <div style="margin-top:18px;padding:18px 20px;border-radius:20px;background:#f4ead8;border:1px solid rgba(120,90,52,0.14);font-size:16px;line-height:1.8;color:#3b2d20;">
          ${safe.detail}
        </div>
        ${ctaHtml}
        <div style="margin-top:26px;font-size:13px;line-height:1.7;color:#78614a;">
          ${safe.footerNote}
        </div>
        <div style="margin-top:22px;padding-top:18px;border-top:1px solid rgba(120,90,52,0.12);font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#9a8164;">
          ${escapeEmailHtml(APP_NAME)}
        </div>
      </div>
    </div>
  </body>
</html>`;

  return { text, html };
}

async function sendSmtpMail(options) {
  const session = await createSmtpSession(options.host, options.port);

  try {
    await session.expect([220]);
    await session.command(`EHLO ${new URL(APP_ORIGIN).hostname || "127.0.0.1"}`, [250]);
    await session.command("AUTH LOGIN", [334]);
    await session.command(Buffer.from(options.username, "utf8").toString("base64"), [334]);
    await session.command(Buffer.from(options.password, "utf8").toString("base64"), [235]);
    await session.command(`MAIL FROM:<${extractMailbox(options.from)}>`, [250]);
    await session.command(`RCPT TO:<${extractMailbox(options.to)}>`, [250, 251]);
    await session.command("DATA", [354]);

    const boundary = `kbc-${crypto.randomBytes(12).toString("hex")}`;
    const message = options.html
      ? [
          `From: ${options.from}`,
          `To: ${options.to}`,
          `Subject: ${options.subject}`,
          "MIME-Version: 1.0",
          `Content-Type: multipart/alternative; boundary="${boundary}"`,
          "",
          `--${boundary}`,
          "Content-Type: text/plain; charset=UTF-8",
          "Content-Transfer-Encoding: 8bit",
          "",
          dotStuff(options.text || ""),
          "",
          `--${boundary}`,
          "Content-Type: text/html; charset=UTF-8",
          "Content-Transfer-Encoding: 8bit",
          "",
          dotStuff(options.html),
          "",
          `--${boundary}--`
        ].join("\r\n")
      : [
          `From: ${options.from}`,
          `To: ${options.to}`,
          `Subject: ${options.subject}`,
          "MIME-Version: 1.0",
          "Content-Type: text/plain; charset=UTF-8",
          "",
          dotStuff(options.text || "")
        ].join("\r\n");

    await session.data(message, [250]);
    await session.command("QUIT", [221]);
  } finally {
    session.close();
  }
}

function createSmtpSession(host, portNumber) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(portNumber, host, { servername: host }, () => {
      resolve(new SmtpSession(socket));
    });
    socket.setEncoding("utf8");
    socket.on("error", reject);
  });
}

class SmtpSession {
  constructor(socket) {
    this.socket = socket;
    this.buffer = "";
    this.waiting = [];
    this.failed = null;

    socket.on("data", (chunk) => {
      this.buffer += chunk;
      this.flush();
    });

    socket.on("error", (error) => {
      this.fail(error);
    });

    socket.on("close", () => {
      this.fail(new Error("SMTP connection closed."));
    });
  }

  flush() {
    if (!this.waiting.length) {
      return;
    }

    const parsed = parseSmtpResponse(this.buffer);
    if (!parsed) {
      return;
    }

    this.buffer = parsed.remaining;
    const waiter = this.waiting.shift();
    waiter.resolve(parsed.lines);
  }

  fail(error) {
    if (this.failed) {
      return;
    }
    this.failed = error;
    while (this.waiting.length) {
      this.waiting.shift().reject(error);
    }
  }

  read() {
    if (this.failed) {
      return Promise.reject(this.failed);
    }

    const parsed = parseSmtpResponse(this.buffer);
    if (parsed) {
      this.buffer = parsed.remaining;
      return Promise.resolve(parsed.lines);
    }

    return new Promise((resolve, reject) => {
      this.waiting.push({ resolve, reject });
    });
  }

  async expect(expectedCodes) {
    const lines = await this.read();
    assertSmtpCode(lines, expectedCodes);
    return lines;
  }

  async command(commandText, expectedCodes) {
    this.socket.write(`${commandText}\r\n`);
    return this.expect(expectedCodes);
  }

  async data(message, expectedCodes) {
    this.socket.write(`${message}\r\n.\r\n`);
    return this.expect(expectedCodes);
  }

  close() {
    if (!this.socket.destroyed) {
      this.socket.end();
    }
  }
}

function parseSmtpResponse(buffer) {
  if (!buffer.includes("\r\n")) {
    return null;
  }

  const lines = buffer.split("\r\n");
  if (lines[lines.length - 1] !== "") {
    return null;
  }

  const payload = lines.slice(0, -1);
  if (!payload.length) {
    return null;
  }

  const lastLine = payload[payload.length - 1];
  if (!/^\d{3} /.test(lastLine)) {
    return null;
  }

  return {
    lines: payload,
    remaining: ""
  };
}

function assertSmtpCode(lines, expectedCodes) {
  const code = Number(String(lines[lines.length - 1] || "").slice(0, 3));
  if (!expectedCodes.includes(code)) {
    throw new Error(`SMTP command failed with ${code}: ${lines.join(" | ")}`);
  }
}

function extractMailbox(value) {
  const match = String(value || "").match(/<([^>]+)>/);
  return match ? match[1] : String(value || "").trim();
}

function dotStuff(value) {
  return String(value || "")
    .replace(/\r?\n/g, "\r\n")
    .replace(/^\./gm, "..");
}

function escapeEmailHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function readJsonBody(request) {
  const raw = await readRequestBody(request);
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error("Request body must be valid JSON.");
  }
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        request.destroy();
        reject(new Error("Request body is too large."));
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function requestJson(method, targetUrl, headers, body) {
  const urlObject = new URL(targetUrl);
  return new Promise((resolve, reject) => {
    const request = https.request({
      method,
      hostname: urlObject.hostname,
      path: `${urlObject.pathname}${urlObject.search}`,
      port: urlObject.port || 443,
      headers: {
        Accept: "application/json",
        ...headers
      }
    }, (response) => {
      let raw = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        raw += chunk;
      });
      response.on("end", () => {
        let parsed;
        try {
          parsed = raw ? JSON.parse(raw) : {};
        } catch (error) {
          parsed = { raw };
        }
        resolve({
          ok: response.statusCode >= 200 && response.statusCode < 300,
          statusCode: response.statusCode,
          body: parsed
        });
      });
    });

    request.on("error", reject);
    if (body) {
      request.write(body);
    }
    request.end();
  });
}

function resolveOAuthRedirectUri(request) {
  if (CONFIG.googleRedirectUri) {
    return CONFIG.googleRedirectUri;
  }
  const requestOrigin = getRequestOrigin(request);
  if (requestOrigin) {
    return `${requestOrigin}/auth/google/callback`;
  }
  return `${APP_ORIGIN}/auth/google/callback`;
}

function getRequestOrigin(request) {
  const forwardedHost = String(request?.headers?.["x-forwarded-host"] || "")
    .split(",")[0]
    .trim();
  const host = String(request?.headers?.host || "").trim();
  const effectiveHost = forwardedHost || host;
  if (!effectiveHost) {
    return "";
  }

  if (isLocalHost(effectiveHost)) {
    return `http://${effectiveHost}`;
  }

  const forwardedProto = String(request?.headers?.["x-forwarded-proto"] || "https")
    .split(",")[0]
    .trim()
    .toLowerCase();
  const protocol = forwardedProto === "http" ? "http" : "https";
  return `${protocol}://${effectiveHost}`;
}

function isLocalHost(host) {
  return /^(127\.0\.0\.1|localhost)(:\d+)?$/i.test(String(host || "").trim());
}

function getPreferredAppOrigin() {
  if (!isLocalHost(new URL(APP_ORIGIN).host)) {
    return APP_ORIGIN;
  }

  const publicUrlPath = path.join(dataDir, "public-url.txt");
  if (fs.existsSync(publicUrlPath)) {
    const publicUrl = String(fs.readFileSync(publicUrlPath, "utf8") || "").trim();
    if (/^https?:\/\//i.test(publicUrl)) {
      return publicUrl;
    }
  }

  return APP_ORIGIN;
}

function getDisplayOrigin(request) {
  const requestOrigin = getRequestOrigin(request);
  if (requestOrigin) {
    return requestOrigin;
  }

  const host = String(request?.headers?.host || "").trim();
  if (!host) {
    return getPreferredAppOrigin();
  }

  if (isLocalHost(host)) {
    return `http://${host}`;
  }

  const forwardedProto = String(request.headers["x-forwarded-proto"] || "https")
    .split(",")[0]
    .trim()
    .toLowerCase();
  const protocol = forwardedProto === "http" ? "http" : "https";
  return `${protocol}://${host}`;
}

function getPublicConfig(request) {
  const googleIssue = getGoogleConfigIssue(request);
  return {
    appOrigin: getDisplayOrigin(request),
    googleEnabled: !googleIssue,
    googleIssue,
    gmailEnabled: Boolean(CONFIG.gmailEmail && CONFIG.gmailAppPassword),
    googleAuthUrl: "/auth/google/start"
  };
}

function getGoogleConfigIssue(request) {
  if (!CONFIG.googleClientId) {
    return "Add GOOGLE_CLIENT_ID to .env to enable Google sign-in.";
  }

  if (!CONFIG.googleClientSecret) {
    return "Add GOOGLE_CLIENT_SECRET to .env to enable Google sign-in.";
  }

  if (/\.\.\.+\s*$/.test(CONFIG.googleClientSecret)) {
    return "GOOGLE_CLIENT_SECRET in .env looks truncated. Replace it with the full exact secret from Google Cloud.";
  }

  const requestOrigin = getRequestOrigin(request);
  if (requestOrigin) {
    const requestHost = new URL(requestOrigin).host;
    if (!isLocalHost(requestHost) && !CONFIG.googleRedirectUri) {
      return "Set GOOGLE_REDIRECT_URI to your deployed Render callback URL to enable Google sign-in.";
    }
  }

  return "";
}

function shouldUseSecureCookies() {
  try {
    return new URL(APP_ORIGIN).protocol === "https:";
  } catch (error) {
    return false;
  }
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs.readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .reduce((accumulator, line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        return accumulator;
      }

      const equalsIndex = trimmed.indexOf("=");
      if (equalsIndex === -1) {
        return accumulator;
      }

      const key = trimmed.slice(0, equalsIndex).trim();
      let value = trimmed.slice(equalsIndex + 1).trim();
      if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      accumulator[key] = value;
      return accumulator;
    }, {});
}
