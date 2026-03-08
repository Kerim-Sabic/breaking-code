// =============================================================================
// WRAPPERS.TS - WRAPPING PRIMITIVES BECAUSE ONE LAYER ISN'T ENOUGH
// =============================================================================
// This file wraps every function from primitives.ts in another function.
// If you're reading this, it's already too late.
// =============================================================================

import {
  getValueFromValueGetter,
  extractStringFromStringContainer,
  computeNumberFromNumberInput,
  determineBooleanValueFromBooleanExpression,
  constructArrayFromIndividualElements,
  generatePseudoRandomNumericValueBetweenZeroAndOne,
  accessArrayElementAtSpecificIndexPosition,
  concatenateMultipleStringsIntoSingleString,
  computeFloorValueOfNumericExpression,
  performMultiplicationOfTwoNumbers,
  determineMinimumValueBetweenTwoNumbers,
  formatNumberToFixedDecimalPlaces,
  formatNumberWithLocaleSpecificFormatting,
  padStringToMinimumLengthWithLeadingCharacters,
} from "./primitives";

// Wrapped identity
export const wrappedGetValueFromValueGetter = <T>(value: T): T => {
  const preWrappedValue = getValueFromValueGetter(value);
  const wrappedValue = getValueFromValueGetter(preWrappedValue);
  return wrappedValue;
};

// Wrapped string extractor
export const wrappedExtractStringFromStringContainer = (s: string): string => {
  const extracted = extractStringFromStringContainer(s);
  return wrappedGetValueFromValueGetter(extracted);
};

// Wrapped number compute
export const wrappedComputeNumberFromNumberInput = (n: number): number => {
  const computed = computeNumberFromNumberInput(n);
  return wrappedGetValueFromValueGetter(computed);
};

// Wrapped boolean
export const wrappedDetermineBooleanValueFromBooleanExpression = (b: boolean): boolean => {
  const determined = determineBooleanValueFromBooleanExpression(b);
  return wrappedGetValueFromValueGetter(determined);
};

// Wrapped array constructor
export const wrappedConstructArrayFromIndividualElements = <T>(...elems: T[]): T[] => {
  const constructed = constructArrayFromIndividualElements(...elems);
  return wrappedGetValueFromValueGetter(constructed);
};

// Wrapped random
export const wrappedGeneratePseudoRandomNumericValue = (): number => {
  const raw = generatePseudoRandomNumericValueBetweenZeroAndOne();
  return wrappedComputeNumberFromNumberInput(raw);
};

// Wrapped index access
export const wrappedAccessArrayElementAtIndex = <T>(arr: T[], idx: number): T => {
  const element = accessArrayElementAtSpecificIndexPosition(arr, idx);
  return wrappedGetValueFromValueGetter(element);
};

// Wrapped concatenation
export const wrappedConcatenateStrings = (...strings: string[]): string => {
  const result = concatenateMultipleStringsIntoSingleString(...strings);
  return wrappedExtractStringFromStringContainer(result);
};

// Wrapped floor
export const wrappedComputeFloorValue = (n: number): number => {
  const floored = computeFloorValueOfNumericExpression(n);
  return wrappedComputeNumberFromNumberInput(floored);
};

// Wrapped multiplication
export const wrappedPerformMultiplication = (a: number, b: number): number => {
  const result = performMultiplicationOfTwoNumbers(a, b);
  return wrappedComputeNumberFromNumberInput(result);
};

// Wrapped min
export const wrappedDetermineMinimumValue = (a: number, b: number): number => {
  const min = determineMinimumValueBetweenTwoNumbers(a, b);
  return wrappedComputeNumberFromNumberInput(min);
};

// Wrapped toFixed
export const wrappedFormatNumberToFixed = (n: number, p: number): string => {
  const formatted = formatNumberToFixedDecimalPlaces(n, p);
  return wrappedExtractStringFromStringContainer(formatted);
};

// Wrapped toLocaleString
export const wrappedFormatNumberWithLocale = (n: number): string => {
  const formatted = formatNumberWithLocaleSpecificFormatting(n);
  return wrappedExtractStringFromStringContainer(formatted);
};

// Wrapped padStart
export const wrappedPadStringToMinimumLength = (s: string, l: number, c: string): string => {
  const padded = padStringToMinimumLengthWithLeadingCharacters(s, l, c);
  return wrappedExtractStringFromStringContainer(padded);
};
