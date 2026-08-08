import React, { useState } from 'react';
import { MysterySolution } from '../../types/chemistry';
import { getStoredMysteries, saveMysteries, getStoredProgress, saveProgress } from '../../services/storage';
import { getPaperColorByPH, getPHCategoryLabel } from '../../data/indicators';
import { HelpCircle, CheckCircle2, Sparkles, Trophy, RotateCcw, Droplets } from 'lucide-react';
import { playClickSound, playSuccessChime } from '../../services/audio';
import confetti from 'canvas-confetti';

export const MysterySolutions: React.FC = () => {
  const [mysteries, setMysteries] = useState<MysterySolution[]>(getStoredMysteries());
  const [selectedId, setSelectedId] = useState<string>('A');
  const [activeTestIndicator, setActiveTestIndicator] = useState<'litmus_purple' | 'phenolphthalein' | 'ph_paper'>('litmus_purple');
  const [testResult, setTestResult] = useState<{ color: string; ph: number } | null>(null);

  const currentSample = mysteries.find((m) => m.id === selectedId) || mysteries[0];

  const handleRunTest = () => {
    playClickSound();
    let color = '#8b5cf6';
    if (activeTestIndicator === 'litmus_purple' || activeTestIndicator === 'ph_paper') {
      color = getPaperColorByPH(activeTestIndicator, currentSample.pH);
    } else {
      color = currentSample.pH > 8.2 ? '#ec4899' : '#f8fafc';
    }
    setTestResult({ color, ph: currentSample.pH });
  };

  const handleGuess = (userGuess: 'acid' | 'base' | 'neutral') => {
    playClickSound();
    const updated = mysteries.map((m) => {
      if (m.id === selectedId) {
        return { ...m, userGuess, revealed: true };
      }
      return m;
    });

    setMysteries(updated);
    saveMysteries(updated);

    if (userGuess === currentSample.category) {
      playSuccessChime();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });

      const progress = getStoredProgress();
      progress.totalScore += 50;
      progress.mysterySolvedCount += 1;
      saveProgress(progress);
    }
  };

  const handleResetMysteries = () => {
    const resetList = mysteries.map((m) => ({ ...m, revealed: false, userGuess: undefined }));
    setMysteries(resetList);
    saveMysteries(resetList);
    setTestResult(null);
  };

  const categoryInfo = getPHCategoryLabel(currentSample.pH);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6 animate-fade-in">
      {/* Title */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">🧪 Thử Thách Dung Dịch Bí Ẩn</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sử dụng chất chỉ thị để xác định bản chất (Axit, Bazơ hay Trung tính) của các mẫu thử chưa biết tên
            </p>
          </div>
        </div>

        <button
          onClick={handleResetMysteries}
          className="flex items-center space-x-1 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-indigo-600" />
          <span>Làm mới mẫu thử</span>
        </button>
      </div>

      {/* Mystery Samples Selection Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {mysteries.map((sample) => {
          const isSelected = selectedId === sample.id;
          return (
            <button
              key={sample.id}
              onClick={() => {
                playClickSound();
                setSelectedId(sample.id);
                setTestResult(null);
              }}
              className={`p-4 rounded-2xl border text-center transition-all ${
                isSelected
                  ? 'bg-indigo-50 border-indigo-300 shadow-md scale-105'
                  : 'bg-white border-slate-200 hover:border-indigo-200'
              }`}
            >
              <div className="w-12 h-16 mx-auto bg-slate-50 border border-slate-200 rounded-b-xl rounded-t-sm flex items-center justify-center relative shadow-xs">
                <span className="text-sm font-bold text-indigo-600 font-mono">{sample.id}</span>
                {sample.revealed && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                )}
              </div>
              <span className="text-xs font-bold text-slate-800 mt-2 block">{sample.codeName}</span>
              <span className="text-[10px] font-bold text-slate-500 block mt-0.5">
                {sample.revealed ? `KẾT QUẢ: ${sample.category.toUpperCase()}` : 'Chưa thử nghiệm'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Sample Lab Testing Panel */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Indicator Selection & Test Button */}
        <div className="md:col-span-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>1. Chọn chất chỉ thị cho Mẫu {currentSample.id}</span>
          </h3>

          <div className="space-y-2">
            {[
              { id: 'litmus_purple', label: 'Giấy quỳ tím', desc: 'Đổi ĐỎ trong Axit, đổi XANH trong Bazơ' },
              { id: 'phenolphthalein', label: 'Dung dịch Phenolphthalein', desc: 'Chỉ hóa HỒNG trong Bazơ' },
              { id: 'ph_paper', label: 'Giấy chỉ thị pH vạn năng', desc: 'Cho biết dải màu pH chính xác' }
            ].map((ind) => (
              <button
                key={ind.id}
                onClick={() => {
                  playClickSound();
                  setActiveTestIndicator(ind.id as any);
                  setTestResult(null);
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  activeTestIndicator === ind.id
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="font-bold text-xs block text-slate-800">{ind.label}</span>
                <span className="text-[11px] text-slate-500 font-medium">{ind.desc}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleRunTest}
            className="w-full py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-all"
          >
            <Droplets className="w-4 h-4" />
            <span>Thực Hiện Thử Nghiệm Ngay</span>
          </button>
        </div>

        {/* Right: Observation & Guessing */}
        <div className="md:col-span-6 space-y-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-800 mb-2">2. Kết Quả Quan Sát & Dự Đoán</h3>

            {testResult ? (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 animate-fade-in">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-10 h-10 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center"
                    style={{ backgroundColor: testResult.color }}
                  >
                    <Sparkles className="w-5 h-5 text-slate-800" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">Màu chỉ thị xuất hiện:</span>
                    <span className="text-xs font-bold text-indigo-700">
                      {activeTestIndicator === 'phenolphthalein'
                        ? currentSample.pH > 8.2
                          ? 'Dung dịch hóa HỒNG RỰC RỠ'
                          : 'Dung dịch KHÔNG ĐỔI MÀU'
                        : currentSample.pH < 6.5
                        ? 'Chuyển sang màu ĐỎ'
                        : currentSample.pH > 7.5
                        ? 'Chuyển sang màu XANH'
                        : 'Giữ màu TÍM trung tính'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-500 font-medium">
                Nhấn "Thực Hiện Thử Nghiệm" ở bên trái để quan sát hiện tượng đổi màu
              </div>
            )}
          </div>

          {/* Prediction choices or revealed answer */}
          {!currentSample.revealed ? (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-700 block">Em đưa ra kết luận cho Mẫu {currentSample.id}:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleGuess('acid')}
                  className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold"
                >
                  🔴 Axit
                </button>
                <button
                  onClick={() => handleGuess('neutral')}
                  className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold"
                >
                  🟢 Trung tính
                </button>
                <button
                  onClick={() => handleGuess('base')}
                  className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold"
                >
                  🔵 Bazơ
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-2 animate-fade-in">
              <div className="flex items-center space-x-2 text-emerald-900 font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Đã Giải Mã Mẫu {currentSample.id}: {currentSample.category.toUpperCase()}</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Chỉ số pH xấp xỉ {currentSample.pH}. {categoryInfo.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
