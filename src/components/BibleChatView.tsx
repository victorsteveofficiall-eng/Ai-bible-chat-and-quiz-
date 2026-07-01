import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Trash2, ArrowRight, User, BookOpen, Volume2, HelpCircle, ArrowUp, ArrowDown, Lock, CreditCard, ShieldCheck, CheckCircle2, RefreshCw, X } from 'lucide-react';
import { UserState } from '../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface BibleChatViewProps {
  userState: UserState;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
  onNavigateToBible?: (bookId: string, chapter: number) => void;
  onUpgrade: () => void;
}

export default function BibleChatView({
  userState,
  initialPrompt,
  onClearInitialPrompt,
  onNavigateToBible,
  onUpgrade,
}: BibleChatViewProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('vq_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Simulated $3.00 payment states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const [payError, setPayError] = useState('');

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const checkScroll = () => {
    const target = scrollContainerRef.current;
    if (target) {
      const canScroll = target.scrollHeight > target.clientHeight;
      setShowScrollTop(canScroll && target.scrollTop > 100);
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

  // Re-check scroll buttons when messages or loading state changes
  useEffect(() => {
    const timer = setTimeout(checkScroll, 150);
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  useEffect(() => {
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Suggested starting prompts
  const starterPrompts = [
    { text: 'Explain the meaning of Grace', icon: '✨' },
    { text: 'Historical context of the Gospel of John', icon: '📖' },
    { text: 'Who was King David?', icon: '👑' },
    { text: 'Comforting verses for anxiety', icon: '🕊️' },
  ];

  // Save chat history
  useEffect(() => {
    localStorage.setItem('vq_chat_history', JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle incoming initial prompt (e.g., from clicking "Ask Chaplain" on a Bible verse)
  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) {
        onClearInitialPrompt();
      }
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Gather latest messages for history
      const latestHistory = [...messages, userMsg].slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: latestHistory }),
      });

      if (!response.ok) {
        throw new Error('Could not connect to the AI Chaplain server.');
      }

      const data = await response.json();
      
      const botMsg: Message = {
        id: `msg-${Date.now()}-bot`,
        role: 'assistant',
        content: data.text || 'The AI Chaplain is currently resting. Please try again soon.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (e: any) {
      const errorMsg: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: `🙏 Peace be with you! I encountered an error connecting to the AI Chaplain service. (${e.message || 'Server offline'}). Please ensure you have set up your GEMINI_API_KEY inside the **Settings > Secrets** panel in AI Studio.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear your conversation history?')) {
      setMessages([]);
    }
  };

  // Safe and beautiful custom renderer for Markdown (supporting bold, blockquotes, code-quotes, line breaks, and list bullets)
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Empty lines
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Blockquotes (commonly used for scriptures)
      if (line.startsWith('>')) {
        const content = line.substring(1).trim();
        return (
          <blockquote key={idx} className="border-l-4 border-amber-500 bg-amber-50/50 pl-4 py-1.5 my-2 italic text-gray-700 rounded-r-md">
            {parseInLineformatting(content)}
          </blockquote>
        );
      }

      // Bullet lists
      if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
        const content = line.replace(/^[\s-*]+/, '').trim();
        return (
          <li key={idx} className="ml-5 list-disc text-gray-800 my-1 leading-relaxed">
            {parseInLineformatting(content)}
          </li>
        );
      }

      // Standard paragraphs
      return (
        <p key={idx} className="text-gray-800 my-1 leading-relaxed">
          {parseInLineformatting(line)}
        </p>
      );
    });
  };

  // Helper to parse bold (**word**) and code (`word`) inline
  const parseInLineformatting = (content: string) => {
    // Regex split by bold and code tags
    const tokens = content.split(/(\*\*.*?\*\*|`.*?`)/g);
    return tokens.map((token, i) => {
      if (token.startsWith('**') && token.endsWith('**')) {
        return <strong key={i} className="font-bold text-gray-900">{token.slice(2, -2)}</strong>;
      }
      if (token.startsWith('`') && token.endsWith('`')) {
        return <code key={i} className="bg-gray-150 px-1 py-0.5 rounded text-xs font-mono text-brand-terracotta">{token.slice(1, -1)}</code>;
      }
      return token;
    });
  };

  // Trigger TTS voice read
  const handleReadAloud = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Strip markdown tags for cleaner speech synthesis
      const cleanText = text.replace(/[\*`#_]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported on this browser.');
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
      setPayError('Please fill out all payment details.');
      return;
    }
    setPayError('');
    setIsPaying(true);

    // Simulate 1.5s transaction processing
    setTimeout(() => {
      setIsPaying(false);
      setPaySuccess(true);
      
      // Upgrade state after brief success delay
      setTimeout(() => {
        onUpgrade();
        setShowPaymentModal(false);
        setPaySuccess(false);
        setCardNumber('');
        setCardExpiry('');
        setCardCvv('');
        setCardName('');
      }, 1500);
    }, 1500);
  };

  if (!userState.isPremium) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-b from-[#FDFBF7] to-[#F5F4F0] p-6 relative overflow-y-auto font-sans select-none items-center justify-center">
        {/* Decorative background lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        
        <div className="max-w-md w-full text-center py-8 px-4 flex flex-col items-center">
          {/* Locked Icon */}
          <div className="w-20 h-20 bg-amber-100 rounded-[2rem] flex items-center justify-center text-3xl mb-6 shadow-md border border-amber-200/50 relative">
            👑
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-brand-terracotta text-white rounded-full flex items-center justify-center border-2 border-white shadow">
              <Lock className="w-3.5 h-3.5 stroke-[2.5px]" />
            </div>
          </div>

          <span className="text-brand-terracotta text-xs font-black uppercase tracking-wider bg-brand-terracotta/10 px-3 py-1 rounded-full mb-3">
            👑 Premium Feature
          </span>

          <h2 className="text-2xl font-display font-black text-gray-900 tracking-tight leading-tight">
            Divine AI Chaplain
          </h2>

          <p className="text-xs text-gray-500 mt-3 leading-relaxed max-w-sm">
            Unlock our theological study assistant. Seek advice on difficult passages, research historical context, and ask personal questions directly to our AI Chaplain with unlimited messaging.
          </p>

          {/* Pricing Box */}
          <div className="w-full bg-white border border-gray-150 rounded-2xl p-4.5 text-left mt-6 shadow-sm space-y-3.5 relative overflow-hidden">
            <div className="absolute right-0 top-0 bg-brand-terracotta text-white text-[9px] font-bold px-3 py-0.5 rounded-bl-xl uppercase tracking-wider">
              One-Time
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-800">Lifetime Premium Access</h4>
                <p className="text-[11px] text-gray-500">Unlocks AI Chaplain & Ad-Free Quizzes</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-brand-terracotta">$3.00</span>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">USD</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3.5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                <span className="text-brand-terracotta">✨</span> Unlimited AI Scripture Chat
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                <span className="text-brand-terracotta">✨</span> Direct Verse-by-Verse "Ask Chaplain"
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                <span className="text-brand-terracotta">✨</span> Remove all banner and interstitial Ads
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                <span className="text-brand-terracotta">✨</span> Infinite Quiz Lifelines Unlocked
              </div>
            </div>
          </div>

          {/* Unlock Button */}
          <button
            onClick={() => setShowPaymentModal(true)}
            className="w-full bg-brand-terracotta hover:bg-brand-terracotta-hover text-white transition-colors py-4 rounded-full font-display font-bold text-base shadow-lg shadow-brand-terracotta/20 mt-6 cursor-pointer"
          >
            Unlock Now for $3.00
          </button>

          <p className="text-[11px] text-gray-400 mt-3 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Secured 256-bit encrypted checkout. No hidden fees.
          </p>
        </div>

        {/* INTERACTIVE PAYMENT MODAL */}
        {showPaymentModal && (
          <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative border border-gray-150 animate-in zoom-in-95 duration-200">
              <button
                onClick={() => {
                  if (!isPaying) setShowPaymentModal(false);
                }}
                className="absolute right-4 top-4 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {paySuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm border border-emerald-100 animate-bounce">
                    <CheckCircle2 className="w-9 h-9 stroke-[2.25px]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Payment Successful!</h3>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Thank you! Your spiritual helper premium account is now active. Unlocking your AI Chaplain...
                  </p>
                  <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mt-4"></div>
                </div>
              ) : (
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 bg-brand-terracotta-light text-brand-terracotta rounded-xl flex items-center justify-center">
                      <CreditCard className="w-5 h-5 stroke-[2.2px]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Encrypted Checkout</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Amount: $3.00 USD</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Cardholder Name */}
                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1.5 focus:ring-brand-terracotta"
                      />
                    </div>

                    {/* Card Number */}
                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => {
                          // Allow numbers and auto-format spacing
                          let val = e.target.value.replace(/\D/g, '');
                          val = val.substring(0, 16);
                          const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
                          setCardNumber(formatted);
                        }}
                        placeholder="4111 2222 3333 4444"
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1.5 focus:ring-brand-terracotta"
                      />
                    </div>

                    {/* Expiry & CVV */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '');
                            if (val.length > 2) {
                              val = val.substring(0, 2) + '/' + val.substring(2, 4);
                            }
                            setCardExpiry(val.substring(0, 5));
                          }}
                          placeholder="MM/YY"
                          required
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-center focus:outline-none focus:ring-1.5 focus:ring-brand-terracotta"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                          CVV Code
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                          placeholder="•••"
                          required
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-center focus:outline-none focus:ring-1.5 focus:ring-brand-terracotta"
                        />
                      </div>
                    </div>
                  </div>

                  {payError && (
                    <p className="text-red-500 text-xs font-semibold text-center animate-pulse">
                      ⚠️ {payError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isPaying}
                    className="w-full bg-brand-terracotta hover:bg-brand-terracotta-hover text-white font-bold py-3.5 rounded-full text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    {isPaying ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Processing securely...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Pay $3.00 USD</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-gray-400 text-center font-semibold">
                    Simulated secure payment environment. Do not enter real sensitive cards.
                  </p>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#FBF8F3] relative">
      {/* Header Panel */}
      <div className="bg-white border-b border-gray-100 py-4 px-6 flex items-center justify-between shadow-sm flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-lg shadow-sm">
            🙏
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-gray-900 tracking-tight flex items-center gap-1.5">
              AI Bible Chaplain
              <span className="text-[10px] bg-brand-terracotta/10 text-brand-terracotta px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                V3.5 Flash
              </span>
            </h2>
            <p className="text-[11px] text-gray-500">Ask questions, request historical study, seek wisdom</p>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Messages & Starter Screen */}
      <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-8 px-4 flex flex-col items-center">
            <div className="w-16 h-16 rounded-3xl bg-amber-50 flex items-center justify-center text-3xl mb-4 shadow-md border border-amber-100">
              ⛪
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Explore Holy Scripture</h3>
            <p className="text-xs text-gray-500 max-w-sm mb-6 leading-relaxed">
              Hello, <span className="font-semibold text-brand-terracotta">{userState.username}</span>! I am your companion for studying God's word. Ask me anything about the KJV Bible text, characters, or cultural history.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {starterPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(prompt.text)}
                  className="p-3 bg-white hover:bg-amber-50/50 border border-gray-150 rounded-xl text-left text-xs font-semibold text-gray-700 shadow-sm flex items-center gap-2.5 transition-all hover:scale-[1.01] hover:border-amber-300"
                >
                  <span className="text-base">{prompt.icon}</span>
                  <span className="flex-1 leading-snug">{prompt.text}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                </button>
              ))}
            </div>
            
            <div className="mt-8 p-3 bg-white border border-gray-100 rounded-xl max-w-xs text-[10px] text-gray-400 leading-relaxed flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>Type your custom question below or study any Bible Chapter to ask about specific verses!</span>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Robot/Chaplain Avatar */}
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex-shrink-0 flex items-center justify-center text-sm shadow-sm">
                    🙏
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm border ${
                    m.role === 'user'
                      ? 'bg-brand-terracotta text-white border-brand-terracotta'
                      : 'bg-white text-gray-850 border-gray-100'
                  }`}
                >
                  {m.role === 'user' ? (
                    <p className="text-sm whitespace-pre-wrap leading-relaxed font-medium">{m.content}</p>
                  ) : (
                    <div className="text-sm space-y-2">
                      <div className="markdown-body text-gray-800 leading-relaxed">
                        {renderFormattedText(m.content)}
                      </div>

                      {/* AI Utilities (Read Aloud, copy) */}
                      <div className="flex items-center gap-2.5 mt-2.5 pt-2 border-t border-gray-50 text-[10px] text-gray-400">
                        <button
                          onClick={() => handleReadAloud(m.content)}
                          className="flex items-center gap-1.5 hover:text-brand-terracotta transition-colors py-0.5 px-1 rounded hover:bg-gray-50"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Read Aloud</span>
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(m.content);
                            alert('Response copied to clipboard!');
                          }}
                          className="flex items-center gap-1.5 hover:text-brand-terracotta transition-colors py-0.5 px-1 rounded hover:bg-gray-50"
                        >
                          <span>Copy Text</span>
                        </button>
                      </div>
                    </div>
                  )}
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      m.role === 'user' ? 'text-white/70' : 'text-gray-400'
                    }`}
                  >
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* User Avatar */}
                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-brand-terracotta-light flex-shrink-0 flex items-center justify-center text-sm shadow-sm text-brand-terracotta font-bold">
                    {userState.username.substring(0, 1).toUpperCase()}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex-shrink-0 flex items-center justify-center text-sm shadow-sm animate-pulse">
                  🙏
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-500 flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce delay-200"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce delay-300"></span>
                  </div>
                  <span className="text-xs font-medium italic">Chaplain is studying the scriptures...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Form Panel */}
      <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="max-w-2xl mx-auto flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question (e.g. 'Summarize Proverbs Chapter 3')"
            className="flex-1 bg-gray-50 text-sm border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md transition-all ${
              input.trim() && !isLoading
                ? 'bg-brand-terracotta hover:bg-brand-terracotta-hover text-white scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-100 text-gray-350 cursor-not-allowed shadow-none'
            }`}
          >
            <Send className="w-4 h-4 stroke-[2.25px]" />
          </button>
        </form>
        <p className="text-[10px] text-gray-400 text-center mt-1.5">
          Answers are grounded in academic theology & KJV Scripture. Peace be with you!
        </p>
      </div>

      {/* Floating Scroll up / down buttons */}
      <div className="absolute bottom-28 right-6 flex flex-col gap-2 z-30 select-none">
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
