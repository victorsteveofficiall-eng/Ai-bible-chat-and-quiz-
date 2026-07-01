export interface BibleBook {
  name: string;
  id: string; // url friendly name e.g. "genesis"
  chapters: number;
  testament: 'OT' | 'NT';
  category: string;
}

export const BIBLE_BOOKS: BibleBook[] = [
  // OLD TESTAMENT
  // Torah / Law
  { name: 'Genesis', id: 'genesis', chapters: 50, testament: 'OT', category: 'Torah' },
  { name: 'Exodus', id: 'exodus', chapters: 40, testament: 'OT', category: 'Torah' },
  { name: 'Leviticus', id: 'leviticus', chapters: 27, testament: 'OT', category: 'Torah' },
  { name: 'Numbers', id: 'numbers', chapters: 36, testament: 'OT', category: 'Torah' },
  { name: 'Deuteronomy', id: 'deuteronomy', chapters: 34, testament: 'OT', category: 'Torah' },
  
  // History
  { name: 'Joshua', id: 'joshua', chapters: 24, testament: 'OT', category: 'History' },
  { name: 'Judges', id: 'judges', chapters: 21, testament: 'OT', category: 'History' },
  { name: 'Ruth', id: 'ruth', chapters: 4, testament: 'OT', category: 'History' },
  { name: '1 Samuel', id: '1samuel', chapters: 31, testament: 'OT', category: 'History' },
  { name: '2 Samuel', id: '2samuel', chapters: 24, testament: 'OT', category: 'History' },
  { name: '1 Kings', id: '1kings', chapters: 22, testament: 'OT', category: 'History' },
  { name: '2 Kings', id: '2kings', chapters: 25, testament: 'OT', category: 'History' },
  { name: '1 Chronicles', id: '1chronicles', chapters: 29, testament: 'OT', category: 'History' },
  { name: '2 Chronicles', id: '2chronicles', chapters: 36, testament: 'OT', category: 'History' },
  { name: 'Ezra', id: 'ezra', chapters: 10, testament: 'OT', category: 'History' },
  { name: 'Nehemiah', id: 'nehemiah', chapters: 13, testament: 'OT', category: 'History' },
  { name: 'Esther', id: 'esther', chapters: 10, testament: 'OT', category: 'History' },

  // Poetry / Wisdom
  { name: 'Job', id: 'job', chapters: 42, testament: 'OT', category: 'Poetry' },
  { name: 'Psalms', id: 'psalms', chapters: 150, testament: 'OT', category: 'Poetry' },
  { name: 'Proverbs', id: 'proverbs', chapters: 31, testament: 'OT', category: 'Poetry' },
  { name: 'Ecclesiastes', id: 'ecclesiastes', chapters: 12, testament: 'OT', category: 'Poetry' },
  { name: 'Song of Solomon', id: 'songofsolomon', chapters: 8, testament: 'OT', category: 'Poetry' },

  // Major Prophets
  { name: 'Isaiah', id: 'isaiah', chapters: 66, testament: 'OT', category: 'Major Prophets' },
  { name: 'Jeremiah', id: 'jeremiah', chapters: 52, testament: 'OT', category: 'Major Prophets' },
  { name: 'Lamentations', id: 'lamentations', chapters: 5, testament: 'OT', category: 'Major Prophets' },
  { name: 'Ezekiel', id: 'ezekiel', chapters: 48, testament: 'OT', category: 'Major Prophets' },
  { name: 'Daniel', id: 'daniel', chapters: 12, testament: 'OT', category: 'Major Prophets' },

  // Minor Prophets
  { name: 'Hosea', id: 'hosea', chapters: 14, testament: 'OT', category: 'Minor Prophets' },
  { name: 'Joel', id: 'joel', chapters: 3, testament: 'OT', category: 'Minor Prophets' },
  { name: 'Amos', id: 'amos', chapters: 9, testament: 'OT', category: 'Minor Prophets' },
  { name: 'Obadiah', id: 'obadiah', chapters: 1, testament: 'OT', category: 'Minor Prophets' },
  { name: 'Jonah', id: 'jonah', chapters: 4, testament: 'OT', category: 'Minor Prophets' },
  { name: 'Micah', id: 'micah', chapters: 7, testament: 'OT', category: 'Minor Prophets' },
  { name: 'Nahum', id: 'nahum', chapters: 3, testament: 'OT', category: 'Minor Prophets' },
  { name: 'Habakkuk', id: 'habakkuk', chapters: 3, testament: 'OT', category: 'Minor Prophets' },
  { name: 'Zephaniah', id: 'zephaniah', chapters: 3, testament: 'OT', category: 'Minor Prophets' },
  { name: 'Haggai', id: 'haggai', chapters: 2, testament: 'OT', category: 'Minor Prophets' },
  { name: 'Zechariah', id: 'zechariah', chapters: 14, testament: 'OT', category: 'Minor Prophets' },
  { name: 'Malachi', id: 'malachi', chapters: 4, testament: 'OT', category: 'Minor Prophets' },

  // NEW TESTAMENT
  // Gospels
  { name: 'Matthew', id: 'matthew', chapters: 28, testament: 'NT', category: 'Gospels' },
  { name: 'Mark', id: 'mark', chapters: 16, testament: 'NT', category: 'Gospels' },
  { name: 'Luke', id: 'luke', chapters: 24, testament: 'NT', category: 'Gospels' },
  { name: 'John', id: 'john', chapters: 21, testament: 'NT', category: 'Gospels' },
  
  // Church History
  { name: 'Acts', id: 'acts', chapters: 28, testament: 'NT', category: 'History' },

  // Pauline Epistles
  { name: 'Romans', id: 'romans', chapters: 16, testament: 'NT', category: 'Letters' },
  { name: '1 Corinthians', id: '1corinthians', chapters: 16, testament: 'NT', category: 'Letters' },
  { name: '2 Corinthians', id: '2corinthians', chapters: 13, testament: 'NT', category: 'Letters' },
  { name: 'Galatians', id: 'galatians', chapters: 6, testament: 'NT', category: 'Letters' },
  { name: 'Ephesians', id: 'ephesians', chapters: 6, testament: 'NT', category: 'Letters' },
  { name: 'Philippians', id: 'philippians', chapters: 4, testament: 'NT', category: 'Letters' },
  { name: 'Colossians', id: 'colossians', chapters: 4, testament: 'NT', category: 'Letters' },
  { name: '1 Thessalonians', id: '1thessalonians', chapters: 5, testament: 'NT', category: 'Letters' },
  { name: '2 Thessalonians', id: '2thessalonians', chapters: 3, testament: 'NT', category: 'Letters' },
  { name: '1 Timothy', id: '1timothy', chapters: 6, testament: 'NT', category: 'Letters' },
  { name: '2 Timothy', id: '2timothy', chapters: 4, testament: 'NT', category: 'Letters' },
  { name: 'Titus', id: 'titus', chapters: 3, testament: 'NT', category: 'Letters' },
  { name: 'Philemon', id: 'philemon', chapters: 1, testament: 'NT', category: 'Letters' },

  // General Epistles
  { name: 'Hebrews', id: 'hebrews', chapters: 13, testament: 'NT', category: 'Letters' },
  { name: 'James', id: 'james', chapters: 5, testament: 'NT', category: 'Letters' },
  { name: '1 Peter', id: '1peter', chapters: 5, testament: 'NT', category: 'Letters' },
  { name: '2 Peter', id: '2peter', chapters: 3, testament: 'NT', category: 'Letters' },
  { name: '1 John', id: '1john', chapters: 5, testament: 'NT', category: 'Letters' },
  { name: '2 John', id: '2john', chapters: 1, testament: 'NT', category: 'Letters' },
  { name: '3 John', id: '3john', chapters: 1, testament: 'NT', category: 'Letters' },
  { name: 'Jude', id: 'jude', chapters: 1, testament: 'NT', category: 'Letters' },

  // Prophecy
  { name: 'Revelation', id: 'revelation', chapters: 22, testament: 'NT', category: 'Prophecy' }
];
