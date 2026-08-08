import React, { useState } from 'react';
import { TeacherSettings, Chemical } from '../../types/chemistry';
import { getStoredTeacherSettings, saveTeacherSettings, getStoredJournal, saveCustomChemical } from '../../services/storage';
import { GraduationCap, Settings, Plus, Save, Users, CheckCircle, FlaskConical, AlertCircle } from 'lucide-react';
import { playClickSound, playSuccessChime } from '../../services/audio';

export const TeacherDashboard: React.FC = () => {
  const [settings, setSettings] = useState<TeacherSettings>(getStoredTeacherSettings());
  const [journalEntries] = useState(getStoredJournal());
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'custom_chem'>('overview');

  // Custom Chemical form state
  const [customChem, setCustomChem] = useState<{
    name: string;
    formula: string;
    category: 'acid' | 'base' | 'neutral';
    pH: number;
    concentration: string;
    safetyNotes: string;
    description: string;
    commonUse: string;
  }>({
    name: '',
    formula: '',
    category: 'acid',
    pH: 3.0,
    concentration: '0.1 M',
    safetyNotes: 'Sử dụng an toàn dưới sự giám sát.',
    description: '',
    commonUse: ''
  });

  const [savedSuccessMsg, setSavedSuccessMsg] = useState(false);

  const handleSaveSettings = () => {
    playClickSound();
    saveTeacherSettings(settings);
    setSavedSuccessMsg(true);
    setTimeout(() => setSavedSuccessMsg(false), 2000);
  };

  const handleCreateCustomChemical = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customChem.name || !customChem.formula) return;

    playSuccessChime();
    const newChem: Chemical = {
      id: `custom_${Date.now()}`,
      ...customChem,
      color: customChem.category === 'acid' ? 'rgba(239, 68, 68, 0.2)' : customChem.category === 'base' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
      isCustom: true
    };

    saveCustomChemical(newChem);
    setCustomChem({
      name: '',
      formula: '',
      category: 'acid',
      pH: 3.0,
      concentration: '0.1 M',
      safetyNotes: 'Sử dụng an toàn dưới sự giám sát.',
      description: '',
      commonUse: ''
    });

    setSavedSuccessMsg(true);
    setTimeout(() => setSavedSuccessMsg(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 animate-fade-in">
      {/* Title */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">👩‍🏫 Giao Diện Quản Lý Của Giáo Viên</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Theo dõi tiến trình học sinh, cấu hình danh mục hóa chất & giao bài tập thí nghiệm
            </p>
          </div>
        </div>

        {savedSuccessMsg && (
          <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 animate-fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Đã lưu thành công!</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        <button
          onClick={() => {
            playClickSound();
            setActiveTab('overview');
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'overview'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          📊 Tổng Quan Tiến Trình Lớp
        </button>
        <button
          onClick={() => {
            playClickSound();
            setActiveTab('settings');
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'settings'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          ⚙️ Cấu Hình Bài Học
        </button>
        <button
          onClick={() => {
            playClickSound();
            setActiveTab('custom_chem');
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'custom_chem'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🧪 Tạo Dung Dịch Mới
        </button>
      </div>

      {/* Tab 1: Student Overview & Journals */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs flex items-center space-x-3">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block font-bold">Thí nghiệm đã thực hiện</span>
                <span className="text-lg font-bold text-slate-900 font-mono">{journalEntries.length} bài</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs flex items-center space-x-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block font-bold">Lớp học tương tác</span>
                <span className="text-lg font-bold text-slate-900 font-mono">Hóa Học THCS</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs flex items-center space-x-3">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block font-bold">Trạng thái lớp</span>
                <span className="text-xs font-bold text-emerald-700">Đang hoạt động</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900">📋 Báo Cáo Nhật Ký Gần Đây Của Học Sinh</h3>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {journalEntries.map((e) => (
                <div key={e.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{e.vesselName} ({e.timestamp})</span>
                    <span className="text-indigo-700 font-mono">{e.reactants.join(' + ')}</span>
                  </div>
                  <p className="text-slate-600 font-medium">
                    Hiện tượng: <strong className="text-slate-800">{e.observation}</strong> → Dự đoán: <strong className="text-indigo-700">{e.studentPrediction}</strong>
                  </p>
                  <p className="text-emerald-800 font-bold">
                    Kết luận: {e.conclusion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Lesson Settings & Assignment Task */}
      {activeTab === 'settings' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Giao nhiệm vụ bài học trên giao diện học sinh:
            </label>
            <input
              type="text"
              value={settings.assignedTask}
              onChange={(e) => setSettings({ ...settings, assignedTask: e.target.value })}
              placeholder="Ví dụ: Tìm 3 chất có tính axit và 3 chất có tính bazơ..."
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 shadow-xs"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center space-x-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Cập Nhật Cấu Hình Lớp</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Create Custom Chemical */}
      {activeTab === 'custom_chem' && (
        <form onSubmit={handleCreateCustomChemical} className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
            🧪 Thêm Mẫu Hóa Chất Mới Vào Tủ Thí Nghiệm
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tên hóa chất / Dung dịch:</label>
              <input
                type="text"
                required
                value={customChem.name}
                onChange={(e) => setCustomChem({ ...customChem, name: e.target.value })}
                placeholder="Ví dụ: Dung dịch Axit Photphoric"
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-500 shadow-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Công thức hóa học:</label>
              <input
                type="text"
                required
                value={customChem.formula}
                onChange={(e) => setCustomChem({ ...customChem, formula: e.target.value })}
                placeholder="Ví dụ: H₃PO₄"
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-500 font-mono shadow-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nhóm đặc tính:</label>
              <select
                value={customChem.category}
                onChange={(e) => setCustomChem({ ...customChem, category: e.target.value as any })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-500 shadow-xs font-bold"
              >
                <option value="acid">🔴 Axit</option>
                <option value="base">🔵 Bazơ</option>
                <option value="neutral">🟢 Trung tính</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Độ pH giả định (0 - 14):</label>
              <input
                type="number"
                min="0"
                max="14"
                step="0.1"
                value={customChem.pH}
                onChange={(e) => setCustomChem({ ...customChem, pH: parseFloat(e.target.value) })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-500 font-mono shadow-xs"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center space-x-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Hóa Chất Vào Tủ Học Sinh</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
