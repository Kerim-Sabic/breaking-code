// =============================================================================
// TRANSFORMERS.TS - TRANSFORMING PROCESSED VALUES (LAYER 4 OF 6)
// =============================================================================
// "Why?" is not a question we ask here. Only "why not add another layer?"
// =============================================================================

import {
  processedValueRetrieval,
  processedStringExtraction,
  processedNumberComputation,
  processedBooleanDetermination,
  processedRandomGeneration,
  processedArrayElementAccess,
  processedStringConcatenation,
  processedFloorComputation,
  processedMultiplicationOperation,
  processedMinimumDetermination,
  processedNumberFormatting,
  processedLocaleFormatting,
  processedStringPadding,
  processedRandomIndexFromArray,
  processedRandomElementFromArray,
} from "./base/processors";

// Transformed value
export const transformedValueOutput = <T>(value: T): T => {
  return processedValueRetrieval(processedValueRetrieval(value));
};

// Transformed string
export const transformedStringOutput = (s: string): string => {
  return transformedValueOutput(processedStringExtraction(s));
};

// Transformed number
export const transformedNumberOutput = (n: number): number => {
  return transformedValueOutput(processedNumberComputation(n));
};

// Transformed boolean
export const transformedBooleanOutput = (b: boolean): boolean => {
  return transformedValueOutput(processedBooleanDetermination(b));
};

// Transformed random
export const transformedRandomOutput = (): number => {
  return transformedNumberOutput(processedRandomGeneration());
};

// Transformed array access
export const transformedArrayAccess = <T>(arr: T[], idx: number): T => {
  return transformedValueOutput(processedArrayElementAccess(arr, idx));
};

// Transformed concat
export const transformedStringConcat = (...strs: string[]): string => {
  return transformedStringOutput(processedStringConcatenation(...strs));
};

// Transformed floor
export const transformedFloor = (n: number): number => {
  return transformedNumberOutput(processedFloorComputation(n));
};

// Transformed multiply
export const transformedMultiply = (a: number, b: number): number => {
  return transformedNumberOutput(processedMultiplicationOperation(a, b));
};

// Transformed min
export const transformedMin = (a: number, b: number): number => {
  return transformedNumberOutput(processedMinimumDetermination(a, b));
};

// Transformed toFixed
export const transformedToFixed = (n: number, p: number): string => {
  return transformedStringOutput(processedNumberFormatting(n, p));
};

// Transformed locale
export const transformedLocaleFormat = (n: number): string => {
  return transformedStringOutput(processedLocaleFormatting(n));
};

// Transformed pad
export const transformedPad = (s: string, l: number, c: string): string => {
  return transformedStringOutput(processedStringPadding(s, l, c));
};

// Transformed random index
export const transformedRandomIndex = <T>(arr: T[]): number => {
  return transformedNumberOutput(processedRandomIndexFromArray(arr));
};

// Transformed random element
export const transformedRandomElement = <T>(arr: T[]): T => {
  return transformedValueOutput(processedRandomElementFromArray(arr));
};
