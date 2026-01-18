import React from 'react';
import { Question } from '../types';
import { ChevronRight } from 'lucide-react';

interface QuizProps {
  question: Question;
  totalQuestions: number;
  currentIndex: number;
  onAnswer: (questionId: number, value: string) => void;
}

const Quiz: React.FC<QuizProps> = ({ question, totalQuestions, currentIndex, onAnswer }) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-100">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-8 md:p-12">
        <div className="mb-8">
          <span className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
            问题 {currentIndex + 1} / {totalQuestions}
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            {question.text}
          </h2>
        </div>

        <div className="space-y-4">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onAnswer(question.id, option.value)}
              className="w-full group flex items-center justify-between p-5 text-left bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 rounded-xl transition-all duration-200"
            >
              <span className="text-lg font-medium text-gray-700 group-hover:text-indigo-900">
                {option.label}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;