import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, User, BarChart2, Coins, MessageSquare, Info, 
  Sparkles, Check, Send, Award, Calendar, Flame
} from 'lucide-react';
import { UserState, FriendScore } from '../types';
import { IMAGES } from '../images';

interface MoreViewProps {
  userState: UserState;
  onChangeUsername: (newName: string) => void;
  onNavigateToAbout: () => void;
  onNavigateToPremium: () => void;
  onAddCoins: (amount: number) => void;
  friendsList: FriendScore[];
}

export default function MoreView({
  userState,
  onChangeUsername,
  onNavigateToAbout,
  onNavigateToPremium,
  onAddCoins,
  friendsList,
}: MoreViewProps) {
  const [activeSubSection, setActiveSubSection] = useState<
    'none' | 'profile' | 'activity' | 'get-coin' | 'feedback'
  >('none');

  // Profile Form States
  const [tempUsername, setTempUsername] = useState(userState.username);
  const [usernameMessage, setUsernameMessage] = useState('');

  // Feedback Form States
  const [feedbackType, setFeedbackType] = useState('Suggestion');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Get Coin State
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [triviaPlaying, setTriviaPlaying] = useState(false);
  const [triviaStep, setTriviaStep] = useState(0);
  const [triviaSelected, setTriviaSelected] = useState<string | null>(null);
  const [triviaResult, setTriviaResult] = useState<'none' | 'correct' | 'wrong'>('none');

  const miniTrivia = [
    {
      q: 'How many books are in the Protestant Old Testament?',
      options: ['27', '39', '46', '66'],
      correct: '39',
      reward: 35,
    },
    {
      q: 'Which is the shortest book in the Bible by word count?',
      options: ['Obadiah', 'Philemon', '2 John', '3 John'],
      correct: '3 John',
      reward: 40,
    },
    {
      q: 'Who was the first Christian martyr recorded in Acts?',
      options: ['Stephen', 'James', 'Peter', 'Philip'],
      correct: 'Stephen',
      reward: 45,
    }
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempUsername.trim()) return;
    onChangeUsername(tempUsername.trim());
    setUsernameMessage('Username updated successfully!');
    setTimeout(() => setUsernameMessage(''), 3000);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSubmitted(true);
    setFeedbackText('');
    setFeedbackEmail('');
    setTimeout(() => {
      setFeedbackSubmitted(false);
    }, 4000);
  };

  const handleClaimDaily = () => {
    if (dailyClaimed) return;
    onAddCoins(50);
    setDailyClaimed(true);
  };

  const handleAnswerTrivia = (option: string) => {
    setTriviaSelected(option);
    const correctAns = miniTrivia[triviaStep].correct;
    if (option === correctAns) {
      setTriviaResult('correct');
      onAddCoins(miniTrivia[triviaStep].reward);
    } else {
      setTriviaResult('wrong');
    }
  };

  const handleNextTrivia = () => {
    setTriviaSelected(null);
    setTriviaResult('none');
    if (triviaStep < miniTrivia.length - 1) {
      setTriviaStep(prev => prev + 1);
    } else {
      setTriviaPlaying(false);
      setTriviaStep(0);
    }
  };

  return (
    <div className="bg-white min-h-full flex flex-col font-sans select-none relative overflow-y-auto pb-20">
      <AnimatePresence>
        {activeSubSection === 'none' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-6 py-6"
          >
            {/* Title */}
            <h1 className="font-display font-bold text-2xl text-gray-950 mb-6">More</h1>

            {/* Premium Card Header */}
            <div className="bg-slate-900 text-white rounded-3xl overflow-hidden shadow-lg border border-slate-800 mb-8 relative group">
              {/* Cover Image generated with AI */}
              <div className="h-40 relative overflow-hidden bg-slate-950">
                <img
                  src={IMAGES.premiumBanner}
                  alt="Bible Quest Premium"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-yellow-400 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3 fill-slate-950" />
                  Premium
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h2 className="font-display font-bold text-lg mb-1.5 flex items-center gap-2">
                  <span>📖</span> Bible Quest Premium
                </h2>
                <p className="text-gray-400 text-xs leading-relaxed mb-5">
                  Deepen your Bible knowledge and enjoy an ad-free, feature-packed experience.
                </p>

                <button
                  onClick={onNavigateToPremium}
                  id="btn-remove-ads-banner"
                  className="w-full bg-brand-terracotta text-white hover:bg-brand-terracotta-hover transition-colors py-3.5 rounded-2xl font-display font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-brand-terracotta/20"
                >
                  <span>🚫</span> Remove Ads
                </button>
              </div>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {[
                { id: 'profile', name: 'Profile', icon: User },
                { id: 'activity', name: 'Activity', icon: BarChart2 },
                { id: 'get-coin', name: 'Get Coin', icon: Coins },
                { id: 'feedback', name: 'Feedback', icon: MessageSquare },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSubSection(item.id as any)}
                    id={`btn-option-${item.id}`}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100/70 border border-gray-100 rounded-2xl transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white border border-gray-200/50 flex items-center justify-center text-gray-500 shadow-sm group-hover:scale-105 transition-transform">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{item.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                );
              })}

              {/* Separate About Button */}
              <button
                onClick={onNavigateToAbout}
                id="btn-option-about"
                className="w-full flex items-center justify-between p-4 bg-brand-cream hover:bg-orange-50/70 border border-orange-100 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-orange-100 flex items-center justify-center text-brand-terracotta shadow-sm group-hover:scale-105 transition-transform">
                    <Info className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-sm font-semibold text-brand-terracotta">About VerseQuest</span>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-terracotta/70 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-6 py-6 min-h-full flex flex-col"
          >
            {/* Sub-section Header */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setActiveSubSection('none')}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ← Back
              </button>
              <h2 className="font-display font-bold text-xl text-gray-950 capitalize">
                {activeSubSection.replace('-', ' ')}
              </h2>
            </div>

            {/* Sub-sections Router */}
            <div className="flex-1">
              {/* Profile sub-section */}
              {activeSubSection === 'profile' && (
                <div className="space-y-6">
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={tempUsername}
                        onChange={(e) => setTempUsername(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-terracotta/20 focus:border-brand-terracotta text-sm"
                        placeholder="Enter your name"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-terracotta text-white py-3 rounded-xl font-semibold text-sm hover:bg-brand-terracotta-hover transition-colors shadow-md shadow-brand-terracotta/10"
                    >
                      Save Changes
                    </button>
                  </form>

                  {usernameMessage && (
                    <p className="text-center text-xs font-semibold text-emerald-600">
                      {usernameMessage}
                    </p>
                  )}

                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Account Status
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Membership</span>
                      {userState.isPremium ? (
                        <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-amber-200">
                          👑 Premium
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">
                          Standard Free
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Total Coins</span>
                      <span className="text-amber-500 font-bold text-sm flex items-center gap-1">
                        🪙 {userState.coins}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Current Streaks</span>
                      <span className="text-orange-500 font-bold text-sm flex items-center gap-1">
                        🔥 {userState.streaks} Days
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Activity sub-section */}
              {activeSubSection === 'activity' && (
                <div className="space-y-6">
                  {/* High Stats Box */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-brand-cream border border-orange-100 p-4 rounded-2xl text-center">
                      <Award className="w-6 h-6 text-brand-terracotta mx-auto mb-1.5" />
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">XP Accumulated</p>
                      <p className="text-xl font-bold text-gray-800 mt-1">{userState.xpEarned}</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl text-center">
                      <Flame className="w-6 h-6 text-orange-500 mx-auto mb-1.5" />
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Streak Record</p>
                      <p className="text-xl font-bold text-gray-800 mt-1">{userState.streaks} Days</p>
                    </div>
                  </div>

                  {/* Leaderboard Position */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">Your Leaderboard Rank</p>
                        <p className="text-sm font-bold text-slate-800">Rank #3 among friends</p>
                      </div>
                    </div>
                    <span className="bg-brand-terracotta text-white text-xs font-bold px-3 py-1 rounded-full">
                      View Board
                    </span>
                  </div>

                  {/* Unlocked Badges */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
                      Unlocked Badges
                    </h3>
                    <div className="space-y-2">
                      {[
                        { title: 'Scripture Explorer', desc: 'Started your very first Bible quiz book.', icon: '🧭', date: 'Jan 15' },
                        { title: 'Pentateuch Pilgrim', desc: 'Answered questions in Genesis & Deuteronomy.', icon: '📜', date: 'Jan 22' },
                        { title: 'Five-Star Fire', desc: 'Maintained a five-day study streak!', icon: '🔥', date: 'Yesterday' },
                      ].map((badge, idx) => (
                        <div key={idx} className="flex items-center gap-3.5 p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                          <span className="text-2xl">{badge.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-800 truncate">{badge.title}</p>
                            <p className="text-xs text-gray-400 truncate">{badge.desc}</p>
                          </div>
                          <span className="text-[10px] font-semibold text-gray-400 whitespace-nowrap">{badge.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Get Coin sub-section */}
              {activeSubSection === 'get-coin' && (
                <div className="space-y-6">
                  {/* Header balance */}
                  <div className="bg-amber-500 text-white rounded-3xl p-6 text-center shadow-md">
                    <p className="text-xs font-bold text-amber-100 uppercase tracking-wider">Your Balance</p>
                    <p className="text-4xl font-extrabold mt-1">🪙 {userState.coins}</p>
                  </div>

                  {!triviaPlaying ? (
                    <div className="space-y-4">
                      {/* Daily Claim Box */}
                      <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🎁</span>
                          <div>
                            <p className="text-sm font-bold text-gray-800">Daily Gift</p>
                            <p className="text-xs text-gray-400">Claim 50 free coins every 24 hours</p>
                          </div>
                        </div>
                        <button
                          onClick={handleClaimDaily}
                          disabled={dailyClaimed}
                          className={`px-4 py-2 rounded-xl font-bold text-xs transition-colors ${
                            dailyClaimed
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm'
                          }`}
                        >
                          {dailyClaimed ? 'Claimed' : 'Claim'}
                        </button>
                      </div>

                      {/* Trivia Box */}
                      <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🧠</span>
                          <div>
                            <p className="text-sm font-bold text-gray-800">Rapid-Fire Trivia</p>
                            <p className="text-xs text-gray-400">Answer micro questions to earn up to 120 coins!</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setTriviaPlaying(true)}
                          className="px-4 py-2 bg-brand-terracotta text-white hover:bg-brand-terracotta-hover rounded-xl font-bold text-xs transition-colors shadow-sm"
                        >
                          Play
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-brand-cream border border-orange-100 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-brand-terracotta uppercase">
                          Question {triviaStep + 1} of {miniTrivia.length}
                        </span>
                        <span className="text-xs text-amber-600 font-bold">
                          Reward: 🪙 {miniTrivia[triviaStep].reward}
                        </span>
                      </div>

                      <p className="font-display font-bold text-base text-gray-900 leading-snug">
                        {miniTrivia[triviaStep].q}
                      </p>

                      <div className="space-y-2">
                        {miniTrivia[triviaStep].options.map((option, idx) => {
                          const isSelected = triviaSelected === option;
                          const isCorrect = option === miniTrivia[triviaStep].correct;

                          let btnStyle = 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200';
                          if (triviaSelected) {
                            if (isCorrect) {
                              btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-800';
                            } else if (isSelected) {
                              btnStyle = 'bg-rose-100 border-rose-400 text-rose-800';
                            } else {
                              btnStyle = 'bg-white opacity-50 border-gray-100';
                            }
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => handleAnswerTrivia(option)}
                              disabled={!!triviaSelected}
                              className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all ${btnStyle}`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>

                      {triviaResult !== 'none' && (
                        <div className="pt-2 text-center">
                          <p className={`text-xs font-bold ${triviaResult === 'correct' ? 'text-emerald-600' : 'text-rose-500'}`}>
                            {triviaResult === 'correct' 
                              ? `✓ Correct! You earned ${miniTrivia[triviaStep].reward} coins!` 
                              : `✗ Incorrect! The correct answer was ${miniTrivia[triviaStep].correct}`
                            }
                          </p>
                          <button
                            onClick={handleNextTrivia}
                            className="mt-3 px-5 py-2 bg-brand-terracotta text-white rounded-xl text-xs font-bold hover:bg-brand-terracotta-hover transition-colors"
                          >
                            {triviaStep < miniTrivia.length - 1 ? 'Next Question' : 'Complete Quiz'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Feedback sub-section */}
              {activeSubSection === 'feedback' && (
                <div className="space-y-6">
                  {feedbackSubmitted ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-brand-cream border border-orange-100 rounded-3xl p-6 text-center space-y-4"
                    >
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                        <Check className="w-6 h-6 stroke-[3px]" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-gray-950">Thank you for your feedback!</h3>
                      <p className="text-xs text-gray-500 leading-relaxed px-3">
                        We read all user comments and suggestions. We will reach out to you if any further details are required. Have an inspiring Bible study!
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmitFeedback} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          Category
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {['Suggestion', 'Bug Report', 'General'].map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setFeedbackType(cat)}
                              className={`py-2 text-xs font-bold rounded-xl border text-center transition-all ${
                                feedbackType === cat
                                  ? 'bg-brand-terracotta text-white border-brand-terracotta'
                                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          value={feedbackEmail}
                          onChange={(e) => setFeedbackEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-terracotta/20 focus:border-brand-terracotta text-sm"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          Message
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-terracotta/20 focus:border-brand-terracotta text-sm placeholder-gray-400"
                          placeholder="What features or quiz books would you like to see next?"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-brand-terracotta hover:bg-brand-terracotta-hover text-white py-3.5 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-md shadow-brand-terracotta/10"
                      >
                        <Send className="w-4 h-4" /> Send Feedback
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
