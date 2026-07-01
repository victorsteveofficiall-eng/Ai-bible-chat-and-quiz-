import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, HelpCircle, AlertCircle, Sparkles, Award, Lightbulb, RotateCcw, Flame } from 'lucide-react';
import { QuizCategory, Question, UserState } from '../types';

interface QuizActiveViewProps {
  category: QuizCategory;
  userState: UserState;
  onClose: () => void;
  onQuizComplete: (score: number, coinsEarned: number, xpEarned: number, answers: { [key: string]: string }) => void;
  onUseHint: () => void;
  onUseExtraTime: () => void;
  onClaimAdReward: () => void;
}

export default function QuizActiveView({
  category,
  userState,
  onClose,
  onQuizComplete,
  onUseHint,
  onUseExtraTime,
  onClaimAdReward,
}: QuizActiveViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState<{ [qId: string]: string }>({});
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(category.durationMins * 60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Lifeline active states
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [revealedHint, setRevealedHint] = useState<string | null>(null);

  // Completed status
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = category.questions[currentIndex];

  // Timer tick
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelectOption = (option: string) => {
    if (quizFinished) return;
    setSelections((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleNext = () => {
    if (currentIndex < category.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      // Reset lifeline states for the next question
      setEliminatedOptions([]);
      setRevealedHint(null);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setEliminatedOptions([]);
      setRevealedHint(null);
    }
  };

  const handleFinishQuiz = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setQuizFinished(true);

    // Calculate score
    let score = 0;
    category.questions.forEach((q) => {
      if (selections[q.id] === q.correctAnswer) {
        score += 1;
      }
    });

    // Award logic
    const baseCoins = score * 15;
    const premiumMultiplier = userState.isPremium ? 2 : 1;
    const coinsEarned = baseCoins * premiumMultiplier;
    const xpEarned = score * 100;

    onQuizComplete(score, coinsEarned, xpEarned, selections);
  };

  // Lifeline 1: Hint Clue (revels scripture reference)
  const handleTriggerHint = () => {
    if (userState.lifelines.hints <= 0 && !userState.isPremium) return;
    onUseHint();
    setRevealedHint(currentQuestion.bibleRef);
  };

  // Lifeline 2: Add +20S
  const handleTriggerExtraTime = () => {
    if (userState.lifelines.extraTime <= 0 && !userState.isPremium) return;
    onUseExtraTime();
    setTimeLeft(prev => prev + 20);
  };

  // Lifeline 3: 50-50 (eliminates 2 wrong answers)
  const handleTrigger5050 = () => {
    const wrongOptions = currentQuestion.options.filter(opt => opt !== currentQuestion.correctAnswer);
    // Shuffle and pick 2 to eliminate
    const toEliminate = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
    setEliminatedOptions(toEliminate);
  };

  // Score Calculations for Results View
  let calculatedScore = 0;
  category.questions.forEach((q) => {
    if (selections[q.id] === q.correctAnswer) {
      calculatedScore += 1;
    }
  });
  const earnedCoins = calculatedScore * 15 * (userState.isPremium ? 2 : 1);
  const earnedXp = calculatedScore * 100;

  return (
    <div className="bg-white min-h-full flex flex-col px-6 py-6 font-sans select-none relative overflow-y-auto">
      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col max-w-md mx-auto w-full"
          >
            {/* Header with Exit & Level & Timer */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onClose}
                id="btn-quiz-exit"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-terracotta text-white hover:bg-brand-terracotta-hover transition-colors shadow-sm"
              >
                <X className="w-5 h-5 stroke-[2.5px]" />
              </button>
              
              <span className="font-display font-bold text-lg text-gray-800">
                {category.bookName}
              </span>

              <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">
                <Clock className="w-4 h-4 text-brand-terracotta" />
                <span className="font-mono text-xs font-bold">{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-brand-terracotta rounded-full transition-all duration-300" 
                style={{ width: `${((currentIndex + 1) / category.questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Card */}
            <div className="flex-1 flex flex-col justify-center mb-8">
              <span className="block text-center text-xs font-bold text-brand-terracotta uppercase tracking-widest mb-3">
                Question {currentIndex + 1}/{category.questions.length}
              </span>
              
              <h2 className="font-serif font-bold text-xl text-center text-gray-900 leading-relaxed mb-8 px-2 max-h-[140px] overflow-y-auto">
                "{currentQuestion.text}"
              </h2>

              {/* Options Pills */}
              <div className="space-y-3.5">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selections[currentQuestion.id] === option;
                  const isEliminated = eliminatedOptions.includes(option);

                  if (isEliminated) {
                    return (
                      <div 
                        key={idx}
                        className="w-full p-4 rounded-3xl border border-gray-100 bg-gray-50/50 text-gray-300 text-center text-sm font-medium opacity-40 select-none line-through"
                      >
                        [ Eliminated ]
                      </div>
                    );
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option)}
                      id={`btn-quiz-option-${idx}`}
                      className={`w-full p-4 rounded-3xl border text-center text-sm font-semibold transition-all duration-200 ${
                        isSelected
                          ? 'border-brand-terracotta bg-brand-terracotta-light text-brand-terracotta shadow-sm scale-[1.01]'
                          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-800'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {revealedHint && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-brand-gold border border-brand-gold-border rounded-2xl p-3 text-center flex items-center justify-center gap-2 text-xs font-semibold text-amber-800"
                >
                  <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-100" />
                  <span>Scripture Hint: {revealedHint}</span>
                </motion.div>
              )}
            </div>

            {/* Navigation buttons: Previous & Next */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                id="btn-quiz-prev"
                className={`flex-1 py-4 rounded-full font-display font-bold text-sm transition-all shadow-sm ${
                  currentIndex === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-transparent'
                    : 'bg-white hover:bg-gray-50 border border-gray-200 text-gray-700'
                }`}
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={!selections[currentQuestion.id]}
                id="btn-quiz-next"
                className={`flex-1 py-4 rounded-full font-display font-bold text-sm transition-all shadow-md ${
                  !selections[currentQuestion.id]
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    : 'bg-brand-terracotta hover:bg-brand-terracotta-hover text-white shadow-brand-terracotta/15'
                }`}
              >
                {currentIndex === category.questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>

            {/* Lifelines section */}
            <div className="flex justify-center items-center gap-4 py-3 bg-gray-50 rounded-2xl border border-gray-100">
              {/* Hint lifeline */}
              <button
                onClick={handleTriggerHint}
                disabled={userState.lifelines.hints <= 0 && !userState.isPremium}
                id="btn-quiz-lifeline-hint"
                className="flex items-center gap-1 bg-white border border-gray-200 py-1.5 px-3 rounded-full hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
              >
                <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-white">
                  <Lightbulb className="w-3 h-3 fill-white" />
                </div>
                <span className="text-xs font-bold text-gray-600">
                  {userState.isPremium ? '∞' : userState.lifelines.hints}
                </span>
              </button>

              {/* Extra time lifeline */}
              <button
                onClick={handleTriggerExtraTime}
                disabled={userState.lifelines.extraTime <= 0 && !userState.isPremium}
                id="btn-quiz-lifeline-time"
                className="flex items-center gap-1 bg-white border border-gray-200 py-1.5 px-3 rounded-full hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
              >
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white">
                  <Clock className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs font-bold text-gray-600">+20s</span>
                <span className="text-[10px] font-bold text-gray-400">
                  ({userState.isPremium ? '∞' : userState.lifelines.extraTime})
                </span>
              </button>

              {/* 50-50 lifeline */}
              <button
                onClick={handleTrigger5050}
                disabled={eliminatedOptions.length > 0}
                id="btn-quiz-lifeline-5050"
                className="flex items-center gap-1.5 bg-white border border-gray-200 py-1.5 px-3.5 rounded-full hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
              >
                <span className="text-[10px] font-bold tracking-tight bg-slate-800 text-white px-1.5 py-0.5 rounded">AD</span>
                <span className="text-xs font-bold text-gray-600">50-50</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1 flex flex-col max-w-md mx-auto w-full py-4"
          >
            {/* Title / Celebration */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="w-20 h-20 bg-brand-gold border-4 border-brand-gold-border rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Award className="w-10 h-10 text-amber-500" />
              </motion.div>
              <h1 className="font-display font-extrabold text-2xl text-gray-900">
                Quiz Completed!
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                You've successfully finished {category.bookName} quiz
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-brand-cream border border-orange-100 p-4 rounded-2xl text-center">
                <span className="text-xl">🎯</span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">Score</p>
                <p className="text-lg font-bold text-gray-800 mt-0.5">{calculatedScore}/{category.questions.length}</p>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl text-center">
                <span className="text-xl">🪙</span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">Coins</p>
                <p className="text-lg font-bold text-gray-800 mt-0.5">+{earnedCoins}</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-center">
                <span className="text-xl">🌟</span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">XP Earned</p>
                <p className="text-lg font-bold text-gray-800 mt-0.5">+{earnedXp}</p>
              </div>
            </div>

            {/* Answers breakdown review */}
            <div className="flex-1 space-y-4 mb-8 overflow-y-auto max-h-[300px] pr-1">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
                Scripture Review
              </h3>

              {category.questions.map((q, idx) => {
                const userAns = selections[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={q.id} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-xs font-bold text-gray-400 uppercase">
                        Q{idx + 1}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-gray-800 font-serif">
                      "{q.text}"
                    </p>

                    <div className="text-xs space-y-1 text-gray-600">
                      <p>
                        <span className="font-semibold text-gray-400">Your Answer: </span>
                        <span className={isCorrect ? 'text-emerald-600 font-semibold' : 'text-rose-500 font-semibold line-through'}>
                          {userAns || '[ Skiped ]'}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p>
                          <span className="font-semibold text-gray-400">Correct Answer: </span>
                          <span className="text-emerald-600 font-semibold">{q.correctAnswer}</span>
                        </p>
                      )}
                      <p className="mt-2 text-gray-400 bg-white border border-gray-100/50 p-2.5 rounded-xl text-[11px] leading-relaxed italic">
                        {q.explanation} <span className="font-semibold text-brand-terracotta">({q.bibleRef})</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Back Button */}
            <button
              onClick={onClose}
              id="btn-quiz-results-done"
              className="w-full bg-brand-terracotta hover:bg-brand-terracotta-hover text-white py-4 rounded-full font-display font-bold text-base shadow-lg shadow-brand-terracotta/20 transition-colors"
            >
              Continue to Dashboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
