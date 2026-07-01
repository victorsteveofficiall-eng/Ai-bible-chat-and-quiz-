import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Clock, Award, Coins, Flame, ShieldAlert, Sparkles, User, MoreVertical } from 'lucide-react';
import CloverLogo from './CloverLogo';
import { QuizCategory, UserState } from '../types';
import { IMAGES } from '../images';

interface HomeViewProps {
  userState: UserState;
  featuredQuizzes: QuizCategory[];
  onSelectCategory: (categoryId: string, resume?: boolean) => void;
  onNavigateToPremium: () => void;
  onNavigateToAbout: () => void;
}

export default function HomeView({
  userState,
  featuredQuizzes,
  onSelectCategory,
  onNavigateToPremium,
  onNavigateToAbout,
}: HomeViewProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Find 2 Thessalonians quiz for active progress
  const thessProgress = userState.quizProgress['thessalonians2'];

  return (
    <div className="bg-white min-h-full flex flex-col font-sans select-none overflow-y-auto pb-20">
      {/* Top App Bar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100/40 relative">
        <div className="flex items-center gap-2">
          <CloverLogo className="w-8 h-8" />
        </div>

        <div className="flex items-center gap-2.5">
          {/* Premium Badge if upgraded */}
          {userState.isPremium && (
            <span className="bg-amber-100 border border-amber-200 text-amber-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
              👑 Premium
            </span>
          )}

          {/* User Icon Button */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            id="btn-top-profile"
            className="w-10 h-10 rounded-full bg-slate-50 border border-gray-200/60 flex items-center justify-center text-gray-500 hover:bg-gray-100/70 transition-colors"
          >
            <User className="w-5 h-5 text-gray-600" />
          </button>

          {/* More Menu */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Floating Dropdown Menu */}
        {showDropdown && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)}></div>
            <div className="absolute right-6 top-16 bg-white border border-gray-100 shadow-xl rounded-2xl p-2.5 w-48 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  onNavigateToPremium();
                }}
                className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 rounded-xl flex items-center gap-2"
              >
                <span>👑</span> Premium Upgrade
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  onNavigateToAbout();
                }}
                className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 rounded-xl flex items-center gap-2"
              >
                <span>ℹ️</span> About VerseQuest
              </button>
            </div>
          </>
        )}
      </div>

      <div className="px-6 py-5 space-y-6">
        {/* User Greeting */}
        <div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Welcome back</p>
          <h2 className="font-display font-bold text-xl text-gray-950 mt-1">
            {getGreeting()}, {userState.username}
          </h2>
        </div>

        {/* My Activity Box */}
        <div className="bg-brand-gold border border-brand-gold-border rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-brand-terracotta uppercase tracking-wider">My Activity</span>
            <ChevronRight className="w-4 h-4 text-brand-terracotta" />
          </div>

          <div className="grid grid-cols-4 gap-2 text-center divide-x divide-brand-gold-border">
            <div className="flex flex-col items-center">
              <span className="text-lg font-black text-gray-950">{userState.streaks}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight mt-0.5">Streaks</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-black text-gray-950">{userState.coins}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight mt-0.5">Coins</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-black text-gray-950">{userState.xpEarned}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight mt-0.5">XP Earned</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-black text-gray-950">{userState.isPremium ? 'Unlimited' : userState.lifelines.hints + userState.lifelines.extraTime}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight mt-0.5">Lifelines</span>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        {thessProgress && !thessProgress.completed && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Progress</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

            <div
              onClick={() => onSelectCategory('thessalonians2', true)}
              id="card-active-progress"
              className="bg-white border border-gray-150 rounded-3xl p-5 shadow-sm hover:border-brand-terracotta/30 hover:scale-[1.01] transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-display font-bold text-base text-gray-900 group-hover:text-brand-terracotta transition-colors">
                    2 Thessalonians
                  </h3>
                  <span className="text-gray-400 text-xs mt-0.5 inline-block">
                    {thessProgress.startedDate}
                  </span>
                </div>
                <span className="text-xs font-bold text-brand-terracotta bg-brand-terracotta-light px-2.5 py-1 rounded-full">
                  Resume Quiz
                </span>
              </div>

              {/* Progress Line */}
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-4 relative">
                <div
                  className="h-full bg-brand-terracotta rounded-full transition-all"
                  style={{ width: `${(thessProgress.currentQuestionIndex / 10) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-2.5">
                <span className="text-[10px] font-bold text-gray-400">Completion</span>
                <span className="text-[10px] font-bold text-gray-900">
                  {thessProgress.currentQuestionIndex}/10 Questions
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Featured Quiz Section */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Featured Quiz</span>
          </div>

          <div className="space-y-3">
            {featuredQuizzes.map((quiz) => {
              // Map cover images
              let coverImg = IMAGES.deuteronomyCover;
              if (quiz.imageType === 'zephaniah') coverImg = IMAGES.zephaniahCover;
              if (quiz.imageType === 'genesis') coverImg = IMAGES.genesisCover;
              if (quiz.imageType === 'matthew') coverImg = IMAGES.matthewCover;

              return (
                <div
                  key={quiz.id}
                  onClick={() => onSelectCategory(quiz.id)}
                  id={`card-featured-${quiz.id}`}
                  className="bg-white border border-gray-100 rounded-3xl p-4 flex items-center justify-between shadow-sm hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    {/* Cover Art */}
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                      <img
                        src={coverImg}
                        alt={quiz.bookName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Meta */}
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                        {quiz.title}
                      </p>
                      <h3 className="font-display font-bold text-base text-gray-900 mt-0.5 group-hover:text-brand-terracotta transition-colors">
                        {quiz.bookName}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                        <Clock className="w-3.5 h-3.5 text-brand-terracotta" />
                        <span className="font-semibold text-[11px]">{quiz.durationMins} MINS</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-slate-50 border border-gray-100/60 flex items-center justify-center text-gray-400 group-hover:text-brand-terracotta group-hover:bg-brand-terracotta-light transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
