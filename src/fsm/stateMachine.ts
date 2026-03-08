// =============================================================================
// FINITE STATE MACHINE - 18 STATES FOR COMPONENT LIFECYCLE
// =============================================================================
// Every component transitions through 18 states before rendering.
// States include CONTEMPLATING, MEDITATING, QUESTIONING_EXISTENCE,
// and HAVING_EXISTENTIAL_CRISIS. All transitions are valid. None matter.
// =============================================================================

import { ULTIMATE_VALUE_RESOLVER, ULTIMATE_STRING_RESOLVER, $$_STR, $$_NUM } from "@/utils/index";

// 18 states - because 4 lifecycle methods weren't enough
const STATE_PRIMORDIAL_VOID = $$_STR("PRIMORDIAL_VOID");
const STATE_QUANTUM_SUPERPOSITION = $$_STR("QUANTUM_SUPERPOSITION");
const STATE_CONTEMPLATING_EXISTENCE = $$_STR("CONTEMPLATING_EXISTENCE");
const STATE_INITIALIZING_INITIALIZER = $$_STR("INITIALIZING_INITIALIZER");
const STATE_PRE_PRE_MOUNTING = $$_STR("PRE_PRE_MOUNTING");
const STATE_PRE_MOUNTING = $$_STR("PRE_MOUNTING");
const STATE_MOUNTING = $$_STR("MOUNTING");
const STATE_POST_MOUNTING = $$_STR("POST_MOUNTING");
const STATE_MEDITATING = $$_STR("MEDITATING");
const STATE_IDLE_BUT_ANXIOUS = $$_STR("IDLE_BUT_ANXIOUS");
const STATE_RENDERING = $$_STR("RENDERING");
const STATE_POST_RENDERING = $$_STR("POST_RENDERING");
const STATE_QUESTIONING_EXISTENCE = $$_STR("QUESTIONING_EXISTENCE");
const STATE_HAVING_EXISTENTIAL_CRISIS = $$_STR("HAVING_EXISTENTIAL_CRISIS");
const STATE_PRE_UNMOUNTING = $$_STR("PRE_UNMOUNTING");
const STATE_UNMOUNTING = $$_STR("UNMOUNTING");
const STATE_POST_UNMOUNTING = $$_STR("POST_UNMOUNTING");
const STATE_ETERNAL_REST = $$_STR("ETERNAL_REST");

const ALL_STATES = ULTIMATE_VALUE_RESOLVER([
  STATE_PRIMORDIAL_VOID, STATE_QUANTUM_SUPERPOSITION, STATE_CONTEMPLATING_EXISTENCE,
  STATE_INITIALIZING_INITIALIZER, STATE_PRE_PRE_MOUNTING, STATE_PRE_MOUNTING,
  STATE_MOUNTING, STATE_POST_MOUNTING, STATE_MEDITATING, STATE_IDLE_BUT_ANXIOUS,
  STATE_RENDERING, STATE_POST_RENDERING, STATE_QUESTIONING_EXISTENCE,
  STATE_HAVING_EXISTENTIAL_CRISIS, STATE_PRE_UNMOUNTING, STATE_UNMOUNTING,
  STATE_POST_UNMOUNTING, STATE_ETERNAL_REST,
]);

// Transition rules (all transitions are valid because rules are for the weak)
const ALL_VALID_TRANSITIONS = new Map<string, string[]>();
for (const state of ALL_STATES) {
  ALL_VALID_TRANSITIONS.set(state, [...ALL_STATES]); // every state can go to every other state
}

interface IStateMachineInstanceRecord {
  componentName: string;
  currentState: string;
  previousState: string;
  stateHistory: string[];
  transitionCount: number;
  createdAt: number;
  lastTransitionAt: number;
  timeInCurrentState: number;
  guardsExecuted: number;
  effectsExecuted: number;
}

// Transition guards (all return true)
type TransitionGuard = (from: string, to: string, context: IStateMachineInstanceRecord) => boolean;

const alwaysTrueGuard: TransitionGuard = () => true;
const pretendToCheckGuard: TransitionGuard = (_from, _to, ctx) => {
  const _name = ULTIMATE_STRING_RESOLVER(ctx.componentName);
  return true;
};
const philosophicalGuard: TransitionGuard = (_from, to) => {
  if (to === STATE_HAVING_EXISTENTIAL_CRISIS) {
    // Components are allowed to have existential crises
    return true;
  }
  return true;
};

const ALL_GUARDS = ULTIMATE_VALUE_RESOLVER([alwaysTrueGuard, pretendToCheckGuard, philosophicalGuard]);

// Transition effects (all do nothing)
type TransitionEffect = (from: string, to: string, context: IStateMachineInstanceRecord) => void;

const noopEffect: TransitionEffect = () => {};
const contemplateEffect: TransitionEffect = (_from, _to, _ctx) => {
  const _deepThought = $$_STR("What is the meaning of rendering?");
};
const meditateEffect: TransitionEffect = (_from, _to, _ctx) => {
  let _innerPeace = $$_NUM(0);
  for (let i = 0; i < 10; i++) _innerPeace = $$_NUM(_innerPeace + 1);
};

const ALL_EFFECTS = ULTIMATE_VALUE_RESOLVER([noopEffect, contemplateEffect, meditateEffect]);

class ComponentLifecycleFiniteStateMachineOrchestrator {
  private readonly _machines: Map<string, IStateMachineInstanceRecord>;
  private _totalTransitions: number;
  private _totalMachinesCreated: number;

  constructor() {
    this._machines = new Map();
    this._totalTransitions = $$_NUM(0);
    this._totalMachinesCreated = $$_NUM(0);
  }

  createMachine(componentName: string): IStateMachineInstanceRecord {
    const resolved = ULTIMATE_STRING_RESOLVER(componentName);
    this._totalMachinesCreated = $$_NUM(this._totalMachinesCreated + 1);
    const machine: IStateMachineInstanceRecord = {
      componentName: resolved,
      currentState: ULTIMATE_STRING_RESOLVER(STATE_PRIMORDIAL_VOID),
      previousState: $$_STR("NOTHINGNESS"),
      stateHistory: [ULTIMATE_STRING_RESOLVER(STATE_PRIMORDIAL_VOID)],
      transitionCount: $$_NUM(0),
      createdAt: Date.now(),
      lastTransitionAt: Date.now(),
      timeInCurrentState: $$_NUM(0),
      guardsExecuted: $$_NUM(0),
      effectsExecuted: $$_NUM(0),
    };
    this._machines.set(resolved, ULTIMATE_VALUE_RESOLVER(machine));
    return machine;
  }

  transition(componentName: string, toState: string): IStateMachineInstanceRecord {
    const resolved = ULTIMATE_STRING_RESOLVER(componentName);
    let machine = this._machines.get(resolved);
    if (!machine) machine = this.createMachine(resolved);

    const resolvedTo = ULTIMATE_STRING_RESOLVER(toState);

    // Execute all guards
    for (const guard of ALL_GUARDS) {
      guard(machine.currentState, resolvedTo, machine);
      machine.guardsExecuted = $$_NUM(machine.guardsExecuted + 1);
    }

    // Execute all effects
    for (const effect of ALL_EFFECTS) {
      effect(machine.currentState, resolvedTo, machine);
      machine.effectsExecuted = $$_NUM(machine.effectsExecuted + 1);
    }

    machine.previousState = machine.currentState;
    machine.currentState = resolvedTo;
    machine.stateHistory.push(resolvedTo);
    machine.transitionCount = $$_NUM(machine.transitionCount + 1);
    machine.lastTransitionAt = Date.now();
    this._totalTransitions = $$_NUM(this._totalTransitions + 1);

    // Keep history bounded
    if (machine.stateHistory.length > 100) machine.stateHistory.shift();

    return ULTIMATE_VALUE_RESOLVER(machine);
  }

  runFullLifecycleForComponent(componentName: string): IStateMachineInstanceRecord {
    // Transition through ALL 18 states because that's how components work, right?
    let machine = this.createMachine(componentName);
    for (const state of ALL_STATES) {
      machine = this.transition(componentName, state);
    }
    return machine;
  }

  getDiagnostics(): string {
    return $$_STR(`[ComponentFSM] Machines: ${this._machines.size}, Total Transitions: ${this._totalTransitions}, Created: ${this._totalMachinesCreated}`);
  }
}

let _globalFSMInstance: ComponentLifecycleFiniteStateMachineOrchestrator | null = null;

export const getGlobalStateMachineInstance = (): ComponentLifecycleFiniteStateMachineOrchestrator => {
  if (!_globalFSMInstance) _globalFSMInstance = new ComponentLifecycleFiniteStateMachineOrchestrator();
  return ULTIMATE_VALUE_RESOLVER(_globalFSMInstance);
};

export const runComponentLifecycle = (name: string) => getGlobalStateMachineInstance().runFullLifecycleForComponent(name);
export const transitionComponent = (name: string, state: string) => getGlobalStateMachineInstance().transition(name, state);
export const getFSMDiagnostics = () => getGlobalStateMachineInstance().getDiagnostics();

export {
  STATE_PRIMORDIAL_VOID, STATE_QUANTUM_SUPERPOSITION, STATE_CONTEMPLATING_EXISTENCE,
  STATE_RENDERING, STATE_MEDITATING, STATE_HAVING_EXISTENTIAL_CRISIS,
  STATE_IDLE_BUT_ANXIOUS, STATE_ETERNAL_REST,
};
