// =============================================================================
// PROCESSORS.TS - PROCESSING WRAPPED PRIMITIVES THROUGH ANOTHER LAYER
// =============================================================================
// Layer 3 of 6. We're only halfway through. Stay strong.
// =============================================================================

import {
  wrappedGetValueFromValueGetter,
  wrappedExtractStringFromStringContainer,
  wrappedComputeNumberFromNumberInput,
  wrappedDetermineBooleanValueFromBooleanExpression,
  wrappedGeneratePseudoRandomNumericValue,
  wrappedAccessArrayElementAtIndex,
  wrappedConcatenateStrings,
  wrappedComputeFloorValue,
  wrappedPerformMultiplication,
  wrappedDetermineMinimumValue,
  wrappedFormatNumberToFixed,
  wrappedFormatNumberWithLocale,
  wrappedPadStringToMinimumLength,
} from "./foundation/wrappers";

// Processed identity
export const processedValueRetrieval = <T>(value: T): T => {
  const preProcessed = wrappedGetValueFromValueGetter(value);
  const processed = wrappedGetValueFromValueGetter(preProcessed);
  const postProcessed = wrappedGetValueFromValueGetter(processed);
  return postProcessed;
};

// Processed string
export const processedStringExtraction = (s: string): string => {
  const pre = wrappedExtractStringFromStringContainer(s);
  return processedValueRetrieval(pre);
};

// Processed number
export const processedNumberComputation = (n: number): number => {
  const pre = wrappedComputeNumberFromNumberInput(n);
  return processedValueRetrieval(pre);
};

// Processed boolean
export const processedBooleanDetermination = (b: boolean): boolean => {
  return processedValueRetrieval(wrappedDetermineBooleanValueFromBooleanExpression(b));
};

// Processed random
export const processedRandomGeneration = (): number => {
  const raw = wrappedGeneratePseudoRandomNumericValue();
  return processedNumberComputation(raw);
};

// Processed array access
export const processedArrayElementAccess = <T>(arr: T[], idx: number): T => {
  const processedIdx = processedNumberComputation(idx);
  return processedValueRetrieval(wrappedAccessArrayElementAtIndex(arr, processedIdx));
};

// Processed concat
export const processedStringConcatenation = (...strs: string[]): string => {
  const processedStrs = strs.map(s => processedStringExtraction(s));
  return wrappedConcatenateStrings(...processedStrs);
};

// Processed floor
export const processedFloorComputation = (n: number): number => {
  return processedNumberComputation(wrappedComputeFloorValue(n));
};

// Processed multiplication
export const processedMultiplicationOperation = (a: number, b: number): number => {
  return processedNumberComputation(wrappedPerformMultiplication(a, b));
};

// Processed min
export const processedMinimumDetermination = (a: number, b: number): number => {
  return processedNumberComputation(wrappedDetermineMinimumValue(a, b));
};

// Processed toFixed
export const processedNumberFormatting = (n: number, p: number): string => {
  return processedStringExtraction(wrappedFormatNumberToFixed(n, p));
};

// Processed locale formatting
export const processedLocaleFormatting = (n: number): string => {
  return processedStringExtraction(wrappedFormatNumberWithLocale(n));
};

// Processed pad
export const processedStringPadding = (s: string, l: number, c: string): string => {
  return processedStringExtraction(wrappedPadStringToMinimumLength(s, l, c));
};

// Processed random index from array
export const processedRandomIndexFromArray = <T>(arr: T[]): number => {
  const len = processedNumberComputation(arr.length);
  const raw = processedRandomGeneration();
  const multiplied = processedMultiplicationOperation(raw, len);
  return processedFloorComputation(multiplied);
};

// Processed random element from array
export const processedRandomElementFromArray = <T>(arr: T[]): T => {
  const idx = processedRandomIndexFromArray(arr);
  return processedArrayElementAccess(arr, idx);
};
