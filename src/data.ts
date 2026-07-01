import { QuizCategory, FriendScore, UserState } from './types';
import { USER_COMPACT_QUESTIONS, getQuestionsFromCompact } from './newQuestionsData';

// Dynamic sub-categorization based on scripture reference keywords and difficulty
const otNormalList = USER_COMPACT_QUESTIONS.filter(q => q.cat === 'OT' && q.diff !== 'HARD');
const ntNormalList = USER_COMPACT_QUESTIONS.filter(q => q.cat === 'NT' && q.diff !== 'HARD');
const otHardList = USER_COMPACT_QUESTIONS.filter(q => q.cat === 'OT' && q.diff === 'HARD');
const ntHardList = USER_COMPACT_QUESTIONS.filter(q => q.cat === 'NT' && q.diff === 'HARD');

const torahKeywords = ['genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy'];
const torahCompact = otNormalList.filter(q => 
  torahKeywords.some(keyword => q.r.toLowerCase().includes(keyword))
);

const historyPoetryKeywords = [
  'joshua', 'judges', 'ruth', 'samuel', 'kings', 'chronicles', 'ezra', 'nehemiah', 'esther',
  'job', 'psalms', 'proverbs', 'ecclesiastes', 'song of'
];
const historyCompact = otNormalList.filter(q => 
  historyPoetryKeywords.some(keyword => q.r.toLowerCase().includes(keyword))
);

const prophetsCompact = otNormalList.filter(q => 
  !torahCompact.includes(q) && !historyCompact.includes(q)
);

const gospelsKeywords = ['matthew', 'mark', 'luke', 'john'];
const gospelsCompact = ntNormalList.filter(q => 
  gospelsKeywords.some(keyword => q.r.toLowerCase().includes(keyword))
);

const epistlesCompact = ntNormalList.filter(q => 
  !gospelsCompact.includes(q)
);

const torahQuestions = getQuestionsFromCompact(torahCompact, 'ot-torah');
const historyQuestions = getQuestionsFromCompact(historyCompact, 'ot-hist');
const prophetsQuestions = getQuestionsFromCompact(prophetsCompact, 'ot-prophets');
const gospelsQuestions = getQuestionsFromCompact(gospelsCompact, 'nt-gosp');
const epistlesQuestions = getQuestionsFromCompact(epistlesCompact, 'nt-epist');
const otHardQuestions = getQuestionsFromCompact(otHardList, 'ot-hard');
const ntHardQuestions = getQuestionsFromCompact(ntHardList, 'nt-hard');

const DYNAMIC_CATEGORIES: QuizCategory[] = [
  {
    id: 'ot-foundations',
    title: 'OLD TESTAMENT: TORAH',
    subtitle: 'Law & Beginnings of Israel',
    bookName: 'Pentateuch (Torah)',
    durationMins: 12,
    imageType: 'genesis',
    questions: torahQuestions
  },
  {
    id: 'ot-history',
    title: 'OLD TESTAMENT: HISTORY',
    subtitle: 'Sovereigns, Judges & Walls',
    bookName: 'Historical Books',
    durationMins: 12,
    imageType: 'deuteronomy',
    questions: historyQuestions
  },
  {
    id: 'ot-prophets',
    title: 'OLD TESTAMENT: PROPHETS',
    subtitle: 'Voices of the Covenant',
    bookName: 'Prophetic Writings',
    durationMins: 15,
    imageType: 'zephaniah',
    questions: prophetsQuestions
  },
  {
    id: 'nt-gospels',
    title: 'NEW TESTAMENT: GOSPELS',
    subtitle: 'The Life & Grace of Jesus',
    bookName: 'The Four Gospels',
    durationMins: 15,
    imageType: 'matthew',
    questions: gospelsQuestions
  },
  {
    id: 'nt-epistles',
    title: 'NEW TESTAMENT: EPISTLES',
    subtitle: 'The Early Church & Revelation',
    bookName: 'Acts & Pauline Letters',
    durationMins: 15,
    imageType: 'deuteronomy',
    questions: epistlesQuestions
  },
  {
    id: 'ot-master',
    title: 'OT MASTER CLASS 🏆',
    subtitle: 'Expert Hebrew Scripture Trivia',
    bookName: 'Old Testament Hard',
    durationMins: 20,
    imageType: 'zephaniah',
    questions: otHardQuestions
  },
  {
    id: 'nt-master',
    title: 'NT MASTER CLASS 🏆',
    subtitle: 'Expert Greek Scripture Trivia',
    bookName: 'New Testament Hard',
    durationMins: 25,
    imageType: 'matthew',
    questions: ntHardQuestions
  }
];

export const BIBLE_QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'genesis',
    title: 'THE PATRIARCHS',
    subtitle: 'Beginnings of Faith',
    bookName: 'Genesis',
    durationMins: 5,
    imageType: 'genesis',
    questions: [
      {
        id: 'gen-1',
        text: 'Who was sold into slavery by his brothers but later became a ruler in Egypt?',
        options: ['Joseph', 'Daniel', 'Esau', 'Joshua'],
        correctAnswer: 'Joseph',
        bibleRef: 'Genesis 37:28 / Genesis 41:41',
        explanation: 'Joseph was sold into Egypt by his brothers for twenty shekels of silver, and later through interpreting Pharaoh\'s dreams, rose to become second-in-command over all Egypt.'
      },
      {
        id: 'gen-2',
        text: 'On which day of creation did God create humans?',
        options: ['Fourth day', 'Fifth day', 'Sixth day', 'Seventh day'],
        correctAnswer: 'Sixth day',
        bibleRef: 'Genesis 1:26-31',
        explanation: 'God created land animals and human beings (male and female in His own image) on the sixth day of creation.'
      },
      {
        id: 'gen-3',
        text: 'Who was the oldest man mentioned in Genesis, living 969 years?',
        options: ['Methuselah', 'Noah', 'Jared', 'Enoch'],
        correctAnswer: 'Methuselah',
        bibleRef: 'Genesis 5:27',
        explanation: 'Methuselah lived to be 969 years old, making him the longest-lived human recorded in the Bible.'
      },
      {
        id: 'gen-4',
        text: 'What was the name of Abraham\'s wife who gave birth to Isaac in her old age?',
        options: ['Hagar', 'Rebekah', 'Sarah', 'Keturah'],
        correctAnswer: 'Sarah',
        bibleRef: 'Genesis 21:1-3',
        explanation: 'Sarah conceived and bore Abraham a son in his old age, at the set time of which God had spoken to him, and they named him Isaac.'
      },
      {
        id: 'gen-5',
        text: 'Where did the ark of Noah come to rest after the flood waters receded?',
        options: ['Mount Sinai', 'Mount Nebo', 'Mountains of Ararat', 'Mount Hermon'],
        correctAnswer: 'Mountains of Ararat',
        bibleRef: 'Genesis 8:4',
        explanation: 'In the seventh month, on the seventeenth day of the month, the ark came to rest on the mountains of Ararat.'
      },
      {
        id: 'gen-6',
        text: 'What did God change Jacob\'s name to after he wrestled with an angel?',
        options: ['Abraham', 'Israel', 'Isaac', 'Eshcol'],
        correctAnswer: 'Israel',
        bibleRef: 'Genesis 32:28',
        explanation: 'The man said, "Your name shall no longer be called Jacob, but Israel, for you have striven with God and with men, and have prevailed."'
      },
      {
        id: 'gen-7',
        text: 'What did Joseph\'s father Jacob give him that made his brothers jealous?',
        options: ['A golden ring', 'A silver cup', 'A coat of many colors', 'A shepherd staff'],
        correctAnswer: 'A coat of many colors',
        bibleRef: 'Genesis 37:3',
        explanation: 'Now Israel loved Joseph more than all his children... and he made him a coat of many colors, which provoked his brothers\' jealousy.'
      },
      {
        id: 'gen-8',
        text: 'Who was Jacob\'s twin brother?',
        options: ['Esau', 'Laban', 'Ishmael', 'Joseph'],
        correctAnswer: 'Esau',
        bibleRef: 'Genesis 25:24-26',
        explanation: 'When her days to give birth were completed, behold, there were twins in her womb. The first came out red... and they called his name Esau. Afterward his brother came out... and they called his name Jacob.'
      },
      {
        id: 'gen-9',
        text: 'What structure were the people building when God confused their language?',
        options: ['The Temple of Jerusalem', 'The Tower of Babel', 'The Walls of Jericho', 'The Pyramids of Giza'],
        correctAnswer: 'The Tower of Babel',
        bibleRef: 'Genesis 11:4-9',
        explanation: 'The people attempted to build a city and a tower with its top in the heavens, but God confused their language so they scattered across the face of the earth.'
      },
      {
        id: 'gen-10',
        text: 'Out of what was Eve created?',
        options: ['Dust of the ground', 'A rib of Adam', 'A flower', 'Water of the river'],
        correctAnswer: 'A rib of Adam',
        bibleRef: 'Genesis 2:21-22',
        explanation: 'The Lord God caused a deep sleep to fall upon the man... and took one of his ribs and closed up its place with flesh. And the rib that the Lord God had taken from the man he made into a woman.'
      }
    ]
  },
  {
    id: 'deuteronomy',
    title: 'HISTORICAL BOOKS',
    subtitle: 'Words of Covenant',
    bookName: 'Deuteronomy',
    durationMins: 6,
    imageType: 'deuteronomy',
    questions: [
      {
        id: 'deut-1',
        text: 'What does the word "Deuteronomy" literally mean?',
        options: ['History of Exodus', 'Second Law / Copy of the Law', 'The Promises of God', 'Wilderness Wanderings'],
        correctAnswer: 'Second Law / Copy of the Law',
        bibleRef: 'Deuteronomy 17:18',
        explanation: 'The name Deuteronomy comes from the Greek "deuteronomion", meaning "second law" or "copy of this law", referencing the repeating and reinforcing of the Mosaic law to the new generation.'
      },
      {
        id: 'deut-2',
        text: 'Where did Moses deliver the speeches recorded in Deuteronomy?',
        options: ['On Mount Sinai', 'In Egypt', 'Plains of Moab', 'In Jericho'],
        correctAnswer: 'Plains of Moab',
        bibleRef: 'Deuteronomy 1:1-5',
        explanation: 'Moses spoke these words to all Israel beyond the Jordan in the wilderness, on the plains of Moab near the Promised Land.'
      },
      {
        id: 'deut-3',
        text: 'Which mountain did Moses climb to view the Promised Land and die?',
        options: ['Mount Nebo', 'Mount Sinai', 'Mount Carmel', 'Mount Ararat'],
        correctAnswer: 'Mount Nebo',
        bibleRef: 'Deuteronomy 34:1',
        explanation: 'Moses went up from the plains of Moab to Mount Nebo, to the top of Pisgah, which is opposite Jericho, and the Lord showed him all the land.'
      },
      {
        id: 'deut-4',
        text: 'What is the name of the famous Jewish prayer found in Deuteronomy 6:4, starting with "Hear, O Israel"?',
        options: ['The Shema', 'The Kaddish', 'The Amidah', 'The Kol Nidre'],
        correctAnswer: 'The Shema',
        bibleRef: 'Deuteronomy 6:4',
        explanation: '"Hear, O Israel: The Lord our God, the Lord is one" is known as the Shema, the foundational declaration of faith in Judaism.'
      },
      {
        id: 'deut-5',
        text: 'Whom did Moses appoint as his successor to lead Israel into the Promised Land?',
        options: ['Caleb', 'Aaron', 'Eleazar', 'Joshua'],
        correctAnswer: 'Joshua',
        bibleRef: 'Deuteronomy 31:7',
        explanation: 'Then Moses summoned Joshua and said to him in the sight of all Israel, "Be strong and courageous, for you shall go with this people into the land."'
      },
      {
        id: 'deut-6',
        text: 'How many years did Israel wander in the wilderness before crossing the Valley of Zered?',
        options: ['38 years', '40 years', '10 years', '50 years'],
        correctAnswer: '38 years',
        bibleRef: 'Deuteronomy 2:14',
        explanation: 'And the time from our leaving Kadesh-barnea until we crossed the brook Zered was thirty-eight years, until the entire generation of warriors had perished.'
      },
      {
        id: 'deut-7',
        text: 'What did God command Israel to do with His commandments on their houses?',
        options: ['Carve them on tables', 'Write them on doorposts and gates', 'Paint them on the roof', 'Keep them hidden in a box'],
        correctAnswer: 'Write them on doorposts and gates',
        bibleRef: 'Deuteronomy 6:9',
        explanation: 'God instructed Israel to write His words on the doorposts of their houses and on their gates (which led to the practice of the Mezuzah).'
      },
      {
        id: 'deut-8',
        text: 'God told Israel that "man does not live by bread alone, but by..." what?',
        options: ['Every word from the mouth of the Lord', 'The water of the desert', 'The fruit of the vineyard', 'Hard manual labor'],
        correctAnswer: 'Every word from the mouth of the Lord',
        bibleRef: 'Deuteronomy 8:3',
        explanation: 'And he humbled you and let you hunger... that he might make you know that man does not live by bread alone, but man lives by every word that comes from the mouth of the Lord.'
      },
      {
        id: 'deut-9',
        text: 'How old was Moses when he died on Mount Nebo?',
        options: ['80 years old', '100 years old', '120 years old', '150 years old'],
        correctAnswer: '120 years old',
        bibleRef: 'Deuteronomy 34:7',
        explanation: 'Moses was 120 years old when he died. His eye was undimmed, and his vigor unabated.'
      },
      {
        id: 'deut-10',
        text: 'Which city is described in Deuteronomy 34 as "the city of palm trees"?',
        options: ['Jericho', 'Jerusalem', 'Hebron', 'Bethel'],
        correctAnswer: 'Jericho',
        bibleRef: 'Deuteronomy 34:3',
        explanation: 'The Lord showed Moses the Negeb, and the Plain, that is, the Valley of Jericho the city of palm trees, as far as Zoar.'
      }
    ]
  },
  {
    id: 'zephaniah',
    title: 'MINOR PROPHETS',
    subtitle: 'The Great Day',
    bookName: 'Zephaniah',
    durationMins: 20,
    imageType: 'zephaniah',
    questions: [
      {
        id: 'zeph-1',
        text: 'Zephaniah prophesied during the reign of which reform-minded king of Judah?',
        options: ['Josiah', 'Hezekiah', 'Manasseh', 'Uzziah'],
        correctAnswer: 'Josiah',
        bibleRef: 'Zephaniah 1:1',
        explanation: 'The word of the Lord came to Zephaniah... in the days of Josiah, son of Amon, king of Judah.'
      },
      {
        id: 'zeph-2',
        text: 'What is the central theme of the prophecy of Zephaniah?',
        options: ['The Babylonian exile returning', 'The Day of the Lord', 'The building of the Temple', 'The birth of Jesus'],
        correctAnswer: 'The Day of the Lord',
        bibleRef: 'Zephaniah 1:14',
        explanation: 'The central theme is "The Great Day of the Lord", described as near, hastening fast, and a day of wrath, distress, and darkness.'
      },
      {
        id: 'zeph-3',
        text: 'Against which major Assyrian capital city did Zephaniah prophesy total desolation?',
        options: ['Babylon', 'Nineveh', 'Damascus', 'Tyre'],
        correctAnswer: 'Nineveh',
        bibleRef: 'Zephaniah 2:13',
        explanation: 'And he will stretch out his hand against the north and destroy Assyria, and he will make Nineveh a desolation, a dry waste like the desert.'
      },
      {
        id: 'zeph-4',
        text: 'Zephaniah 3:17 refers to God as a "mighty warrior who..." what?',
        options: ['Will destroy all enemies with fire', 'Will save and rejoice over you with gladness', 'Will command angels to fight', 'Will separate the sheep from goats'],
        correctAnswer: 'Will save and rejoice over you with gladness',
        bibleRef: 'Zephaniah 3:17',
        explanation: '"The Lord your God is in your midst, a mighty one who will save; he will rejoice over you with gladness; he will quiet you by his love; he will exult over you with loud singing."'
      },
      {
        id: 'zeph-5',
        text: 'How many chapters are there in the Book of Zephaniah?',
        options: ['1 chapter', '3 chapters', '5 chapters', '12 chapters'],
        correctAnswer: '3 chapters',
        bibleRef: 'Zephaniah Table of Contents',
        explanation: 'The Book of Zephaniah is a short prophetic book consisting of exactly 3 chapters.'
      },
      {
        id: 'zeph-6',
        text: 'Who was Zephaniah\'s famous great-great-grandfather mentioned in his genealogy?',
        options: ['King Hezekiah', 'King David', 'Isaiah the prophet', 'Hilkiat the priest'],
        correctAnswer: 'King Hezekiah',
        bibleRef: 'Zephaniah 1:1',
        explanation: 'The genealogy of Zephaniah goes back four generations to Hezekiah, widely identified as the godly King Hezekiah of Judah.'
      },
      {
        id: 'zeph-7',
        text: 'What kind of people does Zephaniah say God will leave in the midst of Jerusalem?',
        options: ['A wealthy and powerful class', 'A bold and warlike army', 'A humble and lowly people', 'The foreign merchants'],
        correctAnswer: 'A humble and lowly people',
        bibleRef: 'Zephaniah 3:12',
        explanation: '"But I will leave in your midst a humble and lowly people. They shall seek refuge in the name of the Lord."'
      },
      {
        id: 'zeph-8',
        text: 'What does Zephaniah say the Lord will restore to the peoples so they can call on His name?',
        options: ['A pure speech / language', 'The Ark of the Covenant', 'The walls of Jerusalem', 'Abundant gold and silver'],
        correctAnswer: 'A pure speech / language',
        bibleRef: 'Zephaniah 3:9',
        explanation: '"For at that time I will change the speech of the peoples to a pure speech, that all of them may call upon the name of the Lord and serve him with one accord."'
      },
      {
        id: 'zeph-9',
        text: 'Zephaniah calls the humble to "Seek righteousness, seek..." what?',
        options: ['Riches', 'Humility', 'Wisdom', 'Vengeance'],
        correctAnswer: 'Humility',
        bibleRef: 'Zephaniah 2:3',
        explanation: '"Seek the Lord, all you humble of the land, who do his just commands; seek righteousness; seek humility; perhaps you may be hidden on the day of the anger of the Lord."'
      },
      {
        id: 'zeph-10',
        text: 'Which nations does Zephaniah prophesy will become like Sodom and Gomorrah?',
        options: ['Egypt and Cush', 'Moab and Ammon', 'Edom and Philistia', 'Tyre and Sidon'],
        correctAnswer: 'Moab and Ammon',
        bibleRef: 'Zephaniah 2:9',
        explanation: '"Therefore, as I live," declares the Lord of hosts... "Moab shall become like Sodom, and the Ammonites like Gomorrah, a land possessed by nettles and salt pits..."'
      }
    ]
  },
  {
    id: 'thessalonians2',
    title: "PAUL'S EPISTLES",
    subtitle: 'Stand Firm',
    bookName: '2 Thessalonians',
    durationMins: 5,
    imageType: 'deuteronomy',
    questions: [
      {
        id: 'thess-1',
        text: 'Who is the primary author of the book of 2 Thessalonians?',
        options: ['Paul', 'Peter', 'John', 'Barnabas'],
        correctAnswer: 'Paul',
        bibleRef: '2 Thessalonians 1:1',
        explanation: 'Paul, Silvanus, and Timothy write this letter to the church of the Thessalonians.'
      },
      {
        id: 'thess-2',
        text: 'Paul wrote this letter because there was confusion that what event had already happened?',
        options: ['The Resurrection of Saints', 'The Day of the Lord', 'The Fall of Rome', 'The destruction of Jerusalem'],
        correctAnswer: 'The Day of the Lord',
        bibleRef: '2 Thessalonians 2:2',
        explanation: 'Paul warns them not to be quickly shaken or alarmed... to the effect that the day of the Lord has come.'
      },
      {
        id: 'thess-3',
        text: 'What figure of rebellion must be revealed before the Day of the Lord comes?',
        options: ['The King of Babylon', 'The Man of Lawlessness / Sin', 'The False Prophet', 'The Emperor'],
        correctAnswer: 'The Man of Lawlessness / Sin',
        bibleRef: '2 Thessalonians 2:3',
        explanation: 'For that day will not come, unless the rebellion comes first, and the man of lawlessness is revealed, the son of destruction.'
      },
      {
        id: 'thess-4',
        text: 'What famous work rule does Paul give in 2 Thessalonians 3:10?',
        options: ['Work only when you are happy', 'If anyone is not willing to work, let him not eat', 'All work should be done in groups', 'Give all your earnings to the poor'],
        correctAnswer: 'If anyone is not willing to work, let him not eat',
        bibleRef: '2 Thessalonians 3:10',
        explanation: 'For even when we were with you, we would give you this command: If anyone is not willing to work, let him not eat.'
      },
      {
        id: 'thess-5',
        text: 'Who are Paul\'s two co-senders listed in the opening greeting?',
        options: ['Luke and Mark', 'Barnabas and Silas', 'Silvanus (Silas) and Timothy', 'Apollos and Aquila'],
        correctAnswer: 'Silvanus (Silas) and Timothy',
        bibleRef: '2 Thessalonians 1:1',
        explanation: 'The letter opens: "Paul, Silvanus, and Timothy, To the church of the Thessalonians..."'
      },
      {
        id: 'thess-6',
        text: 'Paul is thankful because what spiritual quality is "growing abundantly" in them?',
        options: ['Their faith', 'Their wealth', 'Their church building size', 'Their theological library'],
        correctAnswer: 'Their faith',
        bibleRef: '2 Thessalonians 1:3',
        explanation: '"We ought always to give thanks to God for you, brothers... because your faith is growing abundantly, and the love of every one of you for one another is increasing."'
      },
      {
        id: 'thess-7',
        text: 'Paul prays that God will direct their hearts to the love of God and the what of Christ?',
        options: ['Power', 'Steadfastness / Endurance', 'Mercy', 'Glory'],
        correctAnswer: 'Steadfastness / Endurance',
        bibleRef: '2 Thessalonians 3:5',
        explanation: '"May the Lord direct your hearts to the love of God and to the steadfastness of Christ."'
      },
      {
        id: 'thess-8',
        text: 'What action does Paul command them to take concerning any brother walking in idleness?',
        options: ['Give them more money', 'Keep away from them', 'Exile them to another country', 'Approve their lifestyle'],
        correctAnswer: 'Keep away from them',
        bibleRef: '2 Thessalonians 3:6',
        explanation: 'Now we command you, brothers, in the name of our Lord Jesus Christ, that you keep away from any brother who is walking in idleness.'
      },
      {
        id: 'thess-9',
        text: 'How does Paul guarantee the authenticity of this letter?',
        options: ['He seals it with hot wax', 'He signs it with his own hand', 'He sends a special messenger', 'He encloses his ring'],
        correctAnswer: 'He signs it with his own hand',
        bibleRef: '2 Thessalonians 3:17',
        explanation: '"I, Paul, write this greeting with my own hand. This is the sign of genuineness in every letter of mine; it is the way I write."'
      },
      {
        id: 'thess-10',
        text: 'Paul urges them to stand firm and hold to what?',
        options: ['Their personal opinions', 'The Roman laws', 'The traditions they were taught', 'The temple rituals'],
        correctAnswer: 'The traditions they were taught',
        bibleRef: '2 Thessalonians 2:15',
        explanation: '"So then, brothers, stand firm and hold to the traditions that you were taught by us, either by our spoken word or by our letter."'
      }
    ]
  },
  {
    id: 'matthew',
    title: 'THE GOSPELS',
    subtitle: 'The King and His Kingdom',
    bookName: 'Matthew',
    durationMins: 8,
    imageType: 'matthew',
    questions: [
      {
        id: 'matt-1',
        text: 'What was Matthew\'s profession before he was called by Jesus to be a disciple?',
        options: ['Fisherman', 'Tax Collector', 'Tentmaker', 'Pharisee'],
        correctAnswer: 'Tax Collector',
        bibleRef: 'Matthew 9:9',
        explanation: 'As Jesus passed on from there, he saw a man called Matthew sitting at the tax office, and he said to him, "Follow me." And he rose and followed him.'
      },
      {
        id: 'matt-2',
        text: 'Matthew\'s genealogy of Jesus begins by tracing Him back to which two key Old Testament figures?',
        options: ['Adam and Noah', 'Abraham and King David', 'Moses and Aaron', 'Jacob and Joseph'],
        correctAnswer: 'Abraham and King David',
        bibleRef: 'Matthew 1:1',
        explanation: 'The book of the genealogy of Jesus Christ, the son of David, the son of Abraham.'
      },
      {
        id: 'matt-3',
        text: 'In Matthew, where does Jesus deliver His famous sermon containing the Beatitudes?',
        options: ['From a boat in the sea', 'On a mountain / mount', 'In the Temple of Jerusalem', 'In the synagogue of Nazareth'],
        correctAnswer: 'On a mountain / mount',
        bibleRef: 'Matthew 5:1',
        explanation: 'Seeing the crowds, he went up on the mountain, and when he sat down, his disciples came to him. And he opened his mouth and taught them...'
      },
      {
        id: 'matt-4',
        text: 'What are the three gifts brought by the wise men (magi) to baby Jesus as listed in Matthew?',
        options: ['Gold, Silver, Bronze', 'Gold, Frankincense, Myrrh', 'Wheat, Wine, Oil', 'Silk, Spices, Jewels'],
        correctAnswer: 'Gold, Frankincense, Myrrh',
        bibleRef: 'Matthew 2:11',
        explanation: 'And going into the house, they saw the child with Mary his mother... opening their treasures, they offered him gifts, gold and frankincense and myrrh.'
      },
      {
        id: 'matt-5',
        text: 'In Matthew 16, who declares Jesus to be "the Christ, the Son of the living God"?',
        options: ['John the Baptist', 'Simon Peter', 'Thomas', 'Judas Iscariot'],
        correctAnswer: 'Simon Peter',
        bibleRef: 'Matthew 16:16',
        explanation: 'Simon Peter replied, "You are the Christ, the Son of the living God."'
      },
      {
        id: 'matt-6',
        text: 'What is the name of the garden where Jesus prayed in deep sorrow before His betrayal?',
        options: ['Eden', 'Gethsemane', 'Sharon', 'Carmel'],
        correctAnswer: 'Gethsemane',
        bibleRef: 'Matthew 26:36',
        explanation: 'Then Jesus went with them to a place called Gethsemane, and he said to his disciples, "Sit here, while I go over there and pray."'
      },
      {
        id: 'matt-7',
        text: 'Who was the notorious prisoner released by Pontius Pilate instead of Jesus?',
        options: ['Barabbas', 'Barnabas', 'Bar-Jesus', 'Bar-Jonah'],
        correctAnswer: 'Barabbas',
        bibleRef: 'Matthew 27:21',
        explanation: 'The governor again said to them, "Which of the two do you want me to release for you?" And they said, "Barabbas."'
      },
      {
        id: 'matt-8',
        text: 'What is the final command given by Jesus to His disciples at the end of Matthew\'s Gospel?',
        options: ['The Sermon on the Mount', 'The Golden Rule', 'The Great Commission', 'The Olivet Discourse'],
        correctAnswer: 'The Great Commission',
        bibleRef: 'Matthew 28:18-20',
        explanation: '"Go therefore and make disciples of all nations, baptizing them... teaching them to observe all that I have commanded you."'
      },
      {
        id: 'matt-9',
        text: 'What physical sign did Judas use to identify Jesus to the arresting crowd in Gethsemane?',
        options: ['Pointing his finger', 'A high-five', 'A kiss', 'Handing Him a scroll'],
        correctAnswer: 'A kiss',
        bibleRef: 'Matthew 26:48-49',
        explanation: 'Now the betrayer had given them a sign, saying, "The one I will kiss is the man; seize him." And he came up to Jesus at once and said, "Greetings, Rabbi!" and kissed him.'
      },
      {
        id: 'matt-10',
        text: 'Which disciple stepped out of the boat and walked on water towards Jesus?',
        options: ['John', 'Peter', 'Andrew', 'James'],
        correctAnswer: 'Peter',
        bibleRef: 'Matthew 14:28-29',
        explanation: 'Peter answered him, "Lord, if it is you, command me to come to you on the water." He said, "Come." So Peter got out of the boat and walked on the water and came to Jesus.'
      }
    ]
  },
  ...DYNAMIC_CATEGORIES
];

export const MOCK_LEADERBOARD: FriendScore[] = [
  { id: 'f-1', name: 'Nathaniel O.', xp: 6200, coins: 180, streaks: 8, rank: 1 },
  { id: 'f-2', name: 'Abigail Smith', xp: 5100, coins: 140, streaks: 6, rank: 2 },
  { id: 'f-user', name: 'Rebecca (You)', xp: 4850, coins: 122, streaks: 5, rank: 3, isCurrentUser: true },
  { id: 'f-3', name: 'Elijah Stone', xp: 4200, coins: 90, streaks: 4, rank: 4 },
  { id: 'f-4', name: 'Miriam Vance', xp: 3900, coins: 80, streaks: 3, rank: 5 },
  { id: 'f-5', name: 'Caleb King', xp: 3100, coins: 60, streaks: 2, rank: 6 },
  { id: 'f-6', name: 'Daniel Park', xp: 2400, coins: 40, streaks: 0, rank: 7 }
];

export const INITIAL_USER_STATE: UserState = {
  username: 'Rebecca',
  streaks: 5,
  coins: 122,
  xpEarned: 4850,
  isPremium: false,
  lifelines: {
    hints: 2,
    extraTime: 2,
    multiplier: 1 // default count of multiplier uses or status
  },
  quizProgress: {
    'thessalonians2': {
      startedDate: 'Started Jan 21',
      currentQuestionIndex: 2,
      completed: false,
      score: 1,
      answers: {
        'thess-1': 'Paul',
        'thess-2': 'The Day of the Lord'
      }
    }
  }
};
