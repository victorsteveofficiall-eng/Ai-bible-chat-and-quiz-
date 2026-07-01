import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, Clock, Award, Users, Search, Plus, 
  Flame, Sparkles, TrendingUp, Check
} from 'lucide-react';
import { QuizCategory, FriendScore, UserState } from '../types';
import { IMAGES } from '../images';

interface DiscoverViewProps {
  allCategories: QuizCategory[];
  userState: UserState;
  friendsList: FriendScore[];
  onSelectCategory: (categoryId: string) => void;
  onAddFriend: (name: string) => void;
}

export default function DiscoverView({
  allCategories,
  userState,
  friendsList,
  onSelectCategory,
  onAddFriend,
}: DiscoverViewProps) {
  const [activeTab, setActiveTab] = useState<'quizzes' | 'leaderboard'>('quizzes');
  
  // State for Add Friend Input
  const [friendNameInput, setFriendNameInput] = useState('');
  const [friendSuccess, setFriendSuccess] = useState(false);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddFriendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendNameInput.trim()) return;
    onAddFriend(friendNameInput.trim());
    setFriendSuccess(true);
    setFriendNameInput('');
    setTimeout(() => {
      setFriendSuccess(false);
    }, 3000);
  };

  // Filter quizzes
  const filteredQuizzes = allCategories.filter(cat => 
    cat.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort friends list by XP descending
  const sortedFriends = [...friendsList].sort((a, b) => b.xp - a.xp);

  return (
    <div className="bg-white min-h-full flex flex-col font-sans select-none overflow-y-auto pb-20">
      {/* Header Tabs */}
      <div className="px-6 pt-6 pb-2 border-b border-gray-100">
        <h1 className="font-display font-bold text-2xl text-gray-950 mb-4">Discover</h1>

        <div className="flex bg-gray-100 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'quizzes'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            📚 Bible Books
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'leaderboard'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            🏆 Leaderboard
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'quizzes' ? (
          <motion.div
            key="quizzes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-6 py-5 space-y-5"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search quiz books, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-terracotta/20 focus:border-brand-terracotta text-sm placeholder-gray-400 font-medium"
              />
            </div>

            {/* List */}
            <div className="space-y-4">
              {filteredQuizzes.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <span className="text-3xl block mb-2">🔍</span>
                  <p className="text-sm font-semibold">No quiz books match your search.</p>
                </div>
              ) : (
                filteredQuizzes.map((quiz) => {
                  let coverImg = IMAGES.deuteronomyCover;
                  if (quiz.imageType === 'zephaniah') coverImg = IMAGES.zephaniahCover;
                  if (quiz.imageType === 'genesis') coverImg = IMAGES.genesisCover;
                  if (quiz.imageType === 'matthew') coverImg = IMAGES.matthewCover;

                  return (
                    <div
                      key={quiz.id}
                      onClick={() => onSelectCategory(quiz.id)}
                      className="bg-white border border-gray-100 rounded-3xl p-4 flex items-center justify-between shadow-sm hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                          <img
                            src={coverImg}
                            alt={quiz.bookName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                            {quiz.title}
                          </span>
                          <h3 className="font-display font-bold text-base text-gray-900 mt-0.5 group-hover:text-brand-terracotta transition-colors">
                            {quiz.bookName}
                          </h3>
                          <div className="flex items-center gap-3 mt-1.5">
                            <div className="flex items-center gap-1 text-gray-400 text-[11px] font-semibold">
                              <Clock className="w-3.5 h-3.5 text-brand-terracotta" />
                              <span>{quiz.durationMins} MINS</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-400 text-[11px] font-semibold">
                              <Award className="w-3.5 h-3.5 text-amber-500" />
                              <span>1,000 XP</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-9 h-9 rounded-full bg-slate-50 border border-gray-100/60 flex items-center justify-center text-gray-400 group-hover:text-brand-terracotta group-hover:bg-brand-terracotta-light transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-6 py-5 space-y-6"
          >
            {/* Top 3 Podium Visual */}
            <div className="bg-brand-gold border border-brand-gold-border rounded-3xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-brand-terracotta" />
                <span className="text-xs font-bold text-brand-terracotta uppercase tracking-wider">Top Scripture Scholars</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center items-end pt-2">
                {/* 2nd Place */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border border-gray-300 flex items-center justify-center font-bold text-sm text-gray-700 shadow-sm relative">
                    🥈
                  </div>
                  <span className="text-[11px] font-bold text-gray-700 mt-2 truncate w-full px-1">
                    {sortedFriends[1]?.name || 'Abigail'}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-400 mt-0.5">
                    {sortedFriends[1]?.xp || '5,100'} XP
                  </span>
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center scale-110 -translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center font-bold text-base text-amber-700 shadow-md relative">
                    👑
                    <div className="absolute -top-3 text-xs text-amber-500 animate-bounce">✦</div>
                  </div>
                  <span className="text-xs font-black text-gray-900 mt-2.5 truncate w-full px-1">
                    {sortedFriends[0]?.name || 'Nathaniel'}
                  </span>
                  <span className="text-[10px] font-extrabold text-amber-600 mt-0.5">
                    {sortedFriends[0]?.xp || '6,200'} XP
                  </span>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-300 flex items-center justify-center font-bold text-sm text-amber-900 shadow-sm relative">
                    🥉
                  </div>
                  <span className="text-[11px] font-bold text-gray-700 mt-2 truncate w-full px-1">
                    {sortedFriends[2]?.name || 'Rebecca'}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-400 mt-0.5">
                    {sortedFriends[2]?.xp || '4,850'} XP
                  </span>
                </div>
              </div>
            </div>

            {/* Friends high score table */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
                Leaderboard Standings
              </h3>

              <div className="bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden divide-y divide-gray-100 shadow-sm">
                {sortedFriends.map((friend, idx) => {
                  const isUser = friend.isCurrentUser || friend.id === 'f-user';
                  return (
                    <div
                      key={friend.id}
                      className={`flex items-center justify-between p-4 ${
                        isUser ? 'bg-brand-terracotta-light/40 border-l-4 border-l-brand-terracotta' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className={`w-6 text-center font-mono text-sm font-bold ${
                          idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-amber-700' : 'text-gray-400'
                        }`}>
                          #{idx + 1}
                        </span>

                        <div className="w-9 h-9 rounded-xl bg-gray-100 border border-gray-200/50 flex items-center justify-center text-gray-600 font-bold text-xs">
                          {friend.name.substring(0, 2).toUpperCase()}
                        </div>

                        <div>
                          <p className={`text-sm font-bold ${isUser ? 'text-brand-terracotta' : 'text-gray-800'}`}>
                            {friend.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-semibold text-orange-500 flex items-center gap-0.5">
                              🔥 {friend.streaks} Day Streak
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-display font-black text-sm text-gray-800 block">
                          {friend.xp}
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                          XP
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add Friend Form */}
            <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-1">
                Challenge Friends
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Enter your friend's name or username to track their Bible achievements!
              </p>

              <form onSubmit={handleAddFriendSubmit} className="flex gap-2.5">
                <input
                  type="text"
                  required
                  placeholder="Friend's Name..."
                  value={friendNameInput}
                  onChange={(e) => setFriendNameInput(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-terracotta/20 focus:border-brand-terracotta text-sm"
                />
                <button
                  type="submit"
                  id="btn-add-friend"
                  className="bg-brand-terracotta hover:bg-brand-terracotta-hover text-white px-4 py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-brand-terracotta/10"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </form>

              {friendSuccess && (
                <p className="text-center text-xs font-semibold text-emerald-600 mt-3 flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Friend added successfully! Standings updated.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
