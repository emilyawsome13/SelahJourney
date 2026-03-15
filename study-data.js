(function () {
  "use strict";

  const journeys = [
    {
      id: "journey-01-mark",
      number: 1,
      title: "Journey 1: Mark",
      subtitle: "Move quickly through Jesus' identity, authority, sacrifice, and call to discipleship.",
      tone: "Gospel",
      testament: "New Testament",
      gradient: ["#304b5d", "#9d623f"],
      summary: "You will learn how Mark presents Jesus with urgency and clarity so that following Him becomes the central response, not just admiring Him from a distance.",
      focus: "Discipleship, authority, and the cross",
      path: ["Start", "The Big Picture", "Who Jesus Is", "The Cross", "Follow God"],
      steps: [
        { book: "MRK", chapter: 1, verse: 15, title: "Start", summary: "Begin with Jesus' first public call to repent and believe the gospel.", prompt: "What does Jesus demand right at the beginning?" },
        { book: "MRK", chapter: 2, verse: 17, title: "The Big Picture", summary: "See why Jesus comes near to sinners instead of keeping distance.", prompt: "How does this verse define Jesus' mission?" },
        { book: "MRK", chapter: 4, verse: 41, title: "Who Jesus Is", summary: "Watch the disciples wrestle with Christ's authority over creation.", prompt: "What kind of Lord calms wind and sea?" },
        { book: "MRK", chapter: 8, verse: 34, title: "The Cross", summary: "Study discipleship as surrender instead of shallow admiration.", prompt: "What does self-denial look like in real life?" },
        { book: "MRK", chapter: 15, verse: 39, title: "Follow God", summary: "End at the cross where Jesus is finally confessed as the Son of God.", prompt: "Why does clear vision arrive most sharply at the cross?" }
      ]
    },
    {
      id: "journey-02-psalms",
      number: 2,
      title: "Journey 2: Psalms",
      subtitle: "Learn to pray honestly with praise, fear, waiting, and confidence in God.",
      tone: "Prayer",
      testament: "Old Testament",
      gradient: ["#284b45", "#a46d49"],
      summary: "You will learn how the Psalms give language for worship, lament, gratitude, and steady trust so prayer becomes honest and formed by truth.",
      focus: "Prayer, worship, lament, and trust",
      path: ["Start", "The Big Picture", "Foundations", "Mercy & Grace", "Follow God"],
      steps: [
        { book: "PSA", chapter: 1, verse: 2, title: "Start", summary: "Open with delight in God's law as the shape of a rooted life.", prompt: "What does spiritual stability feed on?" },
        { book: "PSA", chapter: 23, verse: 1, title: "The Big Picture", summary: "See God's care not as a concept but as shepherding presence.", prompt: "Where do you need the Shepherd's care most?" },
        { book: "PSA", chapter: 27, verse: 1, title: "Foundations", summary: "Let fear be answered by God's light and salvation.", prompt: "What looks smaller when the Lord is your light?" },
        { book: "PSA", chapter: 51, verse: 10, title: "Mercy & Grace", summary: "Read repentance that seeks cleansing, not just relief.", prompt: "What does David ask God to recreate?" },
        { book: "PSA", chapter: 121, verse: 1, title: "Follow God", summary: "Finish with help that comes from the Lord who keeps His people.", prompt: "How does this psalm train daily trust?" }
      ]
    },
    {
      id: "journey-03-genesis",
      number: 3,
      title: "Journey 3: Genesis",
      subtitle: "Study beginnings, fall, promise, covenant, and providence in one connected arc.",
      tone: "Beginnings",
      testament: "Old Testament",
      gradient: ["#274058", "#9c573d"],
      summary: "You will learn how Genesis establishes creation, sin, blessing, covenant, and providence so the rest of the Bible has a clear starting framework.",
      focus: "Beginnings, covenant, and promise",
      path: ["Start", "The Big Picture", "Foundations", "Promise & Grace", "Follow God"],
      steps: [
        { book: "GEN", chapter: 1, verse: 1, title: "Start", summary: "Begin with the Bible's first claim about God and creation.", prompt: "What is true about God before anything else is said?" },
        { book: "GEN", chapter: 3, verse: 15, title: "The Big Picture", summary: "Read the fall together with the first promise of hope.", prompt: "Where do you see both judgment and mercy?" },
        { book: "GEN", chapter: 12, verse: 2, title: "Foundations", summary: "See blessing tied to God's covenant with Abram.", prompt: "How does God's promise reach beyond Abram himself?" },
        { book: "GEN", chapter: 15, verse: 6, title: "Promise & Grace", summary: "Study faith and righteousness in covenant context.", prompt: "Why does trust stand at the center here?" },
        { book: "GEN", chapter: 50, verse: 20, title: "Follow God", summary: "Finish with providence stronger than human evil.", prompt: "How does God's purpose reframe suffering?" }
      ]
    },
    {
      id: "journey-04-john",
      number: 4,
      title: "Journey 4: John",
      subtitle: "See Jesus as the Son who gives life, truth, and abiding union.",
      tone: "Light",
      testament: "New Testament",
      gradient: ["#2c4158", "#8c5a42"],
      summary: "You will learn how John's Gospel reveals Jesus as the Word made flesh so belief becomes relational, life-giving, and rooted in abiding with Him.",
      focus: "Belief, life, and abiding",
      path: ["Start", "The Big Picture", "Life in Christ", "Grace & Truth", "Follow God"],
      steps: [
        { book: "JHN", chapter: 1, verse: 14, title: "Start", summary: "Begin with the Word made flesh full of grace and truth.", prompt: "What does this verse say about who Jesus is?" },
        { book: "JHN", chapter: 3, verse: 16, title: "The Big Picture", summary: "Read God's love and salvation together.", prompt: "What is the purpose of God's giving?" },
        { book: "JHN", chapter: 6, verse: 35, title: "Life in Christ", summary: "Study Jesus as bread for a deeper hunger than physical need.", prompt: "What does it mean to come to Christ?" },
        { book: "JHN", chapter: 14, verse: 6, title: "Grace & Truth", summary: "Hear Jesus define access to the Father in personal terms.", prompt: "Why does truth here require a Person?" },
        { book: "JHN", chapter: 15, verse: 5, title: "Follow God", summary: "Finish with abiding as the pattern for fruitful discipleship.", prompt: "What fruit depends on staying near to Christ?" }
      ]
    },
    {
      id: "journey-05-romans",
      number: 5,
      title: "Journey 5: Romans",
      subtitle: "Build gospel foundations around sin, justification, new life, and hope.",
      tone: "Doctrine",
      testament: "New Testament",
      gradient: ["#324761", "#a16843"],
      summary: "You will learn how Romans explains the gospel from human need to saving grace so faith rests on God's righteousness instead of personal performance.",
      focus: "Gospel foundations and justification",
      path: ["Start", "The Big Picture", "Foundations", "Law & Grace", "Follow God"],
      steps: [
        { book: "ROM", chapter: 1, verse: 16, title: "Start", summary: "Open with the gospel as God's power for salvation.", prompt: "Why is Paul not ashamed of the gospel?" },
        { book: "ROM", chapter: 3, verse: 23, title: "The Big Picture", summary: "See the universal reach of sin without exception.", prompt: "What does this reveal about every person?" },
        { book: "ROM", chapter: 5, verse: 8, title: "Foundations", summary: "Read the cross as love shown while we were still sinners.", prompt: "What timing makes this grace so striking?" },
        { book: "ROM", chapter: 6, verse: 4, title: "Law & Grace", summary: "Study grace that leads into new life, not indifference.", prompt: "What kind of life does union with Christ create?" },
        { book: "ROM", chapter: 12, verse: 1, title: "Follow God", summary: "End with worship expressed through a yielded life.", prompt: "How does doctrine turn into obedience here?" }
      ]
    }
  ];

  journeys.push(
    {
      id: "journey-06-exodus",
      number: 6,
      title: "Journey 6: Exodus",
      subtitle: "Trace rescue, covenant, worship, and God's presence with His people.",
      tone: "Deliverance",
      testament: "Old Testament",
      gradient: ["#254e5a", "#a35f3c"],
      summary: "You will learn how God rescues, forms, and dwells with His people so freedom is seen as belonging to Him, not just escaping bondage.",
      focus: "Deliverance, covenant, and worship",
      path: ["Start", "The Big Picture", "Foundations", "Law & Grace", "Follow God"],
      steps: [
        { book: "EXO", chapter: 3, verse: 14, title: "Start", summary: "Meet the God who reveals His name and sends Moses.", prompt: "How does God's name shape the mission?" },
        { book: "EXO", chapter: 12, verse: 13, title: "The Big Picture", summary: "Study deliverance through the Passover blood.", prompt: "What makes this rescue possible?" },
        { book: "EXO", chapter: 19, verse: 5, title: "Foundations", summary: "Read covenant identity after deliverance.", prompt: "What kind of people is God forming?" },
        { book: "EXO", chapter: 20, verse: 2, title: "Law & Grace", summary: "Notice grace comes before commands at Sinai.", prompt: "Why does the law begin with redemption?" },
        { book: "EXO", chapter: 33, verse: 14, title: "Follow God", summary: "Finish with the necessity of God's presence.", prompt: "Why is presence more important than progress?" }
      ]
    },
    {
      id: "journey-07-proverbs",
      number: 7,
      title: "Journey 7: Proverbs",
      subtitle: "Train wisdom for speech, choices, work, relationships, and restraint.",
      tone: "Wisdom",
      testament: "Old Testament",
      gradient: ["#345046", "#9a6a3f"],
      summary: "You will learn how biblical wisdom shapes ordinary decisions so everyday living is directed by reverence, prudence, and disciplined speech.",
      focus: "Wisdom, speech, and decisions",
      path: ["Start", "The Big Picture", "Foundations", "Wise Living", "Follow God"],
      steps: [
        { book: "PRO", chapter: 1, verse: 7, title: "Start", summary: "Start where wisdom starts: the fear of the Lord.", prompt: "Why is reverence the foundation of wisdom?" },
        { book: "PRO", chapter: 3, verse: 5, title: "The Big Picture", summary: "Study trust that dethrones self-reliance.", prompt: "Where do you lean on your own understanding?" },
        { book: "PRO", chapter: 4, verse: 23, title: "Foundations", summary: "Guard the heart because life flows from it.", prompt: "What currently shapes your inner life most?" },
        { book: "PRO", chapter: 15, verse: 1, title: "Wise Living", summary: "See how speech can calm or inflame conflict.", prompt: "What kind of strength is hidden in a soft answer?" },
        { book: "PRO", chapter: 16, verse: 3, title: "Follow God", summary: "Finish with plans submitted to the Lord.", prompt: "What happens when your work is entrusted to God?" }
      ]
    },
    {
      id: "journey-08-luke",
      number: 8,
      title: "Journey 8: Luke",
      subtitle: "Watch Jesus bring good news to the overlooked, broken, and lost.",
      tone: "Compassion",
      testament: "New Testament",
      gradient: ["#34495a", "#a96345"],
      summary: "You will learn how Luke presents Jesus as Savior for the poor, the outsider, and the sinner so discipleship includes compassion, repentance, and joy.",
      focus: "Compassion, salvation, and joy",
      path: ["Start", "The Big Picture", "Foundations", "Mercy & Grace", "Follow God"],
      steps: [
        { book: "LUK", chapter: 4, verse: 18, title: "Start", summary: "Begin with Jesus' mission statement to the poor and oppressed.", prompt: "Who does Jesus announce good news for?" },
        { book: "LUK", chapter: 5, verse: 32, title: "The Big Picture", summary: "See Christ call sinners to repentance.", prompt: "Why is repentance central to Jesus' mission?" },
        { book: "LUK", chapter: 10, verse: 37, title: "Foundations", summary: "Learn mercy from the Good Samaritan.", prompt: "Who counts as your neighbor here?" },
        { book: "LUK", chapter: 15, verse: 20, title: "Mercy & Grace", summary: "Read the Father's welcome in the prodigal story.", prompt: "What does the Father's response reveal?" },
        { book: "LUK", chapter: 19, verse: 10, title: "Follow God", summary: "End with Jesus seeking and saving the lost.", prompt: "How should this shape your own priorities?" }
      ]
    },
    {
      id: "journey-09-acts",
      number: 9,
      title: "Journey 9: Acts",
      subtitle: "Follow the Spirit's power, gospel witness, and the growth of the church.",
      tone: "Mission",
      testament: "New Testament",
      gradient: ["#25465a", "#8f6147"],
      summary: "You will learn how the risen Christ builds His church through the Spirit so witness, prayer, courage, and repentance remain central.",
      focus: "Spirit, witness, and church mission",
      path: ["Start", "The Big Picture", "Foundations", "Grace Goes Out", "Follow God"],
      steps: [
        { book: "ACT", chapter: 1, verse: 8, title: "Start", summary: "Begin with witness empowered by the Holy Ghost.", prompt: "What is promised before the mission begins?" },
        { book: "ACT", chapter: 2, verse: 38, title: "The Big Picture", summary: "See repentance and the gift of the Spirit together.", prompt: "How does the first sermon call people to respond?" },
        { book: "ACT", chapter: 4, verse: 31, title: "Foundations", summary: "Read prayer and bold speech after pressure.", prompt: "What does the church ask for when threatened?" },
        { book: "ACT", chapter: 10, verse: 34, title: "Grace Goes Out", summary: "Watch the gospel break ethnic boundaries.", prompt: "What changes in Peter's understanding here?" },
        { book: "ACT", chapter: 20, verse: 24, title: "Follow God", summary: "End with a ministry life ordered around finishing the course.", prompt: "What does faithful witness cost?" }
      ]
    },
    {
      id: "journey-10-galatians",
      number: 10,
      title: "Journey 10: Galatians",
      subtitle: "Learn freedom from law-righteousness and life by faith in Christ.",
      tone: "Freedom",
      testament: "New Testament",
      gradient: ["#33435a", "#9d5b45"],
      summary: "You will learn how the gospel frees believers from trusting in law-keeping for righteousness so grace produces liberty and a Spirit-led life.",
      focus: "Law, grace, and freedom",
      path: ["Start", "The Big Picture", "Foundations", "Law & Grace", "Follow God"],
      steps: [
        { book: "GAL", chapter: 1, verse: 6, title: "Start", summary: "Start with Paul's alarm over another gospel.", prompt: "What makes a false gospel so serious?" },
        { book: "GAL", chapter: 2, verse: 20, title: "The Big Picture", summary: "Study life crucified and lived by faith in Christ.", prompt: "What now defines Paul's life?" },
        { book: "GAL", chapter: 3, verse: 11, title: "Foundations", summary: "See justification by faith, not law.", prompt: "Why can the law not be your final hope?" },
        { book: "GAL", chapter: 5, verse: 1, title: "Law & Grace", summary: "Stand fast in the liberty Christ gives.", prompt: "What kind of yoke is Paul warning about?" },
        { book: "GAL", chapter: 5, verse: 22, title: "Follow God", summary: "Finish with the fruit of the Spirit as gospel-shaped living.", prompt: "What fruit needs growth in you now?" }
      ]
    }
  );

  journeys.push(
    {
      id: "journey-16-nehemiah",
      number: 16,
      title: "Journey 16: Nehemiah",
      subtitle: "Rebuild with prayer, courage, leadership, and repentance.",
      tone: "Rebuild",
      testament: "Old Testament",
      gradient: ["#2d4555", "#9e6647"],
      summary: "You will learn how renewal requires prayerful leadership, steady work, and repentance so rebuilding is spiritual as well as practical.",
      focus: "Prayer, leadership, and rebuilding",
      path: ["Start", "The Big Picture", "Foundations", "Work & Opposition", "Follow God"],
      steps: [
        { book: "NEH", chapter: 1, verse: 4, title: "Start", summary: "Begin with grief that turns into prayer.", prompt: "What does Nehemiah do before he does anything else?" },
        { book: "NEH", chapter: 2, verse: 18, title: "The Big Picture", summary: "See vision shared and work begun.", prompt: "How does Nehemiah move people into action?" },
        { book: "NEH", chapter: 4, verse: 14, title: "Foundations", summary: "Read courage when opposition rises.", prompt: "What truth strengthens the builders?" },
        { book: "NEH", chapter: 6, verse: 3, title: "Work & Opposition", summary: "Refuse distraction from the work God gives.", prompt: "What tries to pull you away from faithful work?" },
        { book: "NEH", chapter: 8, verse: 10, title: "Follow God", summary: "Finish with strength rooted in the joy of the Lord.", prompt: "How does joy strengthen obedience?" }
      ]
    },
    {
      id: "journey-17-hebrews",
      number: 17,
      title: "Journey 17: Hebrews",
      subtitle: "See Christ as better: better priest, covenant, sacrifice, and hope.",
      tone: "Better",
      testament: "New Testament",
      gradient: ["#31465c", "#8f5d48"],
      summary: "You will learn how Hebrews presents Jesus as the better fulfillment so confidence rests in His finished work and faithful intercession.",
      focus: "Christ's supremacy and perseverance",
      path: ["Start", "The Big Picture", "Foundations", "Better Covenant", "Follow God"],
      steps: [
        { book: "HEB", chapter: 1, verse: 3, title: "Start", summary: "Begin with the Son as the brightness of God's glory.", prompt: "How does this verse elevate Christ?" },
        { book: "HEB", chapter: 4, verse: 15, title: "The Big Picture", summary: "See a High Priest who sympathizes with weakness.", prompt: "Why does this invite confidence?" },
        { book: "HEB", chapter: 8, verse: 6, title: "Foundations", summary: "Study the better covenant established on better promises.", prompt: "What makes this covenant better?" },
        { book: "HEB", chapter: 10, verse: 14, title: "Better Covenant", summary: "Read the sufficiency of Christ's one sacrifice.", prompt: "What finality is claimed here?" },
        { book: "HEB", chapter: 12, verse: 2, title: "Follow God", summary: "Finish by looking unto Jesus in endurance.", prompt: "What helps you keep running?" }
      ]
    },
    {
      id: "journey-18-philippians",
      number: 18,
      title: "Journey 18: Philippians",
      subtitle: "Practice joy, humility, peace, and Christ-centered endurance.",
      tone: "Joy",
      testament: "New Testament",
      gradient: ["#35504d", "#a06a48"],
      summary: "You will learn how Christian joy survives hardship when it is rooted in Christ's worth, humble service, prayer, and steady thinking.",
      focus: "Joy, humility, and peace",
      path: ["Start", "The Big Picture", "Foundations", "Grace in Pressure", "Follow God"],
      steps: [
        { book: "PHP", chapter: 1, verse: 21, title: "Start", summary: "Begin with Christ as life and death as gain.", prompt: "What kind of value statement is Paul making?" },
        { book: "PHP", chapter: 2, verse: 5, title: "The Big Picture", summary: "Take on the mind of Christ in humility.", prompt: "How should Christ's pattern reshape your posture?" },
        { book: "PHP", chapter: 3, verse: 8, title: "Foundations", summary: "Count all things loss for the excellency of Christ.", prompt: "What competes with Christ's worth in your heart?" },
        { book: "PHP", chapter: 4, verse: 6, title: "Grace in Pressure", summary: "Bring anxiety to God through prayer.", prompt: "What do you keep carrying instead of praying?" },
        { book: "PHP", chapter: 4, verse: 13, title: "Follow God", summary: "Finish with strength in Christ for faithful endurance.", prompt: "What kind of strength is promised here?" }
      ]
    },
    {
      id: "journey-19-revelation",
      number: 19,
      title: "Journey 19: Revelation",
      subtitle: "End with hope in Christ's victory, judgment, worship, and new creation.",
      tone: "Hope",
      testament: "New Testament",
      gradient: ["#2c3e56", "#945947"],
      summary: "You will learn how Revelation strengthens endurance by unveiling Jesus as victorious King so worship and hope hold firm in the face of pressure.",
      focus: "Hope, worship, and final victory",
      path: ["Start", "The Big Picture", "Foundations", "Judgment & Grace", "Follow God"],
      steps: [
        { book: "REV", chapter: 1, verse: 8, title: "Start", summary: "Begin with the Lord as Alpha and Omega.", prompt: "How does this shape the entire book?" },
        { book: "REV", chapter: 5, verse: 12, title: "The Big Picture", summary: "See heaven's worship centered on the Lamb.", prompt: "Why is the Lamb worthy?" },
        { book: "REV", chapter: 12, verse: 11, title: "Foundations", summary: "Read victory through the blood of the Lamb and faithful testimony.", prompt: "What kind of overcoming is described?" },
        { book: "REV", chapter: 21, verse: 4, title: "Judgment & Grace", summary: "Look at the end of sorrow in God's new creation.", prompt: "What future does this promise secure?" },
        { book: "REV", chapter: 22, verse: 20, title: "Follow God", summary: "Finish with longing for Christ's return.", prompt: "How should this closing prayer shape daily life?" }
      ]
    }
  );

  journeys.push(
    {
      id: "journey-11-ephesians",
      number: 11,
      title: "Journey 11: Ephesians",
      subtitle: "Study identity in Christ, grace, unity, and spiritual strength.",
      tone: "Identity",
      testament: "New Testament",
      gradient: ["#2f4255", "#8e6445"],
      summary: "You will learn how union with Christ creates a new identity and a unified people so grace leads into holiness, love, and spiritual endurance.",
      focus: "Identity, unity, and spiritual strength",
      path: ["Start", "The Big Picture", "Foundations", "Grace & Unity", "Follow God"],
      steps: [
        { book: "EPH", chapter: 1, verse: 4, title: "Start", summary: "Begin with God's choosing purpose in Christ.", prompt: "What does this say about the source of salvation?" },
        { book: "EPH", chapter: 2, verse: 8, title: "The Big Picture", summary: "Read grace, faith, and salvation without boasting.", prompt: "What is excluded when salvation is by grace?" },
        { book: "EPH", chapter: 2, verse: 19, title: "Foundations", summary: "See strangers made fellow citizens in God's household.", prompt: "How does the gospel reshape belonging?" },
        { book: "EPH", chapter: 4, verse: 1, title: "Grace & Unity", summary: "Walk worthy of the calling received.", prompt: "What behavior fits gospel identity?" },
        { book: "EPH", chapter: 6, verse: 10, title: "Follow God", summary: "Finish with strength in the Lord for spiritual conflict.", prompt: "Where must your strength come from?" }
      ]
    },
    {
      id: "journey-12-james",
      number: 12,
      title: "Journey 12: James",
      subtitle: "Build a lived faith that works through endurance, speech, humility, and obedience.",
      tone: "Practice",
      testament: "New Testament",
      gradient: ["#2e4d49", "#a16a44"],
      summary: "You will learn how genuine faith shows up in trials, speech, relationships, and obedience so belief is tested and made visible in action.",
      focus: "Endurance, speech, and obedience",
      path: ["Start", "The Big Picture", "Foundations", "Tested Faith", "Follow God"],
      steps: [
        { book: "JAS", chapter: 1, verse: 2, title: "Start", summary: "Start with trials producing endurance.", prompt: "How can hardship become a testing ground for maturity?" },
        { book: "JAS", chapter: 1, verse: 5, title: "The Big Picture", summary: "Ask God for wisdom in the middle of real need.", prompt: "Do you seek wisdom as directly as outcomes?" },
        { book: "JAS", chapter: 1, verse: 22, title: "Foundations", summary: "Be doers of the word, not hearers only.", prompt: "What truth do you already know but resist obeying?" },
        { book: "JAS", chapter: 3, verse: 17, title: "Tested Faith", summary: "Distinguish earthly wisdom from wisdom above.", prompt: "Which wisdom marks your current habits?" },
        { book: "JAS", chapter: 4, verse: 8, title: "Follow God", summary: "End with repentance and nearness to God.", prompt: "What does drawing near require from you?" }
      ]
    },
    {
      id: "journey-13-isaiah",
      number: 13,
      title: "Journey 13: Isaiah",
      subtitle: "See God's holiness, judgment, comfort, and the promise of the Servant.",
      tone: "Prophetic",
      testament: "Old Testament",
      gradient: ["#31435d", "#a05e47"],
      summary: "You will learn how Isaiah holds together God's holiness, righteous judgment, and promised salvation so hope rests in the coming Servant and King.",
      focus: "Holiness, judgment, and promised salvation",
      path: ["Start", "The Big Picture", "Foundations", "Hope & Grace", "Follow God"],
      steps: [
        { book: "ISA", chapter: 6, verse: 3, title: "Start", summary: "Begin with the holiness of God overwhelming Isaiah.", prompt: "How does holiness expose human need?" },
        { book: "ISA", chapter: 7, verse: 14, title: "The Big Picture", summary: "See promised Immanuel in a moment of fear.", prompt: "What does God's presence answer here?" },
        { book: "ISA", chapter: 9, verse: 6, title: "Foundations", summary: "Read the coming King with names of wonder.", prompt: "Which title most shapes your understanding of the Messiah?" },
        { book: "ISA", chapter: 53, verse: 5, title: "Hope & Grace", summary: "Study the suffering Servant bearing our wounds.", prompt: "What does substitution mean in this passage?" },
        { book: "ISA", chapter: 55, verse: 6, title: "Follow God", summary: "Finish with a call to seek the Lord while He may be found.", prompt: "What response does Isaiah demand?" }
      ]
    },
    {
      id: "journey-14-daniel",
      number: 14,
      title: "Journey 14: Daniel",
      subtitle: "Learn courage, prayer, and loyalty to God in exile and pressure.",
      tone: "Courage",
      testament: "Old Testament",
      gradient: ["#233c50", "#8a5d43"],
      summary: "You will learn how Daniel models steadfastness under pressure so faithfulness is shaped by prayer, holy resolve, and confidence in God's kingdom.",
      focus: "Courage, prayer, and God's kingdom",
      path: ["Start", "The Big Picture", "Foundations", "Pressure & Grace", "Follow God"],
      steps: [
        { book: "DAN", chapter: 1, verse: 8, title: "Start", summary: "Begin with Daniel purposing not to defile himself.", prompt: "What does conviction look like under pressure?" },
        { book: "DAN", chapter: 2, verse: 22, title: "The Big Picture", summary: "See God as revealer of mysteries and ruler over kings.", prompt: "How does this expand your view of God's rule?" },
        { book: "DAN", chapter: 3, verse: 17, title: "Foundations", summary: "Study faith that trusts God even without rescue on our terms.", prompt: "What kind of trust speaks this way?" },
        { book: "DAN", chapter: 6, verse: 10, title: "Pressure & Grace", summary: "Watch Daniel keep praying in the face of threat.", prompt: "What habits hold when pressure rises?" },
        { book: "DAN", chapter: 7, verse: 14, title: "Follow God", summary: "Finish with the everlasting dominion of the Son of man.", prompt: "How does this future kingdom steady you now?" }
      ]
    },
    {
      id: "journey-15-ruth",
      number: 15,
      title: "Journey 15: Ruth",
      subtitle: "Trace loyalty, providence, redemption, and quiet faithfulness.",
      tone: "Redemption",
      testament: "Old Testament",
      gradient: ["#355049", "#9a6948"],
      summary: "You will learn how ordinary loyalty and hidden providence reveal God's redeeming care so faithfulness in small places is seen as deeply significant.",
      focus: "Providence, loyalty, and redemption",
      path: ["Start", "The Big Picture", "Foundations", "Grace in Weakness", "Follow God"],
      steps: [
        { book: "RUT", chapter: 1, verse: 16, title: "Start", summary: "Begin with Ruth's loyal commitment.", prompt: "What kind of faithfulness is Ruth displaying?" },
        { book: "RUT", chapter: 2, verse: 12, title: "The Big Picture", summary: "See refuge under the wings of the Lord.", prompt: "What does Boaz recognize in Ruth's faith?" },
        { book: "RUT", chapter: 3, verse: 9, title: "Foundations", summary: "Read the language of covering and redemption.", prompt: "Why is this request so meaningful?" },
        { book: "RUT", chapter: 4, verse: 14, title: "Grace in Weakness", summary: "Watch sorrow turned toward praise.", prompt: "How does God work through loss in this story?" },
        { book: "RUT", chapter: 4, verse: 17, title: "Follow God", summary: "Finish by seeing Ruth connected to David's line.", prompt: "How does this small story serve the larger story?" }
      ]
    }
  );
  const dailyFocuses = [
    { label: "Steady Heart", book: "PSA", chapter: 27, verse: 1, prayer: "Ask for courage rooted in God's presence instead of your own control." },
    { label: "Wisdom Today", book: "JAS", chapter: 1, verse: 5, prayer: "Ask directly for wisdom in the decision already in front of you." },
    { label: "Grace Enough", book: "2CO", chapter: 12, verse: 9, prayer: "Bring weakness to God without editing it first." },
    { label: "Follow Christ", book: "MRK", chapter: 8, verse: 34, prayer: "Pray for courage to follow Jesus instead of negotiating with Him." },
    { label: "Quiet Trust", book: "ISA", chapter: 30, verse: 15, prayer: "Ask for a quieter soul and a steadier trust than the day can produce." },
    { label: "Life And Peace", book: "ROM", chapter: 8, verse: 6, prayer: "Ask the Spirit to set your mind on life and peace." },
    { label: "Look Up", book: "COL", chapter: 3, verse: 2, prayer: "Pray for attention shaped by heaven rather than anxiety." }
  ];

  const topicGroups = [
    {
      id: "faith-life",
      title: "Faith & Daily Life",
      description: "Start here for trust, obedience, spiritual growth, and everyday walking with God.",
      topics: [
        { id: "faith", label: "Faith", summary: "Build trust in God's promises and character.", references: ["Hebrews 11:1", "Romans 10:17"], search: "faith trust believe" },
        { id: "grace", label: "Grace", summary: "Study salvation and strength given by grace.", references: ["Ephesians 2:8", "2 Corinthians 12:9"], search: "grace mercy salvation" },
        { id: "obedience", label: "Obedience", summary: "Trace love-driven obedience and submission to God.", references: ["John 14:15", "James 1:22"], search: "obedience commandments follow" },
        { id: "purpose", label: "Purpose", summary: "See calling, vocation, and faithful stewardship.", references: ["Ephesians 2:10", "Colossians 3:23"], search: "purpose calling work" }
      ]
    },
    {
      id: "relationships",
      title: "Relationships",
      description: "Topics for marriage, family, friendship, manhood, womanhood, and forgiveness.",
      topics: [
        { id: "marriage", label: "Marriage", summary: "Read covenant love, sacrifice, and mutual care.", references: ["Ephesians 5:25", "Genesis 2:24"], search: "marriage husband wife love" },
        { id: "family", label: "Family", summary: "Study family life, parenting, and honor.", references: ["Colossians 3:20", "Proverbs 22:6"], search: "family children parent honor" },
        { id: "friendship", label: "Friendship", summary: "Trace wise companionship and loyalty.", references: ["Proverbs 17:17", "John 15:13"], search: "friend friendship brother" },
        { id: "manhood", label: "Manhood", summary: "Look at courage, integrity, humility, and leadership.", references: ["1 Corinthians 16:13", "Micah 6:8"], search: "manhood courage lead integrity" },
        { id: "womanhood", label: "Womanhood", summary: "Study strength, wisdom, and godly character.", references: ["Proverbs 31:25", "Titus 2:3"], search: "womanhood wisdom virtue" },
        { id: "forgiveness", label: "Forgiveness", summary: "Learn mercy, reconciliation, and release.", references: ["Colossians 3:13", "Matthew 6:14"], search: "forgive forgiveness mercy" }
      ]
    },
    {
      id: "hard-seasons",
      title: "Hard Seasons",
      description: "Use these when life feels heavy and you need clear passages for real struggles.",
      topics: [
        { id: "anxiety", label: "Anxiety", summary: "Find passages for fear, worry, and peace.", references: ["Philippians 4:6", "1 Peter 5:7"], search: "anxiety fear peace worry" },
        { id: "suffering", label: "Suffering", summary: "Study endurance, lament, and hope in pain.", references: ["Romans 8:18", "James 1:2"], search: "suffering trial affliction hope" },
        { id: "temptation", label: "Temptation", summary: "Read about fleeing sin and standing firm.", references: ["1 Corinthians 10:13", "James 4:7"], search: "temptation sin flee" },
        { id: "heavy-heart", label: "Heavy Heart", summary: "Look at sorrow, waiting, and God's nearness.", references: ["Psalm 42:5", "Psalm 34:18"], search: "sad sorrow cast down brokenhearted" }
      ]
    },
    {
      id: "prayer-worship",
      title: "Prayer, Worship & Extras",
      description: "Guides for prayer, praise, fasting, giving, mission, and spiritual focus.",
      topics: [
        { id: "prayer", label: "Prayer", summary: "Learn persistence, honesty, and dependence in prayer.", references: ["Matthew 6:9", "Philippians 4:6"], search: "prayer ask seek knock" },
        { id: "worship", label: "Worship", summary: "Read passages about reverence, praise, and thanksgiving.", references: ["Psalm 95:6", "John 4:24"], search: "worship praise thanksgiving" },
        { id: "fasting", label: "Fasting", summary: "Study hunger for God and hidden devotion.", references: ["Matthew 6:16", "Isaiah 58:6"], search: "fasting humble seek god" },
        { id: "mission", label: "Mission", summary: "Follow witness, compassion, and gospel sending.", references: ["Matthew 28:19", "Acts 1:8"], search: "mission witness gospel nations" },
        { id: "giving", label: "Giving", summary: "Learn generosity, stewardship, and cheerful service.", references: ["2 Corinthians 9:7", "Proverbs 3:9"], search: "giving generosity stewardship" }
      ]
    }
  ];

  const supportSections = [
    {
      id: "about",
      title: "About",
      summary: "Selah Journey is a local-first Bible reading and study workspace built to keep reading, notes, journeys, and account tools in one place.",
      body: [
        "The app is designed to feel useful on a real weekday, not only during a formal devotional slot.",
        "It keeps local study state first, then layers account sync, notifications, sharing, and guided reading on top."
      ]
    },
    {
      id: "help",
      title: "Help",
      summary: "Core help for getting started quickly.",
      body: [
        "Open Read to move through chapters and use copy, highlight, note, and speech tools.",
        "Open Browse to explore books, topics, journeys, and curated collections.",
        "Open Account to manage sync, notifications, username, security, and reader preferences."
      ]
    },
    {
      id: "news",
      title: "News",
      summary: "Recent product notes inside the app.",
      body: [
        "19 guided journeys are now available with structured learning paths.",
        "New browse groupings cover Bible books, topics, support, sharing, and donations.",
        "Reader voice tools, in-app notifications, and account controls now ship in the same workspace."
      ]
    },
    {
      id: "terms",
      title: "Terms And Conditions",
      summary: "Use the app responsibly and do not abuse the public access features or email tools.",
      body: [
        "This workspace is provided as-is for study and personal use.",
        "You are responsible for your own account, public links, and any content you share."
      ]
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      summary: "Most study state stays local unless you choose to sign in and sync it.",
      body: [
        "Bookmarks, notes, highlights, and recent study activity are stored in your browser by default.",
        "If you create an account, synced account data is stored in the local server files on your PC."
      ]
    },
    {
      id: "tracking",
      title: "Tracking",
      summary: "Tracking is intentionally minimal.",
      body: [
        "The app does not include third-party analytics by default.",
        "Recent study history, notifications, and preferences are stored locally to power app features."
      ]
    },
    {
      id: "version",
      title: "Version",
      summary: "Current local build information.",
      body: [
        "Selah Journey build: 0.6.0",
        "Release focus: journeys, browse groups, notifications, TTS, and remote access helpers."
      ]
    }
  ];

  const notificationPresets = [
    { id: "welcome", title: "Welcome to Selah Journey", message: "Your reader, journeys, and study desk are ready to use.", type: "system" },
    { id: "daily-focus", title: "Daily focus available", message: "Open Home to pick up today's verse and prayer anchor.", type: "study" },
    { id: "journey-ready", title: "19 journeys available", message: "Browse gospel, wisdom, prophecy, and everyday-life tracks.", type: "journey" }
  ];

  window.StudyCompassData = {
    journeys,
    dailyFocuses,
    topicGroups,
    supportSections,
    notificationPresets
  };
})();
