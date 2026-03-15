"use strict";

const SNAPSHOT_URL = "data/snapshot-data.json";
const HELLOAO_BASE = "https://bible.helloao.org/api";
const BIBLE_SEARCH_BASE = "https://api.biblesupersearch.com/api";
const POLLINATIONS_BASE = "https://gen.pollinations.ai/text/";
const SEARCH_BIBLE_MODULE = "kjv";
const DEFAULT_COMMENTARY = "adam-clarke";
const APP_NAME = "Selah Journey";
const APP_ICON_PATH = "assets/selah-journey-mark.svg";

const BOOK_CATALOG = [
  { id: 1, code: "GEN", name: "Genesis", testament: "Old Testament" },
  { id: 2, code: "EXO", name: "Exodus", testament: "Old Testament" },
  { id: 3, code: "LEV", name: "Leviticus", testament: "Old Testament" },
  { id: 4, code: "NUM", name: "Numbers", testament: "Old Testament" },
  { id: 5, code: "DEU", name: "Deuteronomy", testament: "Old Testament" },
  { id: 6, code: "JOS", name: "Joshua", testament: "Old Testament" },
  { id: 7, code: "JDG", name: "Judges", testament: "Old Testament" },
  { id: 8, code: "RUT", name: "Ruth", testament: "Old Testament" },
  { id: 9, code: "1SA", name: "1 Samuel", testament: "Old Testament" },
  { id: 10, code: "2SA", name: "2 Samuel", testament: "Old Testament" },
  { id: 11, code: "1KI", name: "1 Kings", testament: "Old Testament" },
  { id: 12, code: "2KI", name: "2 Kings", testament: "Old Testament" },
  { id: 13, code: "1CH", name: "1 Chronicles", testament: "Old Testament" },
  { id: 14, code: "2CH", name: "2 Chronicles", testament: "Old Testament" },
  { id: 15, code: "EZR", name: "Ezra", testament: "Old Testament" },
  { id: 16, code: "NEH", name: "Nehemiah", testament: "Old Testament" },
  { id: 17, code: "EST", name: "Esther", testament: "Old Testament" },
  { id: 18, code: "JOB", name: "Job", testament: "Old Testament" },
  { id: 19, code: "PSA", name: "Psalms", testament: "Old Testament" },
  { id: 20, code: "PRO", name: "Proverbs", testament: "Old Testament" },
  { id: 21, code: "ECC", name: "Ecclesiastes", testament: "Old Testament" },
  { id: 22, code: "SNG", name: "Song of Solomon", testament: "Old Testament" },
  { id: 23, code: "ISA", name: "Isaiah", testament: "Old Testament" },
  { id: 24, code: "JER", name: "Jeremiah", testament: "Old Testament" },
  { id: 25, code: "LAM", name: "Lamentations", testament: "Old Testament" },
  { id: 26, code: "EZK", name: "Ezekiel", testament: "Old Testament" },
  { id: 27, code: "DAN", name: "Daniel", testament: "Old Testament" },
  { id: 28, code: "HOS", name: "Hosea", testament: "Old Testament" },
  { id: 29, code: "JOL", name: "Joel", testament: "Old Testament" },
  { id: 30, code: "AMO", name: "Amos", testament: "Old Testament" },
  { id: 31, code: "OBA", name: "Obadiah", testament: "Old Testament" },
  { id: 32, code: "JON", name: "Jonah", testament: "Old Testament" },
  { id: 33, code: "MIC", name: "Micah", testament: "Old Testament" },
  { id: 34, code: "NAM", name: "Nahum", testament: "Old Testament" },
  { id: 35, code: "HAB", name: "Habakkuk", testament: "Old Testament" },
  { id: 36, code: "ZEP", name: "Zephaniah", testament: "Old Testament" },
  { id: 37, code: "HAG", name: "Haggai", testament: "Old Testament" },
  { id: 38, code: "ZEC", name: "Zechariah", testament: "Old Testament" },
  { id: 39, code: "MAL", name: "Malachi", testament: "Old Testament" },
  { id: 40, code: "MAT", name: "Matthew", testament: "New Testament" },
  { id: 41, code: "MRK", name: "Mark", testament: "New Testament" },
  { id: 42, code: "LUK", name: "Luke", testament: "New Testament" },
  { id: 43, code: "JHN", name: "John", testament: "New Testament" },
  { id: 44, code: "ACT", name: "Acts", testament: "New Testament" },
  { id: 45, code: "ROM", name: "Romans", testament: "New Testament" },
  { id: 46, code: "1CO", name: "1 Corinthians", testament: "New Testament" },
  { id: 47, code: "2CO", name: "2 Corinthians", testament: "New Testament" },
  { id: 48, code: "GAL", name: "Galatians", testament: "New Testament" },
  { id: 49, code: "EPH", name: "Ephesians", testament: "New Testament" },
  { id: 50, code: "PHP", name: "Philippians", testament: "New Testament" },
  { id: 51, code: "COL", name: "Colossians", testament: "New Testament" },
  { id: 52, code: "1TH", name: "1 Thessalonians", testament: "New Testament" },
  { id: 53, code: "2TH", name: "2 Thessalonians", testament: "New Testament" },
  { id: 54, code: "1TI", name: "1 Timothy", testament: "New Testament" },
  { id: 55, code: "2TI", name: "2 Timothy", testament: "New Testament" },
  { id: 56, code: "TIT", name: "Titus", testament: "New Testament" },
  { id: 57, code: "PHM", name: "Philemon", testament: "New Testament" },
  { id: 58, code: "HEB", name: "Hebrews", testament: "New Testament" },
  { id: 59, code: "JAS", name: "James", testament: "New Testament" },
  { id: 60, code: "1PE", name: "1 Peter", testament: "New Testament" },
  { id: 61, code: "2PE", name: "2 Peter", testament: "New Testament" },
  { id: 62, code: "1JN", name: "1 John", testament: "New Testament" },
  { id: 63, code: "2JN", name: "2 John", testament: "New Testament" },
  { id: 64, code: "3JN", name: "3 John", testament: "New Testament" },
  { id: 65, code: "JUD", name: "Jude", testament: "New Testament" },
  { id: 66, code: "REV", name: "Revelation", testament: "New Testament" }
];

const LIBRARY_DESCRIPTIONS = {
  "Bible Stories": "Classic narrative entry points for reading large arcs of Scripture with context.",
  "Bible Topics": "Thematic studies you can use to trace a doctrine, question, or spiritual habit.",
  "Bible History": "Background reading for timeline, translation history, and historical setting.",
  "King James Bible Preface": "The original KJV preface and translator framing around the 1611 work.",
  "The Translators Speech": "Translator perspective on method, language, and the work of revision.",
  "Title Page": "A period artifact that helps anchor the publication history of the KJV tradition.",
  "Hampton Court": "Historical context around the conference that shaped the King James project.",
  "King James Translators": "Profiles and background for the scholars involved in the translation effort.",
  "Instructions to the Translators": "Guiding rules for the translation team and their editorial process.",
  "Great Fire of London": "A historical detour tied to preservation, printing, and the era around the text.",
  "Textus Receptus": "Notes on the Greek textual stream behind much of the traditional New Testament.",
  "Masoretic Text": "Overview of the Hebrew textual tradition for the Old Testament.",
  "Margin Notes": "A study aid for variant readings, clarifications, and translator comments.",
  "Strongs Numbers": "A bridge into Hebrew and Greek word studies connected to verse locations.",
  "Bible Facts & Statistics": "Quick-reference numbers, counts, and structural facts about the Bible."
};

const JOURNEY_DATA = window.StudyCompassData?.journeys || [];
const DAILY_FOCUS_DATA = window.StudyCompassData?.dailyFocuses || [];
const TOPIC_GROUP_DATA = window.StudyCompassData?.topicGroups || [];
const SUPPORT_SECTION_DATA = window.StudyCompassData?.supportSections || [];
const NOTIFICATION_PRESET_DATA = window.StudyCompassData?.notificationPresets || [];
const DEFAULT_STUDY_DESK = {
  title: "",
  questions: "",
  outline: "",
  prayer: "",
  activeJourneyId: JOURNEY_DATA[0]?.id || "",
  completedJourneySteps: {},
  savedSearches: [],
  recentReferences: [],
  recentWordStudies: [],
  recentPlaces: [],
  lastReference: null
};

const DEFAULT_ACCOUNT_CONFIG = {
  appOrigin: "",
  googleEnabled: false,
  gmailEnabled: false,
  googleAuthUrl: "/auth/google/start"
};

const DEFAULT_READER_SETTINGS = {
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
  speechRate: 1
};

const state = {
  snapshot: null,
  availableLanguages: [],
  translationBooks: [],
  translations: [],
  commentaries: [],
  selectedTranslation: loadLocal("kingsBibleCompass.selectedTranslation", ""),
  selectedCommentary: DEFAULT_COMMENTARY,
  selectedBookCode: "GEN",
  selectedChapter: 1,
  chapterBlocks: [],
  chapterSource: "live",
  chapterVerseMap: new Map(),
  commentaryMap: new Map(),
  crossRefMap: new Map(),
  compareChapterCache: new Map(),
  compareTranslation: loadLocal("kingsBibleCompass.compareTranslation", ""),
  compareRequestKey: "",
  focusedVerse: null,
  pendingFocusVerse: null,
  readerFocusMode: loadLocal("kingsBibleCompass.readerFocusMode", false) === true,
  bookmarks: loadLocal("kingsBibleCompass.bookmarks", []),
  highlights: loadLocal("kingsBibleCompass.highlights", {}),
  notes: loadLocal("kingsBibleCompass.notes", {}),
  aiCache: loadLocal("kingsBibleCompass.aiCache", {}),
  notifications: loadLocal("kingsBibleCompass.notifications", []),
  studyDesk: hydrateStudyDesk(loadLocal("kingsBibleCompass.studyDesk", DEFAULT_STUDY_DESK)),
  speechVoices: [],
  publicAccessUrl: "",
  dictionaryWord: "",
  concordanceWord: "",
  atlasPlace: "",
  currentPanel: "home",
  account: {
    user: null,
    config: { ...DEFAULT_ACCOUNT_CONFIG },
    syncing: false,
    syncTimer: null,
    settingsTimer: null,
    activeModal: "",
    message: "",
    resetToken: "",
    pendingVerificationEmail: ""
  }
};

const els = {};
let activeSpeechSessionId = 0;
let speechPlaybackActive = false;

document.addEventListener("DOMContentLoaded", () => {
  cacheDom();
  bindEvents();
  initialize().catch((error) => {
    console.error(error);
    setReaderStatus("Unable to initialize the app. Check the local server and API access.");
    els.chapterContent.innerHTML = `<div class="reader-prose">${escapeHtml(error.message || "Initialization failed.")}</div>`;
  });
});

async function initialize() {
  let initialRoute = resolveInitialRoute(parseInitialRoute());
  const localDefaultPanel = getDefaultPanelSetting();
  if (!hasExplicitPanelRequest() && localDefaultPanel) {
    initialRoute = {
      ...initialRoute,
      panel: localDefaultPanel
    };
  }
  applyReaderSettings({
    readingLanguage: loadLocal("kingsBibleCompass.readingLanguage", DEFAULT_READER_SETTINGS.readingLanguage),
    displayMode: loadLocal("kingsBibleCompass.displayMode", DEFAULT_READER_SETTINGS.displayMode),
    theme: loadLocal("kingsBibleCompass.theme", DEFAULT_READER_SETTINGS.theme),
    textSize: loadLocal("kingsBibleCompass.readerTextSize", DEFAULT_READER_SETTINGS.textSize),
    motion: loadLocal("kingsBibleCompass.motion", DEFAULT_READER_SETTINGS.motion),
    readerWidth: loadLocal("kingsBibleCompass.readerWidth", DEFAULT_READER_SETTINGS.readerWidth),
    showVerseNumbers: loadLocal("kingsBibleCompass.showVerseNumbers", DEFAULT_READER_SETTINGS.showVerseNumbers),
    resumeLastReference: loadLocal("kingsBibleCompass.resumeLastReference", DEFAULT_READER_SETTINGS.resumeLastReference),
    pushNotifications: loadLocal("kingsBibleCompass.pushNotifications", DEFAULT_READER_SETTINGS.pushNotifications),
    emailNotifications: loadLocal("kingsBibleCompass.emailNotifications", DEFAULT_READER_SETTINGS.emailNotifications),
    speechVoice: loadLocal("kingsBibleCompass.speechVoice", DEFAULT_READER_SETTINGS.speechVoice),
    speechRate: loadLocal("kingsBibleCompass.speechRate", DEFAULT_READER_SETTINGS.speechRate)
  });
  if (!hasExplicitPanelRequest() && getResumeLastReferenceSetting() && state.studyDesk.lastReference) {
    initialRoute = {
      ...initialRoute,
      panel: "read",
      book: state.studyDesk.lastReference.bookCode,
      chapter: state.studyDesk.lastReference.chapter,
      verse: state.studyDesk.lastReference.verse
    };
  }
  applyReaderFocusMode(state.readerFocusMode);
  state.snapshot = await fetchJson(SNAPSHOT_URL);
  renderSnapshotSeed();
  populateStaticControls();
  seedNotificationFeed();
  initializeSpeechVoices();
  await Promise.allSettled([loadTranslations(), loadCommentaries()]);
  applyReadRoute(initialRoute);
  await loadChapter(state.selectedBookCode, state.selectedChapter);
  hydrateDeskInputs();
  renderSpotlights();
  renderBrowse();
  renderJourneys();
  renderDesk();
  renderNotifications();
  renderBookmarks();
  renderSupport();
  renderAccount();
  void loadPublicAccessUrl();
  await loadAccountSession();
  if (!hasExplicitPanelRequest() && state.account.user?.settings?.defaultPanel) {
    initialRoute = {
      ...initialRoute,
      panel: state.account.user.settings.defaultPanel
    };
  }
  await applyToolRoute(initialRoute);
}

function cacheDom() {
  [
    "appBrandMark",
    "heroTitle",
    "heroSubtitle",
    "heroStats",
    "heroMark",
    "continueReference",
    "continueSummary",
    "continueStudyButton",
    "continueMeta",
    "dailyFocusReference",
    "dailyFocusPrayer",
    "dailyFocusButton",
    "dailyFocusMeta",
    "activeJourneyTitle",
    "activeJourneySummary",
    "openJourneyButton",
    "activeJourneyMeta",
    "translationSelect",
    "bookSelect",
    "chapterSelect",
    "commentarySelect",
    "readerLanguageSelect",
    "readerDisplayModeSelect",
    "readerThemeSelect",
    "readerTextSizeSelect",
    "readerMotionSelect",
    "readerPreferenceMeta",
    "readerFocusToggleButton",
    "readerStatus",
    "chapterMeta",
    "chapterTitle",
    "chapterSourceBadge",
    "chapterVerseCountBadge",
    "chapterContent",
    "focusStudyBlock",
    "focusReference",
    "focusVerseText",
    "focusHighlightMeta",
    "bookmarkButton",
    "clearHighlightButton",
    "verseAiButton",
    "compareTranslationSelect",
    "compareVerseMeta",
    "compareVerseText",
    "commentaryMeta",
    "commentaryContent",
    "crossRefMeta",
    "crossRefList",
    "verseNote",
    "noteSaveMeta",
    "aiStudyOutput",
    "searchFilter",
    "searchStatus",
    "searchResultsMeta",
    "searchResults",
    "browseStatus",
    "browseSummaryMeta",
    "browseSummary",
    "browseExtraActions",
    "browseJourneyGrid",
    "browseOldTestamentGrid",
    "browseNewTestamentGrid",
    "browseTopicGroups",
    "journeyStatus",
    "journeyList",
    "journeyBanner",
    "journeyTone",
    "journeyDetailTitle",
    "journeyProgressBadge",
    "journeyDetailSummary",
    "journeyFocus",
    "journeyLength",
    "journeyLearnMeta",
    "journeyPathList",
    "journeyStepList",
    "deskStatus",
    "deskStudyTitle",
    "deskQuestions",
    "deskOutline",
    "deskPrayer",
    "studyDashboardGrid",
    "studyPatternList",
    "memoryReviewList",
    "notificationsStatus",
    "notificationsPermissionMeta",
    "notificationsRefreshButton",
    "notificationsEmailTestButton",
    "notificationsClearButton",
    "notificationsUnreadMeta",
    "notificationsSummary",
    "notificationsList",
    "accountCornerAvatar",
    "accountCornerLabel",
    "accountCornerMeta",
    "accountStatus",
    "accountMessage",
    "accountAvatar",
    "accountSecurityCard",
    "accountSummaryName",
    "accountSummaryEmail",
    "accountSummaryMeta",
    "accountSyncBadge",
    "accountVerifiedBadge",
    "accountCloudState",
    "accountVerificationCard",
    "accountVerificationMeta",
    "accountVerificationEmail",
    "accountVerificationCode",
    "authSignedOut",
    "authSignedIn",
    "googleAuthButton",
    "googleAuthMeta",
    "gmailSignupMeta",
    "loginEmail",
    "loginPassword",
    "signupName",
    "signupEmail",
    "signupPassword",
    "accountResetEmail",
    "accountResetTokenSurface",
    "resetTokenMeta",
    "accountResetPassword",
    "accountResetPasswordConfirm",
    "accountDisplayName",
    "accountEmail",
    "accountDefaultPanel",
    "accountLanguage",
    "accountDisplayMode",
    "accountTheme",
    "accountTextSize",
    "accountMotion",
    "accountReaderWidth",
    "accountShowVerseNumbers",
    "accountResumeLastReference",
    "accountAutoSync",
    "accountPushNotifications",
    "accountEmailNotifications",
    "accountWelcomeEmails",
    "accountSecurityEmails",
    "accountStudyEmails",
    "accountSyncMeta",
    "accountSpeechVoice",
    "accountSpeechRate",
    "accountSpeakChapterButton",
    "accountSpeakVerseButton",
    "accountStopSpeechButton",
    "accountOpenNotificationsButton",
    "accountSendNotificationTestButton",
    "accountCurrentPassword",
    "accountNewPassword",
    "accountDeleteConfirm",
    "accountDeleteButton",
    "settingsMenuModal",
    "settingsMenuCloseButton",
    "quickDefaultPanel",
    "quickLanguageSelect",
    "quickDisplayModeSelect",
    "quickThemeSelect",
    "quickTextSizeSelect",
    "quickMotionSelect",
    "quickReaderWidthSelect",
    "quickShowVerseNumbers",
    "quickResumeLastReference",
    "quickPushNotifications",
    "quickSettingsMeta",
    "quickSettingsResetButton",
    "quickSettingsSaveButton",
    "moreMenuModal",
    "moreMenuCloseButton",
    "moreOpenCloudButton",
    "moreOpenPasswordButton",
    "moreOpenResetButton",
    "moreOpenVerificationButton",
    "moreOpenNotificationsButton",
    "moreOpenSupportButton",
    "moreExportDataButton",
    "moreClearLocalDataButton",
    "moreShareWebsiteButton",
    "moreDonationButton",
    "moreDeleteAccountButton",
    "moreMenuMeta",
    "savedSearchList",
    "recentReferenceList",
    "deskBookmarkList",
    "dictionaryHeading",
    "dictionaryBullets",
    "dictionaryAlphabet",
    "dictionaryWord",
    "dictionaryMeta",
    "dictionaryAi",
    "dictionaryResultsMeta",
    "dictionaryResults",
    "concordanceIntro",
    "concordanceAlphabet",
    "concordanceWord",
    "concordanceResultsMeta",
    "concordanceResults",
    "bookmarkList",
    "atlasBookSelect",
    "atlasBookCountMeta",
    "atlasAlphabet",
    "atlasPlace",
    "atlasMeta",
    "atlasAi",
    "atlasMapLink",
    "atlasResultsMeta",
    "atlasResults",
    "libraryGrid",
    "libraryStatus",
    "supportStatus",
    "supportVersionMeta",
    "supportSectionList",
    "shareWebsiteButton",
    "copyPublicLinkButton",
    "supportDonationButton",
    "supportPublicUrl",
    "floatingStopSpeechButton",
    "snapshotSources",
    "libraryFilter"
  ].forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function bindEvents() {
  document.querySelectorAll("[data-nav-target]").forEach((button) => {
    button.addEventListener("click", () => switchPanel(button.dataset.navTarget));
  });

  els.continueStudyButton.addEventListener("click", async () => {
    const last = state.studyDesk.lastReference;
    if (last) {
      await openReference(last.bookCode, last.chapter, last.verse);
      return;
    }
    await openReference("GEN", 1, 1);
  });

  els.dailyFocusButton.addEventListener("click", async () => {
    const focus = getDailyFocus();
    if (!focus) {
      return;
    }
    await openReference(focus.book, focus.chapter, focus.verse);
  });

  els.openJourneyButton.addEventListener("click", () => {
    switchPanel("journeys");
    renderJourneys();
  });

  els.translationSelect.addEventListener("change", async () => {
    state.selectedTranslation = els.translationSelect.value;
    saveLocal("kingsBibleCompass.selectedTranslation", state.selectedTranslation, { suppressSync: true });
    syncCompareTranslationOptions();
    await loadTranslationBooks(state.selectedTranslation);
    await loadChapter(state.selectedBookCode, state.selectedChapter);
  });

  els.readerLanguageSelect.addEventListener("change", async () => {
    await updateReaderSetting("readingLanguage", els.readerLanguageSelect.value);
  });

  els.readerDisplayModeSelect.addEventListener("change", () => {
    updateReaderSetting("displayMode", els.readerDisplayModeSelect.value);
  });

  els.bookSelect.addEventListener("change", async () => {
    state.selectedBookCode = els.bookSelect.value;
    populateChapterSelect();
    state.selectedChapter = Number(els.chapterSelect.value);
    await loadChapter(state.selectedBookCode, state.selectedChapter);
  });

  els.chapterSelect.addEventListener("change", async () => {
    state.selectedChapter = Number(els.chapterSelect.value);
    await loadChapter(state.selectedBookCode, state.selectedChapter);
  });

  els.commentarySelect.addEventListener("change", async () => {
    state.selectedCommentary = els.commentarySelect.value;
    await loadChapter(state.selectedBookCode, state.selectedChapter);
  });

  els.readerThemeSelect.addEventListener("change", () => {
    updateReaderSetting("theme", els.readerThemeSelect.value);
  });

  els.readerTextSizeSelect.addEventListener("change", () => {
    updateReaderSetting("textSize", els.readerTextSizeSelect.value);
  });

  els.readerMotionSelect.addEventListener("change", () => {
    updateReaderSetting("motion", els.readerMotionSelect.value);
  });

  els.readerFocusToggleButton.addEventListener("click", () => {
    applyReaderFocusMode(!state.readerFocusMode);
  });

  els.accountTheme.addEventListener("change", () => {
    updateReaderSetting("theme", els.accountTheme.value);
  });

  els.accountLanguage.addEventListener("change", async () => {
    await updateReaderSetting("readingLanguage", els.accountLanguage.value);
  });

  els.accountDisplayMode.addEventListener("change", () => {
    updateReaderSetting("displayMode", els.accountDisplayMode.value);
  });

  els.accountTextSize.addEventListener("change", () => {
    updateReaderSetting("textSize", els.accountTextSize.value);
  });

  els.accountMotion.addEventListener("change", () => {
    updateReaderSetting("motion", els.accountMotion.value);
  });

  els.accountReaderWidth.addEventListener("change", () => {
    updateReaderSetting("readerWidth", els.accountReaderWidth.value);
  });

  els.accountShowVerseNumbers.addEventListener("change", () => {
    updateReaderSetting("showVerseNumbers", els.accountShowVerseNumbers.checked);
  });

  els.accountResumeLastReference.addEventListener("change", () => {
    updateReaderSetting("resumeLastReference", els.accountResumeLastReference.checked);
  });

  els.accountPushNotifications.addEventListener("change", async () => {
    await updateReaderSetting("pushNotifications", els.accountPushNotifications.checked);
  });

  els.accountEmailNotifications.addEventListener("change", () => {
    updateReaderSetting("emailNotifications", els.accountEmailNotifications.checked);
  });

  if (els.accountSpeechVoice) {
    els.accountSpeechVoice.addEventListener("change", () => {
      updateReaderSetting("speechVoice", els.accountSpeechVoice.value);
    });
  }

  if (els.accountSpeechRate) {
    els.accountSpeechRate.addEventListener("change", () => {
      updateReaderSetting("speechRate", Number(els.accountSpeechRate.value));
    });
  }

  if (els.accountSpeakChapterButton) {
    els.accountSpeakChapterButton.addEventListener("click", () => {
      speakCurrentChapter();
    });
  }

  if (els.accountSpeakVerseButton) {
    els.accountSpeakVerseButton.addEventListener("click", () => {
      speakFocusedVerse();
    });
  }

  if (els.accountStopSpeechButton) {
    els.accountStopSpeechButton.addEventListener("click", () => {
      stopSpeech();
    });
  }

  els.floatingStopSpeechButton.addEventListener("click", () => {
    stopSpeech();
  });

  els.compareTranslationSelect.addEventListener("change", () => {
    state.compareTranslation = els.compareTranslationSelect.value;
    saveLocal("kingsBibleCompass.compareTranslation", state.compareTranslation, { suppressSync: true });
    void renderCompareVerse();
  });

  els.accountDefaultPanel.addEventListener("change", () => {
    applyDefaultPanelSetting(els.accountDefaultPanel.value);
    if (state.account.user) {
      state.account.user.settings = {
        ...(state.account.user.settings || {}),
        defaultPanel: els.accountDefaultPanel.value
      };
      setAccountMessage("Default section updated. Save settings to sync it to your account.");
    } else {
      setAccountMessage("Default section saved for this browser.");
    }
  });

  document.getElementById("prevChapterButton").addEventListener("click", async () => {
    const previous = Math.max(1, state.selectedChapter - 1);
    if (previous === state.selectedChapter) {
      return;
    }
    state.selectedChapter = previous;
    els.chapterSelect.value = String(previous);
    await loadChapter(state.selectedBookCode, state.selectedChapter);
  });

  document.getElementById("nextChapterButton").addEventListener("click", async () => {
    const maxChapter = getCurrentBookChapterCount();
    const next = Math.min(maxChapter, state.selectedChapter + 1);
    if (next === state.selectedChapter) {
      return;
    }
    state.selectedChapter = next;
    els.chapterSelect.value = String(next);
    await loadChapter(state.selectedBookCode, state.selectedChapter);
  });

  document.getElementById("randomVerseButton").addEventListener("click", () => {
    const verses = Array.from(state.chapterVerseMap.keys());
    if (!verses.length) {
      return;
    }
    const verseNumber = verses[Math.floor(Math.random() * verses.length)];
    focusVerse(verseNumber);
  });

  els.bookmarkButton.addEventListener("click", () => {
    if (!state.focusedVerse) {
      return;
    }
    toggleBookmark(state.focusedVerse.reference);
  });

  document.querySelectorAll("[data-highlight-tone]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!state.focusedVerse) {
        return;
      }
      toggleVerseHighlight(state.focusedVerse.reference, button.dataset.highlightTone);
    });
  });

  els.clearHighlightButton.addEventListener("click", () => {
    if (!state.focusedVerse) {
      return;
    }
    clearVerseHighlight(state.focusedVerse.reference);
  });

  els.verseAiButton.addEventListener("click", async () => {
    if (!state.focusedVerse) {
      return;
    }
    const verse = state.focusedVerse;
    const commentary = state.commentaryMap.get(verse.verseNumber) || "";
    const prompt = [
      `Explain ${verse.reference} in a short Bible study format.`,
      "Keep it concise and pastoral.",
      "Use three bullets: meaning, context, and application.",
      "Close with a one-sentence prayer.",
      `Verse: ${verse.text}`,
      commentary ? `Commentary context: ${commentary}` : ""
    ].filter(Boolean).join("\n");
    await runAiPrompt(prompt, els.aiStudyOutput);
  });

  let noteTimer = null;
  els.verseNote.addEventListener("input", () => {
    if (!state.focusedVerse) {
      return;
    }
    clearTimeout(noteTimer);
    noteTimer = setTimeout(() => {
      state.notes[state.focusedVerse.reference] = els.verseNote.value.trim();
      saveLocal("kingsBibleCompass.notes", state.notes);
      els.noteSaveMeta.textContent = `Saved ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
      renderStudyDashboard();
      renderMemoryReview();
    }, 240);
  });

  document.getElementById("advancedSearchForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await runAdvancedSearch();
  });

  document.getElementById("saveSearchButton").addEventListener("click", () => {
    saveCurrentSearch();
  });

  document.getElementById("searchClearButton").addEventListener("click", () => {
    ["exactPhrase", "allWords", "moreWords", "noWords"].forEach((id) => {
      document.getElementById(id).value = "";
    });
    els.searchFilter.value = "";
    els.searchResults.innerHTML = '<div class="muted-copy">Search results will appear here.</div>';
    els.searchResultsMeta.textContent = "No search yet";
  });

  document.getElementById("dictionaryForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const word = els.dictionaryWord.value.trim();
    if (!word) {
      return;
    }
    state.dictionaryWord = word;
    await runWordStudy(word);
  });

  document.getElementById("concordanceForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const word = els.concordanceWord.value.trim();
    if (!word) {
      return;
    }
    state.concordanceWord = word;
    await runConcordance(word);
  });

  document.getElementById("atlasForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const place = els.atlasPlace.value.trim();
    if (!place) {
      return;
    }
    state.atlasPlace = place;
    await runAtlasStudy(place);
  });

  els.atlasBookSelect.addEventListener("change", () => {
    const selected = BOOK_CATALOG.find((book) => book.code === els.atlasBookSelect.value);
    if (!selected) {
      return;
    }
    els.atlasPlace.value = selected.name;
  });

  els.libraryFilter.addEventListener("input", () => {
    renderLibrary(els.libraryFilter.value.trim());
  });

  [
    ["title", els.deskStudyTitle],
    ["questions", els.deskQuestions],
    ["outline", els.deskOutline],
    ["prayer", els.deskPrayer]
  ].forEach(([key, element]) => {
    element.addEventListener("input", () => {
      state.studyDesk[key] = element.value;
      persistStudyDesk();
      updateDeskStatus();
    });
  });

  document.getElementById("accountLoginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await signInWithEmail();
  });

  document.getElementById("accountSignupForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await signUpWithEmail();
  });

  document.getElementById("accountResetRequestForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await requestPasswordResetEmail();
  });

  document.getElementById("accountVerificationForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await verifyAccountCode();
  });

  document.getElementById("accountVerificationResendButton").addEventListener("click", async () => {
    await resendVerificationEmail();
  });

  document.getElementById("accountResetForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await completePasswordReset();
  });

  document.getElementById("accountSettingsForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await saveAccountSettings();
  });

  document.getElementById("accountPasswordForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await updateAccountPassword();
  });

  document.getElementById("accountSignOutButton").addEventListener("click", async () => {
    await signOutAccount();
  });

  document.getElementById("accountResendVerificationButton").addEventListener("click", async () => {
    await resendVerificationEmail();
  });

  document.getElementById("accountPushButton").addEventListener("click", async () => {
    await syncStudyStateToAccount(false);
  });

  document.getElementById("accountPullButton").addEventListener("click", async () => {
    await restoreStudyStateFromAccount(false);
  });

  document.getElementById("accountQuickSettingsButton").addEventListener("click", () => {
    openAccountModal("settings");
  });

  document.getElementById("accountQuickMoreButton").addEventListener("click", () => {
    openAccountModal("more");
  });

  els.settingsMenuCloseButton.addEventListener("click", closeAccountModal);
  els.moreMenuCloseButton.addEventListener("click", closeAccountModal);
  document.querySelectorAll("[data-account-modal-close]").forEach((element) => {
    element.addEventListener("click", closeAccountModal);
  });

  els.quickDefaultPanel.addEventListener("change", () => {
    els.accountDefaultPanel.value = els.quickDefaultPanel.value;
    applyDefaultPanelSetting(els.quickDefaultPanel.value);
    if (state.account.user) {
      state.account.user.settings = {
        ...(state.account.user.settings || {}),
        defaultPanel: els.quickDefaultPanel.value
      };
      els.quickSettingsMeta.textContent = "Default section updated. Save settings to sync it to your account.";
    } else {
      els.quickSettingsMeta.textContent = "Default section saved locally for this browser.";
    }
  });

  els.quickLanguageSelect.addEventListener("change", async () => {
    els.accountLanguage.value = els.quickLanguageSelect.value;
    await updateReaderSetting("readingLanguage", els.quickLanguageSelect.value);
  });

  els.quickDisplayModeSelect.addEventListener("change", () => {
    els.accountDisplayMode.value = els.quickDisplayModeSelect.value;
    updateReaderSetting("displayMode", els.quickDisplayModeSelect.value);
  });

  els.quickThemeSelect.addEventListener("change", () => {
    els.accountTheme.value = els.quickThemeSelect.value;
    updateReaderSetting("theme", els.quickThemeSelect.value);
  });

  els.quickTextSizeSelect.addEventListener("change", () => {
    els.accountTextSize.value = els.quickTextSizeSelect.value;
    updateReaderSetting("textSize", els.quickTextSizeSelect.value);
  });

  els.quickMotionSelect.addEventListener("change", () => {
    els.accountMotion.value = els.quickMotionSelect.value;
    updateReaderSetting("motion", els.quickMotionSelect.value);
  });

  els.quickReaderWidthSelect.addEventListener("change", () => {
    els.accountReaderWidth.value = els.quickReaderWidthSelect.value;
    updateReaderSetting("readerWidth", els.quickReaderWidthSelect.value);
  });

  els.quickShowVerseNumbers.addEventListener("change", () => {
    els.accountShowVerseNumbers.checked = els.quickShowVerseNumbers.checked;
    updateReaderSetting("showVerseNumbers", els.quickShowVerseNumbers.checked);
  });

  els.quickResumeLastReference.addEventListener("change", () => {
    els.accountResumeLastReference.checked = els.quickResumeLastReference.checked;
    updateReaderSetting("resumeLastReference", els.quickResumeLastReference.checked);
  });

  els.quickPushNotifications.addEventListener("change", async () => {
    els.accountPushNotifications.checked = els.quickPushNotifications.checked;
    await updateReaderSetting("pushNotifications", els.quickPushNotifications.checked);
  });

  els.quickSettingsResetButton.addEventListener("click", () => {
    resetQuickSettingsToDefaults();
  });

  els.quickSettingsSaveButton.addEventListener("click", async () => {
    await saveAccountSettings();
  });

  els.moreOpenCloudButton.addEventListener("click", () => {
    closeAccountModal();
    jumpToAccountCard("accountCloudCard");
  });

  els.moreOpenPasswordButton.addEventListener("click", () => {
    closeAccountModal();
    jumpToAccountCard("accountPasswordCard");
  });

  els.moreOpenResetButton.addEventListener("click", () => {
    closeAccountModal();
    jumpToAccountCard("accountSecurityCard");
  });

  els.moreOpenVerificationButton.addEventListener("click", () => {
    closeAccountModal();
    jumpToAccountCard("accountVerificationCard");
  });

  els.moreOpenNotificationsButton.addEventListener("click", () => {
    openAccountModal("settings", "settingsNotificationSection");
  });

  els.moreOpenSupportButton.addEventListener("click", () => {
    openAccountModal("settings", "settingsSupportSection");
  });

  els.moreExportDataButton.addEventListener("click", () => {
    exportLocalStudyData();
  });

  els.moreClearLocalDataButton.addEventListener("click", () => {
    clearLocalStudyData();
  });

  els.moreShareWebsiteButton.addEventListener("click", async () => {
    await shareWebsite();
  });

  els.moreDonationButton.addEventListener("click", () => {
    openDonationLink();
  });

  els.moreDeleteAccountButton.addEventListener("click", () => {
    closeAccountModal();
    jumpToAccountCard("accountDangerCard");
  });

  els.accountOpenNotificationsButton.addEventListener("click", () => {
    openAccountModal("settings", "settingsNotificationSection");
  });

  els.accountSendNotificationTestButton.addEventListener("click", async () => {
    await sendNotificationTestEmail();
  });

  els.accountDeleteButton.addEventListener("click", async () => {
    await deleteAccount();
  });

  els.notificationsRefreshButton.addEventListener("click", () => {
    renderNotifications();
  });

  els.notificationsEmailTestButton.addEventListener("click", async () => {
    await sendNotificationTestEmail();
  });

  els.notificationsClearButton.addEventListener("click", () => {
    clearNotifications();
  });

  els.shareWebsiteButton.addEventListener("click", async () => {
    await shareWebsite();
  });

  els.copyPublicLinkButton.addEventListener("click", async () => {
    const copied = await copyTextToClipboard(getPreferredShareUrl());
    flashButtonLabel(els.copyPublicLinkButton, copied ? "Copied" : "Failed");
  });

  els.supportDonationButton.addEventListener("click", () => {
    openDonationLink();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.account.activeModal) {
      closeAccountModal();
    }
  });

  bindAccountValidationReset([
    els.loginEmail,
    els.loginPassword,
    els.signupName,
    els.signupEmail,
    els.signupPassword,
    els.accountResetEmail,
    els.accountVerificationEmail,
    els.accountVerificationCode,
    els.accountResetPassword,
    els.accountResetPasswordConfirm,
    els.accountDisplayName,
    els.accountCurrentPassword,
    els.accountNewPassword
  ]);

  els.accountVerificationCode.addEventListener("input", () => {
    els.accountVerificationCode.value = els.accountVerificationCode.value.replace(/\D/g, "").slice(0, 6);
  });
}

async function loadTranslations() {
  const data = await fetchJson(`${HELLOAO_BASE}/available_translations.json`);
  const translations = (data.translations || [])
    .filter((translation) => translation.id)
    .sort((left, right) => {
      const leftPriority = /king james|kjv/i.test(left.englishName || left.name) ? 0 : 1;
      const rightPriority = /king james|kjv/i.test(right.englishName || right.name) ? 0 : 1;
      return leftPriority - rightPriority || String(left.englishName || left.name || left.id).localeCompare(String(right.englishName || right.name || right.id));
    });

  state.translations = translations;
  state.availableLanguages = getAvailableTranslationLanguages(translations);
  populateLanguageControls();
  syncTranslationSelect();
  syncCompareTranslationOptions();
  await loadTranslationBooks(state.selectedTranslation);
}

function getAvailableTranslationLanguages(translations) {
  const seen = new Map();
  translations.forEach((translation) => {
    const code = String(translation.language || "eng").trim().toLowerCase() || "eng";
    if (!seen.has(code)) {
      seen.set(code, {
        code,
        label: getLanguageLabel(code)
      });
    }
  });
  if (!seen.has(DEFAULT_READER_SETTINGS.readingLanguage)) {
    seen.set(DEFAULT_READER_SETTINGS.readingLanguage, {
      code: DEFAULT_READER_SETTINGS.readingLanguage,
      label: getLanguageLabel(DEFAULT_READER_SETTINGS.readingLanguage)
    });
  }
  return Array.from(seen.values()).sort((left, right) => left.label.localeCompare(right.label));
}

function populateLanguageControls() {
  const options = state.availableLanguages.length
    ? state.availableLanguages
    : [{ code: DEFAULT_READER_SETTINGS.readingLanguage, label: getLanguageLabel(DEFAULT_READER_SETTINGS.readingLanguage) }];
  const html = options.map((item) => `<option value="${escapeHtml(item.code)}">${escapeHtml(item.label)}</option>`).join("");

  [
    els.readerLanguageSelect,
    els.accountLanguage,
    els.quickLanguageSelect
  ].filter(Boolean).forEach((element) => {
    element.innerHTML = html;
    element.value = getReadingLanguageSetting();
  });
}

function syncTranslationSelect() {
  const language = getReadingLanguageSetting();
  const inLanguage = state.translations.filter((translation) => String(translation.language || "eng").toLowerCase() === language);
  const fallback = inLanguage.length
    ? inLanguage
    : state.translations.filter((translation) => String(translation.language || "eng").toLowerCase() === DEFAULT_READER_SETTINGS.readingLanguage);
  const items = fallback.length ? fallback : state.translations;
  const savedTranslation = loadLocal("kingsBibleCompass.selectedTranslation", "");
  const nextTranslation = [state.selectedTranslation, savedTranslation]
    .filter(Boolean)
    .find((candidate) => items.some((translation) => translation.id === candidate)) || items[0]?.id || "";

  state.selectedTranslation = nextTranslation;
  saveLocal("kingsBibleCompass.selectedTranslation", state.selectedTranslation, { suppressSync: true });
  els.translationSelect.innerHTML = items.map((translation) => {
    const label = escapeHtml(translation.englishName || translation.name || translation.id);
    return `<option value="${escapeHtml(translation.id)}">${label}</option>`;
  }).join("");
  els.translationSelect.value = state.selectedTranslation;
}

async function loadTranslationBooks(translationId) {
  if (!translationId) {
    populateBookSelect(BOOK_CATALOG);
    populateChapterSelect();
    return;
  }

  const data = await fetchJson(`${HELLOAO_BASE}/${translationId}/books.json`);
  state.translationBooks = (data.books || []).map((book) => ({
    id: book.id,
    name: book.commonName || book.name || getBookByCode(book.id)?.name || book.id,
    numberOfChapters: Number(book.numberOfChapters || book.lastChapterNumber || 1)
  }));

  const availableCatalog = state.translationBooks
    .map((book) => getBookByCode(book.id))
    .filter(Boolean);

  if (!availableCatalog.some((book) => book.code === state.selectedBookCode)) {
    state.selectedBookCode = availableCatalog[0]?.code || "GEN";
  }

  populateBookSelect(availableCatalog.length ? availableCatalog : BOOK_CATALOG);
  populateChapterSelect();
}

async function loadCommentaries() {
  const data = await fetchJson(`${HELLOAO_BASE}/available_commentaries.json`);
  const commentaries = (data.commentaries || [])
    .filter((commentary) => commentary.language === "eng" || /english/i.test(commentary.englishName || ""))
    .sort((left, right) => String(left.englishName || left.name).localeCompare(String(right.englishName || right.name)));

  state.commentaries = commentaries;

  const defaultCommentary = commentaries.find((item) => item.id === DEFAULT_COMMENTARY) || commentaries[0];
  state.selectedCommentary = defaultCommentary ? defaultCommentary.id : "";

  els.commentarySelect.innerHTML = ['<option value="">No commentary</option>']
    .concat(commentaries.map((commentary) => `<option value="${escapeHtml(commentary.id)}">${escapeHtml(commentary.englishName || commentary.name || commentary.id)}</option>`))
    .join("");

  els.commentarySelect.value = state.selectedCommentary;
}

async function loadChapter(bookCode, chapterNumber) {
  setReaderStatus("Loading chapter...");
  els.chapterContent.innerHTML = '<div class="reader-prose">Loading chapter text and study tools...</div>';
  state.chapterVerseMap = new Map();
  state.commentaryMap = new Map();
  state.crossRefMap = new Map();
  state.focusedVerse = null;
  resetFocusPanel();

  const book = getBookByCode(bookCode);
  const translationLabel = getTranslationLabel(state.selectedTranslation);
  const readerTitle = book ? `${book.name} ${chapterNumber}` : `${bookCode} ${chapterNumber}`;

  els.chapterMeta.textContent = translationLabel || "Live translation";
  els.chapterTitle.textContent = readerTitle;

  const chapterUrl = `${HELLOAO_BASE}/${encodeURIComponent(state.selectedTranslation)}/${bookCode}/${chapterNumber}.json`;
  const crossRefUrl = `${HELLOAO_BASE}/d/open-cross-ref/${bookCode}/${chapterNumber}.json`;
  const commentaryUrl = state.selectedCommentary
    ? `${HELLOAO_BASE}/c/${encodeURIComponent(state.selectedCommentary)}/${bookCode}/${chapterNumber}.json`
    : null;

  try {
    const [chapterResult, crossRefResult, commentaryResult] = await Promise.allSettled([
      fetchJson(chapterUrl),
      fetchJson(crossRefUrl),
      commentaryUrl ? fetchJson(commentaryUrl) : Promise.resolve(null)
    ]);

    if (chapterResult.status !== "fulfilled") {
      throw chapterResult.reason;
    }

    state.chapterSource = "live";
    normalizeChapterResponse(chapterResult.value);

    if (crossRefResult.status === "fulfilled" && crossRefResult.value) {
      normalizeCrossRefs(crossRefResult.value);
    }

    if (commentaryResult.status === "fulfilled" && commentaryResult.value) {
      normalizeCommentary(commentaryResult.value);
    }
  } catch (error) {
    console.warn("Falling back to snapshot chapter.", error);
    const fallback = buildSnapshotFallback(bookCode, chapterNumber);
    if (!fallback) {
      setReaderStatus("Chapter request failed and no local fallback exists.");
      els.chapterContent.innerHTML = `<div class="reader-prose">${escapeHtml(error.message || "Unable to load chapter.")}</div>`;
      els.chapterSourceBadge.textContent = "Unavailable";
      els.chapterVerseCountBadge.textContent = "0 verses";
      return;
    }

    state.chapterSource = "snapshot";
    state.chapterBlocks = fallback.blocks;
    state.chapterVerseMap = fallback.verseMap;
  }

  renderChapter();
  setReaderStatus(`Reading ${readerTitle}`);
}

function normalizeChapterResponse(data) {
  const blocks = [];
  const verseMap = new Map();

  const content = data?.chapter?.content || [];
  content.forEach((entry) => {
    if (entry?.type === "verse") {
      const html = renderRichContent(entry.content);
      const text = stripMarkup(html);
      const verseNumber = Number(entry.number);
      const reference = `${getBookByCode(state.selectedBookCode)?.name || state.selectedBookCode} ${state.selectedChapter}:${verseNumber}`;
      const verse = { type: "verse", verseNumber, reference, html, text };
      verseMap.set(verseNumber, verse);
      blocks.push(verse);
      return;
    }

    const html = renderLooseEntry(entry);
    if (!html) {
      return;
    }

    blocks.push({
      type: "prose",
      html
    });
  });

  state.chapterBlocks = blocks;
  state.chapterVerseMap = verseMap;
}

function normalizeCrossRefs(data) {
  const map = new Map();
  const verses = data?.chapter?.content || [];
  verses.forEach((item) => {
    if (!item || !item.verse || !Array.isArray(item.references)) {
      return;
    }
    map.set(Number(item.verse), item.references.slice(0, 8));
  });
  state.crossRefMap = map;
}

function normalizeCommentary(data) {
  const map = new Map();
  const content = data?.chapter?.content || [];
  content.forEach((entry) => {
    if (!entry || entry.type !== "verse") {
      return;
    }
    const verseNumber = Number(entry.number);
    const html = renderRichContent(entry.content);
    const text = stripMarkup(html);
    if (text) {
      map.set(verseNumber, text);
    }
  });
  state.commentaryMap = map;
}

function buildSnapshotFallback(bookCode, chapterNumber) {
  if (bookCode !== "GEN" || chapterNumber !== 1 || !state.snapshot?.sampleChapter) {
    return null;
  }

  const verseMap = new Map();
  const blocks = state.snapshot.sampleChapter.verses.map((verse) => {
    const reference = `${state.snapshot.sampleChapter.book} ${verse.reference}`;
    const normalized = {
      type: "verse",
      verseNumber: Number(verse.verseNumber),
      reference,
      html: verse.html,
      text: verse.text
    };
    verseMap.set(normalized.verseNumber, normalized);
    return normalized;
  });

  return { blocks, verseMap };
}

function renderChapter() {
  const book = getBookByCode(state.selectedBookCode);
  const verseCount = state.chapterVerseMap.size;
  const displayMode = getDisplayModeSetting();
  els.chapterMeta.textContent = `${getTranslationLabel(state.selectedTranslation) || "Snapshot reader"}${state.selectedCommentary ? ` | ${getCommentaryLabel(state.selectedCommentary)}` : ""}`;
  els.chapterTitle.textContent = `${book?.name || state.selectedBookCode} ${state.selectedChapter}`;
  els.chapterSourceBadge.textContent = state.chapterSource === "live" ? "Live API" : "Local snapshot";
  els.chapterVerseCountBadge.textContent = `${verseCount} verse${verseCount === 1 ? "" : "s"}`;
  els.chapterContent.dataset.displayMode = displayMode;

  els.chapterContent.innerHTML = state.chapterBlocks.map((block) => {
    if (block.type === "verse") {
      const activeClass = state.focusedVerse?.verseNumber === block.verseNumber ? " is-active" : "";
      const highlightColor = getHighlightColorForReference(block.reference);
      const highlightAttr = highlightColor ? ` data-highlight-color="${highlightColor}"` : "";
      if (displayMode === "simple") {
        return `
          <button type="button" class="simple-verse-line${activeClass}" data-open-verse="${block.verseNumber}" data-verse-number="${block.verseNumber}"${highlightAttr}>
            <span class="simple-verse-number">${block.verseNumber}</span>
            <span class="verse-text">${block.html}</span>
          </button>
        `;
      }
      return `
        <article class="verse-card${activeClass}" data-verse-number="${block.verseNumber}"${highlightAttr}>
          <button type="button" class="verse-card-main" data-open-verse="${block.verseNumber}">
            <span class="verse-number">${block.verseNumber}</span>
            <span class="verse-text">${block.html}</span>
          </button>
          <div class="verse-inline-actions">
            <button type="button" class="verse-copy-button" data-copy-verse="${block.verseNumber}" aria-label="Copy ${escapeHtml(block.reference)}">Copy</button>
            <button type="button" class="verse-speak-button" data-speak-verse="${block.verseNumber}" aria-label="Read ${escapeHtml(block.reference)} aloud">Speak</button>
          </div>
        </article>
      `;
    }

    return `<div class="reader-prose${displayMode === "simple" ? " reader-prose-simple" : ""}">${block.html}</div>`;
  }).join("");

  els.chapterContent.querySelectorAll("[data-open-verse]").forEach((button) => {
    button.addEventListener("click", () => focusVerse(Number(button.dataset.openVerse)));
  });

  els.chapterContent.querySelectorAll("[data-copy-verse]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      const verse = state.chapterVerseMap.get(Number(button.dataset.copyVerse));
      if (!verse) {
        return;
      }
      const copied = await copyVerseToClipboard(verse);
      flashButtonLabel(button, copied ? "Copied" : "Failed");
    });
  });

  els.chapterContent.querySelectorAll("[data-speak-verse]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const verse = state.chapterVerseMap.get(Number(button.dataset.speakVerse));
      if (!verse) {
        return;
      }
      speakText(`${verse.reference}. ${verse.text}`);
    });
  });

  if (state.pendingFocusVerse && state.chapterVerseMap.has(state.pendingFocusVerse)) {
    const verseNumber = state.pendingFocusVerse;
    state.pendingFocusVerse = null;
    focusVerse(verseNumber);
    return;
  }

  if (state.chapterVerseMap.has(1)) {
    focusVerse(1);
  }
}

function focusVerse(verseNumber) {
  const verse = state.chapterVerseMap.get(verseNumber);
  if (!verse) {
    return;
  }

  state.focusedVerse = verse;

  els.chapterContent.querySelectorAll("[data-verse-number]").forEach((card) => {
    card.classList.toggle("is-active", Number(card.dataset.verseNumber) === verseNumber);
  });

  els.focusReference.textContent = verse.reference;
  els.focusVerseText.innerHTML = verse.html;
  els.bookmarkButton.disabled = false;
  els.clearHighlightButton.disabled = !state.highlights[verse.reference];
  els.verseAiButton.disabled = false;
  els.bookmarkButton.textContent = state.bookmarks.includes(verse.reference) ? "Remove bookmark" : "Bookmark";
  updateFocusHighlightUI(verse.reference);

  const commentary = state.commentaryMap.get(verseNumber);
  els.commentaryMeta.textContent = commentary ? getCommentaryLabel(state.selectedCommentary) : "No commentary for this verse";
  els.commentaryContent.textContent = commentary || "No commentary returned for this verse in the selected source.";

  const refs = state.crossRefMap.get(verseNumber) || [];
  els.crossRefMeta.textContent = `${refs.length} link${refs.length === 1 ? "" : "s"}`;
  if (refs.length) {
    els.crossRefList.innerHTML = refs.map((ref) => {
      const label = formatReferenceFromDataset(ref);
      const score = ref.score ? `Score ${Number(ref.score).toFixed(2)}` : "Cross reference";
      return `
        <div class="cross-ref-item">
          <strong>${escapeHtml(label)}</strong>
          <div class="muted-copy">${escapeHtml(score)}</div>
          <button type="button" class="ghost-button" data-cross-ref="${escapeHtml(JSON.stringify(ref))}">Open in reader</button>
        </div>
      `;
    }).join("");

    els.crossRefList.querySelectorAll("[data-cross-ref]").forEach((button) => {
      button.addEventListener("click", async () => {
        const ref = JSON.parse(button.dataset.crossRef);
        const targetBook = getBookByCode(ref.book);
        if (!targetBook) {
          return;
        }
        await openReference(ref.book, Number(ref.chapter), Number(ref.verse));
      });
    });
  } else {
    els.crossRefList.innerHTML = '<div class="muted-copy">No cross references returned for this verse.</div>';
  }

  els.verseNote.value = state.notes[verse.reference] || "";
  els.noteSaveMeta.textContent = "Saved locally";
  recordReferenceVisit(verse);
  void renderCompareVerse();
}

function resetFocusPanel() {
  els.focusReference.textContent = "Choose a verse";
  els.focusVerseText.textContent = "Verse study tools appear here when you select a verse.";
  delete els.focusStudyBlock.dataset.highlightColor;
  els.focusHighlightMeta.textContent = "No saved highlight";
  els.clearHighlightButton.disabled = true;
  document.querySelectorAll("[data-highlight-tone]").forEach((button) => {
    button.setAttribute("aria-pressed", "false");
  });
  els.bookmarkButton.disabled = true;
  els.bookmarkButton.textContent = "Bookmark";
  els.verseAiButton.disabled = true;
  els.commentaryMeta.textContent = "No verse selected";
  els.commentaryContent.textContent = "Select a verse to load commentary notes.";
  els.crossRefMeta.textContent = "0 links";
  els.crossRefList.innerHTML = '<div class="muted-copy">Cross references appear here for the current verse.</div>';
  els.verseNote.value = "";
  els.aiStudyOutput.textContent = "Ask AI to explain the focused verse, compare themes, or give a concise prayer.";
  resetCompareVerse();
}

function getHighlightColorForReference(reference) {
  const color = state.highlights[reference];
  return ["gold", "olive", "rose"].includes(color) ? color : "";
}

function toggleVerseHighlight(reference, color) {
  const resolved = ["gold", "olive", "rose"].includes(color) ? color : "gold";
  if (state.highlights[reference] === resolved) {
    delete state.highlights[reference];
  } else {
    state.highlights[reference] = resolved;
  }

  saveLocal("kingsBibleCompass.highlights", state.highlights);
  refreshVisibleHighlights();
  renderBookmarks();

  if (state.focusedVerse?.reference === reference) {
    updateFocusHighlightUI(reference);
  }
}

function clearVerseHighlight(reference) {
  if (!state.highlights[reference]) {
    return;
  }

  delete state.highlights[reference];
  saveLocal("kingsBibleCompass.highlights", state.highlights);
  refreshVisibleHighlights();
  renderBookmarks();

  if (state.focusedVerse?.reference === reference) {
    updateFocusHighlightUI(reference);
  }
}

function updateFocusHighlightUI(reference) {
  const color = getHighlightColorForReference(reference);
  if (color) {
    els.focusStudyBlock.dataset.highlightColor = color;
    els.focusHighlightMeta.textContent = `${capitalize(color)} highlight saved`;
  } else {
    delete els.focusStudyBlock.dataset.highlightColor;
    els.focusHighlightMeta.textContent = "No saved highlight";
  }

  els.clearHighlightButton.disabled = !color;
  document.querySelectorAll("[data-highlight-tone]").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.highlightTone === color ? "true" : "false");
  });
}

function refreshVisibleHighlights() {
  els.chapterContent.querySelectorAll("[data-verse-number]").forEach((button) => {
    const verse = state.chapterVerseMap.get(Number(button.dataset.verseNumber));
    const color = verse ? getHighlightColorForReference(verse.reference) : "";
    if (color) {
      button.dataset.highlightColor = color;
    } else {
      delete button.dataset.highlightColor;
    }
  });
}

function syncCompareTranslationOptions() {
  if (!els.compareTranslationSelect) {
    return;
  }

  const available = state.translations.filter((translation) => translation.id !== state.selectedTranslation);
  els.compareTranslationSelect.innerHTML = ['<option value="">No compare</option>']
    .concat(available.map((translation) => `
      <option value="${escapeHtml(translation.id)}">${escapeHtml(translation.englishName || translation.name || translation.id)}</option>
    `))
    .join("");

  const nextValue = available.some((translation) => translation.id === state.compareTranslation)
    ? state.compareTranslation
    : (available[0]?.id || "");

  state.compareTranslation = nextValue;
  els.compareTranslationSelect.value = nextValue;
  saveLocal("kingsBibleCompass.compareTranslation", nextValue, { suppressSync: true });
}

function resetCompareVerse(message = "Select a verse to compare how another translation renders it.") {
  if (els.compareVerseMeta) {
    els.compareVerseMeta.textContent = "Pick a verse to compare.";
  }
  if (els.compareVerseText) {
    els.compareVerseText.textContent = message;
  }
}

async function renderCompareVerse() {
  if (!els.compareVerseMeta || !els.compareVerseText) {
    return;
  }

  const verse = state.focusedVerse;
  if (!verse) {
    resetCompareVerse();
    return;
  }

  const translationId = state.compareTranslation;
  if (!translationId) {
    els.compareVerseMeta.textContent = "No compare translation selected.";
    els.compareVerseText.textContent = "Choose another translation above to compare this focused verse.";
    return;
  }

  const compareLabel = getTranslationLabel(translationId) || translationId;
  const requestKey = `${translationId}:${state.selectedBookCode}:${state.selectedChapter}:${verse.verseNumber}`;
  state.compareRequestKey = requestKey;
  els.compareVerseMeta.textContent = `Loading ${compareLabel}...`;
  els.compareVerseText.textContent = "Loading the matching verse from the selected translation.";

  try {
    const compareVerses = await loadCompareChapter(translationId, state.selectedBookCode, state.selectedChapter);
    if (state.compareRequestKey !== requestKey) {
      return;
    }

    const match = compareVerses.get(verse.verseNumber);
    els.compareVerseMeta.textContent = compareLabel;
    if (!match) {
      els.compareVerseText.textContent = "That translation did not return the selected verse for this chapter.";
      return;
    }

    els.compareVerseText.innerHTML = match.html;
  } catch (error) {
    if (state.compareRequestKey !== requestKey) {
      return;
    }
    els.compareVerseMeta.textContent = compareLabel;
    els.compareVerseText.textContent = error.message || "Unable to load the comparison verse right now.";
  }
}

async function loadCompareChapter(translationId, bookCode, chapterNumber) {
  const cacheKey = `${translationId}:${bookCode}:${chapterNumber}`;
  if (state.compareChapterCache.has(cacheKey)) {
    return state.compareChapterCache.get(cacheKey);
  }

  const data = await fetchJson(`${HELLOAO_BASE}/${encodeURIComponent(translationId)}/${bookCode}/${chapterNumber}.json`);
  const content = data?.chapter?.content || [];
  const verseMap = new Map();

  content.forEach((entry) => {
    if (entry?.type !== "verse") {
      return;
    }

    const verseNumber = Number(entry.number);
    if (!verseNumber) {
      return;
    }

    const html = renderRichContent(entry.content);
    verseMap.set(verseNumber, {
      verseNumber,
      reference: `${getBookByCode(bookCode)?.name || bookCode} ${chapterNumber}:${verseNumber}`,
      html,
      text: stripMarkup(html)
    });
  });

  state.compareChapterCache.set(cacheKey, verseMap);
  return verseMap;
}

function applyReaderFocusMode(value) {
  const resolved = value === true;
  state.readerFocusMode = resolved;
  document.body.classList.toggle("reader-focus-mode", resolved);
  saveLocal("kingsBibleCompass.readerFocusMode", resolved, { suppressSync: true });

  if (els.readerFocusToggleButton) {
    els.readerFocusToggleButton.textContent = resolved ? "Exit Focus" : "Focus Mode";
    els.readerFocusToggleButton.setAttribute("aria-pressed", resolved ? "true" : "false");
  }
}

async function copyVerseToClipboard(verse) {
  const translation = getTranslationLabel(state.selectedTranslation) || "Bible";
  return copyTextToClipboard(`${verse.reference} (${translation})\n${verse.text}`);
}

async function copyReferenceToClipboard(reference) {
  const translation = getStoredReferenceTranslation(reference);
  const text = getStoredReferenceText(reference);
  const payload = text ? `${reference}${translation ? ` (${translation})` : ""}\n${text}` : reference;
  return copyTextToClipboard(payload);
}

async function copyTextToClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const fallback = document.createElement("textarea");
    fallback.value = text;
    fallback.setAttribute("readonly", "true");
    fallback.style.position = "fixed";
    fallback.style.opacity = "0";
    document.body.appendChild(fallback);
    fallback.select();
    const copied = document.execCommand("copy");
    fallback.remove();
    return copied;
  } catch (error) {
    console.warn("Unable to copy to clipboard.", error);
    return false;
  }
}

function flashButtonLabel(button, label) {
  if (!button) {
    return;
  }

  const original = button.dataset.originalLabel || button.textContent;
  button.dataset.originalLabel = original;
  button.textContent = label;
  clearTimeout(button._flashLabelTimer);
  button._flashLabelTimer = window.setTimeout(() => {
    button.textContent = button.dataset.originalLabel || original;
  }, 1200);
}

function getStoredReferenceText(reference) {
  const currentVerse = Array.from(state.chapterVerseMap.values()).find((verse) => verse.reference === reference);
  if (currentVerse?.text) {
    return currentVerse.text;
  }

  const recent = state.studyDesk.recentReferences.find((item) => item.reference === reference);
  if (recent?.text) {
    return recent.text;
  }

  return "";
}

function getStoredReferenceTranslation(reference) {
  if (state.focusedVerse?.reference === reference) {
    return getTranslationLabel(state.selectedTranslation) || "Bible";
  }

  return state.studyDesk.recentReferences.find((item) => item.reference === reference)?.translation || "";
}

async function runAdvancedSearch() {
  const exactPhrase = document.getElementById("exactPhrase").value.trim();
  const allWords = document.getElementById("allWords").value.trim();
  const moreWords = document.getElementById("moreWords").value.trim();
  const noWords = document.getElementById("noWords").value.trim();
  const filter = els.searchFilter.value;

  const query = buildBooleanQuery({ exactPhrase, allWords, moreWords, noWords });
  if (!query) {
    els.searchStatus.textContent = "Add at least one positive search term.";
    return;
  }

  els.searchStatus.textContent = "Searching KJV...";
  els.searchResults.innerHTML = '<div class="muted-copy">Searching...</div>';

  const params = new URLSearchParams({
    bible: SEARCH_BIBLE_MODULE,
    search: query,
    search_type: "boolean",
    data_format: "passage",
    page_limit: "25",
    highlight: "true",
    highlight_tag: "mark",
    whole_words: "false"
  });

  if (filter && !/testament/i.test(filter)) {
    params.set("reference", filter);
  }

  try {
    const data = await fetchJson(`${BIBLE_SEARCH_BASE}?${params.toString()}`);
    const items = normalizeSearchResults(data);
    const filteredItems = applySnapshotFilter(items, filter);
    els.searchStatus.textContent = `Found ${filteredItems.length} result${filteredItems.length === 1 ? "" : "s"}.`;
    renderVerseResults(filteredItems, els.searchResults, els.searchResultsMeta);
    updateDeskStatus(false);
  } catch (error) {
    console.error(error);
    els.searchStatus.textContent = "Search failed.";
    els.searchResults.innerHTML = `<div class="muted-copy">${escapeHtml(error.message || "Unable to search right now.")}</div>`;
  }
}

async function runWordStudy(word) {
  recordWordStudy(word);
  els.dictionaryMeta.textContent = `Studying ${word}`;
  els.dictionaryAi.textContent = "Generating a short AI explanation...";
  els.dictionaryResults.innerHTML = '<div class="muted-copy">Searching for verse hits...</div>';

  const [aiResult, verses] = await Promise.allSettled([
    runAiPrompt(
      [
        `Define the Bible study term "${word}".`,
        "Keep it under 120 words.",
        "Use plain English.",
        "Return a short paragraph followed by three quick bullet points: meaning, key passages, and application."
      ].join("\n"),
      els.dictionaryAi,
      false
    ),
    searchSingleWord(word)
  ]);

  if (aiResult.status === "fulfilled" && typeof aiResult.value === "string") {
    els.dictionaryAi.textContent = aiResult.value;
  } else if (aiResult.status === "rejected") {
    els.dictionaryAi.textContent = "AI note unavailable right now. Verse hits are still below.";
  }

  if (verses.status === "fulfilled") {
    renderVerseResults(verses.value, els.dictionaryResults, els.dictionaryResultsMeta);
  } else {
    els.dictionaryResultsMeta.textContent = "Search failed";
    els.dictionaryResults.innerHTML = `<div class="muted-copy">${escapeHtml(verses.reason?.message || "Unable to load verse hits.")}</div>`;
  }
}

async function runConcordance(word) {
  recordWordStudy(word);
  els.concordanceResults.innerHTML = '<div class="muted-copy">Searching concordance...</div>';
  const results = await searchSingleWord(word);
  renderVerseResults(results, els.concordanceResults, els.concordanceResultsMeta);
}

async function runAtlasStudy(place) {
  recordPlaceStudy(place);
  els.atlasMeta.textContent = `Studying ${place}`;
  els.atlasAi.textContent = "Generating atlas note...";
  els.atlasResults.innerHTML = '<div class="muted-copy">Searching for place mentions...</div>';
  els.atlasMapLink.href = `https://www.openstreetmap.org/search?query=${encodeURIComponent(place)}`;
  els.atlasMapLink.classList.remove("is-disabled");

  const [aiResult, verses] = await Promise.allSettled([
    runAiPrompt(
      [
        `Create a concise Bible atlas entry for "${place}".`,
        "Include region, why it matters biblically, and a modern geographic anchor if known.",
        "Keep it under 120 words.",
        "End with two key references."
      ].join("\n"),
      els.atlasAi,
      false
    ),
    searchSingleWord(place)
  ]);

  if (aiResult.status === "fulfilled" && typeof aiResult.value === "string") {
    els.atlasAi.textContent = aiResult.value;
  } else {
    els.atlasAi.textContent = "AI atlas note unavailable right now. Verse hits are still below.";
  }

  if (verses.status === "fulfilled") {
    renderVerseResults(verses.value, els.atlasResults, els.atlasResultsMeta);
  } else {
    els.atlasResultsMeta.textContent = "Search failed";
    els.atlasResults.innerHTML = `<div class="muted-copy">${escapeHtml(verses.reason?.message || "Unable to load place mentions.")}</div>`;
  }
}

async function searchSingleWord(word) {
  const params = new URLSearchParams({
    bible: SEARCH_BIBLE_MODULE,
    search: word,
    search_type: "phrase",
    data_format: "passage",
    page_limit: "12",
    highlight: "true",
    highlight_tag: "mark",
    whole_words: "true"
  });
  const data = await fetchJson(`${BIBLE_SEARCH_BASE}?${params.toString()}`);
  return normalizeSearchResults(data);
}

function normalizeSearchResults(data) {
  const results = Array.isArray(data?.results)
    ? data.results
    : Array.isArray(data?.results?.results)
      ? data.results.results
      : [];

  const flattened = [];

  results.forEach((group) => {
    const bibleEntries = group?.verses || {};
    Object.values(bibleEntries).forEach((chapterMap) => {
      Object.entries(chapterMap).forEach(([chapter, verseMap]) => {
        Object.values(verseMap).forEach((verse) => {
          const bookName = group.book_name || getBookById(Number(verse.book))?.name || "Unknown";
          flattened.push({
            reference: `${bookName} ${chapter}:${verse.verse}`,
            bookName,
            testament: getBookByName(bookName)?.testament || "",
            chapter: Number(chapter),
            verse: Number(verse.verse),
            text: verse.text || ""
          });
        });
      });
    });
  });

  return flattened;
}

function renderVerseResults(items, target, metaTarget) {
  metaTarget.textContent = `${items.length} match${items.length === 1 ? "" : "es"}`;

  if (!items.length) {
    target.innerHTML = '<div class="muted-copy">No matches found.</div>';
    return;
  }

  target.innerHTML = items.map((item) => `
    <div class="result-item">
      <div class="result-reference">
        <span>${escapeHtml(item.reference)}</span>
        <span class="badge">${escapeHtml(item.testament || "Bible")}</span>
      </div>
      <div class="result-text">${allowMarks(item.text)}</div>
      <button type="button" class="ghost-button" data-open-reference="${escapeHtml(item.reference)}">Open in reader</button>
    </div>
  `).join("");

  target.querySelectorAll("[data-open-reference]").forEach((button) => {
    button.addEventListener("click", async () => {
      const reference = button.dataset.openReference;
      const parsed = parseSimpleReference(reference);
      if (!parsed) {
        return;
      }
      await openReference(parsed.bookCode, parsed.chapter, parsed.verse);
    });
  });
}

async function runAiPrompt(prompt, targetEl, updateTarget = true) {
  const cacheKey = prompt;
  if (state.aiCache[cacheKey]) {
    if (updateTarget) {
      targetEl.textContent = state.aiCache[cacheKey];
    }
    return state.aiCache[cacheKey];
  }

  if (updateTarget) {
    targetEl.textContent = "Asking AI...";
  }

  const url = `${POLLINATIONS_BASE}${encodeURIComponent(prompt)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`AI request failed with status ${response.status}.`);
  }

  const text = (await response.text()).trim();
  state.aiCache[cacheKey] = text;
  saveLocal("kingsBibleCompass.aiCache", state.aiCache);

  if (updateTarget) {
    targetEl.textContent = text;
  }

  return text;
}

function renderSnapshotSeed() {
  const snapshot = state.snapshot;
  document.title = APP_NAME;
  els.heroTitle.textContent = APP_NAME;
  els.heroSubtitle.textContent = "A grounded Bible study workspace with guided journeys, local-first notes, verse sharing, and live reading tools.";
  if (els.heroMark) {
    els.heroMark.innerHTML = `<img src="${escapeHtml(APP_ICON_PATH)}" alt="">`;
  }
  if (els.appBrandMark) {
    els.appBrandMark.innerHTML = `<img src="${escapeHtml(APP_ICON_PATH)}" alt="">`;
  }

  const stats = [
    { label: "Books ready", value: snapshot.home.bookCount, copy: "The full canon is seeded into the reader." },
    { label: "Guided journeys", value: JOURNEY_DATA.length, copy: "Curated reading tracks move through bigger arcs of Scripture." },
    { label: "Daily focuses", value: DAILY_FOCUS_DATA.length, copy: "Rotating verse anchors keep the app from feeling static." },
    { label: "Study pages", value: snapshot.library.itemCount, copy: "Local rebuilt pages replace the old external library links." }
  ];

  els.heroStats.innerHTML = stats.map((item) => `
    <div class="stat-card">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(String(item.value))}</strong>
      <span>${escapeHtml(item.copy)}</span>
    </div>
  `).join("");

  els.searchFilter.innerHTML = ['<option value="">All books</option>']
    .concat(snapshot.search.filters.map((filter) => `<option value="${escapeHtml(filter.value)}">${escapeHtml(filter.label)}</option>`))
    .join("");

  els.dictionaryHeading.textContent = snapshot.dictionary.heading;
  els.dictionaryBullets.innerHTML = snapshot.dictionary.intro.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("");
  renderAlphabet(snapshot.dictionary.alphabet, els.dictionaryAlphabet, (letter) => {
    els.dictionaryWord.value = letter;
  });

  els.concordanceIntro.innerHTML = snapshot.concordance.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  renderAlphabet(snapshot.concordance.alphabet, els.concordanceAlphabet, (letter) => {
    els.concordanceWord.value = letter;
  });

  els.atlasBookCountMeta.textContent = `${snapshot.atlas.bookCount} books restored`;
  renderAlphabet(snapshot.atlas.alphabet, els.atlasAlphabet, (letter) => {
    els.atlasPlace.value = letter;
  });

  els.snapshotSources.textContent = `Snapshot sources: ${snapshot.sources.join(" | ")}`;
  renderLibrary("");
}

function renderSpotlights() {
  const last = state.studyDesk.lastReference;
  if (last) {
    els.continueReference.textContent = last.reference;
    els.continueSummary.textContent = summarizePreview(last.text || "Jump back into the last verse you studied.");
    els.continueMeta.textContent = `${last.translation || "Study saved"} | continue where you stopped`;
  } else {
    els.continueReference.textContent = "No saved study trail yet";
    els.continueSummary.textContent = "Open a passage and the app will keep your place here.";
    els.continueMeta.textContent = "Local progress";
  }

  const focus = getDailyFocus();
  if (focus) {
    const book = getBookByCode(focus.book);
    els.dailyFocusReference.textContent = `${focus.label} | ${book?.name || focus.book} ${focus.chapter}:${focus.verse}`;
    els.dailyFocusPrayer.textContent = focus.prayer;
    els.dailyFocusMeta.textContent = `Today's focus | ${book?.testament || "Bible"}`;
  }

  const journey = getActiveJourney();
  if (journey) {
    const progress = getJourneyProgress(journey);
    els.activeJourneyTitle.textContent = journey.title;
    els.activeJourneySummary.textContent = journey.subtitle;
    els.activeJourneyMeta.textContent = `${progress.percent}% complete | ${progress.done}/${progress.total} stops`;
  } else {
    els.activeJourneyTitle.textContent = "Choose a journey";
    els.activeJourneySummary.textContent = "Structured reading paths help you study whole movements of Scripture instead of isolated verses.";
    els.activeJourneyMeta.textContent = "0% complete";
  }
}

function renderBrowse() {
  if (!els.browseJourneyGrid || !els.browseOldTestamentGrid || !els.browseNewTestamentGrid || !els.browseTopicGroups) {
    return;
  }

  els.browseStatus.textContent = `${BOOK_CATALOG.length} books | ${JOURNEY_DATA.length} journeys | ${TOPIC_GROUP_DATA.length} topic groups`;
  els.browseSummaryMeta.textContent = `${getLanguageLabel(getReadingLanguageSetting())} reader`;
  els.browseSummary.textContent = "Browse Scripture by testament, jump into one of the 19 journeys, or open grouped themes like faith, marriage, anxiety, prayer, and mission.";

  els.browseJourneyGrid.innerHTML = JOURNEY_DATA.slice(0, 8).map((journey) => {
    const progress = getJourneyProgress(journey);
    return `
      <button type="button" class="journey-card browse-journey-card" data-browse-journey="${escapeHtml(journey.id)}" style="--journey-start:${journey.gradient[0]}; --journey-end:${journey.gradient[1]};">
        <div class="panel-kicker">${escapeHtml(journey.tone)}</div>
        <h3>${escapeHtml(journey.title)}</h3>
        <p class="journey-card-summary">${escapeHtml(journey.summary)}</p>
        <div class="journey-progress">
          <span class="mini-meta">${escapeHtml(journey.testament || "Bible")}</span>
          <span class="mini-meta">${progress.percent}%</span>
        </div>
      </button>
    `;
  }).join("");

  els.browseJourneyGrid.querySelectorAll("[data-browse-journey]").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveJourney(button.dataset.browseJourney);
      switchPanel("journeys");
    });
  });

  renderBrowseBookGroup("Old Testament", els.browseOldTestamentGrid);
  renderBrowseBookGroup("New Testament", els.browseNewTestamentGrid);

  els.browseTopicGroups.innerHTML = TOPIC_GROUP_DATA.map((group) => `
    <article class="browse-topic-card">
      <div class="panel-kicker">${escapeHtml(group.title)}</div>
      <p class="muted-copy">${escapeHtml(group.description)}</p>
      <div class="browse-topic-chip-row">
        ${group.topics.map((topic) => `
          <button type="button" class="pattern-chip browse-topic-chip" data-topic-search="${escapeHtml(topic.search)}" data-topic-reference="${escapeHtml(topic.references[0] || "")}">
            ${escapeHtml(topic.label)}
          </button>
        `).join("")}
      </div>
    </article>
  `).join("");

  els.browseTopicGroups.querySelectorAll("[data-topic-search]").forEach((button) => {
    button.addEventListener("click", async () => {
      const search = button.dataset.topicSearch || "";
      document.getElementById("exactPhrase").value = "";
      document.getElementById("allWords").value = search;
      document.getElementById("moreWords").value = "";
      document.getElementById("noWords").value = "";
      switchPanel("search");
      await runAdvancedSearch();
    });
  });

  els.browseExtraActions.innerHTML = `
    <button type="button" class="ghost-button" data-browse-action="daily">Open daily focus</button>
    <button type="button" class="ghost-button" data-browse-action="notifications">Notifications</button>
    <button type="button" class="ghost-button" data-browse-action="support">Support</button>
    <button type="button" class="ghost-button" data-browse-action="share">Share website</button>
  `;
  els.browseExtraActions.querySelectorAll("[data-browse-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const action = button.dataset.browseAction;
      if (action === "daily") {
        const focus = getDailyFocus();
        if (focus) {
          await openReference(focus.book, focus.chapter, focus.verse);
        }
      } else if (action === "notifications") {
        openAccountModal("settings", "settingsNotificationSection");
      } else if (action === "support") {
        openAccountModal("settings", "settingsSupportSection");
      } else if (action === "share") {
        await shareWebsite();
      }
    });
  });
}

function renderBrowseBookGroup(testament, target) {
  const books = BOOK_CATALOG.filter((book) => book.testament === testament);
  target.innerHTML = books.map((book) => `
    <button type="button" class="ghost-button browse-book-button" data-browse-book="${escapeHtml(book.code)}">
      ${escapeHtml(book.name)}
    </button>
  `).join("");

  target.querySelectorAll("[data-browse-book]").forEach((button) => {
    button.addEventListener("click", async () => {
      await openReference(button.dataset.browseBook, 1, 1);
    });
  });
}

function renderJourneys() {
  if (!JOURNEY_DATA.length) {
    els.journeyList.innerHTML = '<div class="muted-copy">Journey data is unavailable.</div>';
    els.journeyStatus.textContent = "Unavailable";
    return;
  }

  const active = getActiveJourney() || JOURNEY_DATA[0];
  const activeId = active.id;
  els.journeyStatus.textContent = `${JOURNEY_DATA.length} guided tracks available`;

  els.journeyList.innerHTML = JOURNEY_DATA.map((journey) => {
    const progress = getJourneyProgress(journey);
    const activeClass = journey.id === activeId ? " is-active" : "";
    return `
      <button type="button" class="journey-card${activeClass}" data-journey-id="${journey.id}" style="--journey-start:${journey.gradient[0]}; --journey-end:${journey.gradient[1]};">
        <div class="panel-kicker">${escapeHtml(journey.tone)}</div>
        <h3>${escapeHtml(journey.title)}</h3>
        <p class="journey-card-summary">${escapeHtml(journey.subtitle)}</p>
        <div class="journey-progress">
          <span class="mini-meta">${progress.done}/${progress.total} stops complete</span>
          <span class="mini-meta">${progress.percent}%</span>
        </div>
        <div class="journey-progress-bar"><span style="width:${progress.percent}%"></span></div>
      </button>
    `;
  }).join("");

  els.journeyList.querySelectorAll("[data-journey-id]").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveJourney(button.dataset.journeyId);
    });
  });

  renderJourneyDetail(active);
}

function renderJourneyDetail(journey) {
  const progress = getJourneyProgress(journey);
  if (els.journeyBanner) {
    els.journeyBanner.style.background = `linear-gradient(145deg, ${journey.gradient[0]}66, ${journey.gradient[1]}30), url("assets/journey-banner.svg") center/cover no-repeat`;
  }
  els.journeyTone.textContent = journey.tone;
  els.journeyDetailTitle.textContent = journey.title;
  els.journeyProgressBadge.textContent = `${progress.done} of ${progress.total}`;
  els.journeyDetailSummary.textContent = journey.summary;
  els.journeyFocus.textContent = journey.focus;
  els.journeyLength.textContent = `${journey.steps.length}`;
  if (els.journeyLearnMeta) {
    els.journeyLearnMeta.textContent = `${journey.path?.length || 0}-part path`;
  }
  if (els.journeyPathList) {
    els.journeyPathList.innerHTML = (journey.path || []).map((item, index) => `
      <div class="pattern-chip">${index + 1}. ${escapeHtml(item)}</div>
    `).join("");
  }

  els.journeyStepList.innerHTML = journey.steps.map((step, index) => {
    const done = isJourneyStepDone(journey.id, index);
    const book = getBookByCode(step.book);
    const reference = `${book?.name || step.book} ${step.chapter}:${step.verse}`;
    return `
      <div class="journey-step-card${done ? " is-done" : ""}">
        <div class="journey-step-head">
          <div>
            <div class="journey-step-title">${index + 1}. ${escapeHtml(step.title)}</div>
            <strong>${escapeHtml(reference)}</strong>
          </div>
          <span class="badge">${done ? "Completed" : "Next step"}</span>
        </div>
        <div class="muted-copy">${escapeHtml(step.summary)}</div>
        <div class="journey-step-prompt">${escapeHtml(step.prompt)}</div>
        <div class="journey-step-actions">
          <button type="button" class="ghost-button" data-journey-open="${journey.id}:${index}">Open passage</button>
          <button type="button" class="ghost-button" data-journey-toggle="${journey.id}:${index}">${done ? "Mark not done" : "Mark complete"}</button>
        </div>
      </div>
    `;
  }).join("");

  els.journeyStepList.querySelectorAll("[data-journey-open]").forEach((button) => {
    button.addEventListener("click", async () => {
      const [, indexText] = button.dataset.journeyOpen.split(":");
      const step = journey.steps[Number(indexText)];
      await openReference(step.book, step.chapter, step.verse);
    });
  });

  els.journeyStepList.querySelectorAll("[data-journey-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const [, indexText] = button.dataset.journeyToggle.split(":");
      toggleJourneyStep(journey.id, Number(indexText));
    });
  });
}

function renderDesk() {
  updateDeskStatus(false);
  renderStudyDashboard();
  renderSavedSearches();
  renderRecentReferences();
  renderDeskBookmarks();
  renderMemoryReview();
}

function renderNotifications() {
  if (!els.notificationsList) {
    return;
  }

  const notifications = state.notifications.slice().sort((left, right) => {
    return new Date(right.createdAt || 0).getTime() - new Date(left.createdAt || 0).getTime();
  });
  const unread = notifications.filter((item) => item.read !== true).length;

  els.notificationsStatus.textContent = notifications.length
    ? `${notifications.length} email event${notifications.length === 1 ? "" : "s"}`
    : "No email activity yet";
  els.notificationsUnreadMeta.textContent = `${unread} unread`;
  els.notificationsPermissionMeta.textContent = getBrowserNotificationStatusLabel();
  els.notificationsSummary.innerHTML = notifications.length
    ? notifications.slice(0, 3).map((item) => `
      <div class="pattern-chip">${escapeHtml(item.title)} | ${escapeHtml(formatRelativeTime(item.createdAt))}</div>
    `).join("")
    : '<div class="muted-copy">Test emails and important delivery events appear here.</div>';

  if (!notifications.length) {
    els.notificationsList.innerHTML = '<div class="muted-copy">No email activity yet. Send a test email or enable email notifications to start the history.</div>';
    return;
  }

  els.notificationsList.innerHTML = notifications.map((item) => `
    <div class="result-item notification-item${item.read === true ? "" : " is-unread"}">
      <div class="result-reference">
        <span>${escapeHtml(item.title)}</span>
        <span class="badge">${escapeHtml(item.type || "system")}</span>
      </div>
      <div class="muted-copy">${escapeHtml(item.message)}</div>
      <div class="mini-meta">${escapeHtml(formatRelativeTime(item.createdAt))}</div>
    </div>
  `).join("");

  state.notifications = notifications.map((item) => ({ ...item, read: true }));
  saveLocal("kingsBibleCompass.notifications", state.notifications, { suppressSync: true });
  els.notificationsUnreadMeta.textContent = "0 unread";
}

function renderSupport() {
  if (!els.supportSectionList) {
    return;
  }

  els.supportStatus.textContent = `${SUPPORT_SECTION_DATA.length} info cards`;
  els.supportVersionMeta.textContent = "Selah Journey 0.6.1";
  els.supportSectionList.innerHTML = SUPPORT_SECTION_DATA.map((section) => `
    <article class="result-item support-card">
      <div class="result-reference">
        <span>${escapeHtml(section.title)}</span>
        <span class="badge">${escapeHtml(section.id)}</span>
      </div>
      <div class="muted-copy">${escapeHtml(section.summary)}</div>
      <div class="reader-prose">${(section.body || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div>
    </article>
  `).join("");
  els.supportPublicUrl.textContent = state.publicAccessUrl
    ? `Current app link: ${state.publicAccessUrl}`
    : "Current app link unavailable right now.";
}

function renderAccount() {
  const user = state.account.user;
  const config = state.account.config || DEFAULT_ACCOUNT_CONFIG;
  const signedIn = Boolean(user);
  const pendingVerificationEmail = state.account.pendingVerificationEmail || ((signedIn && !user.emailVerified) ? user.email : "");
  const needsVerification = Boolean(pendingVerificationEmail || (signedIn && !user.emailVerified));
  const settings = user?.settings || {
    defaultPanel: getDefaultPanelSetting(),
    readingLanguage: getReadingLanguageSetting(),
    displayMode: getDisplayModeSetting(),
    theme: document.body.dataset.theme || DEFAULT_READER_SETTINGS.theme,
    textSize: document.body.dataset.readerSize || DEFAULT_READER_SETTINGS.textSize,
    motion: document.body.dataset.motion || DEFAULT_READER_SETTINGS.motion,
    readerWidth: document.body.dataset.readerWidth || DEFAULT_READER_SETTINGS.readerWidth,
    showVerseNumbers: getShowVerseNumbersSetting(),
    resumeLastReference: getResumeLastReferenceSetting(),
    autoSync: true,
    pushNotifications: getPushNotificationSetting(),
    emailNotifications: getEmailNotificationSetting(),
    welcomeEmails: true,
    securityEmails: true,
    studyEmails: false,
    speechVoice: getSpeechVoiceSetting(),
    speechRate: getSpeechRateSetting()
  };
  const updatedAt = user?.studyStateMeta?.updatedAt || "";

  els.authSignedOut.classList.toggle("is-hidden", signedIn);
  els.authSignedIn.classList.toggle("is-hidden", !signedIn);
  els.accountVerificationCard.classList.toggle("is-hidden", !needsVerification);
  els.accountResetTokenSurface.classList.toggle("is-hidden", !state.account.resetToken || signedIn);

  els.accountStatus.textContent = signedIn
    ? (user.emailVerified ? "Signed in" : "Verify email")
    : (needsVerification ? "Check email" : "Guest mode");
  els.accountSyncBadge.textContent = signedIn ? "Cloud available" : "Local only";
  els.accountVerifiedBadge.textContent = signedIn
    ? (user.emailVerified ? "Email verified" : "Website verification pending")
    : (needsVerification ? "Verification pending" : "No account");
  els.accountCloudState.textContent = updatedAt ? `Cloud copy ${formatRelativeTime(updatedAt)}` : "Cloud copy not saved yet";
  els.accountSummaryName.textContent = signedIn ? user.displayName : "Guest reader";
  els.accountSummaryEmail.textContent = signedIn ? user.email : "Not signed in";
  els.accountSummaryMeta.textContent = signedIn
    ? `${user.providers.join(" + ")} sign-in | ${user.hasPassword ? "password enabled" : "Google only"}${user.emailVerified ? "" : " | website verification pending"}`
    : "Bookmarks and notes stay on this device until you connect an account.";
  els.accountSyncMeta.textContent = updatedAt ? `Last account sync ${formatRelativeTime(updatedAt)}` : "No cloud sync yet";

  const avatarLabel = signedIn ? getAccountInitials(user.displayName || user.email) : "SJ";
  if (signedIn && user.photoUrl) {
    els.accountAvatar.innerHTML = `<img src="${escapeHtml(user.photoUrl)}" alt="${escapeHtml(user.displayName)}">`;
    els.accountCornerAvatar.innerHTML = `<img src="${escapeHtml(user.photoUrl)}" alt="${escapeHtml(user.displayName)}">`;
  } else {
    els.accountAvatar.textContent = avatarLabel;
    els.accountCornerAvatar.textContent = avatarLabel;
  }
  els.accountCornerLabel.textContent = signedIn ? "My Account" : "Account";
  els.accountCornerMeta.textContent = signedIn
    ? (user.emailVerified ? "Cloud ready" : "Verify email")
    : (needsVerification ? "Check email" : "Guest mode");

  els.googleAuthButton.href = config.googleEnabled ? (config.googleAuthUrl || "/auth/google/start") : "#";
  els.googleAuthButton.classList.toggle("is-disabled", !config.googleEnabled);
  els.googleAuthMeta.textContent = config.googleEnabled
    ? "Google sign-in is ready and first-time access finishes with an email verification code on the website."
    : (config.googleIssue || "Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env to enable Google sign-in.");
  els.gmailSignupMeta.textContent = config.gmailEnabled
    ? "Email accounts can verify directly on this page with a code or by opening the link in the message."
    : "Add an email delivery provider so verification emails can be sent.";
  els.resetTokenMeta.textContent = state.account.resetToken
    ? "Your reset token is loaded. Set a new password to finish the reset."
    : "Password reset links open here when you follow the email.";
  els.accountVerificationMeta.textContent = needsVerification
    ? `We sent a 6-digit code to ${pendingVerificationEmail || "your email"}. Enter it here or use the verification link from your inbox.`
    : "After Google or email sign-in, the email verification step appears here when needed.";
  els.accountVerificationEmail.value = pendingVerificationEmail;

  els.accountDisplayName.value = signedIn ? user.displayName : "";
  els.accountEmail.value = signedIn ? user.email : "";
  els.accountDefaultPanel.value = settings.defaultPanel || "home";
  els.accountLanguage.value = settings.readingLanguage || getReadingLanguageSetting();
  els.accountDisplayMode.value = settings.displayMode || getDisplayModeSetting();
  els.accountTheme.value = settings.theme || (document.body.dataset.theme || DEFAULT_READER_SETTINGS.theme);
  els.accountTextSize.value = settings.textSize || (document.body.dataset.readerSize || DEFAULT_READER_SETTINGS.textSize);
  els.accountMotion.value = settings.motion || DEFAULT_READER_SETTINGS.motion;
  els.accountReaderWidth.value = settings.readerWidth || (document.body.dataset.readerWidth || DEFAULT_READER_SETTINGS.readerWidth);
  els.accountShowVerseNumbers.checked = settings.showVerseNumbers !== false;
  els.accountResumeLastReference.checked = settings.resumeLastReference === true;
  els.accountAutoSync.checked = settings.autoSync !== false;
  els.accountPushNotifications.checked = settings.pushNotifications === true;
  els.accountEmailNotifications.checked = settings.emailNotifications === true;
  els.accountWelcomeEmails.checked = settings.welcomeEmails !== false;
  els.accountSecurityEmails.checked = settings.securityEmails !== false;
  els.accountStudyEmails.checked = settings.studyEmails === true;
  els.accountSpeechRate.value = String(settings.speechRate || getSpeechRateSetting());
  if (els.accountSpeechVoice) {
    els.accountSpeechVoice.value = settings.speechVoice || getSpeechVoiceSetting();
  }

  [
    els.accountDisplayName,
    els.accountLanguage,
    els.accountDisplayMode,
    els.accountAutoSync,
    els.accountPushNotifications,
    els.accountEmailNotifications,
    els.accountWelcomeEmails,
    els.accountSecurityEmails,
    els.accountStudyEmails,
    els.accountCurrentPassword,
    els.accountNewPassword,
    els.accountDeleteConfirm,
    els.accountDeleteButton
  ].forEach((element) => {
    element.disabled = !signedIn;
  });

  [
    document.getElementById("accountSignOutButton"),
    document.getElementById("accountResendVerificationButton"),
    document.getElementById("accountPushButton"),
    document.getElementById("accountPullButton"),
    els.accountSendNotificationTestButton
  ].forEach((element) => {
    element.disabled = !signedIn;
  });

  if (els.notificationsEmailTestButton) {
    els.notificationsEmailTestButton.disabled = !signedIn;
  }

  syncReaderSettingControls();
  syncQuickSettingsControls();
  if (els.quickSettingsMeta) {
    els.quickSettingsMeta.textContent = signedIn
      ? "Reader, audio, email notifications, and support settings apply immediately. Save to sync them to your account."
      : "Reader, audio, email notifications, and support settings save locally in this browser.";
  }
  if (els.moreMenuMeta) {
    els.moreMenuMeta.textContent = signedIn
      ? "Use More for cloud sync, password tools, export, and local cleanup."
      : "Use More for password recovery, export, and local cleanup.";
  }
  if (els.quickSettingsSaveButton) {
    els.quickSettingsSaveButton.textContent = signedIn ? "Save to account" : "Save locally";
  }
  if (els.moreOpenCloudButton) {
    els.moreOpenCloudButton.disabled = !signedIn;
  }
  if (els.moreOpenPasswordButton) {
    els.moreOpenPasswordButton.disabled = !signedIn;
  }
  if (els.moreOpenResetButton) {
    els.moreOpenResetButton.disabled = signedIn;
  }
  if (els.moreOpenVerificationButton) {
    els.moreOpenVerificationButton.disabled = !needsVerification;
  }
  if (els.moreDeleteAccountButton) {
    els.moreDeleteAccountButton.disabled = !signedIn;
  }
  updateReaderPreferenceMeta();

  setAccountMessage(state.account.message || (signedIn
    ? (user.emailVerified
      ? "Your account can sync study notes, bookmarks, and the Study Desk."
      : "Finish website verification with the email code to complete this account.")
    : (needsVerification
      ? "Enter the email code on this page to complete verification."
      : "Theme, dark mode, text size, motion, reader width, verse numbers, and launch preferences can be saved locally here. Sign in to sync notes and settings across sessions.")));
}

function bindAccountValidationReset(inputs) {
  inputs.filter(Boolean).forEach((input) => {
    const reset = () => clearFieldValidation(input);
    input.addEventListener("input", reset);
    input.addEventListener("change", reset);
  });
}

function clearAccountValidation(inputs = []) {
  inputs.filter(Boolean).forEach((input) => clearFieldValidation(input));
}

function clearFieldValidation(input) {
  if (!input) {
    return;
  }

  input.classList.remove("is-invalid");
  input.removeAttribute("aria-invalid");
  const field = input.closest(".field");
  const error = field?.querySelector(".field-error");
  if (error) {
    error.textContent = "";
  }
}

function markFieldInvalid(input, message) {
  if (!input) {
    return { input: null, message };
  }

  input.classList.add("is-invalid");
  input.setAttribute("aria-invalid", "true");
  const field = input.closest(".field");
  if (field) {
    let error = field.querySelector(".field-error");
    if (!error) {
      error = document.createElement("div");
      error.className = "field-error";
      field.appendChild(error);
    }
    error.textContent = message;
  }
  return { input, message };
}

function finishAccountValidation(errors) {
  const actualErrors = errors.filter(Boolean);
  if (!actualErrors.length) {
    return true;
  }

  const firstError = actualErrors[0];
  setAccountMessage(firstError.message);
  if (firstError.input && typeof firstError.input.focus === "function") {
    firstError.input.focus();
  }
  return false;
}

function isClientEmailValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function isClientPasswordValid(value) {
  return String(value || "").length >= 8;
}

function isVerificationCodeValid(value) {
  return /^\d{6}$/.test(String(value || "").trim());
}

function hydrateDeskInputs() {
  els.deskStudyTitle.value = state.studyDesk.title || "";
  els.deskQuestions.value = state.studyDesk.questions || "";
  els.deskOutline.value = state.studyDesk.outline || "";
  els.deskPrayer.value = state.studyDesk.prayer || "";
}

async function loadAccountSession() {
  try {
    const resetToken = consumeResetToken();
    const verificationEmail = consumeVerificationEmail();
    const flashMessage = consumeAuthMessage();
    let data = await requestApi("/api/auth/session", { cacheBust: true });
    state.account.config = { ...DEFAULT_ACCOUNT_CONFIG, ...(data.config || {}) };
    state.publicAccessUrl = state.account.config.appOrigin || window.location.origin;
    state.account.user = data.user || null;
    if (verificationEmail) {
      state.account.pendingVerificationEmail = verificationEmail;
    }
    if (resetToken) {
      state.account.resetToken = resetToken;
      state.account.message = "Reset link loaded. Choose a new password below.";
    }

    if (!state.account.user && flashMessage && /google/i.test(flashMessage)) {
      data = await requestApi("/api/auth/session", { cacheBust: true });
      state.account.config = { ...DEFAULT_ACCOUNT_CONFIG, ...(data.config || {}) };
      state.publicAccessUrl = state.account.config.appOrigin || window.location.origin;
      state.account.user = data.user || null;
    }

    if (state.account.user?.settings) {
      applyReaderSettings(state.account.user.settings);
      await applyLanguageSetting(state.account.user.settings.readingLanguage || getReadingLanguageSetting());
    }

    if (state.account.user?.emailVerified) {
      state.account.pendingVerificationEmail = "";
    } else if (state.account.user?.email) {
      state.account.pendingVerificationEmail = state.account.pendingVerificationEmail || state.account.user.email;
    }

    if (flashMessage) {
      state.account.message = flashMessage;
    }

    renderAccount();

    if (state.account.user?.studyStateMeta?.updatedAt && !hasMeaningfulLocalStudyState()) {
      await restoreStudyStateFromAccount(true);
    }
  } catch (error) {
    state.publicAccessUrl = window.location.origin;
    state.account.message = "Account services could not be loaded.";
    renderAccount();
  }
}

async function signInWithEmail() {
  const email = els.loginEmail.value.trim();
  const password = els.loginPassword.value;
  clearAccountValidation([els.loginEmail, els.loginPassword]);
  if (!finishAccountValidation([
    !email ? markFieldInvalid(els.loginEmail, "Enter your email address.") : null,
    email && !isClientEmailValid(email) ? markFieldInvalid(els.loginEmail, "Enter a valid email address.") : null,
    !password ? markFieldInvalid(els.loginPassword, "Enter your password.") : null
  ])) {
    return;
  }

  try {
    const data = await requestApi("/api/auth/login", {
      method: "POST",
      body: {
        email,
        password
      }
    });
    state.account.user = data.user || null;
    state.account.config = { ...state.account.config, ...(data.config || {}) };
    state.account.pendingVerificationEmail = data.verificationRequired ? (data.verificationEmail || email) : "";
    els.loginPassword.value = "";
    if (state.account.user?.settings) {
      applyReaderSettings(state.account.user.settings);
      await applyLanguageSetting(state.account.user.settings.readingLanguage || getReadingLanguageSetting());
    }
    state.account.message = data.message || "Signed in.";
    pushNotification({
      title: "Signed in",
      message: data.message || "Your account session is active.",
      type: "account"
    });
    renderAccount();
    if (state.account.user?.studyStateMeta?.updatedAt && !hasMeaningfulLocalStudyState()) {
      await restoreStudyStateFromAccount(true);
    }
  } catch (error) {
    setAccountMessage(error.message || "Unable to sign in.");
  }
}

async function signUpWithEmail() {
  const displayName = els.signupName.value.trim();
  const email = els.signupEmail.value.trim();
  const password = els.signupPassword.value;
  clearAccountValidation([els.signupName, els.signupEmail, els.signupPassword]);
  if (!finishAccountValidation([
    !displayName ? markFieldInvalid(els.signupName, "Enter a display name.") : null,
    displayName && displayName.length < 2 ? markFieldInvalid(els.signupName, "Display name should be at least 2 characters.") : null,
    !email ? markFieldInvalid(els.signupEmail, "Enter your email address.") : null,
    email && !isClientEmailValid(email) ? markFieldInvalid(els.signupEmail, "Enter a valid email address.") : null,
    !password ? markFieldInvalid(els.signupPassword, "Choose a password.") : null,
    password && !isClientPasswordValid(password) ? markFieldInvalid(els.signupPassword, "Use at least 8 characters for the password.") : null
  ])) {
    return;
  }

  try {
    const data = await requestApi("/api/auth/signup", {
      method: "POST",
      body: {
        displayName,
        email,
        password
      }
    });
    state.account.user = data.user || null;
    state.account.config = { ...state.account.config, ...(data.config || {}) };
    state.account.pendingVerificationEmail = data.verificationEmail || email;
    els.signupPassword.value = "";
    if (state.account.user?.settings) {
      applyReaderSettings(state.account.user.settings);
      await applyLanguageSetting(state.account.user.settings.readingLanguage || getReadingLanguageSetting());
    }
    state.account.message = data.message || "Account created.";
    pushNotification({
      title: "Account created",
      message: data.message || "Your account is ready for verification.",
      type: "account"
    });
    renderAccount();
  } catch (error) {
    if (error.code === "email_exists") {
      markFieldInvalid(els.signupEmail, "That email already has an account.");
      els.loginEmail.value = email;
      els.accountResetEmail.value = email;
      els.accountVerificationEmail.value = email;
      setAccountMessage("That email already has an account. Sign in instead, use Google if that account was created with Google, or send a reset email if you forgot the password.");
      return;
    }
    setAccountMessage(error.message || "Unable to create account.");
  }
}

async function verifyAccountCode() {
  const email = (els.accountVerificationEmail.value.trim() || state.account.pendingVerificationEmail || state.account.user?.email || "").trim();
  const code = els.accountVerificationCode.value.trim();
  clearAccountValidation([els.accountVerificationEmail, els.accountVerificationCode]);
  if (!finishAccountValidation([
    !email ? markFieldInvalid(els.accountVerificationEmail, "Enter the email address that received the code.") : null,
    email && !isClientEmailValid(email) ? markFieldInvalid(els.accountVerificationEmail, "Enter a valid email address.") : null,
    !code ? markFieldInvalid(els.accountVerificationCode, "Enter the 6-digit code from your email.") : null,
    code && !isVerificationCodeValid(code) ? markFieldInvalid(els.accountVerificationCode, "Verification codes must be exactly 6 digits.") : null
  ])) {
    return;
  }

  try {
    const data = await requestApi("/api/auth/verify-code", {
      method: "POST",
      body: {
        email,
        code
      }
    });
    state.account.user = data.user || state.account.user;
    state.account.config = { ...state.account.config, ...(data.config || {}) };
    state.account.pendingVerificationEmail = "";
    els.accountVerificationCode.value = "";
    if (state.account.user?.settings) {
      applyReaderSettings(state.account.user.settings);
      await applyLanguageSetting(state.account.user.settings.readingLanguage || getReadingLanguageSetting());
    }
    state.account.message = data.message || "Email verified.";
    pushNotification({
      title: "Email verified",
      message: data.message || "Your account is now verified.",
      type: "account"
    });
    renderAccount();
    if (state.account.user?.studyStateMeta?.updatedAt && !hasMeaningfulLocalStudyState()) {
      await restoreStudyStateFromAccount(true);
    }
  } catch (error) {
    setAccountMessage(error.message || "Unable to verify the email code.");
  }
}

async function requestPasswordResetEmail() {
  const email = els.accountResetEmail.value.trim();
  clearAccountValidation([els.accountResetEmail]);
  if (!finishAccountValidation([
    !email ? markFieldInvalid(els.accountResetEmail, "Enter an email address to send the reset link.") : null,
    email && !isClientEmailValid(email) ? markFieldInvalid(els.accountResetEmail, "Enter a valid email address.") : null
  ])) {
    return;
  }

  try {
    const data = await requestApi("/api/auth/request-password-reset", {
      method: "POST",
      body: {
        email
      }
    });
    state.account.message = data.message || "If that account exists, a reset link has been sent.";
    renderAccount();
  } catch (error) {
    setAccountMessage(error.message || "Unable to send a reset email.");
  }
}

async function completePasswordReset() {
  if (!state.account.resetToken) {
    setAccountMessage("Open the password reset link from your email first.");
    return;
  }

  const password = els.accountResetPassword.value;
  const confirm = els.accountResetPasswordConfirm.value;
  clearAccountValidation([els.accountResetPassword, els.accountResetPasswordConfirm]);
  if (!finishAccountValidation([
    !password ? markFieldInvalid(els.accountResetPassword, "Enter the new password.") : null,
    password && !isClientPasswordValid(password) ? markFieldInvalid(els.accountResetPassword, "Use at least 8 characters for the new password.") : null,
    !confirm ? markFieldInvalid(els.accountResetPasswordConfirm, "Repeat the new password.") : null,
    password && confirm && password !== confirm ? markFieldInvalid(els.accountResetPasswordConfirm, "The password confirmation does not match.") : null
  ])) {
    return;
  }

  try {
    const data = await requestApi("/api/auth/reset-password", {
      method: "POST",
      body: {
        token: state.account.resetToken,
        newPassword: password
      }
    });
    state.account.user = data.user || null;
    if (state.account.user?.settings) {
      applyReaderSettings(state.account.user.settings);
      await applyLanguageSetting(state.account.user.settings.readingLanguage || getReadingLanguageSetting());
    }
    state.account.pendingVerificationEmail = state.account.user?.emailVerified ? "" : (state.account.user?.email || state.account.pendingVerificationEmail);
    state.account.resetToken = "";
    els.accountResetPassword.value = "";
    els.accountResetPasswordConfirm.value = "";
    state.account.message = data.message || "Password reset complete.";
    renderAccount();
  } catch (error) {
    setAccountMessage(error.message || "Unable to reset the password.");
  }
}

async function saveAccountSettings() {
  applyDefaultPanelSetting(els.accountDefaultPanel.value);
  applyReaderSettings({
    readingLanguage: els.accountLanguage.value,
    displayMode: els.accountDisplayMode.value,
    theme: els.accountTheme.value,
    textSize: els.accountTextSize.value,
    motion: els.accountMotion.value,
    readerWidth: els.accountReaderWidth.value,
    showVerseNumbers: els.accountShowVerseNumbers.checked,
    resumeLastReference: els.accountResumeLastReference.checked,
    pushNotifications: els.accountPushNotifications.checked,
    emailNotifications: els.accountEmailNotifications.checked,
    speechVoice: els.accountSpeechVoice.value,
    speechRate: Number(els.accountSpeechRate.value || DEFAULT_READER_SETTINGS.speechRate)
  });

  if (!state.account.user) {
    setAccountMessage("Local settings saved for this browser. Sign in if you want them synced.");
    if (els.quickSettingsMeta) {
      els.quickSettingsMeta.textContent = "Saved locally for this browser.";
    }
    renderAccount();
    return;
  }

  const displayName = els.accountDisplayName.value.trim();
  clearAccountValidation([els.accountDisplayName]);
  if (!finishAccountValidation([
    !displayName ? markFieldInvalid(els.accountDisplayName, "Enter a username.") : null,
    displayName && displayName.length < 2 ? markFieldInvalid(els.accountDisplayName, "Username should be at least 2 characters.") : null
  ])) {
    return;
  }

  try {
    const data = await requestApi("/api/account/settings", {
      method: "POST",
      body: {
        displayName,
        settings: {
          defaultPanel: els.accountDefaultPanel.value,
          readingLanguage: getReadingLanguageSetting(),
          displayMode: getDisplayModeSetting(),
          theme: document.body.dataset.theme || DEFAULT_READER_SETTINGS.theme,
          textSize: document.body.dataset.readerSize || DEFAULT_READER_SETTINGS.textSize,
          motion: document.body.dataset.motion || DEFAULT_READER_SETTINGS.motion,
          readerWidth: document.body.dataset.readerWidth || DEFAULT_READER_SETTINGS.readerWidth,
          showVerseNumbers: getShowVerseNumbersSetting(),
          resumeLastReference: getResumeLastReferenceSetting(),
          autoSync: els.accountAutoSync.checked,
          pushNotifications: els.accountPushNotifications.checked,
          emailNotifications: els.accountEmailNotifications.checked,
          welcomeEmails: els.accountWelcomeEmails.checked,
          securityEmails: els.accountSecurityEmails.checked,
          studyEmails: els.accountStudyEmails.checked,
          speechVoice: els.accountSpeechVoice.value,
          speechRate: Number(els.accountSpeechRate.value || DEFAULT_READER_SETTINGS.speechRate)
        }
      }
    });

    state.account.user = data.user || state.account.user;
    applyReaderSettings(state.account.user.settings);
    await applyLanguageSetting(state.account.user.settings.readingLanguage || getReadingLanguageSetting());
    state.account.message = data.message || "Settings saved.";
    pushNotification({
      title: "Settings saved",
      message: data.message || "Reader and account preferences were updated.",
      type: "settings"
    });
    if (els.quickSettingsMeta) {
      els.quickSettingsMeta.textContent = data.message || "Settings saved.";
    }
    renderAccount();
  } catch (error) {
    setAccountMessage(error.message || "Unable to save account settings.");
  }
}

async function updateAccountPassword() {
  if (!state.account.user) {
    setAccountMessage("Sign in before updating a password.");
    return;
  }

  const currentPassword = els.accountCurrentPassword.value;
  const newPassword = els.accountNewPassword.value;
  clearAccountValidation([els.accountCurrentPassword, els.accountNewPassword]);
  if (!finishAccountValidation([
    state.account.user.hasPassword && !currentPassword ? markFieldInvalid(els.accountCurrentPassword, "Enter your current password before changing it.") : null,
    !newPassword ? markFieldInvalid(els.accountNewPassword, "Enter a new password.") : null,
    newPassword && !isClientPasswordValid(newPassword) ? markFieldInvalid(els.accountNewPassword, "Use at least 8 characters for the new password.") : null
  ])) {
    return;
  }

  try {
    const data = await requestApi("/api/account/password", {
      method: "POST",
      body: {
        currentPassword,
        newPassword
      }
    });

    state.account.user = data.user || state.account.user;
    els.accountCurrentPassword.value = "";
    els.accountNewPassword.value = "";
    state.account.message = data.message || "Password updated.";
    renderAccount();
  } catch (error) {
    setAccountMessage(error.message || "Unable to update the password.");
  }
}

async function deleteAccount() {
  if (!state.account.user) {
    setAccountMessage("Sign in before deleting an account.");
    return;
  }

  if (els.accountDeleteConfirm.value.trim().toUpperCase() !== "DELETE") {
    setAccountMessage("Type DELETE in the confirmation field before removing the account.");
    els.accountDeleteConfirm.focus();
    return;
  }

  const confirmed = window.confirm(`Delete the account for ${state.account.user.email}? This cannot be undone.`);
  if (!confirmed) {
    return;
  }

  try {
    const data = await requestApi("/api/account", {
      method: "DELETE"
    });
    closeAccountModal();
    state.account.user = null;
    state.account.pendingVerificationEmail = "";
    els.accountDeleteConfirm.value = "";
    setAccountMessage(data.message || "Account deleted. Local study data on this device was left intact.");
    pushNotification({
      title: "Account deleted",
      message: data.message || "The signed-in account was removed from this PC.",
      type: "account"
    });
    renderAccount();
  } catch (error) {
    setAccountMessage(error.message || "Unable to delete the account.");
  }
}

async function signOutAccount() {
  try {
    await requestApi("/api/auth/logout", { method: "POST" });
  } catch (error) {
    // Clear the client state even if the server call fails.
  }

  closeAccountModal();
  state.account.user = null;
  state.account.pendingVerificationEmail = "";
  state.account.message = "Signed out. Your local study data is still on this device.";
  renderAccount();
}

async function resendVerificationEmail() {
  const email = (els.accountVerificationEmail?.value || state.account.pendingVerificationEmail || state.account.user?.email || "").trim();
  clearAccountValidation([els.accountVerificationEmail]);
  if (!finishAccountValidation([
    !state.account.user && !email ? markFieldInvalid(els.accountVerificationEmail, "Enter the email address that should receive the verification message.") : null,
    email && !isClientEmailValid(email) ? markFieldInvalid(els.accountVerificationEmail, "Enter a valid email address.") : null
  ])) {
    return;
  }

  try {
    const data = await requestApi("/api/auth/resend-verification", {
      method: "POST",
      body: email ? { email } : {}
    });
    state.account.pendingVerificationEmail = data.verificationEmail || email || state.account.pendingVerificationEmail;
    state.account.message = data.message || "Verification email sent.";
    renderAccount();
  } catch (error) {
    setAccountMessage(error.message || "Unable to resend verification email.");
  }
}

function getLocalStudyState() {
  return {
    bookmarks: state.bookmarks,
    highlights: state.highlights,
    notes: state.notes,
    studyDesk: state.studyDesk
  };
}

function hasMeaningfulLocalStudyState() {
  return Boolean(
    state.bookmarks.length ||
    Object.keys(state.highlights).length ||
    Object.keys(state.notes).length ||
    state.studyDesk.title ||
    state.studyDesk.questions ||
    state.studyDesk.outline ||
    state.studyDesk.prayer ||
    state.studyDesk.savedSearches?.length ||
    state.studyDesk.recentReferences?.length ||
    state.studyDesk.lastReference
  );
}

function scheduleAccountSync() {
  if (!state.account.user || state.account.user.settings?.autoSync === false) {
    return;
  }

  clearTimeout(state.account.syncTimer);
  state.account.syncTimer = setTimeout(() => {
    syncStudyStateToAccount(true).catch((error) => {
      console.warn("Unable to sync study state.", error);
    });
  }, 800);
}

async function syncStudyStateToAccount(quiet = true) {
  if (!state.account.user) {
    if (!quiet) {
      setAccountMessage("Sign in before uploading study data.");
    }
    return;
  }

  if (state.account.syncing) {
    return;
  }

  state.account.syncing = true;
  els.accountSyncMeta.textContent = "Uploading study data...";

  try {
    const data = await requestApi("/api/account/study-state", {
      method: "POST",
      body: getLocalStudyState()
    });
    state.account.user.studyStateMeta = {
      updatedAt: data.updatedAt || new Date().toISOString()
    };
    pushNotification({
      title: "Study cloud updated",
      message: data.message || "Study data was uploaded to your account.",
      type: "sync"
    });
    state.account.message = quiet ? state.account.message : (data.message || "Study data uploaded.");
    renderAccount();
  } catch (error) {
    if (!quiet) {
      setAccountMessage(error.message || "Unable to upload study data.");
    }
  } finally {
    state.account.syncing = false;
  }
}

async function restoreStudyStateFromAccount(quiet = false) {
  if (!state.account.user) {
    if (!quiet) {
      setAccountMessage("Sign in before restoring study data.");
    }
    return;
  }

  try {
    const data = await requestApi("/api/account/study-state");
    const studyState = data.studyState || {};
    if (!studyState.updatedAt && !studyState.bookmarks?.length && !Object.keys(studyState.highlights || {}).length && !Object.keys(studyState.notes || {}).length) {
      if (!quiet) {
        setAccountMessage("This account does not have a saved cloud study state yet.");
      }
      return;
    }

    applyStudyStateFromAccount(studyState);
    state.account.user.studyStateMeta = {
      updatedAt: data.updatedAt || studyState.updatedAt || null
    };
    pushNotification({
      title: "Study cloud restored",
      message: "The latest study data was restored from your account.",
      type: "sync"
    });
    state.account.message = quiet ? state.account.message : "Study data restored from the account.";
    renderAccount();
  } catch (error) {
    if (!quiet) {
      setAccountMessage(error.message || "Unable to restore study data from the account.");
    }
  }
}

function applyStudyStateFromAccount(studyState) {
  state.bookmarks = Array.isArray(studyState.bookmarks) ? studyState.bookmarks.slice(0, 300) : [];
  state.highlights = studyState.highlights && typeof studyState.highlights === "object" ? studyState.highlights : {};
  state.notes = studyState.notes && typeof studyState.notes === "object" ? studyState.notes : {};
  state.studyDesk = hydrateStudyDesk(studyState.studyDesk || DEFAULT_STUDY_DESK);

  saveLocal("kingsBibleCompass.bookmarks", state.bookmarks, { suppressSync: true });
  saveLocal("kingsBibleCompass.highlights", state.highlights, { suppressSync: true });
  saveLocal("kingsBibleCompass.notes", state.notes, { suppressSync: true });
  saveLocal("kingsBibleCompass.studyDesk", state.studyDesk, { suppressSync: true });

  hydrateDeskInputs();
  renderBrowse();
  renderBookmarks();
  renderDesk();
  renderSpotlights();
  renderJourneys();

  if (state.focusedVerse) {
    els.verseNote.value = state.notes[state.focusedVerse.reference] || "";
    updateFocusHighlightUI(state.focusedVerse.reference);
  }

  refreshVisibleHighlights();
}

function exportLocalStudyData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    preferences: {
      defaultPanel: getDefaultPanelSetting(),
      ...getCurrentReaderSettings()
    },
    studyState: getLocalStudyState(),
    aiCache: state.aiCache
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `selah-journey-export-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  if (els.moreMenuMeta) {
    els.moreMenuMeta.textContent = "Study data exported to a JSON file.";
  }
}

function clearLocalStudyData() {
  const confirmed = window.confirm("Clear local bookmarks, notes, highlights, desk data, and local preferences for this browser?");
  if (!confirmed) {
    return;
  }

  state.bookmarks = [];
  state.highlights = {};
  state.notes = {};
  state.aiCache = {};
  state.notifications = [];
  state.studyDesk = hydrateStudyDesk(DEFAULT_STUDY_DESK);
  state.compareChapterCache.clear();
  state.compareTranslation = "";
  state.selectedTranslation = "";

  saveLocal("kingsBibleCompass.bookmarks", state.bookmarks, { suppressSync: true });
  saveLocal("kingsBibleCompass.highlights", state.highlights, { suppressSync: true });
  saveLocal("kingsBibleCompass.notes", state.notes, { suppressSync: true });
  saveLocal("kingsBibleCompass.aiCache", state.aiCache, { suppressSync: true });
  saveLocal("kingsBibleCompass.notifications", state.notifications, { suppressSync: true });
  saveLocal("kingsBibleCompass.studyDesk", state.studyDesk, { suppressSync: true });
  saveLocal("kingsBibleCompass.compareTranslation", state.compareTranslation, { suppressSync: true });
  saveLocal("kingsBibleCompass.selectedTranslation", state.selectedTranslation, { suppressSync: true });
  applyDefaultPanelSetting("home");
  applyReaderSettings(DEFAULT_READER_SETTINGS);
  applyReaderFocusMode(false);
  syncTranslationSelect();
  syncCompareTranslationOptions();

  hydrateDeskInputs();
  renderBrowse();
  renderBookmarks();
  renderDesk();
  renderNotifications();
  renderSupport();
  renderSpotlights();
  renderJourneys();
  resetFocusPanel();
  setAccountMessage("Local browser data cleared.");

  if (els.moreMenuMeta) {
    els.moreMenuMeta.textContent = "Local browser data cleared.";
  }
}

function seedNotificationFeed() {
  const presetIds = new Set(NOTIFICATION_PRESET_DATA.map((item, index) => `${item.id}-${index}`));
  const filtered = state.notifications.filter((item) => !presetIds.has(item.id) && item.type === "email");
  if (filtered.length !== state.notifications.length) {
    state.notifications = filtered;
    saveLocal("kingsBibleCompass.notifications", state.notifications, { suppressSync: true });
  }
}

function pushNotification(input) {
  const notification = {
    id: `note_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    title: input.title || "Selah Journey",
    message: input.message || "",
    type: input.type || "system",
    createdAt: new Date().toISOString(),
    read: false
  };
  const shouldStore = (input.persist === true || input.email === true) && (getPushNotificationSetting() || input.type === "email");
  if (shouldStore) {
    state.notifications = [notification, ...state.notifications].slice(0, 24);
    saveLocal("kingsBibleCompass.notifications", state.notifications, { suppressSync: true });
  }
  if (input.email === true && state.account.user && getEmailNotificationSetting()) {
    void sendNotificationEventEmail(notification);
  }
  if (shouldStore && (state.currentPanel === "account" || state.account.activeModal === "settings")) {
    renderNotifications();
  }
}

function clearNotifications() {
  state.notifications = [];
  saveLocal("kingsBibleCompass.notifications", state.notifications, { suppressSync: true });
  renderNotifications();
}

function getBrowserNotificationStatusLabel() {
  if (!state.account.user) {
    return "Email notifications need a signed-in account";
  }
  if (getEmailNotificationSetting()) {
    return "Email delivery enabled";
  }
  return "Email delivery disabled";
}

async function requestBrowserNotificationPermission() {
  setAccountMessage("Browser popup notifications are off. Use email notifications instead.");
}

async function sendNotificationTestEmail() {
  if (!state.account.user) {
    setAccountMessage("Sign in before sending a test email notification.");
    return;
  }

  try {
    const data = await requestApi("/api/account/notifications/test", {
      method: "POST"
    });
    setAccountMessage(data.message || "Test email notification sent.");
    pushNotification({
      title: "Notification test sent",
      message: data.message || "A test email notification was sent to your account address.",
      type: "email",
      persist: true
    });
  } catch (error) {
    setAccountMessage(error.message || "Unable to send the test email notification.");
  }
}

async function sendNotificationEventEmail(notification) {
  try {
    await requestApi("/api/account/notifications/event", {
      method: "POST",
      body: {
        title: notification.title,
        message: notification.message,
        type: notification.type
      }
    });
  } catch (error) {
    console.warn("Unable to send notification email event.", error);
  }
}

function getPreferredShareUrl() {
  return state.publicAccessUrl || window.location.origin;
}

async function shareWebsite() {
  const url = getPreferredShareUrl();
  try {
    if (navigator.share) {
      await navigator.share({
        title: APP_NAME,
        text: "Open Selah Journey on this link.",
        url
      });
      return;
    }
  } catch (error) {
    if (error && error.name === "AbortError") {
      return;
    }
  }

  const copied = await copyTextToClipboard(url);
  if (copied) {
    pushNotification({
      title: "Website link copied",
      message: "The website link is ready to paste on another device.",
      type: "share"
    });
  }
}

function openDonationLink() {
  window.open("https://www.buymeacoffee.com/", "_blank", "noopener,noreferrer");
}

async function loadPublicAccessUrl() {
  state.publicAccessUrl = state.account.config.appOrigin || window.location.origin;
  renderSupport();
}

function initializeSpeechVoices() {
  if (!("speechSynthesis" in window)) {
    if (els.accountSpeechVoice) {
      els.accountSpeechVoice.innerHTML = '<option value="">Speech unavailable in this browser</option>';
      els.accountSpeechVoice.disabled = true;
    }
    return;
  }

  const syncVoices = () => {
    state.speechVoices = window.speechSynthesis.getVoices()
      .filter((voice) => voice && voice.name)
      .sort((left, right) => getSpeechVoiceScore(right) - getSpeechVoiceScore(left));
    populateSpeechVoiceControls();
  };

  syncVoices();
  if (typeof window.speechSynthesis.addEventListener === "function") {
    window.speechSynthesis.addEventListener("voiceschanged", syncVoices);
  } else {
    window.speechSynthesis.onvoiceschanged = syncVoices;
  }
}

function populateSpeechVoiceControls() {
  if (!els.accountSpeechVoice) {
    return;
  }

  const recommendedVoice = getPreferredSpeechVoice();
  const automaticLabel = recommendedVoice
    ? `Automatic recommended (${recommendedVoice.name})`
    : "Automatic recommended";
  const options = [`<option value="">${escapeHtml(automaticLabel)}</option>`]
    .concat(state.speechVoices.map((voice) => `<option value="${escapeHtml(voice.name)}">${escapeHtml(`${voice.name} (${voice.lang})`)}</option>`))
    .join("");
  els.accountSpeechVoice.innerHTML = options;
  const savedVoice = getSpeechVoiceSetting();
  els.accountSpeechVoice.value = state.speechVoices.some((voice) => voice.name === savedVoice) ? savedVoice : "";
  els.accountSpeechVoice.disabled = false;
}

function speakCurrentChapter() {
  const text = Array.from(state.chapterVerseMap.values())
    .map((verse) => `Verse ${verse.verseNumber}. ${verse.text}`)
    .join(" ");
  if (!text) {
    return;
  }
  speakText(`${els.chapterTitle.textContent}. ${text}`);
}

function speakFocusedVerse() {
  if (!state.focusedVerse) {
    pushNotification({
      title: "Choose a verse first",
      message: "Focus a verse before using speak verse.",
      type: "speech"
    });
    return;
  }
  speakText(`${state.focusedVerse.reference}. ${state.focusedVerse.text}`);
}

function stopSpeech() {
  activeSpeechSessionId += 1;
  speechPlaybackActive = false;
  setSpeechUiState(false);
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function speakText(text) {
  if (!("speechSynthesis" in window)) {
    setAccountMessage("Text-to-speech is not available in this browser.");
    return;
  }

  const plainText = String(text || "").replace(/\s+/g, " ").trim();
  const chunks = buildSpeechChunks(plainText);
  if (!chunks.length) {
    return;
  }

  stopSpeech();
  const sessionId = ++activeSpeechSessionId;
  const voice = getPreferredSpeechVoice();
  const rate = getSpeechRateSetting();
  let chunkIndex = 0;
  speechPlaybackActive = true;
  setSpeechUiState(true);

  const speakNextChunk = () => {
    if (sessionId !== activeSpeechSessionId) {
      return;
    }

    const chunk = chunks[chunkIndex];
    if (!chunk) {
      speechPlaybackActive = false;
      setSpeechUiState(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = voice?.lang || document.documentElement.lang || "en-US";
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      if (sessionId !== activeSpeechSessionId) {
        return;
      }
      chunkIndex += 1;
      if (chunkIndex >= chunks.length) {
        speechPlaybackActive = false;
        setSpeechUiState(false);
        return;
      }
      window.setTimeout(speakNextChunk, 10);
    };

    utterance.onerror = () => {
      if (sessionId !== activeSpeechSessionId) {
        return;
      }
      speechPlaybackActive = false;
      setSpeechUiState(false);
      setAccountMessage("Audio playback failed in this browser.");
    };

    window.speechSynthesis.speak(utterance);
  };

  speakNextChunk();
}

function buildSpeechChunks(text, maxLength = 240) {
  const normalized = String(text || "").replace(/\s+/g, " ").trim();
  if (!normalized) {
    return [];
  }

  const segments = normalized.match(/[^.!?;]+[.!?;]?/g) || [normalized];
  const chunks = [];
  let current = "";

  segments.forEach((segment) => {
    const sentence = segment.trim();
    if (!sentence) {
      return;
    }

    if (!current) {
      current = sentence;
      return;
    }

    if (`${current} ${sentence}`.length <= maxLength) {
      current = `${current} ${sentence}`;
      return;
    }

    if (current) {
      chunks.push(current.trim());
    }

    if (sentence.length <= maxLength) {
      current = sentence;
      return;
    }

    const parts = sentence.split(/,\s+/);
    let partial = "";
    parts.forEach((part) => {
      const trimmed = part.trim();
      if (!trimmed) {
        return;
      }
      if (!partial) {
        partial = trimmed;
        return;
      }
      if (`${partial}, ${trimmed}`.length <= maxLength) {
        partial = `${partial}, ${trimmed}`;
        return;
      }
      chunks.push(partial.trim());
      partial = trimmed;
    });
    current = partial.trim();
  });

  if (current) {
    chunks.push(current.trim());
  }

  return chunks.filter(Boolean);
}

function getPreferredSpeechVoice() {
  const chosenName = getSpeechVoiceSetting();
  if (chosenName) {
    const explicit = state.speechVoices.find((voice) => voice.name === chosenName);
    if (explicit) {
      return explicit;
    }
  }

  const languagePrefix = getSpeechLanguagePrefix();
  const languageMatches = state.speechVoices.filter((voice) => String(voice.lang || "").toLowerCase().startsWith(languagePrefix));
  const candidates = languageMatches.length ? languageMatches : state.speechVoices;
  return candidates.slice().sort((left, right) => getSpeechVoiceScore(right) - getSpeechVoiceScore(left))[0] || null;
}

function getSpeechLanguagePrefix() {
  return String(document.documentElement.lang || "en").slice(0, 2).toLowerCase();
}

function getSpeechVoiceScore(voice) {
  const languagePrefix = getSpeechLanguagePrefix();
  const name = String(voice?.name || "").toLowerCase();
  const lang = String(voice?.lang || "").toLowerCase();
  let score = voice?.default ? 20 : 0;

  if (lang.startsWith(languagePrefix)) {
    score += 50;
  }

  if (name.includes("natural") || name.includes("neural")) {
    score += 40;
  }

  if (name.includes("microsoft") || name.includes("google")) {
    score += 18;
  }

  if (name.includes("aria") || name.includes("jenny") || name.includes("guy") || name.includes("emma") || name.includes("sara")) {
    score += 12;
  }

  if (name.includes("desktop") || name.includes("legacy")) {
    score -= 8;
  }

  if (name.includes("espeak")) {
    score -= 30;
  }

  return score;
}

function setSpeechUiState(isActive) {
  if (!els.floatingStopSpeechButton) {
    return;
  }
  const shouldShow = isActive === true && speechPlaybackActive === true;
  els.floatingStopSpeechButton.classList.toggle("is-hidden", !shouldShow);
}

function setAccountMessage(message) {
  state.account.message = message;
  if (els.accountMessage) {
    els.accountMessage.textContent = message;
  }
}

function populateStaticControls() {
  populateBookSelect(BOOK_CATALOG);
  populateChapterSelect();
  els.atlasBookSelect.innerHTML = ['<option value="">Pick a Bible book</option>']
    .concat(BOOK_CATALOG.map((book) => `<option value="${book.code}">${escapeHtml(book.name)}</option>`))
    .join("");
}

function populateBookSelect(books) {
  els.bookSelect.innerHTML = books.map((book) => `<option value="${book.code}">${escapeHtml(book.name)}</option>`).join("");
  els.bookSelect.value = state.selectedBookCode;
}

function populateChapterSelect() {
  const total = getCurrentBookChapterCount();
  els.chapterSelect.innerHTML = Array.from({ length: total }, (_, index) => {
    const chapter = index + 1;
    return `<option value="${chapter}">${chapter}</option>`;
  }).join("");

  if (state.selectedChapter > total) {
    state.selectedChapter = total;
  }

  els.chapterSelect.value = String(state.selectedChapter);
}

function renderAlphabet(letters, target, onClick) {
  target.innerHTML = letters.map((letter) => `<button type="button" class="alpha-button" data-letter="${letter}">${letter}</button>`).join("");
  target.querySelectorAll("[data-letter]").forEach((button) => {
    button.addEventListener("click", () => onClick(button.dataset.letter));
  });
}

function renderLibrary(filterText) {
  const query = filterText.toLowerCase();
  const items = state.snapshot.library.items.filter((item) => {
    if (!query) {
      return true;
    }
    return item.title.toLowerCase().includes(query) || item.alt.toLowerCase().includes(query);
  });

  els.libraryStatus.textContent = `${items.length} card${items.length === 1 ? "" : "s"} shown`;

  els.libraryGrid.innerHTML = items.map((item) => {
    const detail = window.LibraryAtlas?.getByTitle(item.title);
    const description = detail?.summary || LIBRARY_DESCRIPTIONS[item.title] || "Snapshot card restored from the original saved library page.";
    const studyHref = detail ? `library/${encodeURIComponent(detail.slug)}.html` : "library-detail.html";
    const art = detail && window.LibraryAtlas?.createLibraryArt
      ? window.LibraryAtlas.createLibraryArt(detail, { compact: true })
      : `<div class="reader-prose">${escapeHtml(item.title)}</div>`;
    return `
      <article class="library-card">
        <a class="library-card-link" href="${escapeHtml(studyHref)}">
          <div class="library-art-frame">${art}</div>
          <div class="library-card-body">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(description)}</p>
            <span class="card-link-label">Open study page</span>
          </div>
        </a>
      </article>
    `;
  }).join("");
}

function renderBookmarks() {
  if (!state.bookmarks.length) {
    els.bookmarkList.innerHTML = '<div class="muted-copy">Bookmark a verse in the reader to keep it here.</div>';
    renderDeskBookmarks();
    renderStudyDashboard();
    renderMemoryReview();
    return;
  }

  els.bookmarkList.innerHTML = state.bookmarks.map((reference) => {
    const highlight = getHighlightColorForReference(reference);
    return `
    <div class="bookmark-item"${highlight ? ` data-highlight-color="${highlight}"` : ""}>
      <strong>${escapeHtml(reference)}</strong>
      <div class="muted-copy">${highlight ? `${capitalize(highlight)} highlight` : "Saved bookmark"}</div>
      <div class="reader-actions">
        <button type="button" class="ghost-button" data-bookmark-reference="${escapeHtml(reference)}">Open</button>
        <button type="button" class="ghost-button" data-copy-reference="${escapeHtml(reference)}">Copy</button>
      </div>
    </div>
  `;
  }).join("");

  els.bookmarkList.querySelectorAll("[data-bookmark-reference]").forEach((button) => {
    button.addEventListener("click", async () => {
      const parsed = parseSimpleReference(button.dataset.bookmarkReference);
      if (!parsed) {
        return;
      }
      await openReference(parsed.bookCode, parsed.chapter, parsed.verse);
    });
  });

  els.bookmarkList.querySelectorAll("[data-copy-reference]").forEach((button) => {
    button.addEventListener("click", async () => {
      const copied = await copyReferenceToClipboard(button.dataset.copyReference);
      flashButtonLabel(button, copied ? "Copied" : "Failed");
    });
  });

  renderDeskBookmarks();
  renderStudyDashboard();
  renderMemoryReview();
}

function renderSavedSearches() {
  const searches = state.studyDesk.savedSearches || [];
  if (!searches.length) {
    els.savedSearchList.innerHTML = '<div class="muted-copy">Save a search from the Search tab and it will show up here.</div>';
    return;
  }

  els.savedSearchList.innerHTML = searches.map((item, index) => `
    <div class="result-item">
      <div class="result-reference">
        <span>${escapeHtml(item.label)}</span>
        <span class="badge">${escapeHtml(item.filter || "All books")}</span>
      </div>
      <div class="muted-copy">${escapeHtml(item.query)}</div>
      <div class="reader-actions">
        <button type="button" class="ghost-button" data-run-saved-search="${index}">Run</button>
        <button type="button" class="ghost-button" data-remove-saved-search="${index}">Delete</button>
      </div>
    </div>
  `).join("");

  els.savedSearchList.querySelectorAll("[data-run-saved-search]").forEach((button) => {
    button.addEventListener("click", async () => {
      const item = searches[Number(button.dataset.runSavedSearch)];
      if (!item) {
        return;
      }
      applySavedSearch(item);
      switchPanel("search");
      await runAdvancedSearch();
    });
  });

  els.savedSearchList.querySelectorAll("[data-remove-saved-search]").forEach((button) => {
    button.addEventListener("click", () => {
      state.studyDesk.savedSearches.splice(Number(button.dataset.removeSavedSearch), 1);
      persistStudyDesk();
      renderDesk();
    });
  });
}

function renderRecentReferences() {
  const refs = state.studyDesk.recentReferences || [];
  const words = state.studyDesk.recentWordStudies || [];
  const places = state.studyDesk.recentPlaces || [];

  const referenceHtml = refs.slice(0, 5).map((item, index) => `
    <div class="result-item">
      <div class="result-reference">
        <span>${escapeHtml(item.reference)}</span>
        <span class="badge">${escapeHtml(item.translation || "Study trail")}</span>
      </div>
      <div class="muted-copy">${escapeHtml(item.text || "")}</div>
      <button type="button" class="ghost-button" data-recent-reference="${index}">Open</button>
    </div>
  `).join("");

  const chipSection = (words.length || places.length) ? `
    <div class="result-item">
      <div class="result-reference">
        <span>Recent word and place studies</span>
      </div>
      <div class="reader-actions">
        ${words.slice(0, 4).map((word) => `<button type="button" class="ghost-button" data-recent-word="${escapeHtml(word)}">${escapeHtml(word)}</button>`).join("")}
        ${places.slice(0, 4).map((place) => `<button type="button" class="ghost-button" data-recent-place="${escapeHtml(place)}">${escapeHtml(place)}</button>`).join("")}
      </div>
    </div>
  ` : "";

  if (!refs.length && !words.length && !places.length) {
    els.recentReferenceList.innerHTML = '<div class="muted-copy">Open passages, word studies, and atlas results to build your recent study trail.</div>';
    return;
  }

  els.recentReferenceList.innerHTML = `${referenceHtml}${chipSection}`;

  els.recentReferenceList.querySelectorAll("[data-recent-reference]").forEach((button) => {
    button.addEventListener("click", async () => {
      const item = refs[Number(button.dataset.recentReference)];
      if (!item) {
        return;
      }
      await openReference(item.bookCode, item.chapter, item.verse);
    });
  });

  els.recentReferenceList.querySelectorAll("[data-recent-word]").forEach((button) => {
    button.addEventListener("click", async () => {
      const word = button.dataset.recentWord;
      els.dictionaryWord.value = word;
      switchPanel("dictionary");
      await runWordStudy(word);
    });
  });

  els.recentReferenceList.querySelectorAll("[data-recent-place]").forEach((button) => {
    button.addEventListener("click", async () => {
      const place = button.dataset.recentPlace;
      els.atlasPlace.value = place;
      switchPanel("atlas");
      await runAtlasStudy(place);
    });
  });
}

function renderStudyDashboard() {
  if (!els.studyDashboardGrid || !els.studyPatternList) {
    return;
  }

  const noteCount = Object.values(state.notes).filter((value) => String(value || "").trim()).length;
  const recentReferences = state.studyDesk.recentReferences || [];
  const booksExplored = new Set(recentReferences.map((item) => item.bookCode).filter(Boolean)).size;
  const activeJourney = getActiveJourney();
  const progress = activeJourney ? getJourneyProgress(activeJourney) : { done: 0, total: 0, percent: 0 };
  const stats = [
    {
      label: "Bookmarks",
      value: state.bookmarks.length,
      copy: state.bookmarks.length ? "Queued for review and sharing." : "No verses bookmarked yet."
    },
    {
      label: "Highlights",
      value: Object.keys(state.highlights).length,
      copy: Object.keys(state.highlights).length ? "Marked passages across your study trail." : "No highlights saved yet."
    },
    {
      label: "Notes",
      value: noteCount,
      copy: noteCount ? "Verse notes ready for review." : "No verse notes written yet."
    },
    {
      label: "Books Explored",
      value: booksExplored,
      copy: booksExplored ? "Distinct books from recent study history." : "Open passages to build a reading trail."
    },
    {
      label: "Journey Progress",
      value: activeJourney ? `${progress.percent}%` : "0%",
      copy: activeJourney ? `${progress.done} of ${progress.total} stops in ${activeJourney.title}.` : "Choose a guided journey to start progress."
    }
  ];

  els.studyDashboardGrid.innerHTML = stats.map((item) => `
    <article class="study-stat-card">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(String(item.value))}</strong>
      <span>${escapeHtml(item.copy)}</span>
    </article>
  `).join("");

  const patterns = [];
  const recentBook = getMostFrequentValue(recentReferences.map((item) => getBookByCode(item.bookCode)?.name || ""));
  if (recentBook) {
    patterns.push(`Most visited lately: ${recentBook}.`);
  }

  const highlightTone = getMostFrequentValue(Object.values(state.highlights));
  if (highlightTone) {
    patterns.push(`Most used highlight tone: ${capitalize(highlightTone)}.`);
  }

  if (state.studyDesk.lastReference?.reference) {
    patterns.push(`Last stop: ${state.studyDesk.lastReference.reference}.`);
  }

  if (activeJourney) {
    patterns.push(`Active journey: ${activeJourney.title}.`);
  }

  els.studyPatternList.innerHTML = patterns.length
    ? patterns.map((item) => `<div class="pattern-chip">${escapeHtml(item)}</div>`).join("")
    : '<div class="muted-copy">Open passages and save study activity to see your reading patterns.</div>';
}

function renderMemoryReview() {
  if (!els.memoryReviewList) {
    return;
  }

  const queue = buildMemoryReviewQueue();
  if (!queue.length) {
    els.memoryReviewList.innerHTML = '<div class="muted-copy">Bookmark, highlight, or revisit verses to build a memory review queue.</div>';
    return;
  }

  els.memoryReviewList.innerHTML = queue.map((item) => `
    <div class="result-item memory-review-item"${item.highlight ? ` data-highlight-color="${item.highlight}"` : ""}>
      <div class="result-reference">
        <span>${escapeHtml(item.reference)}</span>
        <span class="badge">${escapeHtml(item.reason)}</span>
      </div>
      <div class="muted-copy">${escapeHtml(item.prompt)}</div>
      <div class="reader-actions">
        <button type="button" class="ghost-button" data-memory-open="${escapeHtml(item.reference)}">Open</button>
        <button type="button" class="ghost-button" data-memory-copy="${escapeHtml(item.reference)}">Copy</button>
      </div>
    </div>
  `).join("");

  els.memoryReviewList.querySelectorAll("[data-memory-open]").forEach((button) => {
    button.addEventListener("click", async () => {
      const parsed = parseSimpleReference(button.dataset.memoryOpen);
      if (!parsed) {
        return;
      }
      await openReference(parsed.bookCode, parsed.chapter, parsed.verse);
    });
  });

  els.memoryReviewList.querySelectorAll("[data-memory-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const copied = await copyReferenceToClipboard(button.dataset.memoryCopy);
      flashButtonLabel(button, copied ? "Copied" : "Failed");
    });
  });
}

function buildMemoryReviewQueue() {
  const queue = [];
  const seen = new Set();
  const addReference = (reference, reason, prompt) => {
    if (!reference || seen.has(reference)) {
      return;
    }
    seen.add(reference);
    queue.push({
      reference,
      reason,
      prompt,
      highlight: getHighlightColorForReference(reference)
    });
  };

  state.bookmarks.slice(0, 5).forEach((reference) => {
    addReference(reference, describeMemoryReason(reference), buildMemoryPrompt(reference));
  });

  Object.keys(state.highlights).slice(0, 5).forEach((reference) => {
    addReference(reference, describeMemoryReason(reference), buildMemoryPrompt(reference));
  });

  (state.studyDesk.recentReferences || []).slice(0, 5).forEach((item) => {
    addReference(item.reference, describeMemoryReason(item.reference), buildMemoryPrompt(item.reference));
  });

  return queue.slice(0, 6);
}

function describeMemoryReason(reference) {
  const parts = [];
  if (state.bookmarks.includes(reference)) {
    parts.push("Bookmarked");
  }
  const highlight = getHighlightColorForReference(reference);
  if (highlight) {
    parts.push(`${capitalize(highlight)} highlight`);
  }
  if (state.notes[reference]) {
    parts.push("Has note");
  }
  if (!parts.length) {
    parts.push("Recent focus");
  }
  return parts.join(" | ");
}

function buildMemoryPrompt(reference) {
  const text = summarizePreview(getStoredReferenceText(reference), 120);
  if (text) {
    return `Say it in your own words first, then check the text: ${text}`;
  }
  return "Open the verse, say it back without looking, then copy it if you want to share it.";
}

function renderDeskBookmarks() {
  if (!state.bookmarks.length) {
    els.deskBookmarkList.innerHTML = '<div class="muted-copy">Bookmarks from the reader will appear here as a memory and review queue.</div>';
    return;
  }

  els.deskBookmarkList.innerHTML = state.bookmarks.slice(0, 8).map((reference) => {
    const highlight = getHighlightColorForReference(reference);
    return `
    <div class="bookmark-item"${highlight ? ` data-highlight-color="${highlight}"` : ""}>
      <strong>${escapeHtml(reference)}</strong>
      <div class="muted-copy">${highlight ? `${capitalize(highlight)} highlight | review queue` : "Review queue"}</div>
      <div class="reader-actions">
        <button type="button" class="ghost-button" data-desk-bookmark="${escapeHtml(reference)}">Open</button>
        <button type="button" class="ghost-button" data-desk-copy="${escapeHtml(reference)}">Copy</button>
      </div>
    </div>
  `;
  }).join("");

  els.deskBookmarkList.querySelectorAll("[data-desk-bookmark]").forEach((button) => {
    button.addEventListener("click", async () => {
      const parsed = parseSimpleReference(button.dataset.deskBookmark);
      if (!parsed) {
        return;
      }
      await openReference(parsed.bookCode, parsed.chapter, parsed.verse);
    });
  });

  els.deskBookmarkList.querySelectorAll("[data-desk-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const copied = await copyReferenceToClipboard(button.dataset.deskCopy);
      flashButtonLabel(button, copied ? "Copied" : "Failed");
    });
  });
}

function switchPanel(panelName) {
  const nextPanel = ["notifications", "support"].includes(panelName) ? "account" : (panelName || "home");
  const isHome = nextPanel === "home";
  if (state.account.activeModal && nextPanel !== "account") {
    closeAccountModal();
  }
  state.currentPanel = nextPanel;
  document.body.classList.toggle("view-home", isHome);
  document.body.classList.toggle("view-focus", !isHome);
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("is-active", !isHome && panel.dataset.panel === nextPanel);
  });
  document.querySelectorAll(".nav-chip").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.navTarget === nextPanel);
  });

  if (isHome) {
    window.scrollTo({ top: 0, behavior: getScrollBehavior() });
    return;
  }

  if (nextPanel === "journeys") {
    renderJourneys();
  }

  if (nextPanel === "browse") {
    renderBrowse();
  }

  if (nextPanel === "desk") {
    renderDesk();
  }

  if (nextPanel === "account") {
    renderAccount();
    renderNotifications();
    renderSupport();
  }

  window.scrollTo({ top: 0, behavior: getScrollBehavior() });
}

function jumpToAccountCard(cardId) {
  switchPanel("account");
  window.requestAnimationFrame(() => {
    const card = document.getElementById(cardId);
    if (!card) {
      return;
    }
    card.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
  });
}

function openAccountModal(modalName, sectionId = "") {
  if (!["settings", "more"].includes(modalName)) {
    return;
  }

  switchPanel("account");
  state.account.activeModal = modalName;
  document.body.classList.add("modal-open");
  els.settingsMenuModal.classList.toggle("is-hidden", modalName !== "settings");
  els.moreMenuModal.classList.toggle("is-hidden", modalName !== "more");
  els.settingsMenuModal.setAttribute("aria-hidden", modalName === "settings" ? "false" : "true");
  els.moreMenuModal.setAttribute("aria-hidden", modalName === "more" ? "false" : "true");

  if (modalName === "settings") {
    syncQuickSettingsControls();
    renderNotifications();
    renderSupport();
    window.requestAnimationFrame(() => {
      if (sectionId) {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: getScrollBehavior(),
          block: "start"
        });
        return;
      }
      els.quickLanguageSelect?.focus();
    });
  } else if (modalName === "more") {
    const focusTarget = [
      els.moreOpenCloudButton,
      els.moreOpenPasswordButton,
      els.moreOpenResetButton,
      els.moreOpenVerificationButton,
      els.moreOpenNotificationsButton,
      els.moreOpenSupportButton,
      els.moreExportDataButton,
      els.moreClearLocalDataButton,
      els.moreShareWebsiteButton,
      els.moreDonationButton,
      els.moreDeleteAccountButton
    ].find((button) => button && !button.disabled);
    focusTarget?.focus();
  }
}

function closeAccountModal() {
  state.account.activeModal = "";
  document.body.classList.remove("modal-open");
  els.settingsMenuModal.classList.add("is-hidden");
  els.moreMenuModal.classList.add("is-hidden");
  els.settingsMenuModal.setAttribute("aria-hidden", "true");
  els.moreMenuModal.setAttribute("aria-hidden", "true");
}

function resetQuickSettingsToDefaults() {
  els.quickDefaultPanel.value = "home";
  els.quickLanguageSelect.value = DEFAULT_READER_SETTINGS.readingLanguage;
  els.quickDisplayModeSelect.value = DEFAULT_READER_SETTINGS.displayMode;
  els.quickThemeSelect.value = DEFAULT_READER_SETTINGS.theme;
  els.quickTextSizeSelect.value = DEFAULT_READER_SETTINGS.textSize;
  els.quickMotionSelect.value = DEFAULT_READER_SETTINGS.motion;
  els.quickReaderWidthSelect.value = DEFAULT_READER_SETTINGS.readerWidth;
  els.quickShowVerseNumbers.checked = DEFAULT_READER_SETTINGS.showVerseNumbers;
  els.quickResumeLastReference.checked = DEFAULT_READER_SETTINGS.resumeLastReference;
  els.quickPushNotifications.checked = DEFAULT_READER_SETTINGS.pushNotifications;

  els.accountDefaultPanel.value = els.quickDefaultPanel.value;
  els.accountLanguage.value = els.quickLanguageSelect.value;
  els.accountDisplayMode.value = els.quickDisplayModeSelect.value;
  els.accountTheme.value = els.quickThemeSelect.value;
  els.accountTextSize.value = els.quickTextSizeSelect.value;
  els.accountMotion.value = els.quickMotionSelect.value;
  els.accountReaderWidth.value = els.quickReaderWidthSelect.value;
  if (els.accountSpeechVoice) {
    els.accountSpeechVoice.value = DEFAULT_READER_SETTINGS.speechVoice;
  }
  if (els.accountSpeechRate) {
    els.accountSpeechRate.value = String(DEFAULT_READER_SETTINGS.speechRate);
  }
  els.accountShowVerseNumbers.checked = els.quickShowVerseNumbers.checked;
  els.accountResumeLastReference.checked = els.quickResumeLastReference.checked;
  els.accountPushNotifications.checked = els.quickPushNotifications.checked;
  els.accountEmailNotifications.checked = DEFAULT_READER_SETTINGS.emailNotifications;

  applyDefaultPanelSetting(els.quickDefaultPanel.value);
  if (state.account.user) {
    state.account.user.settings = {
      ...(state.account.user.settings || {}),
      defaultPanel: els.quickDefaultPanel.value
    };
  }
  applyReaderSettings({
    readingLanguage: els.quickLanguageSelect.value,
    displayMode: els.quickDisplayModeSelect.value,
    theme: els.quickThemeSelect.value,
    textSize: els.quickTextSizeSelect.value,
    motion: els.quickMotionSelect.value,
    readerWidth: els.quickReaderWidthSelect.value,
    showVerseNumbers: els.quickShowVerseNumbers.checked,
    resumeLastReference: els.quickResumeLastReference.checked,
    pushNotifications: els.quickPushNotifications.checked,
    emailNotifications: els.accountEmailNotifications.checked,
    speechRate: Number(els.accountSpeechRate?.value || DEFAULT_READER_SETTINGS.speechRate),
    speechVoice: els.accountSpeechVoice?.value || DEFAULT_READER_SETTINGS.speechVoice
  });

  els.quickSettingsMeta.textContent = "Defaults restored. Save settings if you want them synced to your account.";
}

function toggleBookmark(reference) {
  const index = state.bookmarks.indexOf(reference);
  if (index === -1) {
    state.bookmarks.unshift(reference);
  } else {
    state.bookmarks.splice(index, 1);
  }
  saveLocal("kingsBibleCompass.bookmarks", state.bookmarks);
  renderBookmarks();
  if (state.focusedVerse) {
    els.bookmarkButton.textContent = state.bookmarks.includes(state.focusedVerse.reference) ? "Remove bookmark" : "Bookmark";
  }
}

function parseInitialRoute() {
  const params = new URLSearchParams(window.location.search);
  return {
    panel: params.get("panel") || "home",
    book: params.get("book") || "",
    chapter: Number(params.get("chapter") || 0),
    verse: Number(params.get("verse") || 0),
    journey: params.get("journey") || "",
    exact: params.get("exact") || "",
    word: params.get("word") || "",
    place: params.get("place") || "",
    resetToken: params.get("reset_token") || ""
  };
}

function resolveInitialRoute(route) {
  const hasIntent = route.book || route.chapter > 0 || route.verse > 0 || route.journey || route.exact || route.word || route.place || route.resetToken;
  if (hasIntent && route.panel === "home") {
    return {
      ...route,
      panel: inferPanelFromRoute(route)
    };
  }

  if (route.panel === "home") {
    return route;
  }

  if (route.book) {
    return route;
  }

  const last = state.studyDesk.lastReference;
  if (!last) {
    return route;
  }

  return {
    ...route,
    book: last.bookCode,
    chapter: last.chapter,
    verse: last.verse
  };
}

function inferPanelFromRoute(route) {
  if (route.journey) {
    return "journeys";
  }

  if (route.exact) {
    return "search";
  }

  if (route.word && route.panel === "concordance") {
    return "concordance";
  }

  if (route.word) {
    return "dictionary";
  }

  if (route.place) {
    return "atlas";
  }

  if (route.resetToken) {
    return "account";
  }

  return "read";
}

function applyReadRoute(route) {
  if (route.book && getBookByCode(route.book)) {
    state.selectedBookCode = route.book;
  }

  if (route.chapter > 0) {
    state.selectedChapter = route.chapter;
  }

  if (route.verse > 0) {
    state.pendingFocusVerse = route.verse;
  }

  els.bookSelect.value = state.selectedBookCode;
  populateChapterSelect();
  els.chapterSelect.value = String(state.selectedChapter);
}

async function openReference(bookCode, chapter, verse = 1) {
  switchPanel("read");
  state.selectedBookCode = bookCode;
  state.selectedChapter = Number(chapter);
  state.pendingFocusVerse = Number(verse || 1);
  els.bookSelect.value = bookCode;
  populateChapterSelect();
  els.chapterSelect.value = String(chapter);
  await loadChapter(bookCode, Number(chapter));
}

async function applyToolRoute(route) {
  if (route.panel === "notifications") {
    openAccountModal("settings", "settingsNotificationSection");
    return;
  }

  if (route.panel === "support") {
    openAccountModal("settings", "settingsSupportSection");
    return;
  }

  switchPanel(route.panel || "home");

  if (route.journey && JOURNEY_DATA.some((journey) => journey.id === route.journey)) {
    setActiveJourney(route.journey);
  }

  if (route.panel === "home") {
    return;
  }

  if (route.panel === "search" && route.exact) {
    document.getElementById("exactPhrase").value = route.exact;
    await runAdvancedSearch();
    return;
  }

  if (route.panel === "dictionary" && route.word) {
    els.dictionaryWord.value = route.word;
    await runWordStudy(route.word);
    return;
  }

  if (route.panel === "concordance" && route.word) {
    els.concordanceWord.value = route.word;
    await runConcordance(route.word);
    return;
  }

  if (route.panel === "journeys") {
    renderJourneys();
    return;
  }

  if (route.panel === "browse") {
    renderBrowse();
    return;
  }

  if (route.panel === "desk") {
    renderDesk();
    return;
  }

  if (route.panel === "account") {
    renderAccount();
    return;
  }

  if (route.panel === "atlas" && route.place) {
    els.atlasPlace.value = route.place;
    await runAtlasStudy(route.place);
  }
}

function hydrateStudyDesk(raw) {
  return {
    ...DEFAULT_STUDY_DESK,
    ...(raw || {}),
    completedJourneySteps: { ...(DEFAULT_STUDY_DESK.completedJourneySteps || {}), ...(raw?.completedJourneySteps || {}) },
    savedSearches: Array.isArray(raw?.savedSearches) ? raw.savedSearches : [],
    recentReferences: Array.isArray(raw?.recentReferences) ? raw.recentReferences : [],
    recentWordStudies: Array.isArray(raw?.recentWordStudies) ? raw.recentWordStudies : [],
    recentPlaces: Array.isArray(raw?.recentPlaces) ? raw.recentPlaces : []
  };
}

function persistStudyDesk() {
  saveLocal("kingsBibleCompass.studyDesk", state.studyDesk);
  renderSpotlights();
}

function updateDeskStatus(includeTimestamp = true) {
  els.deskStatus.textContent = includeTimestamp
    ? `Saved ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`
    : "Saved locally";
}

function getActiveJourney() {
  return JOURNEY_DATA.find((journey) => journey.id === state.studyDesk.activeJourneyId) || JOURNEY_DATA[0] || null;
}

function setActiveJourney(journeyId) {
  state.studyDesk.activeJourneyId = journeyId;
  persistStudyDesk();
  renderBrowse();
  renderJourneys();
  renderSpotlights();
}

function getJourneyProgress(journey) {
  const completed = state.studyDesk.completedJourneySteps?.[journey.id] || [];
  const done = completed.length;
  const total = journey.steps.length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  return { done, total, percent };
}

function isJourneyStepDone(journeyId, index) {
  return Boolean(state.studyDesk.completedJourneySteps?.[journeyId]?.includes(index));
}

function toggleJourneyStep(journeyId, index) {
  const existing = new Set(state.studyDesk.completedJourneySteps?.[journeyId] || []);
  const wasDone = existing.has(index);
  if (existing.has(index)) {
    existing.delete(index);
  } else {
    existing.add(index);
  }
  state.studyDesk.completedJourneySteps[journeyId] = Array.from(existing).sort((left, right) => left - right);
  persistStudyDesk();
  renderBrowse();
  renderJourneys();
  renderSpotlights();

  const journey = JOURNEY_DATA.find((item) => item.id === journeyId);
  const progress = journey ? getJourneyProgress(journey) : null;
  if (!wasDone && journey) {
    pushNotification({
      title: `${journey.title} updated`,
      message: progress?.percent === 100
        ? `${journey.title} is complete.`
        : `${journey.title} progress is now ${progress?.percent || 0}%.`,
      type: "journey",
      email: progress?.percent === 100,
      persist: progress?.percent === 100
    });
  }
}

function getDailyFocus() {
  if (!DAILY_FOCUS_DATA.length) {
    return null;
  }

  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const dayOfYear = Math.floor(diff / 86400000);
  const seed = today.getFullYear() * 400 + dayOfYear;
  return DAILY_FOCUS_DATA[seed % DAILY_FOCUS_DATA.length];
}

function recordReferenceVisit(verse) {
  const translation = getTranslationLabel(state.selectedTranslation) || "Snapshot reader";
  const payload = {
    reference: verse.reference,
    bookCode: state.selectedBookCode,
    chapter: state.selectedChapter,
    verse: verse.verseNumber,
    text: verse.text,
    translation
  };

  state.studyDesk.lastReference = payload;
  state.studyDesk.recentReferences = [
    payload,
    ...state.studyDesk.recentReferences.filter((item) => item.reference !== payload.reference)
  ].slice(0, 8);

  persistStudyDesk();
  renderSpotlights();
  renderDesk();
}

function rememberRecentValue(key, value) {
  const list = state.studyDesk[key] || [];
  state.studyDesk[key] = [value, ...list.filter((item) => item.toLowerCase() !== value.toLowerCase())].slice(0, 8);
  persistStudyDesk();
  renderDesk();
}

function recordWordStudy(word) {
  rememberRecentValue("recentWordStudies", word);
}

function recordPlaceStudy(place) {
  rememberRecentValue("recentPlaces", place);
}

function saveCurrentSearch() {
  const payload = getCurrentSearchPayload();
  if (!payload.query) {
    els.searchStatus.textContent = "Build a search first, then save it.";
    return;
  }

  const label = payload.exactPhrase || payload.allWords || payload.moreWords || payload.noWords || payload.query;
  state.studyDesk.savedSearches = [
    {
      label: label.length > 42 ? `${label.slice(0, 39)}...` : label,
      query: payload.query,
      filter: payload.filter || "All books",
      exactPhrase: payload.exactPhrase,
      allWords: payload.allWords,
      moreWords: payload.moreWords,
      noWords: payload.noWords
    },
    ...state.studyDesk.savedSearches
  ].slice(0, 8);

  persistStudyDesk();
  renderDesk();
  els.searchStatus.textContent = "Search saved to Study Desk.";
}

function getCurrentSearchPayload() {
  const exactPhrase = document.getElementById("exactPhrase").value.trim();
  const allWords = document.getElementById("allWords").value.trim();
  const moreWords = document.getElementById("moreWords").value.trim();
  const noWords = document.getElementById("noWords").value.trim();
  const filter = els.searchFilter.value;

  return {
    exactPhrase,
    allWords,
    moreWords,
    noWords,
    filter,
    query: buildBooleanQuery({ exactPhrase, allWords, moreWords, noWords })
  };
}

function applySavedSearch(search) {
  document.getElementById("exactPhrase").value = search.exactPhrase || "";
  document.getElementById("allWords").value = search.allWords || "";
  document.getElementById("moreWords").value = search.moreWords || "";
  document.getElementById("noWords").value = search.noWords || "";
  els.searchFilter.value = search.filter && search.filter !== "All books" ? search.filter : "";
}

function applySnapshotFilter(items, filter) {
  if (!filter) {
    return items;
  }
  if (filter === "Old Testament" || filter === "New Testament") {
    return items.filter((item) => item.testament === filter);
  }
  return items.filter((item) => item.bookName === filter);
}

function buildBooleanQuery(input) {
  const parts = [];

  if (input.exactPhrase) {
    parts.push(`"${sanitizeBooleanTerm(input.exactPhrase)}"`);
  }

  const allWords = splitTerms(input.allWords);
  allWords.forEach((word) => parts.push(sanitizeBooleanTerm(word)));

  const anyWords = splitTerms(input.moreWords);
  if (anyWords.length === 1) {
    parts.push(sanitizeBooleanTerm(anyWords[0]));
  } else if (anyWords.length > 1) {
    parts.push(`(${anyWords.map(sanitizeBooleanTerm).join(" OR ")})`);
  }

  if (!parts.length) {
    return "";
  }

  let query = parts.join(" AND ");
  const excludedWords = splitTerms(input.noWords);
  if (excludedWords.length === 1) {
    query = `(${query}) AND NOT ${sanitizeBooleanTerm(excludedWords[0])}`;
  } else if (excludedWords.length > 1) {
    query = `(${query}) AND NOT (${excludedWords.map(sanitizeBooleanTerm).join(" OR ")})`;
  }

  return query;
}

function splitTerms(value) {
  return value
    .split(/\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function sanitizeBooleanTerm(value) {
  return value.replace(/[()"]/g, "").trim();
}

function formatReferenceFromDataset(ref) {
  const book = getBookByCode(ref.book)?.name || ref.book;
  if (ref.endVerse && ref.endVerse !== ref.verse) {
    return `${book} ${ref.chapter}:${ref.verse}-${ref.endVerse}`;
  }
  return `${book} ${ref.chapter}:${ref.verse}`;
}

function parseSimpleReference(reference) {
  const match = reference.match(/^(?<book>.+?)\s+(?<chapter>\d+):(?<verse>\d+)/);
  if (!match?.groups) {
    return null;
  }
  const book = getBookByName(match.groups.book.trim());
  if (!book) {
    return null;
  }
  return {
    bookCode: book.code,
    chapter: Number(match.groups.chapter),
    verse: Number(match.groups.verse)
  };
}

function getCurrentBookChapterCount() {
  const liveBook = state.translationBooks.find((book) => book.id === state.selectedBookCode);
  if (liveBook?.numberOfChapters) {
    return Number(liveBook.numberOfChapters);
  }
  const snapshotGenesis = state.snapshot?.sampleChapter?.chapterCount;
  if (state.selectedBookCode === "GEN" && snapshotGenesis) {
    return Number(snapshotGenesis);
  }
  return 1;
}

function setReaderStatus(message) {
  els.readerStatus.textContent = message;
}

function getBookByCode(code) {
  return BOOK_CATALOG.find((book) => book.code === code) || null;
}

function getBookById(id) {
  return BOOK_CATALOG.find((book) => book.id === id) || null;
}

function getBookByName(name) {
  return BOOK_CATALOG.find((book) => book.name.toLowerCase() === String(name).toLowerCase()) || null;
}

function getTranslationLabel(id) {
  return state.translations.find((translation) => translation.id === id)?.englishName || id;
}

function getCommentaryLabel(id) {
  if (!id) {
    return "No commentary";
  }
  return state.commentaries.find((commentary) => commentary.id === id)?.englishName || id;
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`);
  }
  return response.json();
}

async function requestApi(url, options = {}) {
  const targetUrl = new URL(url, window.location.origin);
  if (options.cacheBust) {
    targetUrl.searchParams.set("_ts", Date.now().toString());
  }

  const headers = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(targetUrl.toString(), {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: "same-origin",
    cache: options.cache || "no-store"
  });

  let payload = {};
  try {
    payload = await response.json();
  } catch (error) {
    payload = {};
  }

  if (!response.ok) {
    const error = new Error(payload.message || `Request failed (${response.status}).`);
    error.status = response.status;
    error.code = payload.error || "";
    error.payload = payload;
    throw error;
  }

  return payload;
}

function renderRichContent(content) {
  if (!Array.isArray(content)) {
    return renderLooseEntry(content);
  }
  return content.map((node) => renderLooseEntry(node)).join("");
}

function renderLooseEntry(node) {
  if (node === null || node === undefined) {
    return "";
  }
  if (typeof node === "string") {
    return escapeHtml(node);
  }
  if (Array.isArray(node)) {
    return node.map((item) => renderLooseEntry(item)).join("");
  }

  const inner = renderLooseEntry(node.content || node.children || "");
  switch (node.type) {
    case "italic":
      return `<em>${inner}</em>`;
    case "bold":
      return `<strong>${inner}</strong>`;
    case "line-break":
      return "<br>";
    case "note":
      return `<mark>${inner}</mark>`;
    case "heading":
    case "title":
    case "section":
      return `<strong>${inner}</strong>`;
    case "quote":
    case "paragraph":
    default:
      return inner;
  }
}

function stripMarkup(value) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = value;
  return wrapper.textContent.trim();
}

function allowMarks(value) {
  const wrapper = document.createElement("div");
  wrapper.textContent = value;
  let html = wrapper.innerHTML;
  html = html.replace(/&lt;mark&gt;/g, "<mark>").replace(/&lt;\/mark&gt;/g, "</mark>");
  return html;
}

function summarizePreview(value, maxLength = 156) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength - 3).trim()}...`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function loadLocal(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn("Unable to read local storage.", error);
    return fallback;
  }
}

function saveLocal(key, value, options = {}) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    if (!options.suppressSync && ["kingsBibleCompass.bookmarks", "kingsBibleCompass.highlights", "kingsBibleCompass.notes", "kingsBibleCompass.studyDesk"].includes(key)) {
      scheduleAccountSync();
    }
  } catch (error) {
    console.warn("Unable to write local storage.", error);
  }
}

function getDefaultPanelSetting() {
  const saved = loadLocal("kingsBibleCompass.defaultPanel", "home");
  return isValidPanelName(saved) ? saved : "home";
}

function getShowVerseNumbersSetting() {
  return loadLocal("kingsBibleCompass.showVerseNumbers", DEFAULT_READER_SETTINGS.showVerseNumbers) !== false;
}

function getResumeLastReferenceSetting() {
  return loadLocal("kingsBibleCompass.resumeLastReference", DEFAULT_READER_SETTINGS.resumeLastReference) === true;
}

function getReadingLanguageSetting() {
  return loadLocal("kingsBibleCompass.readingLanguage", DEFAULT_READER_SETTINGS.readingLanguage) || DEFAULT_READER_SETTINGS.readingLanguage;
}

function getDisplayModeSetting() {
  const value = loadLocal("kingsBibleCompass.displayMode", DEFAULT_READER_SETTINGS.displayMode);
  return ["study", "simple"].includes(value) ? value : DEFAULT_READER_SETTINGS.displayMode;
}

function getPushNotificationSetting() {
  return loadLocal("kingsBibleCompass.pushNotifications", DEFAULT_READER_SETTINGS.pushNotifications) === true;
}

function getEmailNotificationSetting() {
  return loadLocal("kingsBibleCompass.emailNotifications", DEFAULT_READER_SETTINGS.emailNotifications) === true;
}

function getSpeechVoiceSetting() {
  return loadLocal("kingsBibleCompass.speechVoice", DEFAULT_READER_SETTINGS.speechVoice) || "";
}

function getSpeechRateSetting() {
  const value = Number(loadLocal("kingsBibleCompass.speechRate", DEFAULT_READER_SETTINGS.speechRate));
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_READER_SETTINGS.speechRate;
}

function getLanguageLabel(code) {
  const labels = {
    eng: "English",
    spa: "Spanish",
    fra: "French",
    deu: "German",
    por: "Portuguese",
    ita: "Italian",
    nld: "Dutch",
    fin: "Finnish",
    swe: "Swedish",
    nor: "Norwegian",
    rus: "Russian",
    ukr: "Ukrainian",
    pol: "Polish",
    ron: "Romanian",
    hun: "Hungarian",
    ces: "Czech",
    slk: "Slovak",
    tur: "Turkish",
    ara: "Arabic",
    heb: "Hebrew",
    ell: "Greek",
    hin: "Hindi",
    ind: "Indonesian",
    jpn: "Japanese",
    kor: "Korean",
    zho: "Chinese"
  };
  const normalized = String(code || "").trim().toLowerCase();
  return labels[normalized] || normalized.toUpperCase() || "Language";
}

function applyDefaultPanelSetting(panel) {
  const resolved = isValidPanelName(panel) ? panel : "home";
  saveLocal("kingsBibleCompass.defaultPanel", resolved, { suppressSync: true });
  if (els.accountDefaultPanel) {
    els.accountDefaultPanel.value = resolved;
  }
  if (els.quickDefaultPanel) {
    els.quickDefaultPanel.value = resolved;
  }
}

async function applyLanguageSetting(language) {
  const available = state.availableLanguages.map((item) => item.code);
  const resolved = available.includes(language) ? language : (available[0] || DEFAULT_READER_SETTINGS.readingLanguage);
  saveLocal("kingsBibleCompass.readingLanguage", resolved, { suppressSync: true });
  document.documentElement.lang = resolved.slice(0, 2) || "en";
  if (els.readerLanguageSelect) {
    els.readerLanguageSelect.value = resolved;
  }
  if (els.accountLanguage) {
    els.accountLanguage.value = resolved;
  }
  if (els.quickLanguageSelect) {
    els.quickLanguageSelect.value = resolved;
  }

  if (state.translations.length) {
    syncTranslationSelect();
    syncCompareTranslationOptions();
    await loadTranslationBooks(state.selectedTranslation);
    await loadChapter(state.selectedBookCode, state.selectedChapter);
  }
  renderBrowse();
  renderSupport();
}

function applyDisplayModeSetting(mode) {
  const resolved = ["study", "simple"].includes(mode) ? mode : DEFAULT_READER_SETTINGS.displayMode;
  document.body.dataset.displayMode = resolved;
  saveLocal("kingsBibleCompass.displayMode", resolved, { suppressSync: true });
  if (els.readerDisplayModeSelect) {
    els.readerDisplayModeSelect.value = resolved;
  }
  if (els.accountDisplayMode) {
    els.accountDisplayMode.value = resolved;
  }
  if (els.quickDisplayModeSelect) {
    els.quickDisplayModeSelect.value = resolved;
  }
  renderChapter();
}

function applyThemeSetting(theme) {
  const resolved = ["sepia", "light", "dark"].includes(theme) ? theme : DEFAULT_READER_SETTINGS.theme;
  document.body.dataset.theme = resolved;
  saveLocal("kingsBibleCompass.theme", resolved, { suppressSync: true });
}

function applyTextSizeSetting(size) {
  const resolved = ["compact", "comfortable", "large"].includes(size) ? size : DEFAULT_READER_SETTINGS.textSize;
  document.body.dataset.readerSize = resolved;
  saveLocal("kingsBibleCompass.readerTextSize", resolved, { suppressSync: true });
}

function applyMotionSetting(mode) {
  const resolved = ["enhanced", "subtle", "reduced"].includes(mode) ? mode : DEFAULT_READER_SETTINGS.motion;
  document.body.dataset.motion = resolved;
  saveLocal("kingsBibleCompass.motion", resolved, { suppressSync: true });
}

function applyReaderWidthSetting(width) {
  const resolved = ["narrow", "standard", "wide"].includes(width) ? width : DEFAULT_READER_SETTINGS.readerWidth;
  document.body.dataset.readerWidth = resolved;
  saveLocal("kingsBibleCompass.readerWidth", resolved, { suppressSync: true });
}

function applyVerseNumberSetting(value) {
  const resolved = value !== false;
  document.body.dataset.showVerseNumbers = resolved ? "true" : "false";
  saveLocal("kingsBibleCompass.showVerseNumbers", resolved, { suppressSync: true });
}

function applyResumeLastReferenceSetting(value) {
  const resolved = value === true;
  saveLocal("kingsBibleCompass.resumeLastReference", resolved, { suppressSync: true });
}

function applyPushNotificationSetting(value) {
  const resolved = value === true;
  saveLocal("kingsBibleCompass.pushNotifications", resolved, { suppressSync: true });
}

function applyEmailNotificationSetting(value) {
  const resolved = value === true;
  saveLocal("kingsBibleCompass.emailNotifications", resolved, { suppressSync: true });
}

function applySpeechVoiceSetting(value) {
  const resolved = typeof value === "string" ? value : DEFAULT_READER_SETTINGS.speechVoice;
  saveLocal("kingsBibleCompass.speechVoice", resolved, { suppressSync: true });
}

function applySpeechRateSetting(value) {
  const resolved = Number.isFinite(Number(value)) ? Number(value) : DEFAULT_READER_SETTINGS.speechRate;
  saveLocal("kingsBibleCompass.speechRate", resolved, { suppressSync: true });
}

function applyReaderSettings(settings = {}) {
  if (typeof settings.readingLanguage !== "undefined") {
    saveLocal("kingsBibleCompass.readingLanguage", settings.readingLanguage, { suppressSync: true });
    document.documentElement.lang = String(settings.readingLanguage || "en").slice(0, 2) || "en";
  }
  if (typeof settings.displayMode !== "undefined") {
    applyDisplayModeSetting(settings.displayMode);
  }
  applyThemeSetting(settings.theme);
  applyTextSizeSetting(settings.textSize);
  applyMotionSetting(settings.motion);
  applyReaderWidthSetting(settings.readerWidth);
  applyVerseNumberSetting(settings.showVerseNumbers);
  if (typeof settings.resumeLastReference !== "undefined") {
    applyResumeLastReferenceSetting(settings.resumeLastReference);
  }
  if (typeof settings.pushNotifications !== "undefined") {
    applyPushNotificationSetting(settings.pushNotifications);
  }
  if (typeof settings.emailNotifications !== "undefined") {
    applyEmailNotificationSetting(settings.emailNotifications);
  }
  if (typeof settings.speechVoice !== "undefined") {
    applySpeechVoiceSetting(settings.speechVoice);
  }
  if (typeof settings.speechRate !== "undefined") {
    applySpeechRateSetting(settings.speechRate);
  }
  syncReaderSettingControls();
  syncQuickSettingsControls();
  populateSpeechVoiceControls();
  updateReaderPreferenceMeta();
}

function syncReaderSettingControls() {
  if (els.readerLanguageSelect) {
    els.readerLanguageSelect.value = getReadingLanguageSetting();
  }
  if (els.readerDisplayModeSelect) {
    els.readerDisplayModeSelect.value = getDisplayModeSetting();
  }
  if (els.readerThemeSelect) {
    els.readerThemeSelect.value = document.body.dataset.theme || DEFAULT_READER_SETTINGS.theme;
  }
  if (els.readerTextSizeSelect) {
    els.readerTextSizeSelect.value = document.body.dataset.readerSize || DEFAULT_READER_SETTINGS.textSize;
  }
  if (els.readerMotionSelect) {
    els.readerMotionSelect.value = document.body.dataset.motion || DEFAULT_READER_SETTINGS.motion;
  }
  if (els.accountTheme) {
    els.accountTheme.value = document.body.dataset.theme || DEFAULT_READER_SETTINGS.theme;
  }
  if (els.accountDefaultPanel) {
    els.accountDefaultPanel.value = state.account.user?.settings?.defaultPanel || getDefaultPanelSetting();
  }
  if (els.accountLanguage) {
    els.accountLanguage.value = getReadingLanguageSetting();
  }
  if (els.accountDisplayMode) {
    els.accountDisplayMode.value = getDisplayModeSetting();
  }
  if (els.accountTextSize) {
    els.accountTextSize.value = document.body.dataset.readerSize || DEFAULT_READER_SETTINGS.textSize;
  }
  if (els.accountMotion) {
    els.accountMotion.value = document.body.dataset.motion || DEFAULT_READER_SETTINGS.motion;
  }
  if (els.accountReaderWidth) {
    els.accountReaderWidth.value = document.body.dataset.readerWidth || DEFAULT_READER_SETTINGS.readerWidth;
  }
  if (els.accountShowVerseNumbers) {
    els.accountShowVerseNumbers.checked = getShowVerseNumbersSetting();
  }
  if (els.accountResumeLastReference) {
    els.accountResumeLastReference.checked = getResumeLastReferenceSetting();
  }
  if (els.accountPushNotifications) {
    els.accountPushNotifications.checked = getPushNotificationSetting();
  }
  if (els.accountEmailNotifications) {
    els.accountEmailNotifications.checked = getEmailNotificationSetting();
  }
  if (els.accountSpeechVoice) {
    els.accountSpeechVoice.value = getSpeechVoiceSetting();
  }
  if (els.accountSpeechRate) {
    els.accountSpeechRate.value = String(getSpeechRateSetting());
  }
}

function syncQuickSettingsControls() {
  if (els.quickDefaultPanel) {
    els.quickDefaultPanel.value = state.account.user?.settings?.defaultPanel || getDefaultPanelSetting();
  }
  if (els.quickLanguageSelect) {
    els.quickLanguageSelect.value = getReadingLanguageSetting();
  }
  if (els.quickDisplayModeSelect) {
    els.quickDisplayModeSelect.value = getDisplayModeSetting();
  }
  if (els.quickThemeSelect) {
    els.quickThemeSelect.value = document.body.dataset.theme || DEFAULT_READER_SETTINGS.theme;
  }
  if (els.quickTextSizeSelect) {
    els.quickTextSizeSelect.value = document.body.dataset.readerSize || DEFAULT_READER_SETTINGS.textSize;
  }
  if (els.quickMotionSelect) {
    els.quickMotionSelect.value = document.body.dataset.motion || DEFAULT_READER_SETTINGS.motion;
  }
  if (els.quickReaderWidthSelect) {
    els.quickReaderWidthSelect.value = document.body.dataset.readerWidth || DEFAULT_READER_SETTINGS.readerWidth;
  }
  if (els.quickShowVerseNumbers) {
    els.quickShowVerseNumbers.checked = getShowVerseNumbersSetting();
  }
  if (els.quickResumeLastReference) {
    els.quickResumeLastReference.checked = getResumeLastReferenceSetting();
  }
  if (els.quickPushNotifications) {
    els.quickPushNotifications.checked = getPushNotificationSetting();
  }
}

async function updateReaderSetting(key, value) {
  if (key === "readingLanguage") {
    await applyLanguageSetting(value);
  } else if (key === "displayMode") {
    applyDisplayModeSetting(value);
  } else if (key === "theme") {
    applyThemeSetting(value);
  } else if (key === "textSize") {
    applyTextSizeSetting(value);
  } else if (key === "motion") {
    applyMotionSetting(value);
  } else if (key === "readerWidth") {
    applyReaderWidthSetting(value);
  } else if (key === "showVerseNumbers") {
    applyVerseNumberSetting(value);
  } else if (key === "resumeLastReference") {
    applyResumeLastReferenceSetting(value);
  } else if (key === "pushNotifications") {
    applyPushNotificationSetting(value);
  } else if (key === "emailNotifications") {
    applyEmailNotificationSetting(value);
  } else if (key === "speechVoice") {
    applySpeechVoiceSetting(value);
  } else if (key === "speechRate") {
    applySpeechRateSetting(value);
  }

  syncReaderSettingControls();
  syncQuickSettingsControls();
  renderBrowse();
  renderNotifications();
  renderSupport();

  if (state.account.user) {
    state.account.user.settings = {
      ...(state.account.user.settings || {}),
      ...getCurrentReaderSettings(),
      defaultPanel: state.account.user.settings?.defaultPanel || getDefaultPanelSetting()
    };
    updateReaderPreferenceMeta("Saving to your account...");
    if (els.quickSettingsMeta) {
      els.quickSettingsMeta.textContent = "Changes applied. Save settings to sync them to your account.";
    }
    scheduleAccountSettingsSync();
  } else {
    updateReaderPreferenceMeta("Saved locally for this browser.");
    if (els.quickSettingsMeta) {
      els.quickSettingsMeta.textContent = "Changes applied and saved locally for this browser.";
    }
  }
}

function getCurrentReaderSettings() {
  return {
    readingLanguage: getReadingLanguageSetting(),
    displayMode: getDisplayModeSetting(),
    theme: document.body.dataset.theme || DEFAULT_READER_SETTINGS.theme,
    textSize: document.body.dataset.readerSize || DEFAULT_READER_SETTINGS.textSize,
    motion: document.body.dataset.motion || DEFAULT_READER_SETTINGS.motion,
    readerWidth: document.body.dataset.readerWidth || DEFAULT_READER_SETTINGS.readerWidth,
    showVerseNumbers: getShowVerseNumbersSetting(),
    resumeLastReference: getResumeLastReferenceSetting(),
    pushNotifications: getPushNotificationSetting(),
    emailNotifications: getEmailNotificationSetting(),
    speechVoice: getSpeechVoiceSetting(),
    speechRate: getSpeechRateSetting()
  };
}

function updateReaderPreferenceMeta(message) {
  if (!els.readerPreferenceMeta) {
    return;
  }

  if (message) {
    els.readerPreferenceMeta.textContent = message;
    return;
  }

  els.readerPreferenceMeta.textContent = state.account.user
    ? "Saved locally and synced to your account."
    : "Saved locally for this browser.";
}

function scheduleAccountSettingsSync() {
  if (!state.account.user) {
    return;
  }

  clearTimeout(state.account.settingsTimer);
  state.account.settingsTimer = setTimeout(() => {
    syncReaderSettingsToAccount(true).catch((error) => {
      console.warn("Unable to sync reader settings.", error);
      updateReaderPreferenceMeta("Saved locally. Account sync failed.");
    });
  }, 240);
}

async function syncReaderSettingsToAccount(quiet = true) {
  if (!state.account.user) {
    return;
  }

  const payload = {
    displayName: state.account.user.displayName,
    settings: {
      ...(state.account.user.settings || {}),
      defaultPanel: state.account.user.settings?.defaultPanel || getDefaultPanelSetting(),
      ...getCurrentReaderSettings()
    }
  };

  const data = await requestApi("/api/account/settings", {
    method: "POST",
    body: payload
  });

  state.account.user = data.user || state.account.user;
  syncReaderSettingControls();
  syncQuickSettingsControls();
  updateReaderPreferenceMeta(quiet ? undefined : (data.message || "Reader settings saved."));
}

function getScrollBehavior() {
  return document.body.dataset.motion === "reduced" ? "auto" : "smooth";
}

function capitalize(value) {
  const text = String(value || "");
  return text ? `${text[0].toUpperCase()}${text.slice(1)}` : "";
}

function getMostFrequentValue(values) {
  const counts = new Map();
  values.filter(Boolean).forEach((value) => {
    counts.set(value, (counts.get(value) || 0) + 1);
  });

  let winner = "";
  let winnerCount = 0;
  counts.forEach((count, value) => {
    if (count > winnerCount) {
      winner = value;
      winnerCount = count;
    }
  });
  return winner;
}

function isValidPanelName(value) {
  return ["home", "read", "browse", "journeys", "desk", "notifications", "account", "search", "dictionary", "concordance", "atlas", "library", "support"].includes(String(value || ""));
}

function getAccountInitials(value) {
  const words = String(value || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) {
    return "SJ";
  }

  return words.slice(0, 2).map((item) => item[0].toUpperCase()).join("");
}

function formatRelativeTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "just now";
  }

  const diff = Date.now() - date.getTime();
  const minutes = Math.round(diff / 60000);
  if (minutes <= 1) {
    return "just now";
  }
  if (minutes < 60) {
    return `${minutes} min ago`;
  }
  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return `${hours} hr ago`;
  }
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function hasExplicitPanelRequest() {
  return new URLSearchParams(window.location.search).has("panel");
}

function consumeAuthMessage() {
  const params = new URLSearchParams(window.location.search);
  const message = params.get("auth_message");
  if (!message) {
    return "";
  }

  params.delete("auth_message");
  const nextQuery = params.toString();
  const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", nextUrl);
  return message;
}

function consumeResetToken() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("reset_token");
  if (!token) {
    return "";
  }

  params.delete("reset_token");
  const nextQuery = params.toString();
  const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", nextUrl);
  return token;
}

function consumeVerificationEmail() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("verify_email");
  if (!email) {
    return "";
  }

  params.delete("verify_email");
  const nextQuery = params.toString();
  const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", nextUrl);
  return email;
}
