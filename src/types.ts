export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  bibleRef: string;
  explanation: string;
}

export interface QuizCategory {
  id: string;
  title: string;
  subtitle: string;
  bookName: string;
  durationMins: number;
  questions: Question[];
  imageType: 'deuteronomy' | 'zephaniah' | 'genesis' | 'matthew' | 'exodus';
}

export interface FriendScore {
  id: string;
  name: string;
  xp: number;
  coins: number;
  streaks: number;
  rank: number;
  isCurrentUser?: boolean;
}

export interface UserState {
  username: string;
  streaks: number;
  coins: number;
  xpEarned: number;
  isPremium: boolean;
  lifelines: {
    hints: number;
    extraTime: number;
    multiplier: number;
  };
  quizProgress: {
    [categoryId: string]: {
      startedDate: string;
      currentQuestionIndex: number;
      completed: boolean;
      score: number; // number of correct answers
      answers: { [questionId: string]: string }; // user selections
    };
  };
}
