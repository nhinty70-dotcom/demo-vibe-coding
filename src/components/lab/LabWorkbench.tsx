import React, { useState } from 'react';
import { Vessel, Chemical, IndicatorType } from '../../types/chemistry';
import { INDICATORS, getPaperColorByPH, getLiquidIndicatorColorByPH, getExactPHColor } from '../../data/indicators';
import { DropperAnimation } from './DropperAnimation';
import { TestTube, GlassWater, Thermometer, RotateCcw, Droplets, Sparkles, AlertCircle, Trash2, ArrowRightLeft } from 'lucide-react';
import { playPourSound, playDropSound, playReactionFizzSound, playClickSound } from '../../services/audio';

interface LabWorkbenchProps {
  vessels: Vessel[];
  chemicals: Chemical[];
  selectedVesselId: string | null;
  onSelectVessel: (id: string) => void;
  onAddChemicalToVessel: (vesselId: string, chemicalId: string, volumeMl: number) => void;
  onAddIndicatorToVessel: (vesselId: string, indicatorId: IndicatorType) => void;
  onDipPaperStrip: (vesselId: string, indicatorId: IndicatorType) => void;
  onMixVessels: (sourceVesselId: string, targetVesselId: string) => void;
  onEmptyVessel: (vesselId: string) => void;
  onOpenObservationModal: (vesselId: string) => void;
  activeTool: 'dropper' | 'strip' | 'thermometer' | 'stirrer' | 'select';
}

export const LabWorkbench: React.FC<LabWorkbenchProps> = ({
  vessels,
  chemicals,
  selectedVesselId,
  onSelectVessel,
  onAddChemicalToVessel,
  onAddIndicatorToVessel,
  onDipPaperStrip,
  onMixVessels,
  onEmptyVessel,
  onOpenObservationModal,
  activeTool
}) => {
  const [droppingVesselId, setDroppingVesselId] = useState<string | null>(null);
  const [activePaperType, setActivePaperType] = useState<IndicatorType>('litmus_purple');
  const [mixSourceId, setMixSourceId] = useState<string | null>(null);

  const getChemicalName = (chemId: string) => {
    return chemicals.find((c) => c.id === chemId)?.name || chemId;
  };

  const handleDipStrip = (vesselId: string) => {
    playDropSound();
    onDipPaperStrip(vesselId, activePaperType);
    onOpenObservationModal(vesselId);
  };

  const handleAddIndicator = (vesselId: string, indType: IndicatorType) => {
    setDroppingVesselId(vesselId);
    playDropSound();
    setTimeout(() => {
      onAddIndicatorToVessel(vesselId, indType);
      setDroppingVesselId(null);
      onOpenObservationModal(vesselId);
    }, 600);
  };

  const handleMixClick = (vesselId: string) => {
    if (!mixSourceId) {
      setMixSourceId(vesselId);
    } else if (mixSourceId === vesselId) {
      setMixSourceId(null);
    } else {
      playPourSound();
      playReactionFizzSound();
      onMixVessels(mixSourceId, vesselId);
      setMixSourceId(null);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 flex flex-col h-full shadow-sm relative overflow-hidden">
      {/* Background lab aesthetics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Bench Header / Toolbar */}
      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-100 gap-2 z-10">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
            <span>Bàn Thí Nghiệm Hóa Học Ảo</span>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
              {vessels.length} Dụng cụ trên giá
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Chạm chọn ống nghiệm để rót hóa chất, nhúng giấy quỳ hoặc nhỏ dung dịch chỉ thị
          </p>
        </div>

        {/* Paper indicator selector strip */}
        <div className="flex items-center space-x-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
          <span className="text-[11px] text-slate-500 px-2 font-bold">Giấy thử:</span>
          {(['litmus_purple', 'litmus_red', 'litmus_blue', 'ph_paper'] as IndicatorType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                playClickSound();
                setActivePaperType(type);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                activePaperType === type
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {type === 'litmus_purple' ? 'Quỳ tím' : type === 'litmus_red' ? 'Quỳ đỏ' : type === 'litmus_blue' ? 'Quỳ xanh' : 'Giấy pH'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Bench Grid / Rack Area */}
      <div className="flex-1 my-6 flex items-end justify-center min-h-[320px] relative z-10 px-2">
        {/* Lab Rack Surface */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-slate-200 to-slate-100 border-t-2 border-slate-300 rounded-b-2xl flex items-center justify-around px-4 shadow-inner">
          <div className="w-full h-1 bg-slate-300 rounded-full" />
        </div>

        {/* Vessel Rack Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 w-full max-w-5xl items-end pb-8">
          {vessels.map((vessel) => {
            const isSelected = selectedVesselId === vessel.id;
            const isMixSource = mixSourceId === vessel.id;
            const fillPercentage = Math.min(100, Math.max(0, (vessel.contents.volumeMl / vessel.capacityMl) * 100));

            return (
              <div
                key={vessel.id}
                onClick={() => onSelectVessel(vessel.id)}
                className={`relative flex flex-col items-center group cursor-pointer transition-all ${
                  isSelected ? 'scale-105' : 'hover:scale-102'
                }`}
              >
                {/* Selection / Mixing Glow ring */}
                {isSelected && (
                  <div className="absolute -inset-2 rounded-2xl bg-indigo-500/15 border-2 border-indigo-600 animate-pulse pointer-events-none" />
                )}
                {isMixSource && (
                  <div className="absolute -inset-2 rounded-2xl bg-amber-500/15 border-2 border-amber-500 animate-ping pointer-events-none" />
                )}

                {/* Dropper Animation */}
                <DropperAnimation
                  color={vessel.contents.color}
                  isDropping={droppingVesselId === vessel.id}
                />

                {/* Dipped Litmus Paper Strip Graphic */}
                {vessel.contents.paperStripDip && (
                  <div className="absolute -top-10 z-20 flex flex-col items-center animate-bounce">
                    <div
                      className="w-3 h-16 rounded-t-sm shadow-md border border-slate-300 transition-colors duration-500"
                      style={{ backgroundColor: vessel.contents.paperStripDip.resultColor }}
                    />
                    <span className="text-[9px] bg-white text-indigo-700 font-bold px-1 rounded border border-indigo-200 shadow-xs mt-1">
                      Đã nhúng
                    </span>
                  </div>
                )}

                {/* Thermometer Gauge Graphic */}
                {activeTool === 'thermometer' && vessel.contents.volumeMl > 0 && (
                  <div className="absolute -top-12 z-20 bg-white border border-amber-200 text-amber-800 px-2 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center space-x-1 shadow-md">
                    <Thermometer className="w-3 h-3 text-amber-600" />
                    <span>{vessel.contents.temperatureC.toFixed(1)}°C</span>
                  </div>
                )}

                {/* Vessel Graphic (Test Tube or Beaker) */}
                <div
                  className={`relative overflow-hidden bg-slate-100/80 border-2 border-slate-300 shadow-md backdrop-blur-xs transition-all ${
                    vessel.type === 'test_tube'
                      ? 'w-12 h-44 rounded-b-full rounded-t-sm'
                      : 'w-20 h-40 rounded-b-xl rounded-t-sm'
                  }`}
                >
                  {/* Glass measurement markings */}
                  <div className="absolute left-1 top-4 bottom-4 flex flex-col justify-between opacity-50 pointer-events-none">
                    <div className="w-2 h-0.5 bg-slate-400" />
                    <div className="w-1.5 h-0.5 bg-slate-400" />
                    <div className="w-2 h-0.5 bg-slate-400" />
                    <div className="w-1.5 h-0.5 bg-slate-400" />
                    <div className="w-2 h-0.5 bg-slate-400" />
                  </div>

                  {/* Liquid Fill Element */}
                  <div
                    className="absolute bottom-0 inset-x-0 transition-all duration-700 ease-out flex flex-col justify-start"
                    style={{
                      height: `${fillPercentage}%`,
                      backgroundColor: vessel.contents.color
                    }}
                  >
                    {/* Liquid Meniscus & Bubbles */}
                    <div className="w-full h-2 bg-white/40 border-t border-white/60 shadow-xs" />

                    {/* Fizzing bubbles if neutralised */}
                    {vessel.contents.hasReacted && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-2 h-2 rounded-full bg-white/60 animate-ping" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Vessel Label & Volume */}
                <div className="mt-2 text-center">
                  <span className="text-xs font-bold text-slate-800 block">
                    {vessel.name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono block">
                    {vessel.contents.volumeMl}ml / {vessel.capacityMl}ml
                  </span>

                  {/* Reaction tag if present */}
                  {vessel.contents.reactionMessage && (
                    <span className="text-[9px] bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200 mt-1 inline-block font-bold animate-pulse">
                      {vessel.contents.reactionMessage}
                    </span>
                  )}
                </div>

                {/* Individual Action Floating Toolbar for Selected Vessel */}
                {isSelected && (
                  <div className="absolute -bottom-16 z-30 bg-white border border-slate-200 rounded-xl p-1.5 flex items-center space-x-1 shadow-2xl animate-fade-in">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDipStrip(vessel.id);
                      }}
                      title="Nhúng giấy quỳ / pH vào ống nghiệm"
                      className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center space-x-1 shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Nhúng giấy</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddIndicator(vessel.id, 'phenolphthalein');
                      }}
                      title="Nhỏ 3 giọt Phenolphthalein"
                      className="p-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs shadow-xs"
                    >
                      <Droplets className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMixClick(vessel.id);
                      }}
                      title="Trộn dung dịch này với dụng cụ khác"
                      className={`p-1.5 rounded-lg text-xs flex items-center ${
                        mixSourceId === vessel.id
                          ? 'bg-amber-500 text-white font-bold'
                          : 'bg-slate-100 hover:bg-slate-200 text-amber-700 border border-slate-200'
                      }`}
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playClickSound();
                        onEmptyVessel(vessel.id);
                      }}
                      title="Đổ bỏ dung dịch"
                      className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs border border-rose-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mixing helper message */}
      {mixSourceId && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2 rounded-xl text-xs flex items-center justify-between z-10 animate-pulse font-medium">
          <div className="flex items-center space-x-2">
            <ArrowRightLeft className="w-4 h-4 text-amber-600" />
            <span>
              Đã chọn dung dịch nguồn. Vui lòng chạm vào <strong>dụng cụ nhận</strong> để tiến hành hòa trộn!
            </span>
          </div>
          <button
            onClick={() => setMixSourceId(null)}
            className="text-amber-700 hover:text-amber-900 font-bold ml-2 underline"
          >
            Hủy
          </button>
        </div>
      )}
    </div>
  );
};
