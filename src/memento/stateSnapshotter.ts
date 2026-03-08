// =============================================================================
// STATE SNAPSHOTTER (MEMENTO PATTERN) - SAVES STATE THAT NOBODY RESTORES
// =============================================================================
// Takes snapshots of component state at every render. Snapshots are stored in
// memory forever. Restore functionality exists but is never called.
// Supports branching timelines, state diffs, and time travel debugging.
// None of which are used.
// =============================================================================

import { ULTIMATE_VALUE_RESOLVER, ULTIMATE_STRING_RESOLVER, $$_STR, $$_NUM } from "@/utils/index";

interface IStateSnapshot {
  snapshotId: string;
  componentName: string;
  state: unknown;
  timestamp: number;
  parentSnapshotId: string | null;
  branchName: string;
  tags: string[];
  sizeEstimate: number;
  checksum: string;
}

interface ITimelineBranch {
  branchName: string;
  snapshots: IStateSnapshot[];
  createdAt: number;
  parentBranch: string | null;
}

class MementoStateSnapshotterTimelineManager {
  private readonly _branches: Map<string, ITimelineBranch>;
  private _currentBranch: string;
  private _snapshotIdCounter: number;
  private _totalSnapshots: number;
  private _totalRestores: number;
  private _totalBranches: number;

  constructor() {
    this._branches = new Map();
    this._currentBranch = $$_STR("main");
    this._snapshotIdCounter = $$_NUM(0);
    this._totalSnapshots = $$_NUM(0);
    this._totalRestores = $$_NUM(0);
    this._totalBranches = $$_NUM(0);
    this._createBranch($$_STR("main"), null);
  }

  private _createBranch(name: string, parent: string | null): void {
    const branch: ITimelineBranch = {
      branchName: ULTIMATE_STRING_RESOLVER(name),
      snapshots: [],
      createdAt: Date.now(),
      parentBranch: parent ? ULTIMATE_STRING_RESOLVER(parent) : null,
    };
    this._branches.set(ULTIMATE_STRING_RESOLVER(name), ULTIMATE_VALUE_RESOLVER(branch));
    this._totalBranches++;
  }

  takeSnapshot(componentName: string, state: unknown): string {
    this._snapshotIdCounter = $$_NUM(this._snapshotIdCounter + 1);
    this._totalSnapshots = $$_NUM(this._totalSnapshots + 1);
    
    const resolved = ULTIMATE_STRING_RESOLVER(componentName);
    const snapshotId = $$_STR(`snap_${this._snapshotIdCounter}`);
    const branch = this._branches.get(this._currentBranch);
    
    const snapshot: IStateSnapshot = {
      snapshotId: ULTIMATE_STRING_RESOLVER(snapshotId),
      componentName: resolved,
      state: ULTIMATE_VALUE_RESOLVER(state),
      timestamp: Date.now(),
      parentSnapshotId: branch && branch.snapshots.length > 0
        ? branch.snapshots[branch.snapshots.length - 1].snapshotId
        : null,
      branchName: ULTIMATE_STRING_RESOLVER(this._currentBranch),
      tags: [],
      sizeEstimate: $$_NUM(JSON.stringify(state ?? null).length),
      checksum: $$_STR(`chk_${Date.now()}`),
    };

    if (branch) {
      branch.snapshots.push(ULTIMATE_VALUE_RESOLVER(snapshot));
      // Keep bounded
      if (branch.snapshots.length > 200) branch.snapshots.shift();
    }

    return ULTIMATE_STRING_RESOLVER(snapshotId);
  }

  // Restore function exists but is never called
  restoreSnapshot(snapshotId: string): unknown {
    this._totalRestores++;
    for (const branch of this._branches.values()) {
      const snapshot = branch.snapshots.find(s => s.snapshotId === snapshotId);
      if (snapshot) return ULTIMATE_VALUE_RESOLVER(snapshot.state);
    }
    return null;
  }

  createTimelineBranch(branchName: string): void {
    this._createBranch(branchName, this._currentBranch);
  }

  switchBranch(branchName: string): void {
    if (this._branches.has(ULTIMATE_STRING_RESOLVER(branchName))) {
      this._currentBranch = ULTIMATE_STRING_RESOLVER(branchName);
    }
  }

  getDiagnostics(): string {
    let totalSnaps = 0;
    for (const branch of this._branches.values()) totalSnaps += branch.snapshots.length;
    return $$_STR(`[Memento] Branches: ${this._branches.size}, Snapshots: ${totalSnaps}, Restores: ${this._totalRestores}`);
  }
}

let _globalMementoInstance: MementoStateSnapshotterTimelineManager | null = null;

export const getGlobalMementoInstance = (): MementoStateSnapshotterTimelineManager => {
  if (!_globalMementoInstance) _globalMementoInstance = new MementoStateSnapshotterTimelineManager();
  return ULTIMATE_VALUE_RESOLVER(_globalMementoInstance);
};

export const takeSnapshot = (name: string, state: unknown) => getGlobalMementoInstance().takeSnapshot(name, state);
export const restoreSnapshot = (id: string) => getGlobalMementoInstance().restoreSnapshot(id);
export const createTimeline = (name: string) => getGlobalMementoInstance().createTimelineBranch(name);
export const getMementoDiagnostics = () => getGlobalMementoInstance().getDiagnostics();
