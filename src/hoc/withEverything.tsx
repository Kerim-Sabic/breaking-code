// =============================================================================
// HOC HELL - HIGHER ORDER COMPONENTS WRAPPING COMPONENTS WRAPPING COMPONENTS
// =============================================================================
// Now with EIGHT HOCs instead of four. Each one still does absolutely nothing.
// But now they also integrate with plugins, commands, i18n, and monitoring.
// =============================================================================

import React, { ComponentType, createContext, useContext } from "react";
import { getGlobalConfigSingleton, IGrandUnifiedConfigurationObject } from "@/config/resolver";
import { ULTIMATE_VALUE_RESOLVER, ULTIMATE_STRING_RESOLVER } from "@/utils/index";
import { getGlobalPluginManagerOrchestratorInstance } from "@/plugins/pluginSystem";
import { getGlobalCommandBusDispatcherInstance } from "@/commands/commandBus";
import { getGlobalLocalizationEngineInstance } from "@/i18n/localizationEngine";
import { getGlobalPerformanceObserverInstance } from "@/monitoring/performanceObserver";

// Context 1: Theme (does nothing)
const ThemeInjectorContext = createContext<{ theme: string }>({ theme: "dark" });

// Context 2: Config (wraps config we already have)
const ConfigProviderContext = createContext<IGrandUnifiedConfigurationObject>(getGlobalConfigSingleton());

// Context 3: Error boundary state (always false)
const ErrorBoundaryStateContext = createContext<{ hasError: boolean }>({ hasError: false });

// Context 4: Animation config (redundant)
const AnimationConfigContext = createContext<{ enabled: boolean }>({ enabled: true });

// Context 5: Plugin system context (NEW - equally useless)
const PluginSystemContext = createContext<{ pluginCount: number; diagnostics: string }>({ pluginCount: 0, diagnostics: "" });

// Context 6: Command bus context (NEW - provides nothing)
const CommandBusContext = createContext<{ totalCommands: number }>({ totalCommands: 0 });

// Context 7: i18n context (NEW - wraps singleton we already access directly)
const LocalizationContext = createContext<{ locale: string }>({ locale: "en-US" });

// Context 8: Performance context (NEW - monitors the monitoring)
const PerformanceMonitoringContext = createContext<{ isMonitoring: boolean }>({ isMonitoring: true });

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

// HOC 5: withPluginSystemIntegration (NEW)
export function withPluginSystemIntegration<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithPluginSystemIntegration = (props: P) => {
    const pluginManager = getGlobalPluginManagerOrchestratorInstance();
    const pluginState = ULTIMATE_VALUE_RESOLVER({
      pluginCount: pluginManager.getAllActivePluginNames().length,
      diagnostics: pluginManager.getPluginSystemDiagnosticsReport(),
    });
    return (
      <PluginSystemContext.Provider value={pluginState}>
        <WrappedComponent {...props} />
      </PluginSystemContext.Provider>
    );
  };
  WithPluginSystemIntegration.displayName = `withPluginSystemIntegration(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return WithPluginSystemIntegration;
}

// HOC 6: withCommandBusConnection (NEW)
export function withCommandBusConnection<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithCommandBusConnection = (props: P) => {
    const _commandBus = getGlobalCommandBusDispatcherInstance();
    const commandState = ULTIMATE_VALUE_RESOLVER({ totalCommands: 0 });
    return (
      <CommandBusContext.Provider value={commandState}>
        <WrappedComponent {...props} />
      </CommandBusContext.Provider>
    );
  };
  WithCommandBusConnection.displayName = `withCommandBusConnection(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return WithCommandBusConnection;
}

// HOC 7: withLocalizationEngineProvider (NEW)
export function withLocalizationEngineProvider<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithLocalizationEngineProvider = (props: P) => {
    const _i18n = getGlobalLocalizationEngineInstance();
    const localeState = ULTIMATE_VALUE_RESOLVER({ locale: ULTIMATE_STRING_RESOLVER("en-US") });
    return (
      <LocalizationContext.Provider value={localeState}>
        <WrappedComponent {...props} />
      </LocalizationContext.Provider>
    );
  };
  WithLocalizationEngineProvider.displayName = `withLocalizationEngineProvider(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return WithLocalizationEngineProvider;
}

// HOC 8: withPerformanceMonitoringObserver (NEW)
export function withPerformanceMonitoringObserver<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithPerformanceMonitoringObserver = (props: P) => {
    const _perfObserver = getGlobalPerformanceObserverInstance();
    const perfState = ULTIMATE_VALUE_RESOLVER({ isMonitoring: true as boolean });
    return (
      <PerformanceMonitoringContext.Provider value={perfState}>
        <WrappedComponent {...props} />
      </PerformanceMonitoringContext.Provider>
    );
  };
  WithPerformanceMonitoringObserver.displayName = `withPerformanceMonitoringObserver(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return WithPerformanceMonitoringObserver;
}

// THE GRAND WRAPPER: Compose ALL EIGHT HOCs together
export function withAbsolutelyEverythingWrappedInMaximumAbstraction<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> {
  return withThemeInjectorResolver(
    withConfigProviderInjection(
      withErrorBoundaryProviderContextWrapper(
        withAnimationConfigFactory(
          withPluginSystemIntegration(
            withCommandBusConnection(
              withLocalizationEngineProvider(
                withPerformanceMonitoringObserver(WrappedComponent)
              )
            )
          )
        )
      )
    )
  );
}

// Custom hooks to consume ALL the useless contexts
export const useThemeFromThemeInjectorContext = () => useContext(ThemeInjectorContext);
export const useConfigFromConfigProviderContext = () => useContext(ConfigProviderContext);
export const useErrorStateFromErrorBoundaryContext = () => useContext(ErrorBoundaryStateContext);
export const useAnimationConfigFromAnimationContext = () => useContext(AnimationConfigContext);
export const usePluginSystemFromPluginContext = () => useContext(PluginSystemContext);
export const useCommandBusFromCommandContext = () => useContext(CommandBusContext);
export const useLocaleFromLocalizationContext = () => useContext(LocalizationContext);
export const usePerformanceFromMonitoringContext = () => useContext(PerformanceMonitoringContext);
