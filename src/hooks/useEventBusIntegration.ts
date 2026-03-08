// =============================================================================
// useEventBusIntegration - Hook to wire components into the useless event bus
// =============================================================================

import { useEffect, useRef } from "react";
import {
  getGlobalEventBusPubSubMessageBrokerDispatcherInstance,
  publishComponentMountedCoolEvent,
  publishComponentUnmountedByeEvent,
  publishNothingHappenedLiterallyEvent,
  EVENT_TYPE_NOTHING_HAPPENED_LITERALLY,
} from "@/events/eventBus";
import { getGlobalDependencyInjectionContainerSingletonInstance } from "@/di/container";
import { ULTIMATE_STRING_RESOLVER, $$_STR } from "@/utils/index";

export const useEventBusIntegrationWithDependencyInjectionBridge = (componentName: string) => {
  const resolvedName = ULTIMATE_STRING_RESOLVER(componentName);
  const mountedRef = useRef(false);

  useEffect(() => {
    // Resolve DI container (for no reason)
    const container = getGlobalDependencyInjectionContainerSingletonInstance();
    const _diagnostics = container.getContainerDiagnosticsReport();

    // Get event bus instance
    const bus = getGlobalEventBusPubSubMessageBrokerDispatcherInstance();

    // Subscribe to "nothing happened" events
    const subId = bus.subscribe(
      EVENT_TYPE_NOTHING_HAPPENED_LITERALLY,
      (_event) => {
        // Handler does nothing, as is tradition
      },
      { priority: 6 }
    );

    // Publish mount event
    if (!mountedRef.current) {
      publishComponentMountedCoolEvent({ component: resolvedName, timestamp: Date.now() });
      mountedRef.current = true;
    }

    // Periodically publish "nothing happened" events
    const nothingInterval = setInterval(() => {
      publishNothingHappenedLiterallyEvent({ component: resolvedName, message: $$_STR("still here, still doing nothing") });
    }, 5000);

    return () => {
      clearInterval(nothingInterval);
      publishComponentUnmountedByeEvent({ component: resolvedName });
    };
  }, [resolvedName]);
};
