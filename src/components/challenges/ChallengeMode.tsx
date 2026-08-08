import React, { useState } from 'react';
import { CHALLENGE_LEVELS } from '../../data/challenges';
import { ChallengeLevel, UserProgress } from '../../types/chemistry';
import { getStoredProgress, saveProgress } from '../../services/storage';
import { Trophy, Award, CheckCircle2, HelpCircle, ArrowRight, Sparkles, Lock } from 'lucide-react';
import { playClickSound, playSuccessChime } from '../../services/audio';
import confetti from 'canvas-confetti';

export const ChallengeMode: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(getStoredProgress());
  const [selectedLevelId, setSelectedLevelId] = useState<number>(1);
  const [showHint, setShowHint] = useState<boolean>(false);

  const activeLevel = CHALLENGE_LEVELS.find((l) => l.id === selectedLevelId) || CHALLENGE_LEVELS[0];
  const isCompleted = progress.completedChallenges.includes(activeLevel.id);

  const handleCompleteLevel = (level: ChallengeLevel) => {
    if (isCompleted) return;

    playSuccessChime();
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });

    const updatedCompleted = [...progress.completedChallenges, level.id];
    const updatedBadges = [...progress.earnedBadges, level.badge];
    const updatedProgress: UserProgress = {
      ...progress,
      completedChallenges: updatedCompleted,
      earnedBadges: updatedBadges,
      totalScore: progress.totalScore + level.points
    };

    setProgress(updatedProgress);
    saveProgress(updatedProgress);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 animate-fade-in">
      {/* Title & Stats */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-200">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">🎯 Thử Thách STEM Hóa Học</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Vận dụng kiến thức Axit - Bazơ & Chỉ thị để vượt qua 5 cấp độ thử thách
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 block font-bold">Tổng điểm</span>
            <span className="text-base font-bold text-amber-600 font-mono">{progress.totalScore} PTS</span>
          </div>
          <div className="text-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 block font-bold">Huy hiệu</span>
            <span className="text-base font-bold text-indigo-700">{progress.earnedBadges.length}/5</span>
          </div>
        </div>
      </div>

      {/* Levels Timeline Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {CHALLENGE_LEVELS.map((lvl) => {
          const isDone = progress.completedChallenges.includes(lvl.id);
          const isSelected = selectedLevelId === lvl.id;

          return (
            <button
              key={lvl.id}
              onClick={() => {
                playClickSound();
                setSelectedLevelId(lvl.id);
                setShowHint(false);
              }}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-indigo-50 border-indigo-300 shadow-md scale-105'
                  : 'bg-white border-slate-200 hover:border-indigo-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600">LVL {lvl.id}</span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Sparkles className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <span className="text-xs font-bold text-slate-800 mt-2 block line-clamp-1">{lvl.title}</span>
              <span className="text-[10px] text-amber-700 font-bold mt-1 block">+{lvl.points} pts</span>
            </button>
          );
        })}
      </div>

      {/* Selected Level Interactive Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm space-y-6">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                Nhiệm vụ {activeLevel.id}
              </span>
              <h3 className="text-lg font-bold text-slate-900">{activeLevel.title}</h3>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{activeLevel.description}</p>
          </div>

          <div className="text-right">
            <span className="text-sm font-bold text-amber-600 block">{activeLevel.badge}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5 font-medium">Phần thưởng hoàn thành</span>
          </div>
        </div>

        {/* Objective Box */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <span className="text-xs font-bold text-indigo-700 block">🎯 Mục tiêu cần hoàn thành:</span>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">{activeLevel.objective}</p>
        </div>

        {/* Hint drawer */}
        <div>
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-amber-700 hover:text-amber-800 flex items-center space-x-1 font-bold"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>{showHint ? 'Ẩn gợi ý' : 'Xem gợi ý bài học'}</span>
          </button>

          {showHint && (
            <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 animate-fade-in font-medium">
              💡 <strong>GỢI Ý:</strong> {activeLevel.hint}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {isCompleted ? '🎉 Bạn đã xuất sắc hoàn thành thử thách này!' : 'Hãy thao tác tại Phòng Thí Nghiệm để hoàn thành'}
          </span>

          {!isCompleted ? (
            <button
              onClick={() => handleCompleteLevel(activeLevel)}
              className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center space-x-2 transition-all"
            >
              <Award className="w-4 h-4" />
              <span>Xác Nhận Hoàn Thành Thử Thách</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2 text-emerald-600 font-bold text-xs">
              <CheckCircle2 className="w-5 h-5" />
              <span>Đã Nhận Huy Hiệu {activeLevel.badge}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
