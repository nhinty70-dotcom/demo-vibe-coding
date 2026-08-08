import React from 'react';
import { TestTube, GlassWater, Pipette, Thermometer, Sparkles, Trash2, RotateCcw } from 'lucide-react';
import { playClickSound } from '../../services/audio';

interface EquipmentPanelProps {
  vesselCount: number;
  onAddVessel: (type: 'test_tube' | 'beaker') => void;
  onClearAllVessels: () => void;
  activeTool: 'dropper' | 'strip' | 'thermometer' | 'stirrer' | 'select';
  onSelectTool: (tool: 'dropper' | 'strip' | 'thermometer' | 'stirrer' | 'select') => void;
}

export const EquipmentPanel: React.FC<EquipmentPanelProps> = ({
  vesselCount,
  onAddVessel,
  onClearAllVessels,
  activeTool,
  onSelectTool
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col h-full text-slate-800 shadow-sm">
      <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
          <TestTube className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Dụng Cụ Thí Nghiệm</h3>
          <p className="text-[11px] text-slate-500">Chọn dụng cụ thao tác</p>
        </div>
      </div>

      <div className="mt-3 space-y-3">
        {/* Add Vessels */}
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thêm vật chứa</span>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={() => {
                playClickSound();
                onAddVessel('test_tube');
              }}
              disabled={vesselCount >= 6}
              className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-slate-100 transition-all text-xs font-bold text-slate-700 disabled:opacity-40"
            >
              <TestTube className="w-4 h-4 text-indigo-600" />
              <span>+ Ống nghiệm</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                onAddVessel('beaker');
              }}
              disabled={vesselCount >= 6}
              className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-slate-100 transition-all text-xs font-bold text-slate-700 disabled:opacity-40"
            >
              <GlassWater className="w-4 h-4 text-blue-600" />
              <span>+ Cốc thủy tinh</span>
            </button>
          </div>
        </div>

        {/* Interactive Tools */}
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Công cụ hỗ trợ</span>
          <div className="space-y-1.5 mt-2">
            <button
              onClick={() => {
                playClickSound();
                onSelectTool('dropper');
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all ${
                activeTool === 'dropper'
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Pipette className="w-4 h-4 text-indigo-600" />
                <span>Ống nhỏ giọt (Pipette)</span>
              </div>
              {activeTool === 'dropper' && <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full">Đang chọn</span>}
            </button>

            <button
              onClick={() => {
                playClickSound();
                onSelectTool('thermometer');
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all ${
                activeTool === 'thermometer'
                  ? 'bg-amber-50 text-amber-800 border-amber-200 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Thermometer className="w-4 h-4 text-amber-600" />
                <span>Nhiệt kế đo nhiệt độ</span>
              </div>
              {activeTool === 'thermometer' && <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded-full">Đang chọn</span>}
            </button>

            <button
              onClick={() => {
                playClickSound();
                onSelectTool('stirrer');
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all ${
                activeTool === 'stirrer'
                  ? 'bg-purple-50 text-purple-800 border-purple-200 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Thanh khuấy thủy tinh</span>
              </div>
              {activeTool === 'stirrer' && <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded-full">Đang chọn</span>}
            </button>
          </div>
        </div>

        {/* Clear Bench */}
        <div className="pt-3 border-t border-slate-100">
          <button
            onClick={() => {
              playClickSound();
              onClearAllVessels();
            }}
            className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all text-xs font-bold"
          >
            <Trash2 className="w-4 h-4" />
            <span>Rửa sạch toàn bộ dụng cụ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
