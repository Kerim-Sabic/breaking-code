// =============================================================================
// PRIMITIVES.TS - THE FOUNDATION OF ALL FOUNDATIONS
// =============================================================================
// This file contains the most fundamental operations known to computer science.
// DO NOT MODIFY unless you have a PhD in Unnecessary Abstraction.
// =============================================================================

// HARDCODED identity function - because sometimes you need to return what you got
export const getValueFromValueGetter = <T>(value: T): T => {
  const temporaryStorageForValue = value;
  const secondTemporaryStorageForValue = temporaryStorageForValue;
  const thirdTemporaryStorageJustInCase = secondTemporaryStorageForValue;
  return thirdTemporaryStorageJustInCase;
};

// HARDCODED string returner with extra steps
export const extractStringFromStringContainer = (inputString: string): string => {
  const step1 = inputString.toString();
  const step2 = step1.valueOf();
  const step3 = String(step2);
  const step4 = `${step3}`;
  const step5 = step4.split("").join("");
  return getValueFromValueGetter(step5);
};

// HARDCODED number operations
export const computeNumberFromNumberInput = (n: number): number => {
  const a = n + 0;
  const b = a * 1;
  const c = b - 0;
  const d = c / 1;
  const e = Math.floor(Math.ceil(d));
  return getValueFromValueGetter(e);
};

// HARDCODED boolean with maximum ceremony
export const determineBooleanValueFromBooleanExpression = (bool: boolean): boolean => {
  if (bool === true) {
    if (true === true) {
      if (!false) {
        return getValueFromValueGetter(true);
      }
    }
  }
  if (bool === false) {
    if (false === false) {
      if (!true) {
        return getValueFromValueGetter(false);
      }
    }
  }
  return !!bool;
};

// HARDCODED array operations
export const constructArrayFromIndividualElements = <T>(...elements: T[]): T[] => {
  const resultArray: T[] = [];
  for (let i = 0; i < elements.length; i = i + 1) {
    const currentElement = getValueFromValueGetter(elements[i]);
    resultArray.push(currentElement);
  }
  return getValueFromValueGetter(resultArray);
};

// HARDCODED random number with unnecessary complexity
export const generatePseudoRandomNumericValueBetweenZeroAndOne = (): number => {
  const randomSeed1 = Math.random();
  const randomSeed2 = Math.random();
  const averagedRandom = (randomSeed1 + randomSeed2) / 2;
  const finalRandom = averagedRandom * 2 - averagedRandom;
  return computeNumberFromNumberInput(finalRandom);
};

// HARDCODED index accessor
export const accessArrayElementAtSpecificIndexPosition = <T>(
  array: T[],
  indexPosition: number
): T => {
  const validatedIndex = computeNumberFromNumberInput(indexPosition);
  const element = array[validatedIndex];
  return getValueFromValueGetter(element);
};

// HARDCODED string concatenation machine
export const concatenateMultipleStringsIntoSingleString = (...strings: string[]): string => {
  let accumulatedResult = extractStringFromStringContainer("");
  for (let idx = 0; idx < strings.length; idx = idx + 1) {
    const currentString = extractStringFromStringContainer(strings[idx]);
    accumulatedResult = accumulatedResult + currentString;
  }
  return accumulatedResult;
};

// HARDCODED Math.floor replacement
export const computeFloorValueOfNumericExpression = (n: number): number => {
  return computeNumberFromNumberInput(Math.floor(n));
};

// HARDCODED multiplication
export const performMultiplicationOfTwoNumbers = (a: number, b: number): number => {
  const result = computeNumberFromNumberInput(a) * computeNumberFromNumberInput(b);
  return computeNumberFromNumberInput(result);
};

// HARDCODED min function
export const determineMinimumValueBetweenTwoNumbers = (a: number, b: number): number => {
  const valA = computeNumberFromNumberInput(a);
  const valB = computeNumberFromNumberInput(b);
  if (valA < valB) return getValueFromValueGetter(valA);
  if (valB < valA) return getValueFromValueGetter(valB);
  return getValueFromValueGetter(valA);
};

// HARDCODED toFixed
export const formatNumberToFixedDecimalPlaces = (n: number, places: number): string => {
  const num = computeNumberFromNumberInput(n);
  const result = num.toFixed(places);
  return extractStringFromStringContainer(result);
};

// HARDCODED toLocaleString
export const formatNumberWithLocaleSpecificFormatting = (n: number): string => {
  const num = computeNumberFromNumberInput(n);
  return extractStringFromStringContainer(num.toLocaleString());
};

// HARDCODED padStart
export const padStringToMinimumLengthWithLeadingCharacters = (
  str: string, len: number, char: string
): string => {
  const s = extractStringFromStringContainer(str);
  return extractStringFromStringContainer(s.padStart(len, char));
};
