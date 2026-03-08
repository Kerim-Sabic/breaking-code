// =============================================================================
// CHAOS STORE - Local state management for the Glorious Mess
// =============================================================================

import { useState, useCallback, useEffect } from 'react';
import type {
  ChaosIdea, BrainDump, FrictionChallenge, ProjectArea,
  ChaosRoom, ArchaeologyFind, EmotionalMode, MessType, TaskState,
  FermentationCheckIn, FailureEntry,
} from '@/types/chaos';

const STORAGE_KEY = 'glorious-mess-store';

interface ChaosState {
  ideas: ChaosIdea[];
  brainDumps: BrainDump[];
  frictionChallenges: FrictionChallenge[];
  projectAreas: ProjectArea[];
  chaosRooms: ChaosRoom[];
  archaeologyFinds: ArchaeologyFind[];
  currentMood: EmotionalMode;
  failureCount: number;
  pivotCount: number;
  abandonedCount: number;
  totalBrainDumps: number;
}

const defaultState: ChaosState = {
  ideas: [],
  brainDumps: [],
  frictionChallenges: [],
  projectAreas: [
    { id: 'area-1', name: 'Work', emoji: '💼', color: 'chaos-ocean', description: 'Professional projects', ideaIds: [] },
    { id: 'area-2', name: 'Creative', emoji: '🎨', color: 'chaos-aurora', description: 'Art, writing, music', ideaIds: [] },
    { id: 'area-3', name: 'Personal', emoji: '🌱', color: 'chaos-moss', description: 'Self, relationships, growth', ideaIds: [] },
    { id: 'area-4', name: 'Wild Card', emoji: '🃏', color: 'chaos-prism', description: 'Uncategorizable brilliance', ideaIds: [] },
  ],
  chaosRooms: [],
  archaeologyFinds: [],
  currentMood: 'scattered',
  failureCount: 0,
  pivotCount: 0,
  abandonedCount: 0,
  totalBrainDumps: 0,
};

function loadState(): ChaosState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState, ...JSON.parse(raw) };
  } catch {}
  return defaultState;
}

function saveState(state: ChaosState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useChaosStore() {
  const [state, setState] = useState<ChaosState>(loadState);

  useEffect(() => { saveState(state); }, [state]);

  const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const setMood = useCallback((mood: EmotionalMode) => {
    setState(s => ({ ...s, currentMood: mood }));
  }, []);

  const addIdea = useCallback((idea: Omit<ChaosIdea, 'id' | 'createdAt' | 'updatedAt' | 'fermentationCheckIns' | 'failureLog' | 'archived'>) => {
    const newIdea: ChaosIdea = {
      ...idea,
      id: uid(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      fermentationCheckIns: [],
      failureLog: [],
      archived: false,
    };
    setState(s => ({ ...s, ideas: [newIdea, ...s.ideas] }));
    return newIdea.id;
  }, []);

  const updateIdea = useCallback((id: string, updates: Partial<ChaosIdea>) => {
    setState(s => ({
      ...s,
      ideas: s.ideas.map(i => i.id === id ? { ...i, ...updates, updatedAt: Date.now() } : i),
    }));
  }, []);

  const addState = useCallback((id: string, newState: TaskState) => {
    setState(s => ({
      ...s,
      ideas: s.ideas.map(i => i.id === id ? { ...i, states: [...new Set([...i.states, newState])], updatedAt: Date.now() } : i),
    }));
  }, []);

  const removeState = useCallback((id: string, stateToRemove: TaskState) => {
    setState(s => ({
      ...s,
      ideas: s.ideas.map(i => i.id === id ? { ...i, states: i.states.filter(st => st !== stateToRemove), updatedAt: Date.now() } : i),
    }));
  }, []);

  const addConnection = useCallback((id1: string, id2: string) => {
    setState(s => ({
      ...s,
      ideas: s.ideas.map(i => {
        if (i.id === id1 && !i.connections.includes(id2)) return { ...i, connections: [...i.connections, id2] };
        if (i.id === id2 && !i.connections.includes(id1)) return { ...i, connections: [...i.connections, id1] };
        return i;
      }),
    }));
  }, []);

  const addBrainDump = useCallback((dump: Omit<BrainDump, 'id' | 'timestamp'>) => {
    setState(s => ({
      ...s,
      brainDumps: [{ ...dump, id: uid(), timestamp: Date.now() }, ...s.brainDumps],
      totalBrainDumps: s.totalBrainDumps + 1,
    }));
  }, []);

  const addFrictionChallenge = useCallback((challenge: Omit<FrictionChallenge, 'id' | 'createdAt' | 'responses'>) => {
    setState(s => ({
      ...s,
      frictionChallenges: [{ ...challenge, id: uid(), createdAt: Date.now(), responses: [] }, ...s.frictionChallenges],
    }));
  }, []);

  const logFailure = useCallback((ideaId: string, entry: Omit<FailureEntry, 'id' | 'timestamp'>) => {
    const newEntry: FailureEntry = { ...entry, id: uid(), timestamp: Date.now() };
    setState(s => ({
      ...s,
      failureCount: s.failureCount + 1,
      ideas: s.ideas.map(i => i.id === ideaId ? { ...i, failureLog: [...i.failureLog, newEntry] } : i),
    }));
  }, []);

  const addFermentationCheckIn = useCallback((ideaId: string, checkIn: Omit<FermentationCheckIn, 'id' | 'timestamp'>) => {
    const newCheckIn: FermentationCheckIn = { ...checkIn, id: uid(), timestamp: Date.now() };
    setState(s => ({
      ...s,
      ideas: s.ideas.map(i => i.id === ideaId ? { ...i, fermentationCheckIns: [...i.fermentationCheckIns, newCheckIn] } : i),
    }));
  }, []);

  const abandonIdea = useCallback((ideaId: string, celebrationNote: string) => {
    setState(s => ({
      ...s,
      abandonedCount: s.abandonedCount + 1,
      ideas: s.ideas.map(i => i.id === ideaId ? {
        ...i,
        states: ['beautifully-abandoned' as TaskState],
        failureLog: [...i.failureLog, { id: uid(), timestamp: Date.now(), description: 'Beautifully abandoned', lesson: 'Sometimes letting go is the most creative act', celebrationNote }],
        updatedAt: Date.now(),
      } : i),
    }));
  }, []);

  const pivotIdea = useCallback((ideaId: string, newDirection: string) => {
    setState(s => ({
      ...s,
      pivotCount: s.pivotCount + 1,
      ideas: s.ideas.map(i => i.id === ideaId ? {
        ...i,
        failureLog: [...i.failureLog, { id: uid(), timestamp: Date.now(), description: `Pivoted: ${newDirection}`, lesson: 'Direction changes are discoveries', pivotDirection: newDirection, celebrationNote: '🔀 New direction unlocked!' }],
        updatedAt: Date.now(),
      } : i),
    }));
  }, []);

  const surfaceArchaeology = useCallback((ideaId: string, reason: string, suggestedAction: string) => {
    setState(s => ({
      ...s,
      archaeologyFinds: [{ id: uid(), ideaId, surfacedAt: Date.now(), reason, suggestedAction, acknowledged: false }, ...s.archaeologyFinds],
    }));
  }, []);

  return {
    ...state,
    setMood,
    addIdea,
    updateIdea,
    addState,
    removeState,
    addConnection,
    addBrainDump,
    addFrictionChallenge,
    logFailure,
    addFermentationCheckIn,
    abandonIdea,
    pivotIdea,
    surfaceArchaeology,
  };
}
