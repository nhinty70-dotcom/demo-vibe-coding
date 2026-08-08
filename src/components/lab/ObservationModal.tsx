import React, { useState } from 'react';
import { VesselContents } from '../../types/chemistry';
import { getPHCategoryLabel } from '../../data/indicators';
import { Sparkles, HelpCircle, CheckCircle, Send } from 'lucide-react';
import { playSuccessChime } from '../../services/audio';

interface ObservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  vesselName: string;
  contents: VesselContents;
  chemicalNames: string[];
  indicatorName: string;
  onSaveToJournal: (observationText: string, prediction: string, conclusion: string) => void;
}

export const ObservationModal: React.FC<ObservationModalProps> = ({
  isOpen,
  onClose,
  vesselName,
  contents,
  chemicalNames,
  indicatorName,
  onSaveToJournal
}) => {
  const [observationText, setObservationText] = useState('');
  const [prediction, setPrediction] = useState<'acid' | 'base' | 'neutral' | ''>('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const actualCategory = contents.currentPH < 6.5 ? 'acid' : contents.currentPH > 7.5 ? 'base' : 'neutral';
  const categoryInfo = getPHCategoryLabel(contents.currentPH);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prediction) return;

    setSubmitted(true);
    playSuccessChime();

    const predLabel = prediction === 'acid' ? 'Môi trường Axit' : prediction === 'base' ? 'Môi trường Bazơ' : 'Môi trường Trung tính';
    const conclusion = `pH ≈ ${contents.currentPH.toFixed(1)} → ${categoryInfo.text}. ${categoryInfo.description}`;

    onSaveToJournal(observationText || 'Thấy hiện tượng đổi màu đặc trưng', predLabel, conclusion);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 text-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Ghi Nhận Quan Sát Thí Nghiệm</h3>
            <p className="text-xs text-slate-500">{vesselName} • {indicatorName}</p>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Visual indicator color display */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Dung dịch / Chỉ thị sử dụng:</span>
                <span className="text-xs font-bold text-indigo-700">
                  {chemicalNames.join(' + ') || 'Mẫu thử'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500 font-medium">Màu sắc:</span>
                <div
                  className="w-6 h-6 rounded-full border border-slate-300 shadow-xs"
                  style={{ backgroundColor: contents.color }}
                />
              </div>
            </div>

            {/* Question 1: What did you observe? */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                1. Em quan sát thấy hiện tượng gì?
              </label>
              <textarea
                value={observationText}
                onChange={(e) => setObservationText(e.target.value)}
                placeholder="Ví dụ: Giấy quỳ chuyển sang màu đỏ rõ rệt; Dung dịch xuất hiện màu hồng..."
                className="w-full h-20 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 transition-all resize-none"
              />
            </div>

            {/* Question 2: Your prediction */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                2. Dựa vào hiện tượng trên, em dự đoán đây là môi trường gì?
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPrediction('acid')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    prediction === 'acid'
                      ? 'bg-red-500 text-white border-red-500 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  🔴 Axit
                </button>
                <button
                  type="button"
                  onClick={() => setPrediction('neutral')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    prediction === 'neutral'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  🟢 Trung tính
                </button>
                <button
                  type="button"
                  onClick={() => setPrediction('base')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    prediction === 'base'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  🔵 Bazơ
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold"
              >
                Bỏ qua
              </button>
              <button
                type="submit"
                disabled={!prediction}
                className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center space-x-1.5 disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi Dự Đoán & Lưu Nhật Ký</span>
              </button>
            </div>
          </form>
        ) : (
          /* Result & Explanation feedback */
          <div className="mt-4 space-y-4 animate-fade-in">
            <div
              className={`p-4 rounded-xl border flex items-start space-x-3 ${
                prediction === actualCategory
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              {prediction === actualCategory ? (
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <HelpCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-bold text-sm">
                  {prediction === actualCategory
                    ? '🎉 Dự đoán của em rất chính xác!'
                    : '🟡 Hãy quan sát kỹ lại hiện tượng đổi màu'}
                </h4>
                <p className="text-xs mt-1 leading-relaxed">
                  Dung dịch thử nghiệm có <strong>pH ≈ {contents.currentPH.toFixed(1)}</strong> thuộc nhóm{' '}
                  <span className="font-bold underline">{categoryInfo.text}</span>.
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <span className="text-slate-500 font-bold block">Giải thích lý thuyết:</span>
              <p className="text-slate-700 leading-relaxed">{categoryInfo.description}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md"
              >
                Hoàn Thành & Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
