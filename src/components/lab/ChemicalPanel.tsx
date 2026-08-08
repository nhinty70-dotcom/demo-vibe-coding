import React, { useState } from 'react';
import { Chemical, ChemicalCategory, Indicator } from '../../types/chemistry';
import { INDICATORS } from '../../data/indicators';
import { FlaskConical, Droplet, ShieldAlert, Sparkles, Info, Plus } from 'lucide-react';
import { playClickSound } from '../../services/audio';

interface ChemicalPanelProps {
  chemicals: Chemical[];
  selectedVesselId: string | null;
  onAddChemicalToVessel: (chemicalId: string, volumeMl: number) => void;
  onAddIndicatorToVessel: (indicatorId: string) => void;
}

export const ChemicalPanel: React.FC<ChemicalPanelProps> = ({
  chemicals,
  selectedVesselId,
  onAddChemicalToVessel,
  onAddIndicatorToVessel
}) => {
  const [activeTab, setActiveTab] = useState<ChemicalCategory | 'indicator'>('acid');
  const [selectedChemInfo, setSelectedChemInfo] = useState<Chemical | null>(null);

  const filterChemicals = (cat: ChemicalCategory) => {
    return chemicals.filter((c) => c.category === cat);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col h-full text-slate-800 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Hóa chất & Dung dịch</h3>
            <p className="text-[11px] text-slate-500">Chọn hoặc nhấn để thêm vào ống nghiệm</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-1 mt-3 bg-slate-50 p-1 rounded-xl border border-slate-200">
        <button
          onClick={() => {
            playClickSound();
            setActiveTab('acid');
          }}
          className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'acid'
              ? 'bg-red-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Axit
        </button>
        <button
          onClick={() => {
            playClickSound();
            setActiveTab('base');
          }}
          className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'base'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Bazơ
        </button>
        <button
          onClick={() => {
            playClickSound();
            setActiveTab('neutral');
          }}
          className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'neutral'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Khác
        </button>
        <button
          onClick={() => {
            playClickSound();
            setActiveTab('indicator');
          }}
          className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'indicator'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Chỉ thị
        </button>
      </div>

      {/* Content list */}
      <div className="flex-1 overflow-y-auto mt-3 pr-1 space-y-2 scrollbar-thin scrollbar-thumb-slate-200">
        {activeTab !== 'indicator' ? (
          filterChemicals(activeTab as ChemicalCategory).map((chem) => (
            <div
              key={chem.id}
              className="group relative bg-slate-50 border border-slate-200 hover:border-indigo-300 rounded-xl p-3 transition-all hover:shadow-xs cursor-pointer"
              onClick={() => setSelectedChemInfo(chem)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center border text-xs font-bold shadow-xs"
                    style={{
                      backgroundColor: chem.color,
                      borderColor: chem.category === 'acid' ? '#fca5a5' : chem.category === 'base' ? '#93c5fd' : '#a7f3d0'
                    }}
                  >
                    <Droplet className="w-4 h-4 text-slate-700 opacity-80" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {chem.name}
                    </h4>
                    <span className="text-[11px] font-mono text-indigo-600 font-semibold">
                      {chem.formula}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    chem.category === 'acid'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : chem.category === 'base'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  pH ~{chem.pH}
                </span>
              </div>

              {/* Add buttons */}
              <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-200/80">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedChemInfo(chem);
                  }}
                  className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center space-x-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Chi tiết</span>
                </button>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      onAddChemicalToVessel(chem.id, 10);
                    }}
                    className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center space-x-1 shadow-xs transition-all"
                  >
                    <Plus className="w-3 h-3" />
                    <span>+10ml</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      onAddChemicalToVessel(chem.id, 25);
                    }}
                    className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center space-x-1 transition-all"
                  >
                    <span>+25ml</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          INDICATORS.map((ind: Indicator) => (
            <div
              key={ind.id}
              className="bg-slate-50 border border-slate-200 hover:border-indigo-300 rounded-xl p-3 transition-all hover:shadow-xs"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{ind.name}</h4>
                    <span className="text-[10px] text-indigo-600 font-semibold capitalize">
                      Loại: {ind.type === 'paper' ? 'Giấy chỉ thị' : 'Dung dịch chỉ thị'}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                {ind.description}
              </p>

              <div className="mt-2.5 pt-2 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => {
                    playClickSound();
                    onAddIndicatorToVessel(ind.id);
                  }}
                  className="px-3 py-1 rounded-md text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center space-x-1 shadow-xs transition-all"
                >
                  <Plus className="w-3 h-3" />
                  <span>Sử dụng chỉ thị</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Info drawer modal for chemical details */}
      {selectedChemInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-5 text-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border"
                  style={{ backgroundColor: selectedChemInfo.color }}
                >
                  <Droplet className="w-4 h-4 text-slate-800" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">{selectedChemInfo.name}</h3>
                  <p className="text-xs font-mono text-indigo-600 font-bold">{selectedChemInfo.formula}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedChemInfo(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-medium">Nồng độ:</span>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedChemInfo.concentration}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-medium">pH giả định:</span>
                  <p className="font-bold text-indigo-600 mt-0.5">~{selectedChemInfo.pH}</p>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700">Mô tả đặc tính:</span>
                <p className="text-slate-600 mt-1 leading-relaxed">{selectedChemInfo.description}</p>
              </div>

              <div>
                <span className="font-bold text-slate-700">Ứng dụng thực tế:</span>
                <p className="text-slate-600 mt-1 leading-relaxed">{selectedChemInfo.commonUse}</p>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start space-x-2 text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Lưu ý an toàn:</span>
                  <p className="mt-0.5">{selectedChemInfo.safetyNotes}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedChemInfo(null)}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  onAddChemicalToVessel(selectedChemInfo.id, 20);
                  setSelectedChemInfo(null);
                }}
                className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md"
              >
                + Rót 20ml vào ống nghiệm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
