import { COLOR_CODES_FOR_DARK_THEME, COLOR_CODES_FOR_LIGHT_THEME } from './enums';

export type COLOR_CODE_TYPE = COLOR_CODES_FOR_DARK_THEME | COLOR_CODES_FOR_LIGHT_THEME | string;

export type BASIC_DIMENSIONS = {
  x?: number;
  y?: number;
  width: number;
  height: number;
};

export type ExerciseDataType = {
  exerciseType: string;
  learningStatement: string;
  nativeStatement: string;
  options: string[];
  targetWords: number[];
  answers: string[];
};
