// =============================================================================
// CONDUCTORS.TS - CONDUCTING ORCHESTRATED VALUES (LAYER 8 OF 8)
// =============================================================================
// The FINAL layer. Values have been through primitives, wrappers, processors,
// transformers, resolvers, the index, and orchestrators. Now they're conducted
// through one final layer of absolute meaninglessness. You made it. Congratulations.
// =============================================================================

import {
  orchestrateValueThroughEntireSystemStack,
  orchestrateStringThroughMultipleResolutionPasses,
  orchestrateNumberThroughRedundantComputationEngine,
  orchestrateBooleanThroughLogicalOrchestrationFramework,
  orchestrateRandomNumberGeneration,
  orchestrateArrayElementRetrieval,
  orchestrateStringConcatenation,
  orchestrateFloorComputation,
  orchestrateMultiplication,
  orchestrateMinimumSelection,
  orchestrateFixedDecimalFormatting,
  orchestrateLocaleFormatting,
  orchestratePadding,
  orchestrateRandomIndex,
  orchestrateRandomElement,
} from "./orchestrators";

// CONDUCTED FUNCTIONS - the absolutely final layer

export const conductValueThroughTheEntireEightLayerAbstractionHierarchy = <T>(value: T): T => {
  return orchestrateValueThroughEntireSystemStack(orchestrateValueThroughEntireSystemStack(value));
};

export const conductStringThroughTheFullProcessingConductorPipeline = (s: string): string => {
  return conductValueThroughTheEntireEightLayerAbstractionHierarchy(orchestrateStringThroughMultipleResolutionPasses(s));
};

export const conductNumberThroughMathematicalConductorOrchestration = (n: number): number => {
  return conductValueThroughTheEntireEightLayerAbstractionHierarchy(orchestrateNumberThroughRedundantComputationEngine(n));
};

export const conductBooleanThroughBooleanConductorAnalysis = (b: boolean): boolean => {
  return conductValueThroughTheEntireEightLayerAbstractionHierarchy(orchestrateBooleanThroughLogicalOrchestrationFramework(b));
};

export const conductRandomNumberThroughQuantumConductor = (): number => {
  return conductNumberThroughMathematicalConductorOrchestration(orchestrateRandomNumberGeneration());
};

export const conductArrayElementThroughMultiDimensionalConductor = <T>(arr: T[], idx: number): T => {
  return conductValueThroughTheEntireEightLayerAbstractionHierarchy(orchestrateArrayElementRetrieval(arr, idx));
};

export const conductStringConcatenationThroughConductorEngine = (...strs: string[]): string => {
  return conductStringThroughTheFullProcessingConductorPipeline(orchestrateStringConcatenation(...strs));
};

export const conductFloorThroughMathematicalConductor = (n: number): number => {
  return conductNumberThroughMathematicalConductorOrchestration(orchestrateFloorComputation(n));
};

export const conductMultiplicationThroughArithmeticConductor = (a: number, b: number): number => {
  return conductNumberThroughMathematicalConductorOrchestration(orchestrateMultiplication(a, b));
};

export const conductMinimumThroughComparativeConductor = (a: number, b: number): number => {
  return conductNumberThroughMathematicalConductorOrchestration(orchestrateMinimumSelection(a, b));
};

export const conductFixedDecimalThroughFormattingConductor = (n: number, p: number): string => {
  return conductStringThroughTheFullProcessingConductorPipeline(orchestrateFixedDecimalFormatting(n, p));
};

export const conductLocaleFormattingThroughInternationalConductor = (n: number): string => {
  return conductStringThroughTheFullProcessingConductorPipeline(orchestrateLocaleFormatting(n));
};

export const conductPaddingThroughStringConductor = (s: string, l: number, c: string): string => {
  return conductStringThroughTheFullProcessingConductorPipeline(orchestratePadding(s, l, c));
};

export const conductRandomIndexThroughStochasticConductor = <T>(arr: T[]): number => {
  return conductNumberThroughMathematicalConductorOrchestration(orchestrateRandomIndex(arr));
};

export const conductRandomElementThroughProbabilisticConductor = <T>(arr: T[]): T => {
  return conductValueThroughTheEntireEightLayerAbstractionHierarchy(orchestrateRandomElement(arr));
};
