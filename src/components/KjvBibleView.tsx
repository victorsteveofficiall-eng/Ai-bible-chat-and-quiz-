import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Search, ArrowLeft, ArrowRight, Volume2, Copy, MessageSquare, Sparkles, AlertCircle, Heart, ArrowUp, ArrowDown } from 'lucide-react';
import { BIBLE_BOOKS, BibleBook } from '../data/bibleBooks';

interface Verse {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

interface KjvBibleViewProps {
  onAskChaplain: (verseText: string) => void;
}

// Beautiful offline fallbacks for 10 of the most famous KJV verses
const INSPIRING_VERSES_FALLBACK: Verse[] = [
  {
    book_name: 'John',
    chapter: 3,
    verse: 16,
    text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.'
  },
  {
    book_name: 'Romans',
    chapter: 8,
    verse: 28,
    text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.'
  },
  {
    book_name: 'Philippians',
    chapter: 4,
    verse: 13,
    text: 'I can do all things through Christ which strengtheneth me.'
  },
  {
    book_name: 'Psalms',
    chapter: 23,
    verse: 1,
    text: 'The LORD is my shepherd; I shall not want.'
  },
  {
    book_name: 'Proverbs',
    chapter: 3,
    verse: 5,
    text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.'
  },
  {
    book_name: 'Isaiah',
    chapter: 40,
    verse: 31,
    text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.'
  },
  {
    book_name: 'Genesis',
    chapter: 1,
    verse: 1,
    text: 'In the beginning God created the heaven and the earth.'
  },
  {
    book_name: 'Romans',
    chapter: 12,
    verse: 2,
    text: 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.'
  },
  {
    book_name: 'Joshua',
    chapter: 1,
    verse: 9,
    text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.'
  },
  {
    book_name: 'John',
    chapter: 14,
    verse: 6,
    text: 'Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.'
  }
];

export default function KjvBibleView({ onAskChaplain }: KjvBibleViewProps) {
  // Book and Chapter selection state
  const [selectedBook, setSelectedBook] = useState<BibleBook>(BIBLE_BOOKS[42]); // Default to "John" (index 42)
  const [selectedChapter, setSelectedChapter] = useState<number>(3); // Default to chapter 3

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  // Reader content state
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);

  // Scroll controls & references
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const checkScroll = () => {
    const target = scrollContainerRef.current;
    if (target) {
      const canScroll = target.scrollHeight > target.clientHeight;
      // Show scroll to top if we have scrolled down past 100px
      setShowScrollTop(canScroll && target.scrollTop > 100);
      // Show scroll to bottom if we are not already at the absolute bottom
      setShowScrollBottom(canScroll && target.scrollTop < target.scrollHeight - target.clientHeight - 100);
    }
  };

  const handleScroll = () => {
    checkScroll();
  };

  const handleScrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Re-check scroll buttons when verses load
  useEffect(() => {
    const timer = setTimeout(checkScroll, 150);
    return () => clearTimeout(timer);
  }, [verses]);

  useEffect(() => {
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Load chapter verses
  const fetchChapter = async (bookName: string, chapterNum: number) => {
    setIsLoading(true);
    setLoadError('');
    setHighlightedVerse(null);
    try {
      // URL-encode book name for safety (e.g. "1 Samuel" -> "1+Samuel")
      const encodedBook = encodeURIComponent(bookName);
      const url = `https://bible-api.com/${encodedBook}+${chapterNum}?translation=kjv`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Scripture could not be retrieved.');
      }
      const data = await response.json();
      
      if (data.verses && data.verses.length > 0) {
        setVerses(data.verses);
      } else {
        throw new Error('No verses returned.');
      }
    } catch (e: any) {
      console.warn('API Fetch failed, loading offline local fallback.');
      setLoadError('Connecting to online Bible server... Displaying offline inspiring verses fallback.');
      
      // Filter offline verses to match selected book, else load the full curated fallback
      const match = INSPIRING_VERSES_FALLBACK.filter(
        v => v.book_name.toLowerCase() === bookName.toLowerCase()
      );
      setVerses(match.length > 0 ? match : INSPIRING_VERSES_FALLBACK);
    } finally {
      setIsLoading(false);
      // Wait a tiny bit for the verses to render, then scroll to top
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
      }, 50);
    }
  };

  // Trigger load on book or chapter change
  useEffect(() => {
    fetchChapter(selectedBook.name, selectedChapter);
  }, [selectedBook, selectedChapter]);

  // Handle book selection
  const handleBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const book = BIBLE_BOOKS.find(b => b.id === e.target.value);
    if (book) {
      setSelectedBook(book);
      setSelectedChapter(1); // Reset to chapter 1 when book changes
    }
  };

  // Handle chapter selection
  const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChapter(Number(e.target.value));
  };

  // Chapter navigation increments
  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(prev => prev - 1);
    } else {
      // Go to previous book, last chapter
      const currentIdx = BIBLE_BOOKS.findIndex(b => b.id === selectedBook.id);
      if (currentIdx > 0) {
        const prevBook = BIBLE_BOOKS[currentIdx - 1];
        setSelectedBook(prevBook);
        setSelectedChapter(prevBook.chapters);
      }
    }
  };

  const handleNextChapter = () => {
    if (selectedChapter < selectedBook.chapters) {
      setSelectedChapter(prev => prev + 1);
    } else {
      // Go to next book, chapter 1
      const currentIdx = BIBLE_BOOKS.findIndex(b => b.id === selectedBook.id);
      if (currentIdx < BIBLE_BOOKS.length - 1) {
        const nextBook = BIBLE_BOOKS[currentIdx + 1];
        setSelectedBook(nextBook);
        setSelectedChapter(1);
      }
    }
  };

  // Reference Direct Search (e.g. "Genesis 1:1" or "Romans 8")
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setIsLoading(true);
    setSearchError('');
    setHighlightedVerse(null);

    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `https://bible-api.com/${encodedQuery}?translation=kjv`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Reference not found. Example search: "John 3:16" or "Psalm 23"');
      }
      
      const data = await response.json();
      if (data.verses && data.verses.length > 0) {
        setVerses(data.verses);
        
        // Find if this search query specified a single verse, e.g. "John 3:16"
        const matchesBook = BIBLE_BOOKS.find(b => b.name.toLowerCase() === data.verses[0].book_name.toLowerCase());
        if (matchesBook) {
          setSelectedBook(matchesBook);
          setSelectedChapter(data.verses[0].chapter);
          // Highlight specific verse if found in query
          const verseMatch = query.match(/:(\d+)/);
          if (verseMatch && verseMatch[1]) {
            setHighlightedVerse(Number(verseMatch[1]));
          }
        }
      } else {
        throw new Error('No verses found for this reference.');
      }
    } catch (err: any) {
      setSearchError(err.message || 'Reference lookup failed. Please try "Genesis 1" or "Romans 8:28"');
    } finally {
      setIsLoading(false);
    }
  };

  // Utilities: Copy, Speak, Chat
  const handleCopyVerse = (v: Verse) => {
    const formatted = `${v.book_name} ${v.chapter}:${v.verse} (KJV) - "${v.text.trim()}"`;
    navigator.clipboard.writeText(formatted);
    alert('Verse copied to clipboard!');
  };

  const handleSpeakVerse = (v: Verse) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(v.text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported on this browser.');
    }
  };

  const handleAskChaplain = (v: Verse) => {
    const prompt = `Please explain the spiritual meaning, cultural background, and theological context of this verse: **${v.book_name} ${v.chapter}:${v.verse}** (KJV) - > "${v.text.trim()}"`;
    onAskChaplain(prompt);
  };

  return (
    <div className="h-full flex flex-col bg-[#FDFBF7] relative">
      {/* Search and Selection Headers */}
      <div className="bg-white border-b border-gray-100 p-4 shadow-sm flex-shrink-0 space-y-3.5">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-gray-900 leading-none">Holy Bible Reader</h2>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">King James Version (KJV)</span>
            </div>
          </div>

          {/* Quick Dropdown Picker */}
          <div className="flex items-center gap-2">
            {/* Book Dropdown */}
            <select
              value={selectedBook.id}
              onChange={handleBookChange}
              className="text-xs font-bold bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
            >
              {BIBLE_BOOKS.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>

            {/* Chapter Dropdown */}
            <select
              value={selectedChapter}
              onChange={handleChapterChange}
              className="text-xs font-bold bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
            >
              {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map(ch => (
                <option key={ch} value={ch}>Ch {ch}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <input
            type="text"
            placeholder='Search reference e.g., "John 3:16" or "Psalm 23"'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 text-xs border border-gray-150 rounded-xl pl-9 pr-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-terracotta focus:bg-white transition-all"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3" />
          {searchQuery && (
            <button
              type="submit"
              className="absolute right-2 px-2 py-1 bg-brand-terracotta/10 text-brand-terracotta rounded text-[9px] font-extrabold uppercase hover:bg-brand-terracotta hover:text-white transition-colors"
            >
              Go
            </button>
          )}
        </form>

        {/* Search Error banner */}
        {searchError && (
          <div className="p-2 bg-red-50 text-[11px] text-red-600 rounded-lg flex items-center gap-1.5 font-medium">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{searchError}</span>
          </div>
        )}
      </div>

      {/* Main Scripture Text Viewer */}
      <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-5 space-y-4">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center py-16 text-center space-y-2">
            <div className="w-8 h-8 border-2 border-brand-terracotta border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-gray-500 italic font-medium">Gathering holy verses...</p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {/* Header Title of selected Chapter */}
            <div className="border-b border-gray-100 pb-3.5 mb-5 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-serif font-bold text-gray-900">
                  {verses[0]?.book_name || selectedBook.name} {verses[0]?.chapter || selectedChapter}
                </h1>
                {loadError && (
                  <p className="text-[10px] text-amber-600 font-semibold mt-1 flex items-center gap-1">
                    <Heart className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {loadError}
                  </p>
                )}
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevChapter}
                  className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Previous Chapter"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextChapter}
                  className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Next Chapter"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Verses Grid list */}
            <div className="space-y-4 font-serif text-gray-800 text-[15px] leading-relaxed select-text">
              {verses.map((v) => {
                const isSelected = highlightedVerse === v.verse;
                return (
                  <div
                    key={v.verse}
                    className={`p-3 rounded-xl transition-all border group ${
                      isSelected
                        ? 'bg-amber-50/70 border-amber-300 shadow-sm scale-[1.01]'
                        : 'border-transparent hover:bg-gray-50/40'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {/* Verse number */}
                      <span className="font-sans font-bold text-[11px] text-brand-terracotta bg-brand-terracotta-light px-1.5 py-0.5 rounded-md mt-0.5 select-none">
                        {v.verse}
                      </span>
                      {/* Verse text */}
                      <p className="flex-1 text-gray-800 font-medium">
                        {v.text.trim()}
                      </p>
                    </div>

                    {/* Interactive verse toolbar panel */}
                    <div className="flex items-center gap-3 mt-2.5 pl-7 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity text-[10px] text-gray-400 font-bold uppercase select-none">
                      <button
                        onClick={() => handleCopyVerse(v)}
                        className="flex items-center gap-1 hover:text-brand-terracotta transition-colors py-0.5 px-1.5 rounded hover:bg-gray-100"
                        title="Copy Verse"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </button>
                      
                      <button
                        onClick={() => handleSpeakVerse(v)}
                        className="flex items-center gap-1 hover:text-brand-terracotta transition-colors py-0.5 px-1.5 rounded hover:bg-gray-100"
                        title="Listen to Verse"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Speak</span>
                      </button>

                      <button
                        onClick={() => handleAskChaplain(v)}
                        className="flex items-center gap-1 text-brand-terracotta/90 hover:text-brand-terracotta hover:bg-amber-50 transition-colors py-0.5 px-1.5 rounded border border-brand-terracotta/10"
                        title="Ask AI Chaplain about this Verse"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span className="flex items-center gap-0.5">
                          Ask AI <Sparkles className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* End of chapter navigation */}
            <div className="border-t border-gray-100 mt-8 pt-5 flex items-center justify-between">
              <button
                onClick={handlePrevChapter}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-brand-terracotta transition-colors py-2 px-3 rounded-xl hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Prev Chapter</span>
              </button>
              <button
                onClick={handleNextChapter}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-brand-terracotta transition-colors py-2 px-3 rounded-xl hover:bg-gray-50"
              >
                <span>Next Chapter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Scroll up / down buttons */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-30 select-none">
        {showScrollTop && (
          <button
            onClick={handleScrollToTop}
            className="w-10 h-10 rounded-full bg-white text-brand-terracotta border border-gray-150 shadow-lg flex items-center justify-center hover:bg-brand-terracotta hover:text-white transition-all scale-100 hover:scale-110 active:scale-95 cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5px]" />
          </button>
        )}
        {showScrollBottom && (
          <button
            onClick={handleScrollToBottom}
            className="w-10 h-10 rounded-full bg-white text-brand-terracotta border border-gray-150 shadow-lg flex items-center justify-center hover:bg-brand-terracotta hover:text-white transition-all scale-100 hover:scale-110 active:scale-95 cursor-pointer"
            title="Scroll to Bottom"
          >
            <ArrowDown className="w-5 h-5 stroke-[2.5px]" />
          </button>
        )}
      </div>
    </div>
  );
}
