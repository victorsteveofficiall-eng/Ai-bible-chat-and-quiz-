/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Home, Grid, Menu, Sparkles, Award, Flame, Coins, BookOpen, MessageSquare } from 'lucide-react';
import { BIBLE_QUIZ_CATEGORIES, INITIAL_USER_STATE, MOCK_LEADERBOARD } from './data';
import { UserState, FriendScore, QuizCategory } from './types';

// Sub-views
import HomeView from './components/HomeView';
import DiscoverView from './components/DiscoverView';
import MoreView from './components/MoreView';
import QuizActiveView from './components/QuizActiveView';
import PremiumView from './components/PremiumView';
import AboutView from './components/AboutView';
import KjvBibleView from './components/KjvBibleView';
import BibleChatView from './components/BibleChatView';
import OnboardingView from './components/OnboardingView';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'home' | 'bible' | 'chat' | 'discover' | 'more'>('home');
  const [activeView, setActiveView] = useState<'none' | 'quiz' | 'premium' | 'about'>('none');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('deuteronomy');
  const [initialChatPrompt, setInitialChatPrompt] = useState<string>('');
  
  const [onboarded, setOnboarded] = useState(() => {
    return localStorage.getItem('vq_onboarded') === 'true';
  });

  const handleOnboardingComplete = (name: string) => {
    setUserState((prev) => ({
      ...prev,
      username: name,
    }));
    setFriendsList((prev) =>
      prev.map((friend) => {
        if (friend.isCurrentUser || friend.id === 'f-user') {
          return { ...friend, name: `${name} (You)` };
        }
        return friend;
      })
    );
    localStorage.setItem('vq_onboarded', 'true');
    setOnboarded(true);
  };

  // Ask Chaplain callback from the KJV Bible reader
  const handleAskChaplainFromVerse = (prompt: string) => {
    setInitialChatPrompt(prompt);
    setActiveTab('chat');
    setActiveView('none');
  };

  // Core Persisted States
  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('vq_user_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_USER_STATE;
      }
    }
    return INITIAL_USER_STATE;
  });

  const [friendsList, setFriendsList] = useState<FriendScore[]>(() => {
    const saved = localStorage.getItem('vq_friends_list');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return MOCK_LEADERBOARD;
      }
    }
    return MOCK_LEADERBOARD;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('vq_user_state', JSON.stringify(userState));
  }, [userState]);

  useEffect(() => {
    localStorage.setItem('vq_friends_list', JSON.stringify(friendsList));
  }, [friendsList]);

  // Handle Quiz Start / Resume
  const handleSelectCategory = (categoryId: string, resume = false) => {
    setSelectedCategoryId(categoryId);
    
    if (!resume) {
      // Initialize or reset category progress
      setUserState((prev) => ({
        ...prev,
        quizProgress: {
          ...prev.quizProgress,
          [categoryId]: {
            startedDate: `Started ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
            currentQuestionIndex: 0,
            completed: false,
            score: 0,
            answers: {},
          },
        },
      }));
    }
    
    setActiveView('quiz');
  };

  // Handle Quiz Completion
  const handleQuizComplete = (
    score: number,
    coinsEarned: number,
    xpEarned: number,
    answers: { [key: string]: string }
  ) => {
    setUserState((prev) => {
      // Check if this category is already completed
      const wasCompleted = prev.quizProgress[selectedCategoryId]?.completed;
      
      const newProgress = {
        ...prev.quizProgress,
        [selectedCategoryId]: {
          startedDate: prev.quizProgress[selectedCategoryId]?.startedDate || 'Started today',
          currentQuestionIndex: 9, // finished
          completed: true,
          score,
          answers,
        },
      };

      // Increment streak if it's the first completion of the day
      const newStreaks = wasCompleted ? prev.streaks : prev.streaks + 1;

      return {
        ...prev,
        coins: prev.coins + coinsEarned,
        xpEarned: prev.xpEarned + xpEarned,
        streaks: newStreaks,
        quizProgress: newProgress,
      };
    });

    // Update current user's entry in Leaderboard
    setFriendsList((prev) =>
      prev.map((friend) => {
        if (friend.isCurrentUser || friend.id === 'f-user') {
          return {
            ...friend,
            xp: friend.xp + xpEarned,
            coins: friend.coins + coinsEarned,
            streaks: friend.streaks + (userState.quizProgress[selectedCategoryId]?.completed ? 0 : 1),
          };
        }
        return friend;
      })
    );
  };

  // Handle Lifeline usage
  const handleUseHint = () => {
    if (userState.isPremium) return;
    setUserState((prev) => ({
      ...prev,
      lifelines: {
        ...prev.lifelines,
        hints: Math.max(0, prev.lifelines.hints - 1),
      },
    }));
  };

  const handleUseExtraTime = () => {
    if (userState.isPremium) return;
    setUserState((prev) => ({
      ...prev,
      lifelines: {
        ...prev.lifelines,
        extraTime: Math.max(0, prev.lifelines.extraTime - 1),
      },
    }));
  };

  // Handle Mock Ad Claims (+50 coins)
  const handleClaimAdReward = () => {
    setUserState((prev) => ({
      ...prev,
      coins: prev.coins + 50,
    }));
    // Also update leaderboard
    setFriendsList((prev) =>
      prev.map((friend) => {
        if (friend.isCurrentUser || friend.id === 'f-user') {
          return { ...friend, coins: friend.coins + 50 };
        }
        return friend;
      })
    );
  };

  // Handle Premium Upgrade
  const handleUpgradeToPremium = () => {
    setUserState((prev) => ({
      ...prev,
      isPremium: true,
      coins: prev.coins + 500, // 500 coins bonus!
    }));
    alert('Congratulations! You are now a Premium member. All ads removed & Unlimited Lifelines unlocked!');
  };

  // Handle Username Change
  const handleChangeUsername = (newName: string) => {
    setUserState((prev) => ({
      ...prev,
      username: newName,
    }));
    // Sync to friends list name
    setFriendsList((prev) =>
      prev.map((friend) => {
        if (friend.isCurrentUser || friend.id === 'f-user') {
          return { ...friend, name: `${newName} (You)` };
        }
        return friend;
      })
    );
  };

  // Add friend to leaderboard list
  const handleAddFriend = (friendName: string) => {
    const newFriend: FriendScore = {
      id: `f-added-${Date.now()}`,
      name: friendName,
      xp: Math.floor(Math.random() * 3500) + 2000, // randomized realistic XP
      coins: Math.floor(Math.random() * 100) + 20,
      streaks: Math.floor(Math.random() * 5),
      rank: friendsList.length + 1,
    };
    setFriendsList((prev) => [...prev, newFriend]);
  };

  // Add coins helper
  const handleAddCoins = (amount: number) => {
    setUserState((prev) => ({
      ...prev,
      coins: prev.coins + amount,
    }));
    setFriendsList((prev) =>
      prev.map((friend) => {
        if (friend.isCurrentUser || friend.id === 'f-user') {
          return { ...friend, coins: friend.coins + amount };
        }
        return friend;
      })
    );
  };

  // Helper to find selected category object
  const activeCategory = BIBLE_QUIZ_CATEGORIES.find((cat) => cat.id === selectedCategoryId) || BIBLE_QUIZ_CATEGORIES[0];

  return (
    <div className="min-h-screen w-full bg-[#F5F4F0] flex items-center justify-center md:py-8 md:px-4 relative overflow-hidden select-none">
      {/* Decorative starry background bubbles for luxury feels */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-brand-gold/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-terracotta-light/30 rounded-full blur-3xl -z-10 animate-pulse delay-500"></div>

      {/* Responsive Container - Fits perfectly to 100% screen on mobile devices, elegant card on iPad/Tablet/Desktop */}
      <div className="w-full h-screen md:h-[90vh] md:max-w-4xl bg-white md:rounded-3xl shadow-2xl md:border md:border-gray-150 overflow-hidden flex flex-col relative">
        
        {/* Content Router */}
        <div className="flex-1 overflow-hidden relative">
          {!onboarded ? (
            <OnboardingView onComplete={handleOnboardingComplete} />
          ) : (
            <>
              {activeView === 'quiz' && (
                <QuizActiveView
                  category={activeCategory}
                  userState={userState}
                  onClose={() => setActiveView('none')}
                  onQuizComplete={handleQuizComplete}
                  onUseHint={handleUseHint}
                  onUseExtraTime={handleUseExtraTime}
                  onClaimAdReward={handleClaimAdReward}
                />
              )}

              {activeView === 'premium' && (
                <PremiumView
                  onBack={() => setActiveView('none')}
                  userState={userState}
                  onUpgrade={handleUpgradeToPremium}
                />
              )}

              {activeView === 'about' && (
                <AboutView onBack={() => setActiveView('none')} />
              )}

              {activeView === 'none' && (
                <>
                  {activeTab === 'home' && (
                    <HomeView
                      userState={userState}
                      featuredQuizzes={BIBLE_QUIZ_CATEGORIES.slice(0, 3)}
                      onSelectCategory={handleSelectCategory}
                      onNavigateToPremium={() => setActiveView('premium')}
                      onNavigateToAbout={() => setActiveView('about')}
                    />
                  )}

                  {activeTab === 'bible' && (
                    <KjvBibleView onAskChaplain={handleAskChaplainFromVerse} />
                  )}

                  {activeTab === 'chat' && (
                    <BibleChatView
                      userState={userState}
                      initialPrompt={initialChatPrompt}
                      onClearInitialPrompt={() => setInitialChatPrompt('')}
                      onNavigateToBible={() => setActiveTab('bible')}
                      onUpgrade={handleUpgradeToPremium}
                    />
                  )}

                  {activeTab === 'discover' && (
                    <DiscoverView
                      allCategories={BIBLE_QUIZ_CATEGORIES}
                      userState={userState}
                      friendsList={friendsList}
                      onSelectCategory={handleSelectCategory}
                      onAddFriend={handleAddFriend}
                    />
                  )}

                  {activeTab === 'more' && (
                    <MoreView
                      userState={userState}
                      onChangeUsername={handleChangeUsername}
                      onNavigateToAbout={() => setActiveView('about')}
                      onNavigateToPremium={() => setActiveView('premium')}
                      onAddCoins={handleAddCoins}
                      friendsList={friendsList}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>

        {/* Bottom Nav Bar (only visible when not in active full-screen views to maximize focus!) */}
        {activeView === 'none' && onboarded && (
          <div className="inset-x-0 h-20 bg-white border-t border-gray-100 flex items-center justify-around px-2 pb-2 z-20 flex-shrink-0">
            {/* Tab 1: Home */}
            <button
              onClick={() => setActiveTab('home')}
              id="tab-btn-home"
              className="flex flex-col items-center gap-1 cursor-pointer transition-all flex-1"
            >
              <div className={`p-1.5 rounded-full transition-all ${
                activeTab === 'home' 
                  ? 'bg-brand-terracotta/10 text-brand-terracotta scale-105 animate-pulse' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}>
                <Home className="w-5 h-5 stroke-[2.25px]" />
              </div>
              <span className={`text-[10px] font-bold ${
                activeTab === 'home' ? 'text-brand-terracotta font-extrabold' : 'text-gray-400'
              }`}>
                Home
              </span>
            </button>

            {/* Tab 2: KJV Bible */}
            <button
              onClick={() => setActiveTab('bible')}
              id="tab-btn-bible"
              className="flex flex-col items-center gap-1 cursor-pointer transition-all flex-1"
            >
              <div className={`p-1.5 rounded-full transition-all ${
                activeTab === 'bible' 
                  ? 'bg-brand-terracotta/10 text-brand-terracotta scale-105' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}>
                <BookOpen className="w-5 h-5 stroke-[2.25px]" />
              </div>
              <span className={`text-[10px] font-bold ${
                activeTab === 'bible' ? 'text-brand-terracotta font-extrabold' : 'text-gray-400'
              }`}>
                KJV Bible
              </span>
            </button>

            {/* Tab 3: Bible AI Chat */}
            <button
              onClick={() => setActiveTab('chat')}
              id="tab-btn-chat"
              className="flex flex-col items-center gap-1 cursor-pointer transition-all flex-1"
            >
              <div className={`p-1.5 rounded-full transition-all ${
                activeTab === 'chat' 
                  ? 'bg-brand-terracotta/10 text-brand-terracotta scale-105' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}>
                <MessageSquare className="w-5 h-5 stroke-[2.25px]" />
              </div>
              <span className={`text-[10px] font-bold ${
                activeTab === 'chat' ? 'text-brand-terracotta font-extrabold' : 'text-gray-400'
              }`}>
                Bible AI
              </span>
            </button>

            {/* Tab 4: Discover */}
            <button
              onClick={() => setActiveTab('discover')}
              id="tab-btn-discover"
              className="flex flex-col items-center gap-1 cursor-pointer transition-all flex-1"
            >
              <div className={`p-1.5 rounded-full transition-all ${
                activeTab === 'discover' 
                  ? 'bg-brand-terracotta/10 text-brand-terracotta scale-105' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}>
                <Grid className="w-5 h-5 stroke-[2.25px]" />
              </div>
              <span className={`text-[10px] font-bold ${
                activeTab === 'discover' ? 'text-brand-terracotta font-extrabold' : 'text-gray-400'
              }`}>
                Discover
              </span>
            </button>

            {/* Tab 5: More */}
            <button
              onClick={() => setActiveTab('more')}
              id="tab-btn-more"
              className="flex flex-col items-center gap-1 cursor-pointer transition-all flex-1"
            >
              <div className={`p-1.5 rounded-full transition-all ${
                activeTab === 'more' 
                  ? 'bg-brand-terracotta/10 text-brand-terracotta scale-105' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}>
                <Menu className="w-5 h-5 stroke-[2.25px]" />
              </div>
              <span className={`text-[10px] font-bold ${
                activeTab === 'more' ? 'text-brand-terracotta font-extrabold' : 'text-gray-400'
              }`}>
                More
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
