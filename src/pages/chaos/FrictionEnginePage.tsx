import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/chaos/PageHeader';
import { useChaosStore } from '@/store/chaosStore';
import { RANDOM_WORDS, RANDOM_CONSTRAINTS, JUXTAPOSITIONS } from '@/types/chaos';

type ChallengeType = 'constraint' | 'juxtaposition' | 'timed' | 'word-prompt' | 'collision';

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export default function FrictionEnginePage() {
  const store = useChaosStore();
  const [activeChallenge, setActiveChallenge] = useState<{ type: ChallengeType; prompt: string; words?: string[]; timeLimit?: number } | null>(null);
  const [response, setResponse] = useState('');
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (!timerActive || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { setTimerActive(false); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const generateChallenge = useCallback((type: ChallengeType) => {
    switch (type) {
      case 'constraint':
        setActiveChallenge({ type, prompt: pick(RANDOM_CONSTRAINTS) });
        break;
      case 'juxtaposition': {
        const pair = pick(JUXTAPOSITIONS);
        setActiveChallenge({ type, prompt: `Combine: "${pair[0]}" + "${pair[1]}"\n\nWhat emerges when these two worlds collide?` });
        break;
      }
      case 'timed':
        setActiveChallenge({ type, prompt: `⏱️ 90-SECOND BRAINSTORM\n\nTopic: "${pick(RANDOM_WORDS)}"\n\nWrite as many ideas as possible. No filtering. No judging. GO.`, timeLimit: 90 });
        setTimer(90);
        setTimerActive(true);
        break;
      case 'word-prompt': {
        const words = pickN(RANDOM_WORDS, 5);
        setActiveChallenge({ type, prompt: `Weave these 5 words into a single concept or idea:`, words });
        break;
      }
      case 'collision': {
        if (store.ideas.length < 2) {
          setActiveChallenge({ type, prompt: `You need at least 2 ideas in your system for an idea collision.\n\nGo create some ideas first!` });
        } else {
          const [a, b] = pickN(store.ideas, 2);
          setActiveChallenge({ type, prompt: `IDEA COLLISION 💥\n\n"${a.title}" crashes into "${b.title}"\n\nWhat new thing emerges from this wreckage?` });
        }
        break;
      }
    }
    setResponse('');
  }, [store.ideas]);

  const saveResponse = () => {
    if (!response.trim() || !activeChallenge) return;
    store.addFrictionChallenge({
      type: activeChallenge.type === 'constraint' ? 'random-constraint' : activeChallenge.type === 'juxtaposition' ? 'juxtaposition' : activeChallenge.type === 'timed' ? 'timed-brainstorm' : activeChallenge.type === 'word-prompt' ? 'word-prompt' : 'idea-collision',
      prompt: activeChallenge.prompt,
      timeLimit: activeChallenge.timeLimit,
      words: activeChallenge.words,
    });
    store.addIdea({
      title: `Friction Output: ${activeChallenge.type}`,
      content: response,
      messType: 'organized-entropy',
      states: ['nebulous'],
      emotionalContext: store.currentMood,
      tags: ['friction-engine', activeChallenge.type],
      connections: [],
      energy: 70,
      clarity: 30,
      urgency: 20,
    });
    setActiveChallenge(null);
    setResponse('');
    setTimerActive(false);
  };

  const challenges: { type: ChallengeType; emoji: string; label: string; desc: string }[] = [
    { type: 'constraint', emoji: '🎲', label: 'Random Constraint', desc: 'A surprising limitation to spark creativity' },
    { type: 'juxtaposition', emoji: '💥', label: 'Unexpected Juxtaposition', desc: 'Smash two unrelated worlds together' },
    { type: 'timed', emoji: '⏱️', label: 'Timed Brainstorm', desc: '90 seconds of pure unfiltered ideation' },
    { type: 'word-prompt', emoji: '📝', label: 'Word Prompt Weave', desc: '5 random words → 1 unified concept' },
    { type: 'collision', emoji: '🌪️', label: 'Idea Collision', desc: 'Crash two of your existing ideas together' },
  ];

  return (
    <div>
      <PageHeader emoji="🔥" title="Creative Friction Engine" subtitle="Productive chaos through deliberate constraints and collisions" />

      {!activeChallenge ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map((ch, i) => (
            <motion.button
              key={ch.type}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => generateChallenge(ch.type)}
              className="p-6 bg-card border border-border rounded-lg text-left hover:border-primary/30 hover:bg-secondary/30 transition-all group"
            >
              <span className="text-3xl block mb-3">{ch.emoji}</span>
              <h3 className="font-display font-bold text-foreground mb-1">{ch.label}</h3>
              <p className="text-xs text-muted-foreground">{ch.desc}</p>
            </motion.button>
          ))}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => generateChallenge(pick(['constraint', 'juxtaposition', 'timed', 'word-prompt'] as ChallengeType[]))}
            className="p-6 bg-primary/5 border border-primary/20 rounded-lg text-left hover:bg-primary/10 transition-all"
          >
            <span className="text-3xl block mb-3">🎰</span>
            <h3 className="font-display font-bold text-primary mb-1">SURPRISE ME</h3>
            <p className="text-xs text-muted-foreground">Random challenge type. Embrace the unknown.</p>
          </motion.button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
          {/* Timer */}
          {timerActive && (
            <div className={`text-center mb-4 text-4xl font-mono font-bold ${timer <= 10 ? 'text-primary animate-pulse' : 'text-foreground'}`}>
              {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
            </div>
          )}
          {timer === 0 && activeChallenge.timeLimit && (
            <div className="text-center mb-4 text-lg font-mono text-accent">⏰ TIME'S UP!</div>
          )}

          {/* Challenge */}
          <div className="p-6 bg-card border border-accent/30 rounded-lg mb-4">
            <pre className="text-foreground text-sm font-mono whitespace-pre-wrap">{activeChallenge.prompt}</pre>
            {activeChallenge.words && (
              <div className="flex flex-wrap gap-2 mt-4">
                {activeChallenge.words.map(w => (
                  <span key={w} className="px-3 py-1.5 bg-accent/10 text-accent border border-accent/20 rounded-full text-sm font-mono">{w}</span>
                ))}
              </div>
            )}
          </div>

          {/* Response */}
          <textarea
            value={response}
            onChange={e => setResponse(e.target.value)}
            placeholder="Let the friction spark something..."
            className="w-full h-40 p-4 bg-card border border-border rounded-lg text-foreground text-sm font-mono resize-none focus:outline-none focus:ring-1 focus:ring-primary/50"
          />

          <div className="flex gap-3 mt-3">
            <button onClick={saveResponse} disabled={!response.trim()} className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-md font-mono text-sm font-bold disabled:opacity-40">
              💾 Save & Create Idea
            </button>
            <button onClick={() => generateChallenge(activeChallenge.type as ChallengeType)} className="px-4 py-2.5 border border-border text-foreground rounded-md font-mono text-sm hover:bg-secondary/50">
              🔄 New Challenge
            </button>
            <button onClick={() => { setActiveChallenge(null); setTimerActive(false); }} className="px-4 py-2.5 border border-border text-muted-foreground rounded-md font-mono text-sm hover:bg-secondary/50">
              ✕ Close
            </button>
          </div>
        </motion.div>
      )}

      {/* History */}
      {store.frictionChallenges.length > 0 && !activeChallenge && (
        <div className="mt-10">
          <h3 className="text-xs text-muted-foreground font-mono mb-4">⚡ FRICTION HISTORY ({store.frictionChallenges.length} challenges)</h3>
          <div className="space-y-2">
            {store.frictionChallenges.slice(0, 8).map(ch => (
              <div key={ch.id} className="p-3 bg-card border border-border rounded-lg flex items-center justify-between">
                <div className="text-sm text-foreground font-mono truncate flex-1">{ch.prompt.split('\n')[0]}</div>
                <span className="text-xs text-muted-foreground ml-2 font-mono">{ch.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
