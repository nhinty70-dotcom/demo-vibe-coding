import { MysterySolution } from '../types/chemistry';

export const INITIAL_MYSTERY_SOLUTIONS: MysterySolution[] = [
  {
    id: 'A',
    codeName: 'Dung dịch A',
    actualChemicalId: 'lemon_juice',
    category: 'acid',
    pH: 2.3
  },
  {
    id: 'B',
    codeName: 'Dung dịch B',
    actualChemicalId: 'soap_water',
    category: 'base',
    pH: 9.5
  },
  {
    id: 'C',
    codeName: 'Dung dịch C',
    actualChemicalId: 'pure_water',
    category: 'neutral',
    pH: 7.0
  },
  {
    id: 'D',
    codeName: 'Dung dịch D',
    actualChemicalId: 'naoh',
    category: 'base',
    pH: 13.0
  },
  {
    id: 'E',
    codeName: 'Dung dịch E',
    actualChemicalId: 'hcl',
    category: 'acid',
    pH: 1.0
  }
];
