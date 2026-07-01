import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowLeft, Plus } from 'lucide-react';
import { UserState } from '../types';

interface PremiumViewProps {
  onBack: () => void;
  userState: UserState;
  onUpgrade: () => void;
}

export default function PremiumView({ onBack, userState, onUpgrade }: PremiumViewProps) {
  return (
    <div className="bg-white min-h-full flex flex-col px-6 py-6 font-sans select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          id="btn-premium-back"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <span className="font-display font-medium text-lg text-gray-800">Premium</span>
        <div className="w-10"></div> {/* spacer */}
      </div>

      <div className="flex-1 flex flex-col items-center max-w-md mx-auto w-full">
        {/* Gold Hexagon Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative mb-6"
        >
          {/* Animated Glow Backdrops */}
          <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-20 scale-125 animate-pulse"></div>
          
          <div className="w-20 h-22 bg-amber-500 flex items-center justify-center relative clip-hex" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
            <div className="w-[72px] h-[80px] bg-amber-400 flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
              <Plus className="w-10 h-10 text-white stroke-[3px]" />
            </div>
          </div>

          {/* Sparkles */}
          <div className="absolute -top-2 -left-2 text-yellow-500 animate-bounce">✦</div>
          <div className="absolute -bottom-1 -right-2 text-yellow-500 animate-bounce delay-300">✦</div>
          <div className="absolute top-8 -right-4 text-yellow-500 text-sm animate-pulse">✦</div>
        </motion.div>

        {/* Title */}
        <h1 className="font-display font-bold text-2xl text-center text-gray-900 leading-tight mb-3">
          Enjoy an Ad-Free Experience!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm text-center leading-relaxed mb-8 px-2">
          Tired of interruptions? Upgrade now and enjoy seamless, distraction-free Bible quizzes. No more ads—just pure learning, fun, and focus!
        </p>

        {/* Bullet Points */}
        <div className="w-full space-y-4 mb-8">
          {[
            'No more ads—ever!',
            'No distractions, just learning',
            'Faster & smoother quiz experience',
            'More space for learning and fun',
          ].map((bullet, idx) => (
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 + 0.2 }}
              key={idx}
              className="flex items-start gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-brand-terracotta-light flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-brand-terracotta stroke-[3px]" />
              </div>
              <span className="text-gray-700 text-sm font-medium">{bullet}</span>
            </motion.div>
          ))}
        </div>

        {/* Pricing Selector Box */}
        {userState.isPremium ? (
          <div className="w-full bg-brand-terracotta-light border-2 border-brand-terracotta rounded-2xl p-4 flex items-center justify-between mb-8">
            <div>
              <p className="text-brand-terracotta font-bold text-lg">Active Premium Plan</p>
              <p className="text-gray-500 text-xs mt-1">Unlimited Lifelines Activated</p>
            </div>
            <div className="bg-brand-terracotta text-white font-display font-bold px-4 py-1.5 rounded-full text-xs">
              ACTIVE
            </div>
          </div>
        ) : (
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="w-full bg-brand-gold border-2 border-brand-gold-border rounded-2xl p-4 flex items-center justify-between mb-8 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 bg-yellow-400 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-bl-xl uppercase tracking-wider">
              Popular
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-brand-terracotta flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-terracotta"></div>
              </div>
              <div>
                <p className="font-display font-bold text-gray-950 text-base">₦1,800 <span className="text-gray-500 text-xs font-normal">/ Month</span></p>
                <p className="text-gray-500 text-xs">Full access to all books & features</p>
              </div>
            </div>
            <span className="text-lg">🇳🇬</span>
          </motion.div>
        )}

        {/* Upgrade Button */}
        {userState.isPremium ? (
          <button
            onClick={onBack}
            className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors py-4 rounded-full font-display font-bold text-base shadow-sm mb-4"
          >
            Back to Dashboard
          </button>
        ) : (
          <button
            onClick={onUpgrade}
            id="btn-premium-upgrade"
            className="w-full bg-brand-terracotta text-white hover:bg-brand-terracotta-hover transition-colors py-4 rounded-full font-display font-bold text-base shadow-lg shadow-brand-terracotta/20 mb-3"
          >
            Upgrade Now
          </button>
        )}

        {/* Auto-renew disclaimer */}
        {!userState.isPremium && (
          <p className="text-[11px] text-gray-400 text-center mb-8">
            Auto-renews for ₦1,800/month unless canceled in settings.
          </p>
        )}

        {/* Footer links */}
        <div className="mt-auto flex justify-center gap-6 text-xs text-gray-400 font-medium pb-4">
          <button className="hover:text-gray-600 transition-colors">Terms of Services</button>
          <span>•</span>
          <button className="hover:text-gray-600 transition-colors">Privacy Policy</button>
        </div>
      </div>
    </div>
  );
}
