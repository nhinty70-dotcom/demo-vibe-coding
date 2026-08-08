import React from 'react';
import { FlaskConical, HelpCircle, BookOpen, Trophy, Volume2, VolumeX, RotateCcw, ShieldAlert, Sparkles, GraduationCap } from 'lucide-react';
import { isSoundMuted, toggleSoundMute, playClickSound } from '../../services/audio';

export type AppMode = 'lab' | 'mystery' | 'phscale' | 'journal' | 'challenges' | 'teacher';

interface NavbarProps {
  activeMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  onResetLab: () => void;
  onOpenSafetyModal: () => void;
  completedChallengesCount: number;
  totalScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeMode,
  onSelectMode,
  onResetLab,
  onOpenSafetyModal,
  completedChallengesCount,
  totalScore
}) => {
  const [muted, setMuted] = React.useState(isSoundMuted());

  const handleMuteToggle = () => {
    const isNowMuted = toggleSoundMute();
    setMuted(isNowMuted);
    if (!isNowMuted) playClickSound();
  };

  const navItems: { id: AppMode; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'lab', label: 'Phòng Thí Nghiệm', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'mystery', label: 'Dung Dịch Bí Ẩn', icon: <HelpCircle className="w-4 h-4" />, badge: 'Mới' },
    { id: 'phscale', label: 'Thang pH', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'journal', label: 'Nhật Ký', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'challenges', label: 'Thử Thách', icon: <Trophy className="w-4 h-4" />, badge: `${completedChallengesCount}/5` },
    { id: 'teacher', label: 'Giáo Viên', icon: <GraduationCap className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-white border-b border-slate-200 text-slate-800 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectMode('lab')}>
            <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-sm">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight text-slate-900">
                  PHÒNG THÍ NGHIỆM VIRTUAL: <span className="text-indigo-600">AXIT - BAZƠ</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                  Lớp 8-9
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Modes */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeMode === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => {
                    playClickSound();
                    onSelectMode(item.id);
                  }}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center space-x-2">
            {/* Score pill */}
            <div className="hidden md:flex items-center space-x-1 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>{totalScore} điểm</span>
            </div>

            {/* Reset Lab Button */}
            <button
              id="btn-reset-lab"
              onClick={() => {
                playClickSound();
                onResetLab();
              }}
              title="Làm sạch bàn thí nghiệm"
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Làm lại</span>
            </button>

            {/* Sound Toggle Button */}
            <button
              id="btn-toggle-sound"
              onClick={handleMuteToggle}
              title={muted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              className="p-2 rounded-full text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
            >
              {muted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>

            {/* Safety Warning Modal Trigger */}
            <button
              id="btn-safety-warning"
              onClick={() => {
                playClickSound();
                onOpenSafetyModal();
              }}
              title="Cảnh báo an toàn thí nghiệm"
              className="p-2 rounded-full text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors border border-amber-200"
            >
              <ShieldAlert className="w-4 h-4 text-amber-600" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex lg:hidden overflow-x-auto py-2 space-x-1 border-t border-slate-100 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeMode === item.id;
            return (
              <button
                key={`mobile-${item.id}`}
                onClick={() => {
                  playClickSound();
                  onSelectMode(item.id);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
