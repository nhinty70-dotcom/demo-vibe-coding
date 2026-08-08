import React, { useState } from 'react';
import { PH_SCALE_ITEMS, RealWorldSubstance } from '../../data/phScaleData';
import { getExactPHColor, getPHCategoryLabel } from '../../data/indicators';
import { Sparkles, Info, HelpCircle } from 'lucide-react';
import { playClickSound } from '../../services/audio';

export const InteractivePHScale: React.FC = () => {
  const [selectedPH, setSelectedPH] = useState<number>(7);

  const matchedSubstance = PH_SCALE_ITEMS.find((item) => item.ph === selectedPH) || PH_SCALE_ITEMS[7];
  const categoryInfo = getPHCategoryLabel(selectedPH);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 animate-fade-in">
      {/* Title & Introduction */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Thang pH Tương Tác Trực Quan (0 → 14)</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Khám phá mối liên hệ giữa chỉ số pH, màu sắc chỉ thị và bản chất Axit - Bazơ của các chất thực tế
            </p>
          </div>
        </div>

        {/* Interactive Slider */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>🔴 Axit Mạnh (pH 0)</span>
            <span className="text-base text-indigo-700 font-bold bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100">
              Chỉ số pH = {selectedPH}
            </span>
            <span>🟣 Bazơ Mạnh (pH 14)</span>
          </div>

          {/* Color Gradient Track */}
          <div className="relative pt-2">
            <input
              type="range"
              min="0"
              max="14"
              step="1"
              value={selectedPH}
              onChange={(e) => {
                playClickSound();
                setSelectedPH(parseInt(e.target.value, 10));
              }}
              className="w-full h-4 rounded-lg appearance-none cursor-pointer focus:outline-none shadow-xs"
              style={{
                background:
                  'linear-gradient(to right, #dc2626, #ea580c, #f97316, #fb923c, #facc15, #84cc16, #22c55e, #10b981, #06b6d4, #0284c7, #2563eb, #4f46e5, #7c3aed, #581c87)'
              }}
            />

            {/* Scale Numbers Grid */}
            <div className="grid grid-cols-15 gap-0 text-center mt-2">
              {Array.from({ length: 15 }).map((_, ph) => (
                <button
                  key={ph}
                  onClick={() => {
                    playClickSound();
                    setSelectedPH(ph);
                  }}
                  className={`text-xs font-bold py-1 rounded transition-all ${
                    selectedPH === ph
                      ? 'bg-indigo-600 text-white shadow-xs scale-110'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {ph}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Node Details Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Selected Item Showcase */}
        <div className="md:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{matchedSubstance.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{matchedSubstance.name}</h3>
                  {matchedSubstance.formula && (
                    <span className="text-xs font-mono text-indigo-600 font-bold">
                      Công thức: {matchedSubstance.formula}
                    </span>
                  )}
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${categoryInfo.badgeColor}`}>
                {categoryInfo.text}
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-4 leading-relaxed">
              {matchedSubstance.description}
            </p>
          </div>

          {/* Color Indicator Color preview box */}
          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="text-xs text-slate-500 font-bold block">Phản ứng với các chất chỉ thị:</span>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-white rounded-lg flex items-center justify-between border border-slate-200 shadow-xs">
                <span className="text-slate-500 font-medium">Giấy quỳ tím:</span>
                <span className="font-bold" style={{ color: getExactPHColor(selectedPH) }}>
                  {selectedPH < 6.5 ? '🔴 Đổi thành Đỏ' : selectedPH > 7.5 ? '🔵 Đổi thành Xanh' : '🟣 Giữ màu Tím'}
                </span>
              </div>

              <div className="p-2.5 bg-white rounded-lg flex items-center justify-between border border-slate-200 shadow-xs">
                <span className="text-slate-500 font-medium">Phenolphthalein:</span>
                <span className="font-bold text-slate-800">
                  {selectedPH > 8.2 ? '💖 Hóa Hồng Tím' : '⚪ Không đổi màu'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick reference grid of all 15 pH items */}
        <div className="md:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm">
          <h3 className="font-bold text-sm text-slate-800 mb-3 flex items-center space-x-2">
            <Info className="w-4 h-4 text-indigo-600" />
            <span>Danh mục các dung dịch trong thực tế theo thang pH</span>
          </h3>

          <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
            {PH_SCALE_ITEMS.map((item) => (
              <button
                key={item.ph}
                onClick={() => {
                  playClickSound();
                  setSelectedPH(item.ph);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition-all ${
                  selectedPH === item.ph
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-bold shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-base">{item.icon}</span>
                  <span className="line-clamp-1">{item.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full border border-slate-300"
                    style={{ backgroundColor: item.colorHex }}
                  />
                  <span className="font-mono text-indigo-600 font-bold">pH {item.ph}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
