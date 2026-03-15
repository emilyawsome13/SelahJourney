(function () {
  "use strict";

  const details = [
    {
      slug: "bible-stories",
      title: "Bible Stories",
      kicker: "Narrative Arcs",
      motif: "Story Paths",
      pattern: "arch",
      palette: { start: "#20364f", end: "#a04f39", accent: "#f4c56c", ink: "#fff7eb" },
      summary: "A narrative-first doorway into Scripture that helps you trace covenant, deliverance, kingdom, exile, and restoration.",
      overview: "Use this page when you want story before system. Bible stories carry doctrine inside movement, conflict, and memory, so this path helps you see how major scenes connect instead of reading them as isolated moments.",
      highlights: [
        "Track the movement from creation to covenant to kingdom to gospel fulfillment.",
        "Read stories as theological structure, not just familiar scenes.",
        "Use narrative context before topical or word-level study."
      ],
      references: [
        { label: "Genesis 12:1", book: "GEN", chapter: 12, verse: 1 },
        { label: "Exodus 14:13", book: "EXO", chapter: 14, verse: 13 },
        { label: "Luke 15:20", book: "LUK", chapter: 15, verse: 20 }
      ],
      actions: [
        { label: "Open Genesis 37", panel: "read", book: "GEN", chapter: 37, verse: 3 },
        { label: "Search covenant", panel: "search", exact: "covenant" },
        { label: "Study Egypt", panel: "atlas", place: "Egypt" }
      ]
    },
    {
      slug: "bible-topics",
      title: "Bible Topics",
      kicker: "Theme Trails",
      motif: "Topic Threads",
      pattern: "grid",
      palette: { start: "#2a3d39", end: "#8b5a3c", accent: "#f1d08f", ink: "#fbf7ef" },
      summary: "A thematic study lane for tracing ideas like faith, grace, prayer, holiness, mercy, and wisdom across the whole Bible.",
      overview: "Topic work is strongest when you move beyond proof-texts and compare how a theme develops across testaments. This page is for building that habit with guided starting points.",
      highlights: [
        "Compare how one theme appears in law, poetry, prophets, gospel, and epistles.",
        "Balance verse collection with context and progression.",
        "Use topics to connect doctrine with daily practice."
      ],
      references: [
        { label: "Micah 6:8", book: "MIC", chapter: 6, verse: 8 },
        { label: "Matthew 5:6", book: "MAT", chapter: 5, verse: 6 },
        { label: "James 1:5", book: "JAS", chapter: 1, verse: 5 }
      ],
      actions: [
        { label: "Search faith", panel: "search", exact: "faith" },
        { label: "Study grace", panel: "dictionary", word: "grace" },
        { label: "Concordance love", panel: "concordance", word: "love" }
      ]
    },
    {
      slug: "bible-history",
      title: "Bible History",
      kicker: "Time Layers",
      motif: "History Lines",
      pattern: "strata",
      palette: { start: "#334259", end: "#70503b", accent: "#d6b56c", ink: "#fff8f0" },
      summary: "A context page for chronology, empire shifts, temple moments, exile, return, and the historical setting of the biblical books.",
      overview: "Historical framing keeps the Bible from flattening into timeless sayings only. This study lane helps you place events, prophets, kings, and apostles inside real periods and pressures.",
      highlights: [
        "Anchor books to people, places, and political moments.",
        "Understand exile, return, and Roman-era background more clearly.",
        "Use history to sharpen interpretation rather than replace it."
      ],
      references: [
        { label: "2 Kings 25:9", book: "2KI", chapter: 25, verse: 9 },
        { label: "Ezra 1:1", book: "EZR", chapter: 1, verse: 1 },
        { label: "Luke 2:1", book: "LUK", chapter: 2, verse: 1 }
      ],
      actions: [
        { label: "Open Ezra 1", panel: "read", book: "EZR", chapter: 1, verse: 1 },
        { label: "Search king", panel: "search", exact: "king" },
        { label: "Study Jerusalem", panel: "atlas", place: "Jerusalem" }
      ]
    },
    {
      slug: "king-james-bible-preface",
      title: "King James Bible Preface",
      kicker: "Translator Frame",
      motif: "Preface Light",
      pattern: "window",
      palette: { start: "#26424a", end: "#966148", accent: "#f0cc82", ink: "#fff8ee" },
      summary: "A reading page for the translator preface that frames the aims, humility, and editorial posture behind the KJV work.",
      overview: "The preface matters because it keeps the translation project from being mythologized. It shows deliberate labor, revision, comparison, and dependence on prior work rather than romantic isolation.",
      highlights: [
        "Read the KJV as a revision project with stated aims.",
        "Notice the translators' tone of humility and argument.",
        "Use the preface to interpret later claims about the KJV more carefully."
      ],
      references: [
        { label: "Psalm 119:105", book: "PSA", chapter: 119, verse: 105 },
        { label: "Proverbs 25:2", book: "PRO", chapter: 25, verse: 2 },
        { label: "2 Timothy 3:16", book: "2TI", chapter: 3, verse: 16 }
      ],
      actions: [
        { label: "Search word", panel: "search", exact: "word" },
        { label: "Study truth", panel: "dictionary", word: "truth" },
        { label: "Open Psalm 119", panel: "read", book: "PSA", chapter: 119, verse: 105 }
      ]
    },
    {
      slug: "the-translators-speech",
      title: "The Translators Speech",
      kicker: "Voice and Method",
      motif: "Measured Voice",
      pattern: "rays",
      palette: { start: "#27384d", end: "#a45e43", accent: "#f5c76d", ink: "#fff8ed" },
      summary: "A study lane for translator tone, rhetoric, and method as the project explains itself in its own voice.",
      overview: "This page is less about slogan and more about posture. The translators defend the labor of translation while also rejecting vanity around the labor itself, which is worth noticing carefully.",
      highlights: [
        "Study method and rhetoric together.",
        "Compare confidence in Scripture with humility in translation practice.",
        "Use translator language to test modern arguments about the text."
      ],
      references: [
        { label: "Ecclesiastes 12:10", book: "ECC", chapter: 12, verse: 10 },
        { label: "2 Timothy 2:15", book: "2TI", chapter: 2, verse: 15 },
        { label: "Colossians 4:6", book: "COL", chapter: 4, verse: 6 }
      ],
      actions: [
        { label: "Study speech", panel: "dictionary", word: "speech" },
        { label: "Concordance wisdom", panel: "concordance", word: "wisdom" },
        { label: "Open 2 Timothy 2", panel: "read", book: "2TI", chapter: 2, verse: 15 }
      ]
    },
    {
      slug: "title-page",
      title: "Title Page",
      kicker: "Printing Heritage",
      motif: "Title Block",
      pattern: "steps",
      palette: { start: "#21374a", end: "#7f4f3f", accent: "#ebc77a", ink: "#fff7eb" },
      summary: "A page centered on the visual identity and publishing frame of the King James Bible tradition.",
      overview: "Title pages are compressed arguments. They tell you who the audience is, what authority is being claimed, and how a Bible edition wanted to present itself to the world.",
      highlights: [
        "Read design as framing, not decoration only.",
        "Notice what the title foregrounds and what it omits.",
        "Use publication form as part of translation history."
      ],
      references: [
        { label: "John 1:1", book: "JHN", chapter: 1, verse: 1 },
        { label: "Psalm 12:6", book: "PSA", chapter: 12, verse: 6 },
        { label: "Revelation 1:8", book: "REV", chapter: 1, verse: 8 }
      ],
      actions: [
        { label: "Open John 1", panel: "read", book: "JHN", chapter: 1, verse: 1 },
        { label: "Search kingdom", panel: "search", exact: "kingdom" },
        { label: "Study beginning", panel: "dictionary", word: "beginning" }
      ]
    },
    {
      slug: "hampton-court",
      title: "Hampton Court",
      kicker: "Commission and Debate",
      motif: "Court Session",
      pattern: "column",
      palette: { start: "#2c3d4e", end: "#8d5a42", accent: "#f3cb76", ink: "#fff9ee" },
      summary: "A historical page on the conference atmosphere and political-religious setting behind the translation commission.",
      overview: "The KJV did not arrive in a vacuum. This background helps you see how dispute, governance, church structure, and royal authority shaped the conditions for the project.",
      highlights: [
        "Place the translation project inside a live institutional debate.",
        "Track how authority and reform concerns intersected.",
        "Use setting to distinguish origin story from legend."
      ],
      references: [
        { label: "1 Kings 3:9", book: "1KI", chapter: 3, verse: 9 },
        { label: "Acts 15:6", book: "ACT", chapter: 15, verse: 6 },
        { label: "Romans 13:1", book: "ROM", chapter: 13, verse: 1 }
      ],
      actions: [
        { label: "Open Acts 15", panel: "read", book: "ACT", chapter: 15, verse: 6 },
        { label: "Search counsel", panel: "search", exact: "counsel" },
        { label: "Study wisdom", panel: "dictionary", word: "wisdom" }
      ]
    },
    {
      slug: "king-james-translators",
      title: "King James Translators",
      kicker: "Scholar Network",
      motif: "Working Hands",
      pattern: "paths",
      palette: { start: "#284254", end: "#9b5a46", accent: "#f1c56f", ink: "#fff8ee" },
      summary: "A page focused on the people behind the translation and the scholarly ecosystems they belonged to.",
      overview: "Translation quality is inseparable from the habits and communities of the translators. This page keeps attention on training, collaboration, and the disciplined work behind the final text.",
      highlights: [
        "Remember the translation as team labor rather than isolated genius.",
        "Connect scholarship, languages, and revision practice.",
        "Study the human process without reducing Scripture to the process."
      ],
      references: [
        { label: "Ezra 7:10", book: "EZR", chapter: 7, verse: 10 },
        { label: "Proverbs 15:22", book: "PRO", chapter: 15, verse: 22 },
        { label: "1 Corinthians 12:12", book: "1CO", chapter: 12, verse: 12 }
      ],
      actions: [
        { label: "Open Ezra 7", panel: "read", book: "EZR", chapter: 7, verse: 10 },
        { label: "Study scribe", panel: "dictionary", word: "scribe" },
        { label: "Concordance wisdom", panel: "concordance", word: "wisdom" }
      ]
    },
    {
      slug: "instructions-to-the-translators",
      title: "Instructions to the Translators",
      kicker: "Editorial Rules",
      motif: "Rule Lines",
      pattern: "ledger",
      palette: { start: "#26404d", end: "#8a573d", accent: "#efca7a", ink: "#fff9ef" },
      summary: "A study page for the rules and editorial boundaries that shaped the translation work.",
      overview: "Good translation work is not only inspiration and scholarship. It also needs procedure. These instructions reveal the constraints, consistency targets, and judgments that organized the project.",
      highlights: [
        "See where process guards against chaos.",
        "Study translation as disciplined editorial work.",
        "Use the rules to interpret continuity and departure in wording."
      ],
      references: [
        { label: "Proverbs 25:2", book: "PRO", chapter: 25, verse: 2 },
        { label: "1 Corinthians 14:40", book: "1CO", chapter: 14, verse: 40 },
        { label: "Habakkuk 2:2", book: "HAB", chapter: 2, verse: 2 }
      ],
      actions: [
        { label: "Search order", panel: "search", exact: "order" },
        { label: "Study rule", panel: "dictionary", word: "commandment" },
        { label: "Open 1 Corinthians 14", panel: "read", book: "1CO", chapter: 14, verse: 40 }
      ]
    },
    {
      slug: "great-fire-of-london",
      title: "Great Fire of London",
      kicker: "Loss and Preservation",
      motif: "Ash and Ember",
      pattern: "flare",
      palette: { start: "#2b3646", end: "#b55336", accent: "#ffc36a", ink: "#fff8ee" },
      summary: "A historical detour about destruction, preservation, and the material fragility surrounding books and archives.",
      overview: "This page is useful when you want to think about the Bible not only as text but also as object, print history, and something that passed through physical risk and recovery.",
      highlights: [
        "Treat preservation as historical as well as theological.",
        "Remember the vulnerability of printed culture.",
        "Use this page to think about transmission without panic."
      ],
      references: [
        { label: "Psalm 12:7", book: "PSA", chapter: 12, verse: 7 },
        { label: "1 Peter 1:7", book: "1PE", chapter: 1, verse: 7 },
        { label: "Isaiah 40:8", book: "ISA", chapter: 40, verse: 8 }
      ],
      actions: [
        { label: "Open Isaiah 40", panel: "read", book: "ISA", chapter: 40, verse: 8 },
        { label: "Search preserve", panel: "search", exact: "preserve" },
        { label: "Concordance fire", panel: "concordance", word: "fire" }
      ]
    },
    {
      slug: "textus-receptus",
      title: "Textus Receptus",
      kicker: "Greek Stream",
      motif: "Received Text",
      pattern: "rings",
      palette: { start: "#233b4c", end: "#8e5b48", accent: "#f3cb78", ink: "#fff8ef" },
      summary: "A page introducing the Greek textual stream commonly associated with the traditional printed New Testament.",
      overview: "This study lane is for orientation, not slogan-making. It helps you place the term historically and understand why it matters in conversations about translation tradition and textual base.",
      highlights: [
        "Learn the term before arguing from it.",
        "Connect textual base to translation history without oversimplifying.",
        "Use careful categories when comparing editions and traditions."
      ],
      references: [
        { label: "Revelation 22:18", book: "REV", chapter: 22, verse: 18 },
        { label: "Luke 4:4", book: "LUK", chapter: 4, verse: 4 },
        { label: "John 17:17", book: "JHN", chapter: 17, verse: 17 }
      ],
      actions: [
        { label: "Open John 17", panel: "read", book: "JHN", chapter: 17, verse: 17 },
        { label: "Search testimony", panel: "search", exact: "testimony" },
        { label: "Study truth", panel: "dictionary", word: "truth" }
      ]
    },
    {
      slug: "masoretic-text",
      title: "Masoretic Text",
      kicker: "Hebrew Stream",
      motif: "Covenant Lines",
      pattern: "notes",
      palette: { start: "#223c43", end: "#8e6342", accent: "#f2cf85", ink: "#fff8ee" },
      summary: "A page for the Hebrew textual tradition behind the Old Testament and the careful transmission attached to it.",
      overview: "The Masoretic Text matters because Old Testament reading depends on transmitted form as well as inspired content. This lane helps you connect Hebrew preservation with translation work and study habits.",
      highlights: [
        "Think about transmission as faithful attention to detail.",
        "Connect the Hebrew textual tradition to Old Testament interpretation.",
        "Use this page as a bridge into deeper language and text study."
      ],
      references: [
        { label: "Deuteronomy 6:4", book: "DEU", chapter: 6, verse: 4 },
        { label: "Psalm 19:7", book: "PSA", chapter: 19, verse: 7 },
        { label: "Isaiah 28:10", book: "ISA", chapter: 28, verse: 10 }
      ],
      actions: [
        { label: "Open Deuteronomy 6", panel: "read", book: "DEU", chapter: 6, verse: 4 },
        { label: "Study law", panel: "dictionary", word: "law" },
        { label: "Search commandment", panel: "search", exact: "commandment" }
      ]
    },
    {
      slug: "margin-notes",
      title: "Margin Notes",
      kicker: "Reading Signals",
      motif: "Margin Marks",
      pattern: "notes",
      palette: { start: "#29394a", end: "#9a5b47", accent: "#f6cb74", ink: "#fff7ed" },
      summary: "A page for understanding what notes, alternates, and small editorial markers can do for a careful reader.",
      overview: "Margin notes are not decoration. They are often quiet study tools that expose options, clarifications, and translator awareness you might miss in a fast reading.",
      highlights: [
        "Use notes as invitations to slow down.",
        "Learn to distinguish main text from supporting helps.",
        "Treat small editorial clues as part of patient study."
      ],
      references: [
        { label: "Habakkuk 2:2", book: "HAB", chapter: 2, verse: 2 },
        { label: "Psalm 119:18", book: "PSA", chapter: 119, verse: 18 },
        { label: "Acts 17:11", book: "ACT", chapter: 17, verse: 11 }
      ],
      actions: [
        { label: "Open Acts 17", panel: "read", book: "ACT", chapter: 17, verse: 11 },
        { label: "Study understand", panel: "dictionary", word: "understand" },
        { label: "Concordance note word", panel: "concordance", word: "write" }
      ]
    },
    {
      slug: "strongs-numbers",
      title: "Strongs Numbers",
      kicker: "Word Keys",
      motif: "Lexicon Grid",
      pattern: "numbers",
      palette: { start: "#22384e", end: "#915745", accent: "#f2cb76", ink: "#fff8ee" },
      summary: "A page for using Strongs numbers as a bridge into repeated word study without pretending a number replaces context.",
      overview: "This lane is useful when you want to compare how a word family appears across passages. It works best when paired with verse context, grammar humility, and patience.",
      highlights: [
        "Use numbers as pointers, not shortcuts to certainty.",
        "Compare recurring words across multiple passages.",
        "Pair lexical study with chapter-level reading."
      ],
      references: [
        { label: "John 1:1", book: "JHN", chapter: 1, verse: 1 },
        { label: "Psalm 1:2", book: "PSA", chapter: 1, verse: 2 },
        { label: "Ephesians 2:8", book: "EPH", chapter: 2, verse: 8 }
      ],
      actions: [
        { label: "Open John 1", panel: "read", book: "JHN", chapter: 1, verse: 1 },
        { label: "Study beginning", panel: "dictionary", word: "beginning" },
        { label: "Concordance light", panel: "concordance", word: "light" }
      ]
    },
    {
      slug: "bible-facts-statistics",
      title: "Bible Facts & Statistics",
      kicker: "Quick Ledger",
      motif: "Count and Shape",
      pattern: "grid",
      palette: { start: "#213a49", end: "#8e5d43", accent: "#efca7c", ink: "#fff8ef" },
      summary: "A compact lane for structural numbers, counts, distributions, and quick-reference facts about the Bible's shape.",
      overview: "Facts and statistics are not the heart of study, but they can sharpen orientation. This page is useful when you want a quick structural picture of the Bible before deeper reading.",
      highlights: [
        "Use counts to orient yourself, not replace interpretation.",
        "Notice literary shape and distribution across the canon.",
        "Pair structural facts with actual reading in context."
      ],
      references: [
        { label: "Psalm 90:12", book: "PSA", chapter: 90, verse: 12 },
        { label: "1 Corinthians 14:33", book: "1CO", chapter: 14, verse: 33 },
        { label: "Ecclesiastes 7:27", book: "ECC", chapter: 7, verse: 27 }
      ],
      actions: [
        { label: "Search number", panel: "search", exact: "number" },
        { label: "Concordance wisdom", panel: "concordance", word: "wisdom" },
        { label: "Open Psalm 90", panel: "read", book: "PSA", chapter: 90, verse: 12 }
      ]
    }
  ];

  const detailMapBySlug = new Map(details.map((item) => [item.slug, item]));
  const detailMapByTitle = new Map(details.map((item) => [item.title.toLowerCase(), item]));

  function escapeXml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function getBySlug(slug) {
    return detailMapBySlug.get(String(slug || "").toLowerCase()) || null;
  }

  function getByTitle(title) {
    return detailMapByTitle.get(String(title || "").toLowerCase()) || null;
  }

  function buildAppUrl(action) {
    const params = new URLSearchParams();
    params.set("panel", action.panel || "read");

    if (action.book) {
      params.set("book", action.book);
    }
    if (action.chapter) {
      params.set("chapter", String(action.chapter));
    }
    if (action.verse) {
      params.set("verse", String(action.verse));
    }
    if (action.exact) {
      params.set("exact", action.exact);
    }
    if (action.word) {
      params.set("word", action.word);
    }
    if (action.place) {
      params.set("place", action.place);
    }

    return `/index.html?${params.toString()}`;
  }

  function renderPattern(detail) {
    const { start, end, accent } = detail.palette;

    switch (detail.pattern) {
      case "arch":
        return `
          <circle cx="290" cy="92" r="84" fill="none" stroke="${accent}" stroke-width="18" opacity="0.75"/>
          <path d="M58 228 C120 142 202 102 320 112" fill="none" stroke="${accent}" stroke-width="12" stroke-linecap="round" opacity="0.72"/>
        `;
      case "grid":
        return `
          <g opacity="0.28" stroke="${accent}" stroke-width="5">
            <path d="M78 54 V258"/>
            <path d="M144 54 V258"/>
            <path d="M210 54 V258"/>
            <path d="M276 54 V258"/>
            <path d="M342 54 V258"/>
            <path d="M40 96 H360"/>
            <path d="M40 154 H360"/>
            <path d="M40 212 H360"/>
          </g>
        `;
      case "strata":
        return `
          <path d="M24 208 C80 188 120 198 168 182 S276 168 376 186" fill="none" stroke="${accent}" stroke-width="12" stroke-linecap="round" opacity="0.68"/>
          <path d="M20 156 C90 134 150 146 210 130 S306 120 380 138" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round" opacity="0.56"/>
          <path d="M14 108 C82 92 142 96 214 86 S310 78 388 92" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity="0.42"/>
        `;
      case "window":
        return `
          <rect x="56" y="34" width="288" height="228" rx="28" fill="none" stroke="${accent}" stroke-width="14" opacity="0.65"/>
          <path d="M200 34 V262" stroke="${accent}" stroke-width="10" opacity="0.65"/>
          <path d="M56 148 H344" stroke="${accent}" stroke-width="10" opacity="0.65"/>
        `;
      case "rays":
        return `
          <g stroke="${accent}" stroke-width="10" stroke-linecap="round" opacity="0.6">
            <path d="M200 34 V108"/>
            <path d="M92 60 L138 118"/>
            <path d="M308 60 L262 118"/>
            <path d="M52 140 H128"/>
            <path d="M272 140 H348"/>
            <path d="M88 232 L140 182"/>
            <path d="M312 232 L260 182"/>
          </g>
        `;
      case "steps":
        return `
          <rect x="46" y="182" width="90" height="56" rx="14" fill="${accent}" opacity="0.22"/>
          <rect x="128" y="146" width="90" height="92" rx="14" fill="${accent}" opacity="0.34"/>
          <rect x="210" y="106" width="90" height="132" rx="14" fill="${accent}" opacity="0.46"/>
        `;
      case "column":
        return `
          <g fill="none" stroke="${accent}" stroke-width="12" opacity="0.58">
            <rect x="62" y="78" width="52" height="134" rx="18"/>
            <rect x="174" y="54" width="52" height="158" rx="18"/>
            <rect x="286" y="92" width="52" height="120" rx="18"/>
          </g>
        `;
      case "paths":
        return `
          <path d="M30 220 C94 188 128 158 164 132 S244 82 374 64" fill="none" stroke="${accent}" stroke-width="14" stroke-linecap="round" opacity="0.72"/>
          <circle cx="58" cy="208" r="14" fill="${accent}" opacity="0.9"/>
          <circle cx="168" cy="132" r="12" fill="${accent}" opacity="0.7"/>
          <circle cx="322" cy="82" r="10" fill="${accent}" opacity="0.54"/>
        `;
      case "ledger":
        return `
          <g opacity="0.38" stroke="${accent}" stroke-width="6">
            <path d="M46 74 H356"/>
            <path d="M46 114 H356"/>
            <path d="M46 154 H356"/>
            <path d="M46 194 H356"/>
            <path d="M46 234 H356"/>
            <path d="M126 54 V254"/>
          </g>
        `;
      case "flare":
        return `
          <path d="M200 42 L236 118 L326 88 L270 162 L352 208 L246 202 L210 276 L170 200 L64 208 L144 162 L90 88 L164 118 Z" fill="${accent}" opacity="0.3"/>
        `;
      case "rings":
        return `
          <circle cx="200" cy="150" r="96" fill="none" stroke="${accent}" stroke-width="14" opacity="0.55"/>
          <circle cx="200" cy="150" r="58" fill="none" stroke="${accent}" stroke-width="10" opacity="0.42"/>
          <circle cx="200" cy="150" r="24" fill="${accent}" opacity="0.28"/>
        `;
      case "notes":
        return `
          <g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity="0.58">
            <path d="M70 92 H330"/>
            <path d="M70 132 H280"/>
            <path d="M70 172 H314"/>
            <path d="M70 212 H242"/>
          </g>
          <rect x="52" y="76" width="296" height="156" rx="22" fill="none" stroke="${accent}" stroke-width="10" opacity="0.28"/>
        `;
      case "numbers":
        return `
          <g fill="${accent}" opacity="0.18" font-size="92" font-family="Georgia, serif" font-weight="700">
            <text x="42" y="128">1</text>
            <text x="142" y="190">7</text>
            <text x="248" y="128">3</text>
          </g>
          <g fill="none" stroke="${accent}" stroke-width="8" opacity="0.54">
            <rect x="58" y="62" width="284" height="154" rx="24"/>
          </g>
        `;
      default:
        return `
          <rect x="52" y="70" width="296" height="160" rx="34" fill="none" stroke="${accent}" stroke-width="12" opacity="0.42"/>
          <path d="M64 210 C150 150 242 150 336 92" fill="none" stroke="${accent}" stroke-width="12" stroke-linecap="round" opacity="0.68"/>
        `;
    }
  }

  function estimateTextWidth(text, fontSize, letterSpacing = 0) {
    const units = Array.from(String(text || "")).reduce((total, character) => {
      if (character === " ") {
        return total + 0.34;
      }
      if (/[MW@#&%]/.test(character)) {
        return total + 0.92;
      }
      if (/[A-Z0-9]/.test(character)) {
        return total + 0.72;
      }
      if (/[ilI1'.,:;]/.test(character)) {
        return total + 0.28;
      }
      if (/[ftrj]/.test(character)) {
        return total + 0.42;
      }
      return total + 0.56;
    }, 0);

    return (units * fontSize) + (Math.max(0, String(text || "").length - 1) * letterSpacing);
  }

  function truncateTextToWidth(text, fontSize, maxWidth, letterSpacing = 0) {
    let value = String(text || "").trim();
    if (!value) {
      return "";
    }

    if (estimateTextWidth(value, fontSize, letterSpacing) <= maxWidth) {
      return value;
    }

    while (value.length > 1 && estimateTextWidth(`${value}...`, fontSize, letterSpacing) > maxWidth) {
      value = value.slice(0, -1).trimEnd();
    }

    return `${value}...`;
  }

  function wrapTextToLines(text, options) {
    const words = String(text || "").trim().split(/\s+/).filter(Boolean);
    if (!words.length) {
      return [""];
    }

    const lines = [];
    let currentLine = words.shift();

    words.forEach((word) => {
      const nextLine = `${currentLine} ${word}`;
      if (estimateTextWidth(nextLine, options.fontSize, options.letterSpacing) <= options.maxWidth) {
        currentLine = nextLine;
        return;
      }

      lines.push(currentLine);
      currentLine = word;
    });

    lines.push(currentLine);

    if (lines.length > options.maxLines) {
      const visible = lines.slice(0, options.maxLines);
      visible[visible.length - 1] = truncateTextToWidth(
        lines.slice(options.maxLines - 1).join(" "),
        options.fontSize,
        options.maxWidth,
        options.letterSpacing
      );
      return visible;
    }

    return lines;
  }

  function fitTextBlock(text, options) {
    let fontSize = options.maxFontSize;
    while (fontSize >= options.minFontSize) {
      const lines = wrapTextToLines(text, {
        fontSize,
        letterSpacing: options.letterSpacing || 0,
        maxWidth: options.maxWidth,
        maxLines: options.maxLines
      });

      if (lines.length <= options.maxLines && lines.every((line) => estimateTextWidth(line, fontSize, options.letterSpacing || 0) <= options.maxWidth)) {
        return { fontSize, lines };
      }

      fontSize -= options.step || 2;
    }

    const lines = wrapTextToLines(text, {
      fontSize: options.minFontSize,
      letterSpacing: options.letterSpacing || 0,
      maxWidth: options.maxWidth,
      maxLines: options.maxLines
    });

    return {
      fontSize: options.minFontSize,
      lines
    };
  }

  function renderTextBlock(lines, options) {
    const safeLines = lines.filter(Boolean);
    if (!safeLines.length) {
      return "";
    }

    return `
      <text x="${options.x}" y="${options.y}" font-size="${options.fontSize}" font-family="${options.fontFamily}" font-weight="${options.fontWeight}"${options.letterSpacing ? ` letter-spacing="${options.letterSpacing}"` : ""}${options.opacity !== undefined ? ` opacity="${options.opacity}"` : ""}>
        ${safeLines.map((line, index) => `<tspan x="${options.x}" dy="${index === 0 ? 0 : options.lineHeight}">${escapeXml(line)}</tspan>`).join("")}
      </text>
    `;
  }

  function createLibraryArt(detail, options = {}) {
    const fontSize = options.compact ? 44 : 58;
    const motifSize = options.compact ? 22 : 28;
    const corner = options.compact ? 34 : 46;
    const kickerBlock = fitTextBlock(detail.kicker.toUpperCase(), {
      maxFontSize: options.compact ? 20 : 22,
      minFontSize: options.compact ? 13 : 15,
      maxWidth: 320,
      maxLines: 2,
      letterSpacing: options.compact ? 2.5 : 4
    });
    const titleBlock = fitTextBlock(detail.title, {
      maxFontSize: fontSize,
      minFontSize: options.compact ? 24 : 30,
      maxWidth: 284,
      maxLines: 3
    });
    const motifBlock = fitTextBlock(detail.motif, {
      maxFontSize: motifSize,
      minFontSize: options.compact ? 16 : 18,
      maxWidth: 250,
      maxLines: 2
    });
    const kickerLineHeight = Math.round(kickerBlock.fontSize * 1.16);
    const titleLineHeight = Math.round(titleBlock.fontSize * 0.94);
    const motifLineHeight = Math.round(motifBlock.fontSize * 1.14);
    const titleBaseline = 214 - ((titleBlock.lines.length - 1) * titleLineHeight);
    const motifBaseline = 250 - ((motifBlock.lines.length - 1) * motifLineHeight);

    return `
      <svg class="library-art-svg" viewBox="0 0 400 300" role="img" aria-label="${escapeXml(detail.title)} artwork" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-${escapeXml(detail.slug)}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${detail.palette.start}"/>
            <stop offset="100%" stop-color="${detail.palette.end}"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="400" height="300" rx="${corner}" fill="url(#grad-${escapeXml(detail.slug)})"/>
        <rect x="18" y="18" width="364" height="264" rx="${corner - 12}" fill="none" stroke="${detail.palette.ink}" stroke-opacity="0.18" stroke-width="2"/>
        ${renderPattern(detail)}
        <g fill="${detail.palette.ink}">
          ${renderTextBlock(kickerBlock.lines, {
            x: 36,
            y: 56,
            fontSize: kickerBlock.fontSize,
            fontFamily: "Manrope, Arial, sans-serif",
            fontWeight: 700,
            lineHeight: kickerLineHeight,
            letterSpacing: options.compact ? 2.5 : 4,
            opacity: 0.76
          })}
          ${renderTextBlock(titleBlock.lines, {
            x: 36,
            y: titleBaseline,
            fontSize: titleBlock.fontSize,
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            lineHeight: titleLineHeight
          })}
          ${renderTextBlock(motifBlock.lines, {
            x: 36,
            y: motifBaseline,
            fontSize: motifBlock.fontSize,
            fontFamily: "Manrope, Arial, sans-serif",
            fontWeight: 600,
            lineHeight: motifLineHeight,
            opacity: 0.9
          })}
        </g>
        <circle cx="344" cy="244" r="16" fill="${detail.palette.accent}" opacity="0.92"/>
      </svg>
    `;
  }

  function createLogoMark() {
    return `
      <svg class="logo-mark-svg" viewBox="0 0 140 140" role="img" aria-label="Selah Journey logo" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f1d089"/>
            <stop offset="100%" stop-color="#c98744"/>
          </linearGradient>
        </defs>
        <rect x="10" y="10" width="120" height="120" rx="34" fill="#f7f0e3"/>
        <rect x="22" y="22" width="96" height="96" rx="26" fill="#21343c"/>
        <path d="M44 94 L70 42 L96 94" fill="none" stroke="url(#logoGrad)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M50 82 H90" stroke="url(#logoGrad)" stroke-width="8" stroke-linecap="round"/>
        <circle cx="70" cy="34" r="6" fill="#f1d089"/>
      </svg>
    `;
  }

  window.LibraryAtlas = {
    details,
    getBySlug,
    getByTitle,
    buildAppUrl,
    createLibraryArt,
    createLogoMark
  };
})();
