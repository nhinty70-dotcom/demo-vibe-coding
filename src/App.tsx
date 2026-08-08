/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, AppMode } from './components/common/Navbar';
import { SafetyWarningModal } from './components/common/SafetyWarning';
import { VirtualLab } from './components/lab/VirtualLab';
import { MysterySolutions } from './components/mystery/MysterySolutions';
import { InteractivePHScale } from './components/phscale/InteractivePHScale';
import { ExperimentJournal } from './components/journal/ExperimentJournal';
import { ChallengeMode } from './components/challenges/ChallengeMode';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { getStoredProgress, saveProgress, getStoredTeacherSettings } from './services/storage';
import { ShieldAlert, BookOpen, Sparkles, Trophy } from 'lucide-react';

export default function App() {
  const [activeMode, setActiveMode] = useState<AppMode>('lab');
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);
  const [progress, setProgress] = useState(getStoredProgress());
  const [teacherSettings] = useState(getStoredTeacherSettings());

  useEffect(() => {
    // Refresh progress on mode change
    setProgress(getStoredProgress());
  }, [activeMode]);

  const handleExperimentPerformed = () => {
    const current = getStoredProgress();
    const updated = {
      ...current,
      experimentsCount: current.experimentsCount + 1,
      totalScore: current.totalScore + 10
    };
    setProgress(updated);
    saveProgress(updated);
  };

  const handleJournalUpdated = () => {
    setProgress(getStoredProgress());
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeMode={activeMode}
        onSelectMode={(mode) => setActiveMode(mode)}
        onResetLab={() => setActiveMode('lab')}
        onOpenSafetyModal={() => setSafetyModalOpen(true)}
        completedChallengesCount={progress.completedChallenges.length}
        totalScore={progress.totalScore}
      />

      {/* Assigned Teacher Task Banner if set */}
      {teacherSettings.assignedTask && (
        <div className="bg-indigo-600 text-white border-b border-indigo-700 px-4 py-2 text-xs flex items-center justify-between shadow-sm">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-indigo-900 bg-white/90 px-2 py-0.5 rounded shadow-xs">
                📌 THÔNG BÁO TỪ GIÁO VIÊN:
              </span>
              <span className="font-medium text-white">{teacherSettings.assignedTask}</span>
            </div>
            <button
              onClick={() => setActiveMode('lab')}
              className="text-[11px] underline hover:text-indigo-100 font-semibold hidden sm:inline"
            >
              Thực hiện ngay →
            </button>
          </div>
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1 overflow-y-auto">
        {activeMode === 'lab' && (
          <VirtualLab
            onJournalUpdated={handleJournalUpdated}
            onExperimentPerformed={handleExperimentPerformed}
          />
        )}

        {activeMode === 'mystery' && <MysterySolutions />}

        {activeMode === 'phscale' && <InteractivePHScale />}

        {activeMode === 'journal' && (
          <ExperimentJournal onJournalChanged={handleJournalUpdated} />
        )}

        {activeMode === 'challenges' && <ChallengeMode />}

        {activeMode === 'teacher' && <TeacherDashboard />}
      </main>

      {/* Footer Banner */}
      <footer className="bg-white border-t border-slate-200 py-3 px-4 text-center text-xs text-slate-500 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            🔬 <strong className="text-slate-700">Phòng Thí Nghiệm Hóa Học Ảo</strong> • Mô phỏng tương tác STEM Lớp 8-9 (Axit - Bazơ & Chỉ thị)
          </span>
          <span className="text-[11px] text-slate-400">
            Ứng dụng hỗ trợ học tập tự khám phá • Không chứa hóa chất thực tế
          </span>
        </div>
      </footer>

      {/* Safety Warning Popup Modal */}
      <SafetyWarningModal
        isOpen={safetyModalOpen}
        onClose={() => setSafetyModalOpen(false)}
      />
    </div>
  );
}
