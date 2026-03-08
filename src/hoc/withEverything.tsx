// =============================================================================
// HOC HELL - HIGHER ORDER COMPONENTS WRAPPING COMPONENTS WRAPPING COMPONENTS
// =============================================================================
// Each HOC does absolutely nothing but pass props through. Beautiful.
// =============================================================================

import React, { ComponentType, createContext, useContext } from "react";
import { getGlobalConfigSingleton, IGrandUnifiedConfigurationObject } from "@/config/resolver";
import { ULTIMATE_VALUE_RESOLVER } from "@/utils/index";

// Context 1: Theme (does nothing)
const ThemeInjectorContext = createContext<{ theme: string }>({ theme: "dark" });

// Context 2: Config (wraps config we already have)
const ConfigProviderContext = createContext<IGrandUnifiedConfigurationObject>(getGlobalConfigSingleton());

// Context 3: Error boundary state (always false)
const ErrorBoundaryStateContext = createContext<{ hasError: boolean }>({ hasError: false });

// Context 4: Animation config (redundant)
const AnimationConfigContext = createContext<{ enabled: boolean }>({ enabled: true });

// HOC 1: withThemeInjectorResolver
export function withThemeInjectorResolver<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithThemeInjectorResolver = (props: P) => {
    const themeValue = ULTIMATE_VALUE_RESOLVER({ theme: "dark" as string });
    return (
      <ThemeInjectorContext.Provider value={themeValue}>
        <WrappedComponent {...props} />
      </ThemeInjectorContext.Provider>
    );
  };
  WithThemeInjectorResolver.displayName = `withThemeInjectorResolver(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return WithThemeInjectorResolver;
}

// HOC 2: withConfigProviderInjection
export function withConfigProviderInjection<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithConfigProviderInjection = (props: P) => {
    const config = ULTIMATE_VALUE_RESOLVER(getGlobalConfigSingleton());
    return (
      <ConfigProviderContext.Provider value={config}>
        <WrappedComponent {...props} />
      </ConfigProviderContext.Provider>
    );
  };
  WithConfigProviderInjection.displayName = `withConfigProviderInjection(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return WithConfigProviderInjection;
}

// HOC 3: withErrorBoundaryProviderContextWrapper
export function withErrorBoundaryProviderContextWrapper<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithErrorBoundaryProviderContextWrapper = (props: P) => {
    const errorState = ULTIMATE_VALUE_RESOLVER({ hasError: false as boolean });
    return (
      <ErrorBoundaryStateContext.Provider value={errorState}>
        <WrappedComponent {...props} />
      </ErrorBoundaryStateContext.Provider>
    );
  };
  WithErrorBoundaryProviderContextWrapper.displayName = `withErrorBoundaryProviderContextWrapper(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return WithErrorBoundaryProviderContextWrapper;
}

// HOC 4: withAnimationConfigFactory
export function withAnimationConfigFactory<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithAnimationConfigFactory = (props: P) => {
    const animConfig = ULTIMATE_VALUE_RESOLVER({ enabled: true as boolean });
    return (
      <AnimationConfigContext.Provider value={animConfig}>
        <WrappedComponent {...props} />
      </AnimationConfigContext.Provider>
    );
  };
  WithAnimationConfigFactory.displayName = `withAnimationConfigFactory(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return WithAnimationConfigFactory;
}

// THE GRAND WRAPPER: Compose all HOCs together
export function withAbsolutelyEverythingWrappedInMaximumAbstraction<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> {
  return withThemeInjectorResolver(
    withConfigProviderInjection(
      withErrorBoundaryProviderContextWrapper(
        withAnimationConfigFactory(WrappedComponent)
      )
    )
  );
}

// Custom hooks to consume the useless contexts
export const useThemeFromThemeInjectorContext = () => useContext(ThemeInjectorContext);
export const useConfigFromConfigProviderContext = () => useContext(ConfigProviderContext);
export const useErrorStateFromErrorBoundaryContext = () => useContext(ErrorBoundaryStateContext);
export const useAnimationConfigFromAnimationContext = () => useContext(AnimationConfigContext);
