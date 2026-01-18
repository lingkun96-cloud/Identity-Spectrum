import React, { useState } from 'react';
import { AppStatus, QuizState, IdentityResult } from './types';
import { QUIZ_QUESTIONS } from './constants';
import { analyzeIdentity } from './services/geminiService';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.WELCOME);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    isComplete: false,
  });
  const [result, setResult] = useState<IdentityResult | null>(null);

  const startQuiz = () => {
    setStatus(AppStatus.QUIZ);
    setQuizState({
      currentQuestionIndex: 0,
      answers: {},
      isComplete: false,
    });
  };

  const handleAnswer = async (questionId: number, value: string) => {
    const nextAnswers = { ...quizState.answers, [questionId]: value };
    
    if (quizState.currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizState({
        ...quizState,
        answers: nextAnswers,
        currentQuestionIndex: quizState.currentQuestionIndex + 1,
      });
    } else {
      // Quiz finished
      setQuizState({ ...quizState, answers: nextAnswers, isComplete: true });
      setStatus(AppStatus.ANALYZING);
      
      // Call API
      const analysis = await analyzeIdentity(nextAnswers);
      setResult(analysis);
      setStatus(AppStatus.RESULT);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-800 font-sans selection:bg-indigo-100">
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white">
              <Sparkles size={18} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">身份光谱</span>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4 flex flex-col items-center min-h-screen justify-center">
        
        {status === AppStatus.WELCOME && (
          <div className="max-w-3xl text-center animate-fade-in-up">
            <div className="inline-block mb-6 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold tracking-wide">
              发现您的专属色彩
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
              探索您的 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">身份认同</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              通过我们尊重且互动的探索工具，了解您的恋爱偏好、浪漫情感和性取向。
            </p>
            <button 
              onClick={startQuiz}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-slate-900 rounded-full hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              开始探索
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50">
               {/* Decorative mini flags using CSS gradients */}
               <div className="h-2 w-full rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>
               <div className="h-2 w-full rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
               <div className="h-2 w-full rounded-full bg-gradient-to-r from-cyan-400 via-pink-400 to-white"></div>
               <div className="h-2 w-full rounded-full bg-gradient-to-r from-yellow-400 via-white to-purple-800"></div>
            </div>
          </div>
        )}

        {status === AppStatus.QUIZ && (
          <Quiz
            question={QUIZ_QUESTIONS[quizState.currentQuestionIndex]}
            totalQuestions={QUIZ_QUESTIONS.length}
            currentIndex={quizState.currentQuestionIndex}
            onAnswer={handleAnswer}
          />
        )}

        {status === AppStatus.ANALYZING && (
          <div className="text-center animate-pulse">
            <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">正在分析您的回答...</h2>
            <p className="text-slate-500">寻找可能与您产生共鸣的旗帜。</p>
          </div>
        )}

        {status === AppStatus.RESULT && result && (
          <Result result={result} onRestart={startQuiz} />
        )}

      </main>

      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} 身份光谱 (Identity Spectrum). 此工具提供参考建议，而非专业诊断。</p>
      </footer>
    </div>
  );
};

export default App;