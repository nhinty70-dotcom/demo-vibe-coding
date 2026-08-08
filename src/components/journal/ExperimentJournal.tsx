import React, { useState } from 'react';
import { JournalEntry } from '../../types/chemistry';
import { getStoredJournal, clearStoredJournal } from '../../services/storage';
import { BookOpen, Download, Trash2, Search, Edit3, CheckCircle } from 'lucide-react';
import { playClickSound } from '../../services/audio';

interface ExperimentJournalProps {
  onJournalChanged: () => void;
}

export const ExperimentJournal: React.FC<ExperimentJournalProps> = ({ onJournalChanged }) => {
  const [entries, setEntries] = useState<JournalEntry[]>(getStoredJournal());
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNoteText, setEditNoteText] = useState('');

  const filteredEntries = entries.filter(
    (e) =>
      e.vesselName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.reactants.join(' ').toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.observation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.conclusion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClear = () => {
    if (confirm('Em có chắc chắn muốn xóa toàn bộ lịch sử nhật ký thí nghiệm không?')) {
      clearStoredJournal();
      setEntries([]);
      onJournalChanged();
    }
  };

  const handleExportTxt = () => {
    playClickSound();
    let content = 'NHẬT KÝ THÍ NGHIỆM HÓA HỌC ÁO - AXIT, BAZƠ & CHỈ THỊ\n';
    content += `Ngày xuất báo cáo: ${new Date().toLocaleDateString('vi-VN')}\n`;
    content += '----------------------------------------------------------\n\n';

    entries.forEach((e, idx) => {
      content += `Thí nghiệm #${idx + 1} (${e.timestamp}) - ${e.vesselName}\n`;
      content += `Hóa chất/Mẫu thử: ${e.reactants.join(', ') || 'Chưa rõ'}\n`;
      content += `Chỉ thị sử dụng: ${e.indicatorUsed}\n`;
      content += `Hiện tượng quan sát: ${e.observation}\n`;
      content += `Dự đoán học sinh: ${e.studentPrediction}\n`;
      content += `Kết luận: ${e.conclusion}\n`;
      if (e.notes) content += `Ghi chú cá nhân: ${e.notes}\n`;
      content += '\n----------------------------------------------------------\n';
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Nhat_Ky_Tho_Nghiom_Hoa_Hoc_${Date.now()}.txt`;
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">📋 Nhật Ký Thí Nghiệm Của Em</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Hệ thống tự động ghi nhận quy trình: Thao tác → Quan sát → Dự đoán → Kết luận
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportTxt}
            disabled={entries.length === 0}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md disabled:opacity-40 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Tải Báo Cáo (.txt)</span>
          </button>
          <button
            onClick={handleClear}
            disabled={entries.length === 0}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold disabled:opacity-40 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Xóa nhật ký</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm theo hóa chất, dụng cụ hoặc kết luận..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 shadow-xs"
        />
      </div>

      {/* Journal Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-bold uppercase tracking-wider">
                <th className="p-3.5">Thời gian & Dụng cụ</th>
                <th className="p-3.5">Chất / Mẫu thử</th>
                <th className="p-3.5">Chỉ thị</th>
                <th className="p-3.5">Hiện tượng quan sát</th>
                <th className="p-3.5">Dự đoán</th>
                <th className="p-3.5">Kết luận bài học</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-medium whitespace-nowrap">
                      <span className="text-slate-900 block font-bold">{entry.vesselName}</span>
                      <span className="text-[10px] text-slate-500 block font-mono">{entry.timestamp}</span>
                    </td>
                    <td className="p-3.5 font-mono text-indigo-700 font-bold">
                      {entry.reactants.length > 0 ? entry.reactants.join(' + ') : 'Mẫu chưa rõ'}
                    </td>
                    <td className="p-3.5 text-indigo-900 font-medium">
                      {entry.indicatorUsed}
                    </td>
                    <td className="p-3.5 text-slate-600 max-w-xs leading-relaxed">
                      {entry.observation}
                    </td>
                    <td className="p-3.5 font-bold">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] ${
                          entry.studentPrediction.includes('Axit')
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : entry.studentPrediction.includes('Bazơ')
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {entry.studentPrediction}
                      </span>
                    </td>
                    <td className="p-3.5 text-emerald-800 max-w-xs leading-relaxed font-semibold">
                      {entry.conclusion}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 text-xs">
                    Chưa có nhật ký thí nghiệm nào. Hãy thực hiện thao tác thử nghiệm trong "Phòng Thí Nghiệm"!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
