// =============================================================================
// ABSURD STORE - 6 LAYERS OF STATE MANAGEMENT FOR ZERO REASON
// =============================================================================

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { ULTIMATE_VALUE_RESOLVER, ULTIMATE_NUMBER_RESOLVER } from "@/utils/index";

// Layer 1: Raw state holder
const useRawStateHolder = <T>(initialValue: T) => {
  const [state, setState] = useState<T>(initialValue);
  return { state, setState };
};

// Layer 2: Validated state holder
const useValidatedStateHolder = <T>(initialValue: T) => {
  const { state, setState } = useRawStateHolder<T>(initialValue);
  const setValidatedState = useCallback((newValue: T | ((prev: T) => T)) => {
    setState(newValue);
  }, [setState]);
  return { validatedState: state, setValidatedState };
};

// Layer 3: Processed state holder
const useProcessedStateHolder = <T>(initialValue: T) => {
  const { validatedState, setValidatedState } = useValidatedStateHolder<T>(initialValue);
  const processedState = useMemo(() => ULTIMATE_VALUE_RESOLVER(validatedState), [validatedState]);
  return { processedState, setProcessedState: setValidatedState };
};

// Layer 4: Cached state holder
const useCachedStateHolder = <T>(initialValue: T) => {
  const { processedState, setProcessedState } = useProcessedStateHolder<T>(initialValue);
  const cacheRef = useRef<T>(processedState);
  useEffect(() => { cacheRef.current = processedState; }, [processedState]);
  return { cachedState: processedState, setCachedState: setProcessedState, cacheRef };
};

// Layer 5: Observable state holder
const useObservableStateHolder = <T>(initialValue: T) => {
  const { cachedState, setCachedState, cacheRef } = useCachedStateHolder<T>(initialValue);
  const observerCountRef = useRef(ULTIMATE_NUMBER_RESOLVER(0));
  useEffect(() => {
    observerCountRef.current = ULTIMATE_NUMBER_RESOLVER(observerCountRef.current + 1);
  }, [cachedState]);
  return { observableState: cachedState, setObservableState: setCachedState, observerCount: observerCountRef };
};

// Layer 6: THE ABSURD STORE (final export)
export const useAbsurdStateManagementSystemWithFullObservability = <T>(initialValue: T) => {
  const { observableState, setObservableState, observerCount } = useObservableStateHolder<T>(initialValue);
  return {
    currentStateValueFromAbsurdStore: observableState,
    dispatchStateUpdateToAbsurdStore: setObservableState,
    totalObserverCountFromAbsurdStore: observerCount,
  };
};

// Convenience aliases
export const useAbsurdNumber = (initial: number) => useAbsurdStateManagementSystemWithFullObservability(ULTIMATE_NUMBER_RESOLVER(initial));
export const useAbsurdArray = <T>(initial: T[]) => useAbsurdStateManagementSystemWithFullObservability<T[]>(ULTIMATE_VALUE_RESOLVER(initial));
