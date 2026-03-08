// =============================================================================
// RESOLVERS.TS - RESOLVING TRANSFORMED VALUES (LAYER 5 OF 6)
// =============================================================================
// Almost at the top. The light at the end of the tunnel is another tunnel.
// =============================================================================

import {
  transformedValueOutput,
  transformedStringOutput,
  transformedNumberOutput,
  transformedBooleanOutput,
  transformedRandomOutput,
  transformedArrayAccess,
  transformedStringConcat,
  transformedFloor,
  transformedMultiply,
  transformedMin,
  transformedToFixed,
  transformedLocaleFormat,
  transformedPad,
  transformedRandomIndex,
  transformedRandomElement,
} from "./core/transformers";

// RESOLVED FUNCTIONS - the penultimate layer of our beautiful architecture

export const resolveTransformedProcessedWrappedPrimitiveValue = <T>(value: T): T => {
  const step1 = transformedValueOutput(value);
  const step2 = transformedValueOutput(step1);
  return step2;
};

export const resolveStringThroughEntireProcessingPipeline = (s: string): string => {
  return resolveTransformedProcessedWrappedPrimitiveValue(transformedStringOutput(s));
};

export const resolveNumberThroughEntireComputationChain = (n: number): number => {
  return resolveTransformedProcessedWrappedPrimitiveValue(transformedNumberOutput(n));
};

export const resolveBooleanThroughLogicalAnalysisFramework = (b: boolean): boolean => {
  return resolveTransformedProcessedWrappedPrimitiveValue(transformedBooleanOutput(b));
};

export const resolveRandomNumberThroughQuantumEntanglementSimulator = (): number => {
  return resolveNumberThroughEntireComputationChain(transformedRandomOutput());
};

export const resolveArrayElementThroughMultiDimensionalLookup = <T>(arr: T[], idx: number): T => {
  return resolveTransformedProcessedWrappedPrimitiveValue(transformedArrayAccess(arr, idx));
};

export const resolveStringConcatenationThroughUnificationEngine = (...strs: string[]): string => {
  return resolveStringThroughEntireProcessingPipeline(transformedStringConcat(...strs));
};

export const resolveFloorThroughMathematicalAbstractionLayer = (n: number): number => {
  return resolveNumberThroughEntireComputationChain(transformedFloor(n));
};

export const resolveMultiplicationThroughArithmeticOrchestrator = (a: number, b: number): number => {
  return resolveNumberThroughEntireComputationChain(transformedMultiply(a, b));
};

export const resolveMinimumThroughComparativeAnalysisModule = (a: number, b: number): number => {
  return resolveNumberThroughEntireComputationChain(transformedMin(a, b));
};

export const resolveFixedDecimalThroughFormattingSubsystem = (n: number, p: number): string => {
  return resolveStringThroughEntireProcessingPipeline(transformedToFixed(n, p));
};

export const resolveLocaleFormattingThroughInternationalizationLayer = (n: number): string => {
  return resolveStringThroughEntireProcessingPipeline(transformedLocaleFormat(n));
};

export const resolvePaddingThroughStringManipulationFramework = (s: string, l: number, c: string): string => {
  return resolveStringThroughEntireProcessingPipeline(transformedPad(s, l, c));
};

export const resolveRandomIndexThroughStochasticSelectionEngine = <T>(arr: T[]): number => {
  return resolveNumberThroughEntireComputationChain(transformedRandomIndex(arr));
};

export const resolveRandomElementThroughProbabilisticExtractionModule = <T>(arr: T[]): T => {
  return resolveTransformedProcessedWrappedPrimitiveValue(transformedRandomElement(arr));
};
