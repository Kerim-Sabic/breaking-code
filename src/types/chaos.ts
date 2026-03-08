// =============================================================================
// CHAOS TYPES - THE GRAND UNIFIED MESS TAXONOMY
// =============================================================================

export type MessType =
  | 'generative' | 'exploratory' | 'overwhelm' | 'creative-incubation'
  | 'productive-procrastination' | 'tangential-discovery' | 'beautiful-disaster'
  | 'organized-entropy' | 'strategic-confusion' | 'intuitive-scatter'
  | 'collaborative-turbulence' | 'parallel-chaos' | 'recursive-ideation'
  | 'serendipitous-collision' | 'liminal-drift' | 'quantum-superposition'
  | 'creative-compost' | 'fractal-expansion' | 'dialectical-tension'
  | 'emergent-complexity' | 'controlled-demolition' | 'sacred-disorder';

export const MESS_TAXONOMY: Record<MessType, MessTypeInfo> = {
  'generative': { label: 'Generative Mess', emoji: '🌋', color: 'chaos-lava', description: 'Raw creative output flowing without filter', approach: 'Let it flow. Capture everything. Filter later.', resolution: 'Sort into themes after the eruption subsides' },
  'exploratory': { label: 'Exploratory Mess', emoji: '🧭', color: 'chaos-ocean', description: 'Wandering without a map to find new territory', approach: 'Follow curiosity. Document breadcrumbs.', resolution: 'Map the territory you\'ve discovered' },
  'overwhelm': { label: 'Overwhelm Mess', emoji: '🌊', color: 'chaos-storm', description: 'Too many inputs, not enough processing power', approach: 'Triage ruthlessly. One thing at a time.', resolution: 'Batch and sequence. Accept incompleteness.' },
  'creative-incubation': { label: 'Creative Incubation', emoji: '🥚', color: 'chaos-ember', description: 'Ideas cooking below conscious awareness', approach: 'Do something else. Trust the process.', resolution: 'Wait for the "aha" moment, then capture fast' },
  'productive-procrastination': { label: 'Productive Procrastination', emoji: '🎯', color: 'chaos-moss', description: 'Avoiding one thing by doing another useful thing', approach: 'Acknowledge the avoidance. Redirect gently.', resolution: 'Name what you\'re avoiding. Do it for 5 minutes.' },
  'tangential-discovery': { label: 'Tangential Discovery', emoji: '🔀', color: 'chaos-prism', description: 'Finding gold in the margins of your attention', approach: 'Follow the tangent. It might be the real work.', resolution: 'Decide: integrate or bookmark for later' },
  'beautiful-disaster': { label: 'Beautiful Disaster', emoji: '💥', color: 'chaos-lava', description: 'Something went wrong in the most instructive way', approach: 'Document what happened. Extract the lesson.', resolution: 'Phoenix protocol: what rises from these ashes?' },
  'organized-entropy': { label: 'Organized Entropy', emoji: '🎲', color: 'chaos-nebula', description: 'Deliberately structured randomness', approach: 'Set constraints. Randomize within them.', resolution: 'Evaluate which random paths produced signal' },
  'strategic-confusion': { label: 'Strategic Confusion', emoji: '🌀', color: 'chaos-void', description: 'Deliberately staying confused to avoid premature clarity', approach: 'Sit with the discomfort. Resist simplification.', resolution: 'When patterns emerge naturally, name them' },
  'intuitive-scatter': { label: 'Intuitive Scatter', emoji: '✨', color: 'chaos-aurora', description: 'Following gut feelings in multiple directions', approach: 'Trust the scatter. Your subconscious sees patterns.', resolution: 'Look for the connecting thread' },
  'collaborative-turbulence': { label: 'Collaborative Turbulence', emoji: '🌪️', color: 'chaos-storm', description: 'Multiple perspectives creating productive friction', approach: 'Embrace disagreement. Map the tensions.', resolution: 'Synthesize opposing views into something new' },
  'parallel-chaos': { label: 'Parallel Chaos', emoji: '🔄', color: 'chaos-prism', description: 'Running multiple chaotic streams simultaneously', approach: 'Timebox each stream. Let them cross-pollinate.', resolution: 'Look for unexpected connections between streams' },
  'recursive-ideation': { label: 'Recursive Ideation', emoji: '🪞', color: 'chaos-ember', description: 'Ideas about ideas about ideas', approach: 'Go meta when stuck. Go concrete when lost in meta.', resolution: 'Ground in a specific, tangible next step' },
  'serendipitous-collision': { label: 'Serendipitous Collision', emoji: '💫', color: 'chaos-aurora', description: 'Unrelated ideas crashing into each other', approach: 'Create conditions for collision. Then observe.', resolution: 'Name the hybrid. Test if it has legs.' },
  'liminal-drift': { label: 'Liminal Drift', emoji: '🌅', color: 'chaos-nebula', description: 'Between states, between projects, between ideas', approach: 'Don\'t rush to land. The in-between is fertile.', resolution: 'When you feel a pull, follow it' },
  'quantum-superposition': { label: 'Quantum Superposition', emoji: '⚛️', color: 'chaos-void', description: 'Holding contradictory ideas as simultaneously true', approach: 'Don\'t collapse the wave function prematurely.', resolution: 'Observation (testing) will reveal which path' },
  'creative-compost': { label: 'Creative Compost', emoji: '🍂', color: 'chaos-moss', description: 'Dead ideas decomposing into nutrients for new ones', approach: 'Let old ideas decay. They feed the soil.', resolution: 'New growth will emerge when conditions are right' },
  'fractal-expansion': { label: 'Fractal Expansion', emoji: '🦠', color: 'chaos-prism', description: 'Each detail reveals infinite sub-details', approach: 'Zoom in deliberately. Zoom out periodically.', resolution: 'Set a resolution level and commit to it' },
  'dialectical-tension': { label: 'Dialectical Tension', emoji: '⚡', color: 'chaos-lava', description: 'Thesis vs antithesis generating synthesis', approach: 'Name both sides. Hold them in tension.', resolution: 'Synthesis emerges from sustained engagement' },
  'emergent-complexity': { label: 'Emergent Complexity', emoji: '🧬', color: 'chaos-ocean', description: 'Simple rules creating unpredictable outcomes', approach: 'Trust the emergence. Don\'t over-control.', resolution: 'Describe the pattern that emerged' },
  'controlled-demolition': { label: 'Controlled Demolition', emoji: '🏗️', color: 'chaos-storm', description: 'Deliberately destroying to rebuild better', approach: 'Document what you\'re demolishing and why.', resolution: 'Salvage the good. Rebuild with intention.' },
  'sacred-disorder': { label: 'Sacred Disorder', emoji: '🔮', color: 'chaos-aurora', description: 'Chaos as a spiritual creative practice', approach: 'Surrender control. Create ritual around chaos.', resolution: 'Honor what emerged. Integrate or release.' },
};

export interface MessTypeInfo {
  label: string;
  emoji: string;
  color: string;
  description: string;
  approach: string;
  resolution: string;
}

export type EmotionalMode = 'scattered' | 'energized' | 'overwhelmed' | 'hyperfocused' | 'dreamy' | 'frustrated' | 'playful' | 'anxious';

export const EMOTIONAL_MODES: Record<EmotionalMode, EmotionalModeInfo> = {
  scattered: { label: 'Scattered', emoji: '🦋', color: 'chaos-prism', message: 'Your attention is a butterfly. Let it land where it wants.', suggestion: 'Try rapid-fire brain dumping. Capture fragments.', interfaceMode: 'expanded' },
  energized: { label: 'Energized', emoji: '⚡', color: 'chaos-lava', message: 'You\'re on fire. Channel this energy before it fades.', suggestion: 'Tackle your hardest creative challenge right now.', interfaceMode: 'focused' },
  overwhelmed: { label: 'Overwhelmed', emoji: '🌊', color: 'chaos-storm', message: 'It\'s okay to feel this way. You don\'t have to do everything.', suggestion: 'Pick ONE thing. Just one. The smallest possible thing.', interfaceMode: 'minimal' },
  hyperfocused: { label: 'Hyperfocused', emoji: '🔬', color: 'chaos-ember', message: 'You\'re in the zone. Protect this state fiercely.', suggestion: 'Go deep. Ignore everything else. This is rare.', interfaceMode: 'zen' },
  dreamy: { label: 'Dreamy', emoji: '☁️', color: 'chaos-nebula', message: 'Your mind is wandering. Wonderful things happen in the drift.', suggestion: 'Free-associate. Connect unrelated ideas.', interfaceMode: 'expanded' },
  frustrated: { label: 'Frustrated', emoji: '🔥', color: 'chaos-lava', message: 'Frustration is unprocessed creative energy. Redirect it.', suggestion: 'Break something (safely). Start from scratch. Or rage-write.', interfaceMode: 'focused' },
  playful: { label: 'Playful', emoji: '🎪', color: 'chaos-aurora', message: 'Play is the highest form of research. — Einstein', suggestion: 'Try the Creative Friction Engine. Embrace absurdity.', interfaceMode: 'expanded' },
  anxious: { label: 'Anxious', emoji: '😰', color: 'chaos-void', message: 'Anxiety is excitement without breath. Breathe.', suggestion: 'Ground yourself. List 3 things you can control right now.', interfaceMode: 'minimal' },
};

export interface EmotionalModeInfo {
  label: string;
  emoji: string;
  color: string;
  message: string;
  suggestion: string;
  interfaceMode: 'expanded' | 'focused' | 'minimal' | 'zen';
}

export type TaskState = 'nebulous' | 'crystallizing' | 'active' | 'productively-stuck' | 'useful-limbo' | 'fermenting' | 'dormant' | 'done' | 'beautifully-abandoned' | 'merged' | 'exploded';

export const TASK_STATES: Record<TaskState, TaskStateInfo> = {
  'nebulous': { label: 'Nebulous', emoji: '🌫️', color: 'chaos-nebula', description: 'A vague feeling or direction, not yet an idea' },
  'crystallizing': { label: 'Crystallizing', emoji: '💎', color: 'chaos-prism', description: 'Taking shape but still malleable' },
  'active': { label: 'Active', emoji: '🔥', color: 'chaos-lava', description: 'Currently being worked on' },
  'productively-stuck': { label: 'Productively Stuck', emoji: '🧱', color: 'chaos-ember', description: 'Stuck, but the stuckness is teaching something' },
  'useful-limbo': { label: 'Useful Limbo', emoji: '🎐', color: 'chaos-ocean', description: 'Deliberately unresolved. Waiting for the right moment.' },
  'fermenting': { label: 'Fermenting', emoji: '🫧', color: 'chaos-moss', description: 'Marinating in the subconscious' },
  'dormant': { label: 'Dormant', emoji: '🌑', color: 'chaos-void', description: 'Sleeping. May wake when conditions change.' },
  'done': { label: 'Done', emoji: '✅', color: 'chaos-moss', description: 'Completed (for now)' },
  'beautifully-abandoned': { label: 'Beautifully Abandoned', emoji: '🦋', color: 'chaos-aurora', description: 'Let go with gratitude. Its energy fed other things.' },
  'merged': { label: 'Merged', emoji: '🔀', color: 'chaos-prism', description: 'Combined with another idea to become something new' },
  'exploded': { label: 'Exploded', emoji: '💥', color: 'chaos-storm', description: 'Broke apart into multiple new ideas' },
};

export interface TaskStateInfo {
  label: string;
  emoji: string;
  color: string;
  description: string;
}

export interface ChaosIdea {
  id: string;
  title: string;
  content: string;
  messType: MessType;
  states: TaskState[];
  emotionalContext: EmotionalMode;
  tags: string[];
  connections: string[];
  createdAt: number;
  updatedAt: number;
  fermentationStarted?: number;
  fermentationCheckIns: FermentationCheckIn[];
  failureLog: FailureEntry[];
  projectArea?: string;
  energy: number; // 0-100
  clarity: number; // 0-100
  urgency: number; // 0-100
  archived: boolean;
}

export interface FermentationCheckIn {
  id: string;
  timestamp: number;
  question: string;
  answer?: string;
  readyToEmerge: boolean;
}

export interface FailureEntry {
  id: string;
  timestamp: number;
  description: string;
  lesson: string;
  pivotDirection?: string;
  celebrationNote: string;
}

export interface BrainDump {
  id: string;
  rawText: string;
  timestamp: number;
  extractedThemes: string[];
  extractedPriorities: string[];
  extractedTensions: string[];
  hiddenConnections: string[];
  suggestedMessTypes: MessType[];
  processedIdeas: string[];
}

export interface FrictionChallenge {
  id: string;
  type: 'random-constraint' | 'juxtaposition' | 'timed-brainstorm' | 'word-prompt' | 'idea-collision';
  prompt: string;
  timeLimit?: number;
  words?: string[];
  collisionIds?: string[];
  createdAt: number;
  responses: string[];
}

export interface ProjectArea {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  ideaIds: string[];
}

export interface ChaosRoom {
  id: string;
  name: string;
  theme: string;
  ideas: string[];
  crystallizedThemes: string[];
  actionItems: string[];
  phase: 'wild' | 'clustering' | 'crystallizing' | 'actionizing';
  participants: string[];
  createdAt: number;
}

export interface ArchaeologyFind {
  id: string;
  ideaId: string;
  surfacedAt: number;
  reason: string;
  suggestedAction: string;
  acknowledged: boolean;
}

// Random word/prompt banks
export const RANDOM_WORDS = [
  'kaleidoscope', 'erosion', 'whisper', 'tectonic', 'bioluminescence',
  'origami', 'entropy', 'resonance', 'threshold', 'metamorphosis',
  'parallax', 'symbiosis', 'tessellation', 'aurora', 'mycelium',
  'refraction', 'confluence', 'chrysalis', 'labyrinth', 'ephemeral',
  'palimpsest', 'synesthesia', 'penumbra', 'dendrite', 'apophenia',
  'sonder', 'petrichor', 'vellichor', 'numinous', 'liminality',
  'kintsugi', 'wabi-sabi', 'ubuntu', 'ikigai', 'hygge',
  'fernweh', 'hiraeth', 'mamihlapinatapai', 'toska', 'duende',
];

export const RANDOM_CONSTRAINTS = [
  'Explain this to a 5-year-old', 'What if the opposite were true?',
  'Remove the most important element', 'Combine with your worst idea',
  'Make it 10x bigger', 'Make it 10x smaller', 'What would nature do?',
  'What if it had to be done in 1 hour?', 'What if money were no object?',
  'What if you had infinite time?', 'What would your enemy say?',
  'Make it physical/tangible', 'Make it invisible', 'Add a contradiction',
  'Reverse the process', 'What would this look like in 100 years?',
  'What if a child designed this?', 'Remove technology entirely',
  'Add an element of danger', 'Make it collaborative with strangers',
  'What if it were a game?', 'Combine two unrelated industries',
  'What would aliens think of this?', 'Make it rhythmic/musical',
];

export const JUXTAPOSITIONS = [
  ['Ancient wisdom', 'TikTok trends'], ['Nuclear physics', 'Pottery'],
  ['Prison architecture', 'Playground design'], ['Funeral rites', 'Birthday parties'],
  ['Submarine navigation', 'Forest foraging'], ['Opera', 'Skateboarding'],
  ['Tax law', 'Interpretive dance'], ['Astronomy', 'Cooking'],
  ['Demolition', 'Meditation'], ['Surveillance', 'Intimacy'],
  ['Bureaucracy', 'Jazz improvisation'], ['Surgery', 'Graffiti'],
];

export const FERMENTATION_QUESTIONS = [
  'Does this idea feel different than when you first had it?',
  'Has anything in your life connected to this idea recently?',
  'If this idea were a seed, what kind of plant would it become?',
  'What would you lose if you abandoned this idea completely?',
  'Has this idea been whispering to you, or has it gone silent?',
  'Can you see the first tiny step you\'d take with this idea?',
  'Would your past self be surprised by where this idea is now?',
  'Is this idea ready to meet the world, or does it need more privacy?',
];
