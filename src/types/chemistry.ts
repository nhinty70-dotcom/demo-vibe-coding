export type ChemicalCategory = 'acid' | 'base' | 'neutral' | 'indicator';

export interface Chemical {
  id: string;
  name: string;
  formula: string;
  category: ChemicalCategory;
  pH: number;
  color: string; // CSS color string e.g. "rgba(220, 38, 38, 0.3)"
  opacity?: number;
  concentration: string; // e.g. "0.1 M"
  safetyNotes: string;
  description: string;
  commonUse: string;
  isCustom?: boolean;
}

export type IndicatorType = 'litmus_purple' | 'litmus_red' | 'litmus_blue' | 'phenolphthalein' | 'ph_paper' | 'universal_liquid';

export interface Indicator {
  id: IndicatorType;
  name: string;
  type: 'paper' | 'liquid';
  description: string;
  usageGuide: string;
}

export interface VesselContents {
  volumeMl: number; // Volume in mL
  chemicals: { chemicalId: string; volumeMl: number }[];
  indicatorAdded?: IndicatorType;
  indicatorDrops?: number;
  temperatureC: number; // Initial 25C, rises during neutralization
  currentPH: number;
  color: string; // Computed liquid color
  paperStripDip?: {
    indicatorType: IndicatorType;
    resultColor: string;
    dippedAt: number;
  };
  hasReacted?: boolean;
  reactionMessage?: string;
}

export interface Vessel {
  id: string;
  type: 'test_tube' | 'beaker';
  capacityMl: number;
  contents: VesselContents;
  name: string;
}

export interface JournalEntry {
  id: string;
  timestamp: string;
  vesselName: string;
  reactants: string[]; // Names/formulas of chemicals used
  indicatorUsed: string;
  observation: string; // What happened visually
  studentPrediction: string; // Acid, Base, or Neutral
  conclusion: string; // Correct conclusion
  isCorrect?: boolean;
  notes?: string;
}

export interface MysterySolution {
  id: string; // e.g. "A", "B", "C", "D"
  codeName: string; // e.g. "Dung dịch A"
  actualChemicalId: string;
  category: 'acid' | 'base' | 'neutral';
  pH: number;
  revealed?: boolean;
  userGuess?: 'acid' | 'base' | 'neutral';
}

export interface ChallengeLevel {
  id: number;
  title: string;
  description: string;
  objective: string;
  hint: string;
  targetCount?: number;
  requiredTaskType: 'classify_simple' | 'classify_multi' | 'identify_mystery' | 'select_indicator' | 'neutralize';
  points: number;
  badge: string;
}

export interface UserProgress {
  completedChallenges: number[];
  earnedBadges: string[];
  totalScore: number;
  mysterySolvedCount: number;
  experimentsCount: number;
}

export interface TeacherSettings {
  allowCustomChemicals: boolean;
  enabledChemicalIds: string[];
  showInstantAnswers: boolean;
  assignedTask: string;
}
