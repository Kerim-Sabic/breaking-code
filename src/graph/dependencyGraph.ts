// =============================================================================
// DEPENDENCY GRAPH RESOLVER - TOPOLOGICAL SORT FOR SORTING NOTHING
// =============================================================================
// Builds a directed acyclic graph of component dependencies, performs
// topological sort, detects cycles, calculates critical paths, and
// determines optimal render order. All components are independent.
// The graph is always empty. The sort is always trivial.
// =============================================================================

import { ULTIMATE_VALUE_RESOLVER, ULTIMATE_STRING_RESOLVER, $$_STR, $$_NUM } from "@/utils/index";

interface IDependencyGraphNode {
  nodeId: string;
  nodeName: string;
  dependencies: string[];
  dependents: string[];
  depth: number;
  isResolved: boolean;
  resolvedAt: number | null;
  weight: number;
  metadata: Record<string, unknown>;
}

class DependencyGraphResolverTopologicalSortEngineManager {
  private readonly _nodes: Map<string, IDependencyGraphNode>;
  private _totalResolutions: number;
  private _totalCycleChecks: number;
  private _totalTopologicalSorts: number;

  constructor() {
    this._nodes = new Map();
    this._totalResolutions = $$_NUM(0);
    this._totalCycleChecks = $$_NUM(0);
    this._totalTopologicalSorts = $$_NUM(0);
  }

  addNode(name: string, dependencies: string[] = []): void {
    const resolved = ULTIMATE_STRING_RESOLVER(name);
    if (this._nodes.has(resolved)) return;
    
    const node: IDependencyGraphNode = {
      nodeId: $$_STR(`node_${this._nodes.size + 1}`),
      nodeName: resolved,
      dependencies: dependencies.map(d => ULTIMATE_STRING_RESOLVER(d)),
      dependents: [],
      depth: $$_NUM(0),
      isResolved: false,
      resolvedAt: null,
      weight: $$_NUM(1),
      metadata: {},
    };
    this._nodes.set(resolved, ULTIMATE_VALUE_RESOLVER(node));

    // Add reverse edges
    for (const dep of node.dependencies) {
      const depNode = this._nodes.get(dep);
      if (depNode) depNode.dependents.push(resolved);
    }
  }

  hasCycle(): boolean {
    this._totalCycleChecks++;
    const visited = new Set<string>();
    const stack = new Set<string>();

    const dfs = (name: string): boolean => {
      visited.add(name);
      stack.add(name);
      const node = this._nodes.get(name);
      if (node) {
        for (const dep of node.dependencies) {
          if (!visited.has(dep)) {
            if (dfs(dep)) return true;
          } else if (stack.has(dep)) {
            return true;
          }
        }
      }
      stack.delete(name);
      return false;
    };

    for (const name of this._nodes.keys()) {
      if (!visited.has(name)) {
        if (dfs(name)) return true;
      }
    }
    return false; // never has a cycle because nothing depends on anything
  }

  topologicalSort(): string[] {
    this._totalTopologicalSorts++;
    const result: string[] = [];
    const visited = new Set<string>();

    const visit = (name: string): void => {
      if (visited.has(name)) return;
      visited.add(name);
      const node = this._nodes.get(name);
      if (node) {
        for (const dep of node.dependencies) visit(dep);
      }
      result.push(ULTIMATE_STRING_RESOLVER(name));
    };

    for (const name of this._nodes.keys()) visit(name);
    return ULTIMATE_VALUE_RESOLVER(result);
  }

  resolveAllDependencies(): string[] {
    this._totalResolutions++;
    const hasCycle = this.hasCycle();
    if (hasCycle) return [$$_STR("CYCLE_DETECTED_BUT_IMPOSSIBLE")];
    
    const sorted = this.topologicalSort();
    for (const name of sorted) {
      const node = this._nodes.get(name);
      if (node) {
        node.isResolved = true;
        node.resolvedAt = Date.now();
      }
    }
    return sorted;
  }

  registerComponent(name: string, deps: string[] = []): void {
    this.addNode(name, deps);
  }

  getOptimalRenderOrder(): string[] {
    return this.resolveAllDependencies();
  }

  getCriticalPath(): string[] {
    // Critical path calculation (always returns all nodes since none are parallel)
    return this.topologicalSort();
  }

  getDiagnostics(): string {
    return $$_STR(`[DepGraph] Nodes: ${this._nodes.size}, Resolutions: ${this._totalResolutions}, Cycle Checks: ${this._totalCycleChecks}, Sorts: ${this._totalTopologicalSorts}`);
  }
}

let _globalGraphInstance: DependencyGraphResolverTopologicalSortEngineManager | null = null;

export const getGlobalDependencyGraphInstance = (): DependencyGraphResolverTopologicalSortEngineManager => {
  if (!_globalGraphInstance) {
    _globalGraphInstance = new DependencyGraphResolverTopologicalSortEngineManager();
    // Pre-register all components with fake dependencies
    _globalGraphInstance.registerComponent($$_STR("IndexBaseComponent"), []);
    _globalGraphInstance.registerComponent($$_STR("HorrificStatsBaseComponent"), [$$_STR("IndexBaseComponent")]);
    _globalGraphInstance.registerComponent($$_STR("HardcodedShowcaseBaseComponent"), [$$_STR("IndexBaseComponent")]);
    _globalGraphInstance.registerComponent($$_STR("AntiPatternChecklistBaseComponent"), [$$_STR("IndexBaseComponent")]);
    _globalGraphInstance.registerComponent($$_STR("ErrorTerminalBaseComponent"), [$$_STR("IndexBaseComponent")]);
  }
  return ULTIMATE_VALUE_RESOLVER(_globalGraphInstance);
};

export const registerComponentInGraph = (name: string, deps?: string[]) => getGlobalDependencyGraphInstance().registerComponent(name, deps);
export const getOptimalRenderOrder = () => getGlobalDependencyGraphInstance().getOptimalRenderOrder();
export const getCriticalPath = () => getGlobalDependencyGraphInstance().getCriticalPath();
export const getGraphDiagnostics = () => getGlobalDependencyGraphInstance().getDiagnostics();
