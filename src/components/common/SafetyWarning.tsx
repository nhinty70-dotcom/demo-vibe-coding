import React from 'react';
import { AlertTriangle, X, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SafetyWarningProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyWarningModal: React.FC<SafetyWarningProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 text-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Quy Tắc An Toàn Phòng Thí Nghiệm</h3>
              <p className="text-xs text-amber-700 font-semibold">Lưu ý quan trọng cho học sinh THCS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs font-medium leading-relaxed">
            ⚠️ <strong>CẢNH BÁO QUAN TRỌNG:</strong> Đây là mô phỏng thí nghiệm tương tác học tập trực quan. Tuyệt đối <strong>KHÔNG tự ý làm thí nghiệm hóa chất ngoài đời thực</strong> nếu không có thầy cô giáo hoặc người lớn giám sát.
          </div>

          <p className="font-semibold text-slate-800 text-xs uppercase tracking-wider">Quy tắc an toàn cơ bản khi thao tác thực tế:</p>

          <ul className="space-y-2 text-xs">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Đeo kính bảo hộ và áo blouse khi làm việc với axit (HCl, H₂SO₄) và kiềm mạnh (NaOH).</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Không bao giờ nếm, ngửi trực tiếp hoặc tiếp xúc trực tiếp hóa chất bằng tay trần.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Khi pha loãng axit sunfuric đậm đặc: Luôn rót <strong>từ từ Axit vào Nước</strong>, không bao giờ làm ngược lại.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Rửa sạch ngay bằng nhiều nước cất hoặc nước xả sạch nếu hóa chất dính vào da hay quần áo.</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-md"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Đã Hiểu - Bắt Đầu Thí Nghiệm</span>
          </button>
        </div>
      </div>
    </div>
  );
};
