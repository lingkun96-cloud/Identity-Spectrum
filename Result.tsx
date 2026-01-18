import React, { useState } from 'react';
import { IdentityResult, FlagOrientation } from '../types';
import FlagDisplay from './FlagDisplay';
import { RefreshCw, Heart, BookOpen, RotateCw, LayoutGrid, Circle, ExternalLink } from 'lucide-react';

interface ResultProps {
  result: IdentityResult;
  onRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ result, onRestart }) => {
  const [orientation, setOrientation] = useState<FlagOrientation>('horizontal');

  // Button helper
  const ControlButton = ({ mode, icon: Icon, title }: { mode: FlagOrientation, icon: any, title: string }) => (
    <button 
      onClick={() => setOrientation(mode)}
      className={`p-2.5 rounded-full transition-all duration-200 ${orientation === mode ? 'bg-indigo-600 text-white shadow-md scale-110' : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'}`}
      title={title}
    >
      <Icon className="w-5 h-5" />
    </button>
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-sm font-bold tracking-wide text-indigo-500 uppercase mb-2">
          您的光谱分析
        </h2>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          {result.identityName}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {result.shortDescription}
        </p>
      </div>

      {/* Flag Section with Controls */}
      <div className="flex flex-col items-center mb-12 space-y-8">
        <FlagDisplay colors={result.flagColors} identityName={result.identityName} orientation={orientation} />
        
        {/* Orientation Controls */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-full border border-gray-200 shadow-sm">
          <ControlButton mode="horizontal" icon={(props: any) => <LayoutGrid {...props} className="w-5 h-5 rotate-90" />} title="Horizontal Stripes" />
          <ControlButton mode="vertical" icon={LayoutGrid} title="Vertical Stripes" />
          <ControlButton mode="diagonal" icon={RotateCw} title="Diagonal Stripes" />
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          <ControlButton mode="circular" icon={Circle} title="Circular Shape" />
          <ControlButton mode="heart" icon={Heart} title="Heart Shape" />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Analysis Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 text-indigo-500 mr-2" />
            <h3 className="text-xl font-bold text-gray-900">详细分析</h3>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
            {result.detailedExplanation}
          </p>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">相关身份标签：</h4>
            <div className="flex flex-wrap gap-2">
              {result.relatedIdentities.map((item, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 h-full">
          {/* Affirmation Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100 flex flex-col justify-center">
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-pink-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">寄语</h3>
            </div>
            <blockquote className="text-2xl font-medium text-indigo-900 italic mb-6">
              "{result.affirmation}"
            </blockquote>
            <p className="text-sm text-gray-500">
              请记住，标签是了解自己的工具，而不是限制您的牢笼。随着您的成长，您可以自由地改变它们。
            </p>
          </div>

          {/* Resources Section (New) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <ExternalLink className="w-5 h-5 mr-2 text-indigo-500" />
              相关资源与支持
            </h3>
            <ul className="space-y-3">
              {result.resources && result.resources.length > 0 ? (
                result.resources.map((res, idx) => (
                  <li key={idx} className="group">
                    <a 
                      href={res.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-indigo-600 group-hover:underline">{res.title}</span>
                        <ExternalLink className="w-3 h-3 text-gray-400 mt-1" />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{res.description}</p>
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-sm italic">暂无具体资源推荐。建议搜索当地LGBTQ+组织。</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Restart Action */}
      <div className="text-center">
        <button
          onClick={onRestart}
          className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          重新开始
        </button>
      </div>

    </div>
  );
};

export default Result;