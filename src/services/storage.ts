import { JournalEntry, UserProgress, TeacherSettings, MysterySolution, Chemical } from '../types/chemistry';
import { INITIAL_MYSTERY_SOLUTIONS } from '../data/mysteries';

const JOURNAL_KEY = 'vlab_journal_entries';
const PROGRESS_KEY = 'vlab_user_progress';
const TEACHER_KEY = 'vlab_teacher_settings';
const MYSTERY_KEY = 'vlab_mystery_state';
const CUSTOM_CHEM_KEY = 'vlab_custom_chemicals';

export function getStoredJournal(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(JOURNAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveJournalEntry(entry: JournalEntry): JournalEntry[] {
  const current = getStoredJournal();
  const updated = [entry, ...current];
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(updated));
  return updated;
}

export function clearStoredJournal(): void {
  localStorage.removeItem(JOURNAL_KEY);
}

export function getStoredProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw
      ? JSON.parse(raw)
      : {
          completedChallenges: [],
          earnedBadges: [],
          totalScore: 0,
          mysterySolvedCount: 0,
          experimentsCount: 0
        };
  } catch {
    return {
      completedChallenges: [],
      earnedBadges: [],
      totalScore: 0,
      mysterySolvedCount: 0,
      experimentsCount: 0
    };
  }
}

export function saveProgress(progress: UserProgress): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function getStoredTeacherSettings(): TeacherSettings {
  try {
    const raw = localStorage.getItem(TEACHER_KEY);
    return raw
      ? JSON.parse(raw)
      : {
          allowCustomChemicals: true,
          enabledChemicalIds: [
            'hcl',
            'h2so4_dilute',
            'lemon_juice',
            'vinegar',
            'naoh',
            'soap_water',
            'baking_soda',
            'lime_water',
            'pure_water',
            'nacl_solution'
          ],
          showInstantAnswers: false,
          assignedTask: 'Thực hành phân biệt Axit - Bazơ bằng quỳ tím và phenolphthalein'
        };
  } catch {
    return {
      allowCustomChemicals: true,
      enabledChemicalIds: [],
      showInstantAnswers: false,
      assignedTask: ''
    };
  }
}

export function saveTeacherSettings(settings: TeacherSettings): void {
  localStorage.setItem(TEACHER_KEY, JSON.stringify(settings));
}

export function getStoredMysteries(): MysterySolution[] {
  try {
    const raw = localStorage.getItem(MYSTERY_KEY);
    return raw ? JSON.parse(raw) : INITIAL_MYSTERY_SOLUTIONS;
  } catch {
    return INITIAL_MYSTERY_SOLUTIONS;
  }
}

export function saveMysteries(mysteries: MysterySolution[]): void {
  localStorage.setItem(MYSTERY_KEY, JSON.stringify(mysteries));
}

export function getCustomChemicals(): Chemical[] {
  try {
    const raw = localStorage.getItem(CUSTOM_CHEM_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomChemical(chemical: Chemical): Chemical[] {
  const current = getCustomChemicals();
  const updated = [...current, chemical];
  localStorage.setItem(CUSTOM_CHEM_KEY, JSON.stringify(updated));
  return updated;
}
