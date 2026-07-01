/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question, QuizCategory } from './types';

// Compact representation of user's new questions
export interface CompactQuestion {
  q: string; // question
  o: string[]; // options
  c: number; // correct index
  r: string; // reference
  f: string; // fact / explanation
  cat: 'OT' | 'NT';
  diff?: 'HARD';
}

export const USER_COMPACT_QUESTIONS: CompactQuestion[] = [
  // ==========================================
  // OLD TESTAMENT NORMAL
  // ==========================================
  {
    q: "Who built the ark of salvation?",
    o: ["Noah", "Moses", "Abraham", "David"],
    c: 0,
    r: "Genesis 6:14",
    f: "Jehovah instructed Noah to build the ark to preserve his family and the animals.",
    cat: "OT"
  },
  {
    q: "How many wives did Abraham have?",
    o: ["1", "2", "3", "4"],
    c: 2,
    r: "Genesis 16:1; 25:1",
    f: "Abraham had three women who bore him children: Sarah, Hagar and Keturah.",
    cat: "OT"
  },
  {
    q: "Who was the first man created by Jehovah?",
    o: ["Adam", "Seth", "Enoch", "Cain"],
    c: 0,
    r: "Genesis 2:7",
    f: "Jehovah formed Adam from the dust and breathed the breath of life into him.",
    cat: "OT"
  },
  {
    q: "Who was the first woman created by Jehovah?",
    o: ["Eve", "Sarah", "Rebekah", "Leah"],
    c: 0,
    r: "Genesis 2:22",
    f: "Jehovah made Eve from one of Adam's ribs to be his helper.",
    cat: "OT"
  },
  {
    q: "Who was the first murderer in the Bible?",
    o: ["Cain", "Abel", "Lamech", "Esau"],
    c: 0,
    r: "Genesis 4:8",
    f: "Cain killed his brother Abel out of jealousy.",
    cat: "OT"
  },
  {
    q: "Who was the father of Noah?",
    o: ["Enoch", "Seth", "Lamech", "Methuselah"],
    c: 2,
    r: "Genesis 5:28",
    f: "Lamech was Noah's father and a descendant of Adam.",
    cat: "OT"
  },
  {
    q: "Who led the Israelites out of Egypt by Jehovah’s power?",
    o: ["Joshua", "Moses", "Aaron", "Joseph"],
    c: 1,
    r: "Exodus 3–14",
    f: "Jehovah raised up Moses to deliver Israel from slavery in Egypt.",
    cat: "OT"
  },
  {
    q: "What did Moses use to part the Red Sea?",
    o: ["A staff", "A wind", "An angel", "A cloud"],
    c: 0,
    r: "Exodus 14:21",
    f: "Jehovah instructed Moses to stretch out his staff over the sea, and a strong east wind parted the waters.",
    cat: "OT"
  },
  {
    q: "Who was the first high priest of Israel?",
    o: ["Aaron", "Eleazar", "Phinehas", "Ithamar"],
    c: 0,
    r: "Exodus 28:1",
    f: "Jehovah appointed Aaron, Moses' brother, as the first high priest.",
    cat: "OT"
  },
  {
    q: "What did the Israelites eat in the wilderness?",
    o: ["Manna", "Quail", "Bread", "Fish"],
    c: 0,
    r: "Exodus 16:31",
    f: "Jehovah provided manna from heaven to sustain the Israelites during their journey.",
    cat: "OT"
  },
  {
    q: "What was the sign of the covenant between Jehovah and Israel?",
    o: ["The rainbow", "The Sabbath", "The Ark", "The altar"],
    c: 1,
    r: "Exodus 31:16",
    f: "Jehovah established the Sabbath as a perpetual covenant sign.",
    cat: "OT"
  },
  {
    q: "Who was the first high priest of Israel (Leviticus)?",
    o: ["Aaron", "Eleazar", "Phinehas", "Ithamar"],
    c: 0,
    r: "Leviticus 8:1–12",
    f: "Jehovah consecrated Aaron and his sons as priests to serve at the tabernacle.",
    cat: "OT"
  },
  {
    q: "What did Jehovah require for a sin offering?",
    o: ["A lamb", "A goat", "A bull", "A dove"],
    c: 2,
    r: "Leviticus 4:3",
    f: "Jehovah specified a bull without defect for a sin offering.",
    cat: "OT"
  },
  {
    q: "What was the penalty for blasphemy?",
    o: ["Exile", "Flogging", "Death", "Restitution"],
    c: 2,
    r: "Leviticus 24:16",
    f: "Blasphemy was considered a capital offense under the Law of Moses.",
    cat: "OT"
  },
  {
    q: "What was the purpose of the Feast of Tabernacles?",
    o: ["To celebrate the harvest", "To remember the Exodus", "To honor the priesthood", "To atone for sins"],
    c: 1,
    r: "Leviticus 23:34–43",
    f: "The Feast of Tabernacles commemorated the Israelites' dwelling in booths during their journey in the wilderness.",
    cat: "OT"
  },
  {
    q: "Who was the leader of the tribe of Judah during the wilderness journey?",
    o: ["Caleb", "Joshua", "Moses", "Aaron"],
    c: 0,
    r: "Numbers 2:3",
    f: "Caleb was the leader of the tribe of Judah and one of the twelve spies sent to Canaan.",
    cat: "OT"
  },
  {
    q: "How many spies did Moses send to explore Canaan?",
    o: ["10", "12", "14", "20"],
    c: 1,
    r: "Numbers 13:1–16",
    f: "Moses sent twelve spies, one from each tribe, to explore the land of Canaan.",
    cat: "OT"
  },
  {
    q: "Who opposed Moses and Aaron during their leadership?",
    o: ["Korah", "Dathan", "Abiram", "All of the above"],
    c: 3,
    r: "Numbers 16:1–35",
    f: "Korah, Dathan, and Abiram led a rebellion against Moses and Aaron, resulting in their destruction.",
    cat: "OT"
  },
  {
    q: "What was the punishment for the Israelites' lack of faith at Kadesh-Barnea?",
    o: ["Wandering for 40 years", "Exile", "Death", "Famine"],
    c: 0,
    r: "Numbers 14:26–35",
    f: "Jehovah decreed that the Israelites would wander in the wilderness for 40 years due to their lack of faith.",
    cat: "OT"
  },
  {
    q: "Who succeeded Moses as leader of Israel (Numbers)?",
    o: ["Joshua", "Caleb", "Eleazar", "Samuel"],
    c: 0,
    r: "Numbers 27:18–23",
    f: "Jehovah appointed Joshua to succeed Moses as leader of Israel.",
    cat: "OT"
  },
  {
    q: "What is the first commandment in the Ten Commandments?",
    o: ["You shall have no other gods", "Honor your father and mother", "Do not murder", "Do not steal"],
    c: 0,
    r: "Deuteronomy 5:7",
    f: "Jehovah commands exclusive devotion to Him as the only true God.",
    cat: "OT"
  },
  {
    q: "What was the penalty for adultery under the Law?",
    o: ["Exile", "Flogging", "Death", "Restitution"],
    c: 2,
    r: "Deuteronomy 22:22",
    f: "Adultery was considered a capital offense under the Law of Moses.",
    cat: "OT"
  },
  {
    q: "What did Moses do when he received the tablets of the Law?",
    o: ["He broke them", "He placed them in the Ark", "He read them aloud", "He built an altar"],
    c: 0,
    r: "Deuteronomy 9:17",
    f: "Moses broke the tablets in anger when he saw the Israelites worshiping the golden calf.",
    cat: "OT"
  },
  {
    q: "Who succeeded Moses as leader of Israel (Deuteronomy)?",
    o: ["Joshua", "Caleb", "Eleazar", "Samuel"],
    c: 0,
    r: "Deuteronomy 34:9",
    f: "Jehovah appointed Joshua to succeed Moses as leader of Israel.",
    cat: "OT"
  },
  {
    q: "What did Moses command the Israelites to do with the Law?",
    o: ["Keep it", "Teach it", "Meditate on it", "All of the above"],
    c: 3,
    r: "Deuteronomy 6:6–7",
    f: "Moses instructed the Israelites to keep, teach, and meditate on Jehovah's commandments.",
    cat: "OT"
  },
  {
    q: "Who led Israel after Moses' death (Joshua)?",
    o: ["Joshua", "Caleb", "Eleazar", "Samuel"],
    c: 0,
    r: "Joshua 1:1–2",
    f: "Jehovah appointed Joshua to lead Israel after Moses' death.",
    cat: "OT"
  },
  {
    q: "What city did the Israelites conquer first in the Promised Land?",
    o: ["Jericho", "Ai", "Hebron", "Bethel"],
    c: 0,
    r: "Joshua 6:20",
    f: "The walls of Jericho fell after the Israelites marched around them as Jehovah commanded.",
    cat: "OT"
  },
  {
    q: "Who was the faithful spy from the tribe of Judah?",
    o: ["Caleb", "Joshua", "Moses", "Aaron"],
    c: 0,
    r: "Joshua 14:6–12",
    f: "Caleb trusted in Jehovah and was rewarded with the land promised to him.",
    cat: "OT"
  },
  {
    q: "Who delivered Israel from the Midianites with only 300 men?",
    o: ["Gideon", "Samson", "Deborah", "Ehud"],
    c: 0,
    r: "Judges 7:7",
    f: "Gideon followed Jehovah's instructions and defeated the Midianites.",
    cat: "OT"
  },
  {
    q: "Who killed Sisera, commander of the Canaanite army?",
    o: ["Deborah", "Jael", "Gideon", "Ehud"],
    c: 1,
    r: "Judges 4:21",
    f: "Jael killed Sisera by driving a tent peg through his head.",
    cat: "OT"
  },
  {
    q: "Which judge had supernatural strength?",
    o: ["Samson", "Gideon", "Jephthah", "Ehud"],
    c: 0,
    r: "Judges 16:30",
    f: "Samson’s strength came from Jehovah as long as he did not cut his hair.",
    cat: "OT"
  },
  {
    q: "Who was Naomi's daughter-in-law who stayed with her?",
    o: ["Ruth", "Orpah", "Leah", "Miriam"],
    c: 0,
    r: "Ruth 1:16",
    f: "Ruth loyally stayed with Naomi and eventually married Boaz.",
    cat: "OT"
  },
  {
    q: "Who anointed Saul as Israel's first king?",
    o: ["Samuel", "Nathan", "Elijah", "Gideon"],
    c: 0,
    r: "1 Samuel 10:1",
    f: "Samuel, acting by Jehovah’s direction, anointed Saul.",
    cat: "OT"
  },
  {
    q: "Who defeated Goliath?",
    o: ["Saul", "David", "Jonathan", "Samuel"],
    c: 1,
    r: "1 Samuel 17:50",
    f: "David trusted in Jehovah and killed Goliath with a sling and a stone.",
    cat: "OT"
  },
  {
    q: "Who became king after Saul died?",
    o: ["David", "Solomon", "Absalom", "Jonathan"],
    c: 0,
    r: "2 Samuel 5:3",
    f: "David was anointed king over Israel after Saul's death.",
    cat: "OT"
  },
  {
    q: "Who asked Jehovah for wisdom rather than riches?",
    o: ["Solomon", "David", "Elijah", "Josiah"],
    c: 0,
    r: "1 Kings 3:9",
    f: "Solomon requested wisdom to govern Jehovah’s people.",
    cat: "OT"
  },
  {
    q: "Who was taken up to heaven in a whirlwind?",
    o: ["Elijah", "Elisha", "Isaiah", "Moses"],
    c: 0,
    r: "2 Kings 2:11",
    f: "Elijah was taken directly to heaven in a whirlwind with a chariot of fire.",
    cat: "OT"
  },
  {
    q: "Who was king and wrote many psalms?",
    o: ["David", "Solomon", "Saul", "Josiah"],
    c: 0,
    r: "1 Chronicles 16:7–36",
    f: "David organized worship and wrote psalms to praise Jehovah.",
    cat: "OT"
  },
  {
    q: "Which king built the temple in Jerusalem?",
    o: ["Hezekiah", "Josiah", "Solomon", "Jehoshaphat"],
    c: 2,
    r: "2 Chronicles 3:1",
    f: "Solomon built the temple on Mount Moriah according to Jehovah’s instructions.",
    cat: "OT"
  },
  {
    q: "Who led the exiles back to Jerusalem?",
    o: ["Ezra", "Nehemiah", "Zerubbabel", "Haggai"],
    c: 2,
    r: "Ezra 2:1–2",
    f: "Zerubbabel led the first group of Jews returning from Babylonian exile.",
    cat: "OT"
  },
  {
    q: "Who supervised the rebuilding of Jerusalem’s walls?",
    o: ["Nehemiah", "Ezra", "Zerubbabel", "Haggai"],
    c: 0,
    r: "Nehemiah 2:17",
    f: "Nehemiah organized the people to rebuild the walls under Jehovah’s guidance.",
    cat: "OT"
  },
  {
    q: "Who became queen of Persia and saved the Jews?",
    o: ["Esther", "Vashti", "Mordecai", "Abigail"],
    c: 0,
    r: "Esther 4:14",
    f: "Esther risked her life to intercede with the king for her people.",
    cat: "OT"
  },
  {
    q: "Who endured great suffering but remained faithful to Jehovah?",
    o: ["Job", "Eliphaz", "Bildad", "Zophar"],
    c: 0,
    r: "Job 1:1–22",
    f: "Job maintained faith in Jehovah despite severe trials.",
    cat: "OT"
  },
  {
    q: "Which psalm begins with 'The earth is Jehovah’s'?",
    o: ["Psalm 24", "Psalm 23", "Psalm 119", "Psalm 1"],
    c: 0,
    r: "Psalm 24:1",
    f: "Psalm 24 emphasizes Jehovah’s ownership of the earth and glory.",
    cat: "OT"
  },
  {
    q: "Where can we find 'Trust in Jehovah with all your heart'?",
    o: ["Proverbs 3:5", "Proverbs 1:7", "Proverbs 16:3", "Proverbs 4:23"],
    c: 0,
    r: "Proverbs 3:5",
    f: "This proverb encourages complete reliance on Jehovah rather than human understanding.",
    cat: "OT"
  },
  {
    q: "Who wrote 'All is meaningless'?",
    o: ["Qoheleth", "Solomon", "David", "Isaiah"],
    c: 0,
    r: "Ecclesiastes 1:2",
    f: "Qoheleth reflects on the vanity of worldly pursuits without Jehovah.",
    cat: "OT"
  },
  {
    q: "Which book contains love poems often attributed to Solomon?",
    o: ["Song of solomon", "Psalms", "Proverbs", "Ecclesiastes"],
    c: 0,
    r: "Song of Solomon 1:1",
    f: "This book celebrates love and is attributed to Solomon.",
    cat: "OT"
  },
  {
    q: "Who prophesied about the Messiah coming from Bethlehem?",
    o: ["Isaiah", "Jeremiah", "Ezekiel", "Daniel"],
    c: 0,
    r: "Isaiah 7:14",
    f: "Isaiah foretold that a virgin would give birth to Immanuel.",
    cat: "OT"
  },
  {
    q: "Which prophet warned Jerusalem before the Babylonian exile?",
    o: ["Jeremiah", "Isaiah", "Ezekiel", "Daniel"],
    c: 0,
    r: "Jeremiah 1:4–10",
    f: "Jeremiah prophesied about Jerusalem's destruction and urged repentance.",
    cat: "OT"
  },
  {
    q: "Which book laments the fall of Jerusalem?",
    o: ["Lamentations", "Jeremiah", "Ezekiel", "Isaiah"],
    c: 0,
    r: "Lamentations 1:1",
    f: "The book mourns the city’s destruction and exile.",
    cat: "OT"
  },
  {
    q: "Who saw visions by the river Chebar?",
    o: ["Ezekiel", "Jeremiah", "Isaiah", "Daniel"],
    c: 0,
    r: "Ezekiel 1:1–28",
    f: "Ezekiel witnessed vivid visions while among the exiles in Babylon.",
    cat: "OT"
  },
  {
    q: "Who interpreted King Nebuchadnezzar’s dreams?",
    o: ["Daniel", "Shadrach", "Meshach", "Abednego"],
    c: 0,
    r: "Daniel 2:24–49",
    f: "Daniel gave God’s interpretation of the king’s dreams.",
    cat: "OT"
  },
  {
    q: "Which prophet was commanded to marry a woman of harlotry?",
    o: ["Hosea", "Joel", "Amos", "Micah"],
    c: 0,
    r: "Hosea 1:2",
    f: "Hosea’s marriage symbolized Israel’s unfaithfulness to Jehovah.",
    cat: "OT"
  },
  {
    q: "Which prophet spoke about the outpouring of Jehovah’s spirit?",
    o: ["Joel", "Amos", "Hosea", "Obadiah"],
    c: 0,
    r: "Joel 2:28",
    f: "Joel prophesied that Jehovah’s spirit would be poured on all people.",
    cat: "OT"
  },
  {
    q: "Which prophet warned Israel about injustice and false worship?",
    o: ["Amos", "Hosea", "Joel", "Micah"],
    c: 0,
    r: "Amos 5:24",
    f: "Amos called Israel to let justice flow like a river and righteousness like a stream.",
    cat: "OT"
  },
  {
    q: "Which prophet condemned Edom for its pride and cruelty?",
    o: ["Obadiah", "Amos", "Joel", "Micah"],
    c: 0,
    r: "Obadiah 1:1–21",
    f: "Obadiah prophesied against Edom for rejoicing over Israel’s fall.",
    cat: "OT"
  },
  {
    q: "Which prophet was sent to preach to Nineveh?",
    o: ["Jonah", "Hosea", "Amos", "Micah"],
    c: 0,
    r: "Jonah 1:1–2",
    f: "Jehovah commanded Jonah to go to Nineveh and proclaim repentance.",
    cat: "OT"
  },
  {
    q: "Which prophet spoke of Bethlehem as the birthplace of the Messiah?",
    o: ["Micah", "Isaiah", "Jeremiah", "Ezekiel"],
    c: 0,
    r: "Micah 5:2",
    f: "Micah prophesied that the ruler of Israel would come from Bethlehem.",
    cat: "OT"
  },
  {
    q: "Which prophet foretold Nineveh’s destruction?",
    o: ["Nahum", "Jonah", "Habakkuk", "Zephaniah"],
    c: 0,
    r: "Nahum 1:1–15",
    f: "Nahum predicted the downfall of Nineveh because of its wickedness.",
    cat: "OT"
  },
  {
    q: "Which prophet questioned Jehovah about the prosperity of the wicked?",
    o: ["Habakkuk", "Zephaniah", "Haggai", "Malachi"],
    c: 0,
    r: "Habakkuk 1:2–4",
    f: "Habakkuk asked why injustice and violence went unpunished.",
    cat: "OT"
  },
  {
    q: "Which prophet warned of the coming 'Day of Jehovah'?",
    o: ["Zephaniah", "Haggai", "Malachi", "Habakkuk"],
    c: 0,
    r: "Zephaniah 1:14–18",
    f: "Zephaniah foretold a day of judgment for Judah and the nations.",
    cat: "OT"
  },
  {
    q: "Which prophet encouraged the Jews to rebuild Jehovah’s temple?",
    o: ["Haggai", "Zechariah", "Malachi", "Joel"],
    c: 0,
    r: "Haggai 1:7–15",
    f: "Haggai motivated the returned exiles to rebuild the temple in Jerusalem.",
    cat: "OT"
  },
  {
    q: "Which prophet had visions encouraging the temple’s completion?",
    o: ["Zechariah", "Haggai", "Malachi", "Joel"],
    c: 0,
    r: "Zechariah 1:7–17",
    f: "Zechariah’s visions promised Jehovah’s protection and blessings for Jerusalem.",
    cat: "OT"
  },
  {
    q: "Which prophet foretold the coming of a messenger before Jehovah’s day?",
    o: ["Malachi", "Zechariah", "Haggai", "Joel"],
    c: 0,
    r: "Malachi 3:1",
    f: "Malachi predicted the arrival of a messenger who would prepare people for Jehovah’s intervention.",
    cat: "OT"
  },

  // ==========================================
  // NEW TESTAMENT NORMAL
  // ==========================================
  {
    q: "Where was Jesus born?",
    o: ["Nazareth", "Bethlehem", "Jerusalem", "Capernaum"],
    c: 1,
    r: "Luke 2:4–7",
    f: "Jesus was born in Bethlehem, fulfilling the prophecy of Micah 5:2.",
    cat: "NT"
  },
  {
    q: "Who baptized Jesus?",
    o: ["Peter", "John the Baptist", "James", "Paul"],
    c: 1,
    r: "Matthew 3:13–17",
    f: "John baptized Jesus in the Jordan River, after which the heavens opened.",
    cat: "NT"
  },
  {
    q: "What did Jesus say is the greatest commandment?",
    o: ["Love God with all your heart", "Love your neighbor", "Do not steal", "Honor your parents"],
    c: 0,
    r: "Matthew 22:37–38",
    f: "Jesus said to love Jehovah with all your heart, soul, and mind is the greatest commandment.",
    cat: "NT"
  },
  {
    q: "Who visited Jesus at his birth?",
    o: ["Shepherds", "Wise men", "John", "Peter"],
    c: 1,
    r: "Matthew 2:1–12",
    f: "Wise men from the east came to worship the newborn King of the Jews.",
    cat: "NT"
  },
  {
    q: "What did Jesus feed with five loaves and two fish?",
    o: ["5000 men", "500 women", "4000 men", "12 disciples"],
    c: 0,
    r: "Matthew 14:17–21",
    f: "Jesus miraculously fed about 5,000 men plus women and children.",
    cat: "NT"
  },
  {
    q: "Who did Jesus raise from the dead?",
    o: ["Lazarus", "Jairus' daughter", "The widow's son", "All of the above"],
    c: 3,
    r: "Mark 5:41–42; John 11:43–44",
    f: "Jesus demonstrated his power over death by raising multiple individuals.",
    cat: "NT"
  },
  {
    q: "Who walked on water to meet Jesus?",
    o: ["Peter", "John", "James", "Matthew"],
    c: 0,
    r: "Mark 6:48–49",
    f: "Peter walked on water toward Jesus but began to sink when he doubted.",
    cat: "NT"
  },
  {
    q: "What did Jesus do for the sick?",
    o: ["He healed them", "He prayed for them", "He ignored them", "He baptized them"],
    c: 0,
    r: "Mark 1:34",
    f: "Jesus healed many who were sick, showing compassion and power.",
    cat: "NT"
  },
  {
    q: "Who recognized Jesus as the Son of God at his baptism?",
    o: ["John", "Peter", "Matthew", "James"],
    c: 0,
    r: "Mark 1:11",
    f: "A voice from heaven declared Jesus as God’s Son.",
    cat: "NT"
  },
  {
    q: "What parable did Jesus teach about lost sheep?",
    o: ["Parable of the Lost Sheep", "Parable of the Talents", "Parable of the Sower", "Parable of the Good Samaritan"],
    c: 0,
    r: "Mark 15:4; Luke 15:4–7",
    f: "Jesus emphasized that Jehovah rejoices when a sinner repents, like finding a lost sheep.",
    cat: "NT"
  },
  {
    q: "Who visited Mary to announce Jesus' birth?",
    o: ["Gabriel", "Michael", "Peter", "John the Baptist"],
    c: 0,
    r: "Luke 1:26–31",
    f: "Angel Gabriel told Mary she would conceive Jesus by Jehovah’s power.",
    cat: "NT"
  },
  {
    q: "What did Jesus do in the temple at age 12?",
    o: ["Taught the elders", "Prayed silently", "Observed quietly", "Fled from teachers"],
    c: 0,
    r: "Luke 2:46–47",
    f: "Jesus taught the elders and amazed them with his understanding.",
    cat: "NT"
  },
  {
    q: "What did the angels announce to the shepherds?",
    o: ["Jesus’ birth", "A new king", "The Passover", "Judgment day"],
    c: 0,
    r: "Luke 2:10–12",
    f: "Angels proclaimed the birth of the Savior, Christ the Lord.",
    cat: "NT"
  },
  {
    q: "What parable taught about the prodigal son?",
    o: ["Parable of the Lost Son", "Parable of the Good Samaritan", "Parable of the Sower", "Parable of the Talents"],
    c: 0,
    r: "Luke 15:11–32",
    f: "Jesus illustrated Jehovah’s forgiveness through the story of the prodigal son.",
    cat: "NT"
  },
  {
    q: "Who prepared the way for Jesus?",
    o: ["John the Baptist", "Peter", "Paul", "James"],
    c: 0,
    r: "Luke 3:3",
    f: "John preached repentance to prepare people for the coming of the Messiah.",
    cat: "NT"
  },
  {
    q: "Who did Jesus say he is in John 14:6?",
    o: ["The way, the truth, and the life", "A prophet", "A teacher", "The king of Israel"],
    c: 0,
    r: "John 14:6",
    f: "Jesus declared he is the only way to Jehovah and eternal life.",
    cat: "NT"
  },
  {
    q: "What miracle did Jesus perform at Cana?",
    o: ["Turned water into wine", "Healed a blind man", "Walked on water", "Fed the 5,000"],
    c: 0,
    r: "John 2:1–11",
    f: "Jesus turned water into wine, showing his glory and power.",
    cat: "NT"
  },
  {
    q: "What did Jesus say about the bread of life?",
    o: ["He gives eternal life", "He heals physically", "He teaches laws", "He judges"],
    c: 0,
    r: "John 6:35",
    f: "Jesus promised that whoever eats his flesh and drinks his blood will have eternal life.",
    cat: "NT"
  },
  {
    q: "Who did Jesus raise from the dead after four days?",
    o: ["Lazarus", "Jairus’ daughter", "The widow’s son", "Elijah"],
    c: 0,
    r: "John 11:43–44",
    f: "Jesus showed his power over death by raising Lazarus.",
    cat: "NT"
  },
  {
    q: "Who received the Holy Spirit at Pentecost?",
    o: ["The apostles", "120", "Paul", "3000"],
    c: 1,
    r: "Acts 1:15-16",
    f: "the number of people was altogether about 120",
    cat: "NT"
  },
  {
    q: "Who preached in the synagogue of Antioch?",
    o: ["Paul", "Peter", "Barnabas", "John"],
    c: 0,
    r: "Acts 13:14–16",
    f: "Paul taught about Jesus as the Messiah in Antioch.",
    cat: "NT"
  },
  {
    q: "Who converted the Ethiopian eunuch?",
    o: ["Philip", "Paul", "Peter", "Barnabas"],
    c: 0,
    r: "Acts 8:36–38",
    f: "Philip baptized the Ethiopian after explaining Isaiah’s prophecy.",
    cat: "NT"
  },
  {
    q: "Who was Saul before he became Paul?",
    o: ["A persecutor of Christians", "A tax collector", "A soldier", "A priest"],
    c: 0,
    r: "Acts 9:1–22",
    f: "Saul persecuted Christians before his conversion on the road to Damascus.",
    cat: "NT"
  },
  {
    q: "Who fell asleep and fell from a window in Acts 20?",
    o: ["Eutychus", "Paul", "Silas", "Timothy"],
    c: 0,
    r: "Acts 20:9–10",
    f: "Eutychus fell asleep during Paul’s long sermon and fell from the third story.",
    cat: "NT"
  },
  {
    q: "What is the gift of God according to Romans 6:23?",
    o: ["Everlasting life", "Salvation by works", "Wealth", "Healing"],
    c: 0,
    r: "Romans 6:23",
    f: "The gift of God is everlasting life through Jesus Christ.",
    cat: "NT"
  },
  {
    q: "Who justifies the ungodly?",
    o: ["God", "Moses", "Paul", "Peter"],
    c: 0,
    r: "Romans 4:5",
    f: "Jehovah declares the ungodly righteous through faith in Jesus.",
    cat: "NT"
  },
  {
    q: "Who are heirs with Christ?",
    o: ["Those who love God", "The faithful", "The apostles", "The angels"],
    c: 0,
    r: "Romans 8:17",
    f: "Christians who suffer with Christ are also heirs of God’s promises.",
    cat: "NT"
  },
  {
    q: "What can separate us from God’s love?",
    o: ["Nothing", "Suffering", "Persecution", "Trials"],
    c: 0,
    r: "Romans 8:38–39",
    f: "Neither death, life, angels, nor powers can separate us from Jehovah’s love.",
    cat: "NT"
  },
  {
    q: "What does faith produce according to Romans 5:1–2?",
    o: ["Peace and hope", "Wealth", "Fame", "Knowledge"],
    c: 0,
    r: "Romans 5:1–2",
    f: "Faith brings peace with God and hope in His promises.",
    cat: "NT"
  },
  {
    q: "Who is the head of the congreation?",
    o: ["Christ", "Peter", "Paul", "John"],
    c: 0,
    r: "1 Corinthians 11:3",
    f: "Christ is the head of every Christian congregation.",
    cat: "NT"
  },
  {
    q: "What is the greatest virtue according to 1 Corinthians 13?",
    o: ["Love", "Faith", "Hope", "Wisdom"],
    c: 0,
    r: "1 Corinthians 13:13",
    f: "Love is the greatest of all spiritual virtues.",
    cat: "NT"
  },
  {
    q: "What is the body of Christ compared to in 1 Corinthians 12?",
    o: ["One body with many parts", "A temple", "A kingdom", "A family"],
    c: 0,
    r: "1 Corinthians 12:12",
    f: "The congregation functions like a body with many members working together.",
    cat: "NT"
  },
  {
    q: "Who will raise the dead in glory?",
    o: ["Jesus", "Paul", "Peter", "John"],
    c: 0,
    r: "1 Corinthians 15:52–53",
    f: "Jesus will transform the dead into an immortal, glorious form at his coming.",
    cat: "NT"
  },
  {
    q: "What gift is greater than prophecy or knowledge?",
    o: ["Love", "Faith", "Healing", "Wisdom"],
    c: 0,
    r: "1 Corinthians 13:1–2",
    f: "Even if one has knowledge or prophecy, without love it profits nothing.",
    cat: "NT"
  },
  {
    q: "Who is declared worthy to receive glory and honor?",
    o: ["Jesus", "Peter", "Jehovah our God", "Moses"],
    c: 2,
    r: "Revelation 4:11",
    f: "Jehovah our God is declared worthy to receive glory and honor.",
    cat: "NT"
  },
  {
    q: "Who will judge the living and the dead?",
    o: ["Jesus Christ", "Peter", "Paul", "Michael"],
    c: 0,
    r: "Revelation 22:12–13",
    f: "Jesus Christ will return to judge all people.",
    cat: "NT"
  },
  {
    q: "What is the reward for those who overcome?",
    o: ["Eternal life in paradise", "Wealth", "Power", "Fame"],
    c: 0,
    r: "Revelation 2:7",
    f: "Those who overcome will eat from the tree of life and live forever.",
    cat: "NT"
  },
  {
    q: "What is the first thing John saw in Revelation?",
    o: ["A vision of Christ", "The throne of God", "Angels", "The 144,000"],
    c: 0,
    r: "Revelation 1:12–16",
    f: "John saw Jesus Christ standing among seven golden lampstands.",
    cat: "NT"
  },
  {
    q: "How many congreation did Jesus address in Revelation 2–3?",
    o: ["7", "12", "10", "5"],
    c: 0,
    r: "Revelation 2:1–3:22",
    f: "Jesus sent letters to seven congregations in Asia.",
    cat: "NT"
  },

  // ==========================================
  // OLD TESTAMENT HARD
  // ==========================================
  {
    q: "How old was Methuselah when he died?",
    o: ["969", "930", "912", "950"],
    c: 0,
    r: "Genesis 5:27",
    f: "Methuselah lived 969 years, making him the oldest person recorded in the Bible.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "How many cubits long, wide, and high was Noah's Ark?",
    o: ["300x50x30", "250x40x20", "200x40x30", "350x60x30"],
    c: 0,
    r: "Genesis 6:15",
    f: "Noah's Ark was 300 cubits long, 50 cubits wide, and 30 cubits high.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "Who said, “Am I my brother’s keeper?”",
    o: ["Abel", "Cain", "Seth", "Noah"],
    c: 1,
    r: "Genesis 4:9",
    f: "Cain said this after God asked him about Abel, whom he had killed.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "What were the seven plagues of Egypt that came before the death of the firstborn?",
    o: ["Water to blood, frogs, lice, flies, livestock, boils, hail", "Frogs, lice, flies, livestock, boils, hail, locusts", "Water to blood, frogs, locusts, darkness, boils, hail, flies", "Water to blood, frogs, lice, locusts, livestock, hail, darkness"],
    c: 0,
    r: "Exodus 7–9",
    f: "The first seven plagues were: water turning to blood, frogs, lice, flies, livestock disease, boils, and hail.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "How many spies did Moses send into Canaan?",
    o: ["10", "12", "14", "15"],
    c: 1,
    r: "Numbers 13:1–2",
    f: "Moses sent twelve men, one from each tribe, to spy out the land of Canaan.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "How many stones did David take to fight Goliath?",
    o: ["3", "5", "7", "10"],
    c: 1,
    r: "1 Samuel 17:40",
    f: "David selected five smooth stones from the brook before facing Goliath.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "Who interpreted Pharaoh's dreams?",
    o: ["Joseph", "Moses", "Aaron", "Daniel"],
    c: 0,
    r: "Genesis 41:14–16",
    f: "Joseph interpreted Pharaoh's dreams and predicted seven years of plenty followed by seven years of famine.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "How many years did the Israelites wander in the wilderness?",
    o: ["20", "30", "40", "50"],
    c: 2,
    r: "Numbers 14:33–34",
    f: "Because of their lack of faith, the Israelites wandered 40 years before entering Canaan.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "From which tribe was the first king of Israel, Saul?",
    o: ["Judah", "Benjamin", "Levi", "Ephraim"],
    c: 1,
    r: "1 Samuel 9:1–2",
    f: "Saul was from the tribe of Benjamin.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "How many books are in the Old Testament?",
    o: ["35", "36", "39", "40"],
    c: 2,
    r: "NWT Old Testament",
    f: "The Old Testament contains 39 books in the New World Translation.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "How many people were true worshippers of Jehovah when Elijah wanted to give up?",
    o: ["700", "7000", "77,000", "70,000"],
    c: 1,
    r: "1 Kings 19:18",
    f: "Elijah was encouraged by God that 7,000 in Israel had not worshiped Baal.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "Who was the prophet that prophesied the fall of Nineveh?",
    o: ["Jonah", "Nahum", "Hosea", "Amos"],
    c: 1,
    r: "Nahum 1:1",
    f: "Nahum delivered God's message about Nineveh's coming destruction.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "Who was the prophet that saw a vision of a valley of dry bones?",
    o: ["Ezekiel", "Isaiah", "Jeremiah", "Daniel"],
    c: 0,
    r: "Ezekiel 37:1–14",
    f: "Ezekiel saw a vision where God caused dry bones to come to life, symbolizing Israel's restoration.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "What did God create on the fourth day of creation?",
    o: ["Sun, moon, and stars", "Land animals", "Birds", "Fish"],
    c: 0,
    r: "Genesis 1:14-19",
    f: "On the fourth day, God created the sun to rule the day, the moon to rule the night, and the stars.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "How many prophetesses are mentioned in the Bible?",
    o: ["3", "5", "7", "9"],
    c: 1,
    r: "Exodus 15:20; Judges 4:4; 2 Kings 22:14; Nehemiah 6:14; Luke 2:36",
    f: "The Bible names five prophetesses: Miriam, Deborah, Huldah, Noadiah, and Anna.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "Who was Jacob's 4th son?",
    o: ["Reuben", "Simeon", "Levi", "Judah"],
    c: 3,
    r: "Genesis 29:35; 30:1–5",
    f: "Judah was Jacob's fourth son, born to Leah.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "Who was the first to know the meaning of Jehovah's name according to the Bible?",
    o: ["Moses", "Abraham", "Noah", "Adam"],
    c: 0,
    r: "Exodus 3:13-14",
    f: "So God said to Moses: 'I Will Become What I Choose to Become.'",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "For how many pieces of silver was Joseph sold by his brothers to the merchants?",
    o: ["10", "20", "30", "40"],
    c: 1,
    r: "Genesis 37:28",
    f: "Joseph’s brothers sold him to the Ishmaelites for 20 pieces of silver, leading to his journey into Egypt.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "Who was the last king of Judah before Babylon conquered Jerusalem?",
    o: ["Jehoiakim", "Hezekiah", "Zedekiah", "Manasseh"],
    c: 2,
    r: "2 Kings 25:7",
    f: "Zedekiah was the last king of Judah before Jerusalem was destroyed by the Babylonians in 607 B.C.E.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "What was the name of the prophet from Judah disobeyed Jehovah and was killed by a lion on his way back.?",
    o: ["Elijah", "Amos", "Nahum", "None of the above"],
    c: 3,
    r: "1 Kings 13:20-24",
    f: "The Bible never mentions his name; it only calls him 'the man of the true God from Judah.'",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "Who was the only woman to rule as queen over Judah?",
    o: ["Deborah", "Athaliah", "Jezebel", "Esther"],
    c: 1,
    r: "2 Kings 11:1-3",
    f: "Athaliah seized power after her son Ahaziah died, making her the only woman to rule Judah.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "Which prophet lay on his left side for 390 days and on his right side for 40 days to represent Israel’s sins?",
    o: ["Isaiah", "Jeremiah", "Ezekiel", "Daniel"],
    c: 2,
    r: "Ezekiel 4:4-6",
    f: "Jehovah instructed Ezekiel to lie on each side to represent the years of Israel and Judah’s error.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "Which judge of Israel made a rash vow that led to the sacrifice of his daughter?",
    o: ["Samson", "Jephthah", "Gideon", "Abimelech"],
    c: 1,
    r: "Judges 11:30-40",
    f: "Jephthah vowed to offer up whatever came out of his house if Jehovah gave him victory, and it was his daughter.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "Who killed King Ahab’s seventy sons and put their heads in baskets at Jezreel?",
    o: ["Jehu", "Jehoiada", "Jehoiakim", "Hoshea"],
    c: 0,
    r: "2 Kings 10:6-7",
    f: "Jehu carried out Jehovah’s judgment against Ahab’s house by ordering the execution of his 70 sons.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "What was the name of the king who saw the hand writing on the wall?",
    o: ["Nebuchadnezzar", "Belshazzar", "Darius", "Cyrus"],
    c: 1,
    r: "Daniel 5:1, 22-28",
    f: "Belshazzar saw the hand write a message of judgment on the wall during a feast.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "What was the name of the prophet who confronted David about his sin with Bath-sheba?",
    o: ["Gad", "Samuel", "Nathan", "Elijah"],
    c: 2,
    r: "2 Samuel 12:1-7",
    f: "Nathan boldly confronted David with a parable about a rich man and a poor man’s lamb, exposing his sin.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "Who fasted for 40 days and nights at Mount Horeb before receiving a vision of Jehovah?",
    o: ["Moses", "Elijah", "Elisha", "Isaiah"],
    c: 1,
    r: "1 Kings 19:8-12",
    f: "Elijah traveled to Mount Horeb and fasted 40 days before Jehovah revealed Himself in a calm, low voice.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "Who was the youngest king in the bible?",
    o: ["Josiah", "Manasseh", "Jehoash", "Hezekiah"],
    c: 2,
    r: "2 Kings 11:21",
    f: "Jehoash (also called Joash) became king at 7 years old, making him the youngest king recorded in the Bible.",
    cat: "OT",
    diff: "HARD"
  },
  {
    q: "Who did Elisha raise from the dead?",
    o: ["The widow’s son at Zarephath", "The Shunammite woman’s son", "The widow’s son at Nain", "The centurion’s servant"],
    c: 1,
    r: "2 Kings 4:32-35",
    f: "Elisha raised the Shunammite woman’s son at Shunem after praying and stretching himself over the child.",
    cat: "OT",
    diff: "HARD"
  },

  // ==========================================
  // NEW TESTAMENT HARD
  // ==========================================
  {
    q: "Who was the second disciple called by Jesus?",
    o: ["Peter", "Andrew", "John", "Philip"],
    c: 1,
    r: "Matthew 10:2",
    f: "Andrew, Simon Peter’s brother, was the second disciple to follow Jesus.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Who was the last disciple chosen by Jesus among the twelve apostles?",
    o: ["Matthias", "Thomas", "Judas Iscariot", "Bartholomew"],
    c: 2,
    r: "Matthew 10:2-4; Luke 6:13-16",
    f: "Judas Iscariot is always listed last among the twelve apostles and was the one who later betrayed Jesus.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Who said, 'Truly this man was the Son of God' at Jesus' execution on the stake?",
    o: ["Centurion", "Peter", "Mary Magdalene", "John"],
    c: 0,
    r: "Mark 15:39",
    f: "A Roman centurion recognized Jesus as the Son of God when He died on the stake.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Who was the first Christian martyr?",
    o: ["Stephen", "James", "Peter", "Paul"],
    c: 0,
    r: "Acts 7:54–60",
    f: "Stephen was stoned to death for his faith, becoming the first Christian martyr.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "How many people were on the road to Emmaus when Jesus joined them after His resurrection?",
    o: ["2", "3", "5", "7"],
    c: 0,
    r: "Luke 24:13–31",
    f: "Two disciples were walking to Emmaus when Jesus appeared to them and explained the Scriptures.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Who was the Pharisee that came to Jesus by night to inquire about the Kingdom of God?",
    o: ["Nicodemus", "Joseph of Arimathea", "Gamaliel", "Caiaphas"],
    c: 0,
    r: "John 3:1–21",
    f: "Nicodemus visited Jesus at night because he was a respected Pharisee curious about His teachings.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "How many resurrections did Jesus perform during His ministry?",
    o: ["3", "2", "1", "4"],
    c: 0,
    r: "Luke 7:11–17; John 11:1–44; Matthew 9:18–26",
    f: "Jesus raised at least three people: the widow's son at Nain, Jairus' daughter, and Lazarus.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "How many people were baptized on the day of Pentecost?",
    o: ["3,000", "1,200", "5,000", "2,000"],
    c: 0,
    r: "Acts 2:41",
    f: "After Peter's speech, about 3,000 people were baptized and became followers of Christ.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Who said, 'Lord, show us the Father, and it is enough for us'?",
    o: ["Philip", "Thomas", "Peter", "John"],
    c: 0,
    r: "John 14:8",
    f: "Philip requested Jesus to reveal the Father more clearly to the disciples.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Who said, 'I am not worthy that you should enter under my roof'?",
    o: ["Centurion", "Peter", "John", "Matthew"],
    c: 0,
    r: "Matthew 8:8",
    f: "A Roman centurion showed humility when asking Jesus to heal his servant.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "For how many days was Jesus seen by His disciples after His resurrection?",
    o: ["40", "30", "50", "20"],
    c: 0,
    r: "Acts 1:3",
    f: "Jesus was seen by His disciples throughout 40 days, speaking about the Kingdom of God.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "What did Jesus say about himself in relation to Abraham’s existence?",
    o: ["I am", "Before Abraham came into existence, I have been", "I existed after Abraham", "I am the Son of Abraham"],
    c: 1,
    r: "John 8:58",
    f: "Jesus said, 'Before Abraham came into existence, I have been.'",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Who is said to teach everyone as written in the prophets?",
    o: ["Jesus", "Moses", "Jehovah", "Peter"],
    c: 2,
    r: "John 6:45",
    f: "Jehovah is the one who teaches everyone, fulfilling what the prophets wrote.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "What did the king command to be done to those who did not want him to reign over them?",
    o: ["Exile them", "Bring them here and kill them before me", "Ignore them", "Imprison them"],
    c: 1,
    r: "Luke 19:27",
    f: "The king commanded to bring them and kill them before him.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "What document was nailed to the stake?",
    o: ["The law of Moses", "The certificate of debt", "The scroll of prophets", "The commandments"],
    c: 1,
    r: "Colossians 2:14",
    f: "The certificate of debt (handwriting of requirements) that was against us was nailed to the stake.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "What four things were Gentile Christians told to abstain from?",
    o: ["Blood, things strangled, sexual immorality, things polluted by idols", "Only blood, things strangled", "Idols, altars, temples, sacrifices", "Meat, wine, oil, grain"],
    c: 0,
    r: "Acts 15:20",
    f: "Gentiles were instructed to abstain from blood, things strangled, sexual immorality, and things polluted by idols.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "How did the women react after visiting Jesus’ tomb?",
    o: ["They rejoiced and told everyone", "They fled trembling and said nothing", "They prayed silently", "They waited for the apostles"],
    c: 1,
    r: "Mark 16:8",
    f: "They fled trembling and overwhelmed with emotion, and they said nothing because they were afraid.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "What does Ephesians 2:8 say about how we have been saved?",
    o: ["Through works", "By God’s undeserved kindness through faith", "By following the law", "By baptism only"],
    c: 1,
    r: "Ephesians 2:8",
    f: "We are saved by God’s undeserved kindness through faith; it is God’s gift.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "How did the little scroll taste and what happened after John swallowed it?",
    o: ["Bitter first, then sweet", "Sweet as honey but bitter in stomach", "Only sweet", "Only bitter"],
    c: 1,
    r: "Revelation 10:10",
    f: "The little scroll tasted sweet as honey but became bitter in his stomach.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Why did Jesus not do many miracles in his hometown?",
    o: ["Because of their unbelief", "Because of lack of power", "Because it was a small town", "Because he was tired"],
    c: 0,
    r: "Mark 6:5",
    f: "Jesus could do only a few miracles because of their unbelief.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "According to Acts 4:12 , by what name must we be saved?",
    o: ["Jesus Christ", "Jehovah", "Peter", "Paul"],
    c: 0,
    r: "Acts 4:12",
    f: "Salvation is only through the name of Jesus Christ.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "In Revelation 1:8 , how does the Jehovah describe himself?",
    o: ["Alpha and Omega, beginning and end", "Mighty God, everlasting Father", "Lord of Hosts", "Prince of Peace"],
    c: 0,
    r: "Revelation 1:8",
    f: "The Lord describes himself as 'The Alpha and the Omega, the beginning and the end.'",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Revelation 19:16 describes a name on Jesus’ robe and thigh. What is this name?",
    o: ["King of kings and Lord of lords", "Prince of Peace", "Son of God", "Messiah"],
    c: 0,
    r: "Revelation 19:16",
    f: "The name on Jesus’ robe and thigh is 'King of kings and Lord of lords.'",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Who was the high priest that questioned Jesus during his trial?",
    o: ["Annas", "Caiaphas", "Pilate", "Herod"],
    c: 1,
    r: "Matthew 26:57",
    f: "Caiaphas was the high priest who led the questioning of Jesus before the Sanhedrin.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Which woman was the first to see Jesus after his resurrection?",
    o: ["Martha", "Mary Magdalene", "Salome", "Joanna"],
    c: 1,
    r: "John 20:14-16",
    f: "Mary Magdalene was the first to see Jesus alive after his resurrection near the tomb.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Which couple died for lying to the apostles about the price of their land?",
    o: ["Priscilla and Aquila", "Ananias and Sapphira", "Zechariah and Elizabeth", "None of the above"],
    c: 1,
    r: "Acts 5:1-10",
    f: "Ananias and Sapphira lied about the proceeds from their land sale and were struck dead.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Who carried Jesus’ torture stake when he could no longer bear it?",
    o: ["Peter", "John", "Simon of Cyrene", "Joseph of Arimathea"],
    c: 2,
    r: "Matthew 27:32",
    f: "Simon of Cyrene was compelled by Roman soldiers to carry Jesus’ torture stake.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Who climbed a sycamore tree to see Jesus as he passed by?",
    o: ["Nicodemus", "Zacchaeus", "Caiaphas", "Joseph of Arimathea"],
    c: 1,
    r: "Luke 19:1-4",
    f: "Zacchaeus, a wealthy tax collector, climbed the tree because he was short and couldn’t see over the crowd.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Whose shadow was said to heal the sick when it passed over them?",
    o: ["John", "Peter", "Paul", "Stephen"],
    c: 1,
    r: "Acts 5:15",
    f: "People carried the sick into the streets so that Peter’s shadow might fall on them and heal them.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Which sorcerer tried to buy the power of the holy spirit with money?",
    o: ["Elymas", "Simon Magus", "Bar-Jesus", "Demetrius"],
    c: 1,
    r: "Acts 8:18-20",
    f: "Simon Magus offered the apostles money to give him the ability to impart holy spirit.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Paul was shipwrecked on an island where he was bitten by a viper but suffered no harm. What was the name of the island?",
    o: ["Patmos", "Cyprus", "Malta", "Crete"],
    c: 2,
    r: "Acts 28:1-6",
    f: "Paul was shipwrecked on Malta, where the islanders showed unusual kindness and witnessed the miracle.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "During Paul’s trial, which Roman governor trembled when Paul spoke about righteousness, self-control, and judgment?",
    o: ["Festus", "Felix", "Agrippa", "Gallio"],
    c: 1,
    r: "Acts 24:25",
    f: "Governor Felix trembled at Paul’s words but postponed making a decision about him.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "In Revelation, how many seals were on the scroll that no one could open except the Lamb?",
    o: ["Four", "Seven", "Twelve", "Ten"],
    c: 1,
    r: "Revelation 5:1-5",
    f: "Only Jesus, the Lamb, was found worthy to open the seven seals of the scroll.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Who was the young man that accompanied Paul and Barnabas but abandoned them on their first missionary journey?",
    o: ["Timothy", "John Mark", "Silas", "Tychicus"],
    c: 1,
    r: "Acts 13:13; 15:37-38",
    f: "John Mark abandoned Paul and Barnabas, causing a later dispute between the two apostles.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "In Acts, who was struck blind for opposing Paul and Barnabas?",
    o: ["Ananias", "Elymas", "Simon Magus", "Demetrius"],
    c: 1,
    r: "Acts 13:8-11",
    f: "Elymas the sorcerer was struck blind for trying to turn the proconsul away from the faith.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Which apostle was exiled to the island of Patmos?",
    o: ["Peter", "Paul", "John", "James"],
    c: 2,
    r: "Revelation 1:9",
    f: "The apostle John was exiled to Patmos, where he received the visions recorded in Revelation.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Who was the first Gentile household to receive the holy spirit?",
    o: ["Cornelius", "Lydia", "Sergius Paulus", "The Philippian Jailer"],
    c: 0,
    r: "Acts 10:44-48",
    f: "Cornelius, a Roman centurion, and his household were the first Gentiles to receive the holy spirit.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Which king had John the Baptist beheaded?",
    o: ["Herod Antipas", "Herod the Great", "Pontius Pilate", "Caesar Tiberius"],
    c: 0,
    r: "Mark 6:16-28",
    f: "Herod Antipas ordered John the Baptist beheaded after being manipulated by Herodias’ daughter.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Which Pharisee defended the apostles before the Sanhedrin, suggesting their work might be from God?",
    o: ["Nicodemus", "Gamaliel", "Caiaphas", "Annas"],
    c: 1,
    r: "Acts 5:34-39",
    f: "Gamaliel, a respected Pharisee and teacher of the Law, advised the Sanhedrin to be cautious in opposing the apostles.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "In which city were Jesus’ followers first called 'Christians'?",
    o: ["Jerusalem", "Corinth", "Antioch", "Ephesus"],
    c: 2,
    r: "Acts 11:26",
    f: "It was in Antioch that the disciples were first given the name 'Christians.'",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Who was the first convert baptized in Europe?",
    o: ["Lydia", "Phoebe", "Priscilla", "Dorcas"],
    c: 0,
    r: "Acts 16:14-15",
    f: "Lydia, a seller of purple cloth from Thyatira, became the first recorded convert in Europe.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "When Paul appealed his case, to which Roman Caesar did he appeal?",
    o: ["Augustus", "Nero", "Tiberius", "Claudius"],
    c: 1,
    r: "Acts 25:11-12",
    f: "Paul appealed to Caesar Nero during his trial under Governor Festus.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "Which disciple did Jesus call 'a true Israelite, in whom there is no deceit'?",
    o: ["Bartholomew", "Nathanael", "Philip", "Thomas"],
    c: 1,
    r: "John 1:47",
    f: "Jesus gave this compliment to Nathanael when he approached Him after Philip’s invitation.",
    cat: "NT",
    diff: "HARD"
  },
  {
    q: "What was the name of the young disciple whom Paul circumcised because of the Jews in those regions?",
    o: ["Silas", "Timothy", "Titus", "Mark"],
    c: 1,
    r: "Acts 16:1-3",
    f: "Paul circumcised Timothy, whose mother was Jewish and father was Greek, to avoid hindrance among Jews.",
    cat: "NT",
    diff: "HARD"
  }
];

// Mapper to transform CompactQuestion to Question
export function getQuestionsFromCompact(compactList: CompactQuestion[], prefix: string): Question[] {
  return compactList.map((q, idx) => ({
    id: `${prefix}-${idx}`,
    text: q.q,
    options: q.o,
    correctAnswer: q.o[q.c],
    bibleRef: q.r,
    explanation: q.f
  }));
}
