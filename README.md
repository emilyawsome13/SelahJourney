# Selah Journey

Selah Journey is a Bible reading and study app with guided journeys, browseable topics, notes, highlights, study tools, email-based accounts, and browser text-to-speech.

## Local run

Install Node.js 20 or newer, then run:

```powershell
npm install
npm start
```

Open `http://localhost:4173`.

If you want the Windows helper scripts, they are still available in [`scripts`](./scripts).

## Render deploy

This repo is ready for Render as a Node web service.

Files included for deployment:

- `package.json`
- `render.yaml`
- `/healthz` health endpoint in `server.js`

Deploy flow:

1. Push this folder to a GitHub repository.
2. In Render, create a new Blueprint or Web Service from that repo.
3. Set the required environment variables in Render.
4. Deploy.

Render-specific behavior:

- the app binds to `0.0.0.0` automatically on Render
- the app honors Render's `PORT`
- the app uses `RENDER_EXTERNAL_URL` when available
- cookies are marked `Secure` when the app origin is HTTPS

## Required environment variables

- `SESSION_SECRET`

## Optional environment variables

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `GMAIL_SMTP_EMAIL`
- `GMAIL_SMTP_APP_PASSWORD`
- `MAIL_FROM`
- `DATA_DIR`
- `APP_ORIGIN`

## Persistence

User accounts are stored in `data/users.json` by default.

On Render, the local filesystem is ephemeral unless you attach a persistent disk. If you want accounts and email/reset state to survive redeploys, mount a persistent disk and set `DATA_DIR` to that mount path, such as `/var/data`.

## Google OAuth on Render

If you enable Google sign-in, add your Render URL or custom domain callback in Google Cloud:

- `https://your-service.onrender.com/auth/google/callback`
- or `https://your-domain.com/auth/google/callback`

Then set `GOOGLE_REDIRECT_URI` to the same exact URL in Render.

## Notes

- Text-to-speech uses the browser Web Speech API, so voice quality depends on the browser and device.
- Most reader state remains in browser local storage unless the user signs in and syncs.
- Runtime files like logs, pid files, and local user data are ignored by Git.
