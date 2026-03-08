// =============================================================================
// OBSERVABLE PROXY - REACTIVE STATE THAT REACTS TO NOTHING
// =============================================================================
// Wraps every object in a Proxy that intercepts gets, sets, deletes,
// and has operations. Every interception triggers 4 callbacks that do nothing.
// Proxies are nested, so accessing a.b.c creates 3 proxies.
// =============================================================================

import { ULTIMATE_VALUE_RESOLVER, ULTIMATE_STRING_RESOLVER, $$_STR, $$_NUM } from "@/utils/index";

type ObservableCallback = (path: string, value: unknown, operation: string) => void;

// Pre-registered observers (all do nothing)
const _globalObservers: ObservableCallback[] = [
  (_path, _value, _op) => { /* Observer 1: logging observer (logs nothing) */ },
  (_path, _value, _op) => { /* Observer 2: validation observer (validates nothing) */ },
  (_path, _value, _op) => { /* Observer 3: sync observer (syncs nothing) */ },
  (_path, _value, _op) => { /* Observer 4: analytics observer (tracks nothing) */ },
  (_path, _value, _op) => { /* Observer 5: persistence observer (persists nothing) */ },
  (_path, _value, _op) => { /* Observer 6: undo observer (undoes nothing) */ },
];

interface IObservableMetrics {
  totalGets: number;
  totalSets: number;
  totalDeletes: number;
  totalHas: number;
  totalNotifications: number;
  proxyCount: number;
  pathsAccessed: Set<string>;
}

const _globalObservableMetrics: IObservableMetrics = {
  totalGets: 0,
  totalSets: 0,
  totalDeletes: 0,
  totalHas: 0,
  totalNotifications: 0,
  proxyCount: 0,
  pathsAccessed: new Set(),
};

const notifyAllObservers = (path: string, value: unknown, operation: string): void => {
  const resolvedPath = ULTIMATE_STRING_RESOLVER(path);
  _globalObservableMetrics.totalNotifications++;
  _globalObservableMetrics.pathsAccessed.add(resolvedPath);
  for (const observer of _globalObservers) {
    observer(resolvedPath, value, operation);
  }
};

export const createObservableProxy = <T extends object>(target: T, basePath: string = ""): T => {
  _globalObservableMetrics.proxyCount++;
  
  return new Proxy(target, {
    get(obj, prop, receiver) {
      const propStr = String(prop);
      const fullPath = basePath ? $$_STR(`${basePath}.${propStr}`) : propStr;
      _globalObservableMetrics.totalGets++;
      notifyAllObservers(fullPath, undefined, $$_STR("GET"));
      
      const value = Reflect.get(obj, prop, receiver);
      
      // If value is an object, wrap it in another proxy (recursive proxification!)
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return createObservableProxy(value as object, fullPath);
      }
      
      return value;
    },
    
    set(obj, prop, value, receiver) {
      const propStr = String(prop);
      const fullPath = basePath ? $$_STR(`${basePath}.${propStr}`) : propStr;
      _globalObservableMetrics.totalSets++;
      notifyAllObservers(fullPath, value, $$_STR("SET"));
      return Reflect.set(obj, prop, value, receiver);
    },
    
    deleteProperty(obj, prop) {
      const propStr = String(prop);
      const fullPath = basePath ? $$_STR(`${basePath}.${propStr}`) : propStr;
      _globalObservableMetrics.totalDeletes++;
      notifyAllObservers(fullPath, undefined, $$_STR("DELETE"));
      return Reflect.deleteProperty(obj, prop);
    },
    
    has(obj, prop) {
      const propStr = String(prop);
      const fullPath = basePath ? $$_STR(`${basePath}.${propStr}`) : propStr;
      _globalObservableMetrics.totalHas++;
      notifyAllObservers(fullPath, undefined, $$_STR("HAS"));
      return Reflect.has(obj, prop);
    },
  });
};

// Create observable versions of common things
export const createObservableConfig = (config: Record<string, unknown>) => 
  createObservableProxy(ULTIMATE_VALUE_RESOLVER(config), $$_STR("config"));

export const createObservableState = <T extends object>(state: T, name: string) =>
  createObservableProxy(ULTIMATE_VALUE_RESOLVER(state), ULTIMATE_STRING_RESOLVER(name));

export const getObservableMetrics = (): string => {
  return $$_STR(`[ObservableProxy] Proxies: ${_globalObservableMetrics.proxyCount}, Gets: ${_globalObservableMetrics.totalGets}, Sets: ${_globalObservableMetrics.totalSets}, Notifications: ${_globalObservableMetrics.totalNotifications}, Paths: ${_globalObservableMetrics.pathsAccessed.size}`);
};

export const addGlobalObserver = (callback: ObservableCallback): void => {
  _globalObservers.push(callback);
};
