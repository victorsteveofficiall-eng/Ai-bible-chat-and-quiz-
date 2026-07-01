import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, BookOpen, MessageSquare, Award, ArrowRight, User } from 'lucide-react';

interface OnboardingViewProps {
  onComplete: (name: string) => void;
}

export default function OnboardingView({ onComplete }: OnboardingViewProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter your name to begin.');
      return;
    }
    onComplete(trimmed);
  };

  return (
    <div className="min-h-full flex flex-col bg-gradient-to-b from-[#FDFBF7] to-[#F5F4F0] p-6 justify-between select-none font-sans overflow-y-auto">
      {/* Decorative vector sparks */}
      <div className="absolute top-8 left-8 text-brand-terracotta/20 animate-pulse">✦</div>
      <div className="absolute top-1/3 right-10 text-brand-gold/35 text-xl animate-bounce">✦</div>
      <div className="absolute bottom-1/4 left-10 text-brand-terracotta/25 text-lg animate-bounce delay-300">✦</div>

      {/* Top section: Title and Branding */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 text-center max-w-sm mx-auto w-full">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 bg-brand-terracotta text-white rounded-[2rem] flex items-center justify-center shadow-xl shadow-brand-terracotta/20 mb-6 relative"
        >
          <BookOpen className="w-9 h-9 stroke-[2.25px]" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-gold border border-brand-gold-border rounded-full flex items-center justify-center shadow">
            <Sparkles className="w-3.5 h-3.5 text-brand-terracotta" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="font-display font-black text-3xl text-gray-900 tracking-tight leading-tight"
        >
          AI Chat &<br />
          <span className="text-brand-terracotta">Bible Quiz</span>
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-gray-500 text-sm mt-3.5 leading-relaxed px-2"
        >
          The ultimate companion for spiritual scripture study. Immersive quizzes, authorized King James Bible reader, and AI-powered scripture counsel.
        </motion.p>

        {/* Feature showcase */}
        <div className="grid grid-cols-1 gap-3.5 w-full mt-8 text-left">
          <div className="bg-white border border-gray-150 p-3.5 rounded-2xl flex items-start gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center flex-shrink-0">
              <Award className="w-4.5 h-4.5 stroke-[2.25px]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Scripture Quizzes</h4>
              <p className="text-xs text-gray-500 mt-0.5">Test and build your knowledge with dynamic biblical trivia and local leaderboards.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-150 p-3.5 rounded-2xl flex items-start gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4.5 h-4.5 stroke-[2.25px]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide">KJV Bible Reader</h4>
              <p className="text-xs text-gray-500 mt-0.5">Authorized translation at your fingertips, with interactive verse-by-verse chaplain query features.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-150 p-3.5 rounded-2xl flex items-start gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-4.5 h-4.5 stroke-[2.25px]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Theological AI Chat</h4>
              <p className="text-xs text-gray-500 mt-0.5">A safe, academic AI Counselor ready to answer questions and explain difficult passages.</p>
            </div>
          </div>
        </div>

        {/* Form Input for Name */}
        <form onSubmit={handleSubmit} className="w-full mt-8 space-y-4">
          <div className="text-left">
            <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2 px-1">
              What is your name?
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="Enter your name to customize..."
                className="w-full bg-white border border-gray-250 rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-400 font-medium text-base focus:outline-none focus:ring-2 focus:ring-brand-terracotta/30 focus:border-brand-terracotta shadow-sm transition-all pl-12"
              />
              <User className="w-5 h-5 text-gray-400 absolute left-4 top-4.5" />
            </div>
            {error && (
              <p className="text-red-500 text-xs font-semibold mt-1.5 px-1 animate-pulse">
                ⚠️ {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-brand-terracotta text-white hover:bg-brand-terracotta-hover active:scale-[0.98] transition-all py-4 rounded-full font-display font-bold text-base shadow-lg shadow-brand-terracotta/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Begin Spiritual Journey</span>
            <ArrowRight className="w-5 h-5 stroke-[2.2px]" />
          </button>
        </form>
      </div>

      {/* Footer disclaimer */}
      <div className="text-center text-[11px] text-gray-400 mt-6 pb-2">
        By continuing, you agree to begin your personalized scriptural journey.
      </div>
    </div>
  );
}
