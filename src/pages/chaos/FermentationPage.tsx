import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/chaos/PageHeader';
import { useChaosStore } from '@/store/chaosStore';
import { FERMENTATION_QUESTIONS, MESS_TAXONOMY } from '@/types/chaos';

function daysSince(ts: number) { return Math.floor((Date.now() - ts) / 86400000); }
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export default function FermentationPage() {
  const store = useChaosStore();
  const [activeCheckIn, setActiveCheckIn] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');

  const fermenting = store.ideas.filter(i => i.states.includes('fermenting'));
  const dormant = store.ideas.filter(i => i.states.includes('dormant'));

  const startCheckIn = (ideaId: string) => {
    setActiveCheckIn(ideaId);
    setQuestion(pick(FERMENTATION_QUESTIONS));
    setAnswer('');
  };

  const submitCheckIn = (ready: boolean) => {
    if (!activeCheckIn) return;
    store.addFermentationCheckIn(activeCheckIn, { question, answer: answer || undefined, readyToEmerge: ready });
    if (ready) {
      store.removeState(activeCheckIn, 'fermenting');
      store.addState(activeCheckIn, 'crystallizing');
    }
    setActiveCheckIn(null);
    setAnswer('');
  };

  const startFermenting = (ideaId: string) => {
    store.addState(ideaId, 'fermenting');
    store.updateIdea(ideaId, { fermentationStarted: Date.now() });
  };

  return (
    <div>
      <PageHeader emoji="🫧" title="Idea Fermentation Tracker" subtitle="Half-baked ideas marinating until they're ready to emerge" />

      {/* Fermenting ideas */}
      <h3 className="text-xs text-muted-foreground font-mono mb-4">🫧 CURRENTLY FERMENTING ({fermenting.length})</h3>
      {fermenting.length === 0 ? (
        <div className="p-8 bg-card border border-border rounded-lg text-center text-muted-foreground font-mono text-sm mb-8">
          No ideas fermenting. Move ideas to "Fermenting" state from the Non-Linear Board, or use the dormant ideas below.
        </div>
      ) : (
        <div className="space-y-3 mb-8">
          {fermenting.map((idea, i) => {
            const days = idea.fermentationStarted ? daysSince(idea.fermentationStarted) : daysSince(idea.createdAt);
            const isCheckingIn = activeCheckIn === idea.id;

            return (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 bg-card border border-border rounded-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span>{MESS_TAXONOMY[idea.messType]?.emoji}</span>
                      <h4 className="font-display font-bold text-foreground">{idea.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{idea.content?.slice(0, 100)}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-display font-bold text-accent">{days}d</div>
                    <div className="text-xs text-muted-foreground font-mono">fermenting</div>
                  </div>
                </div>

                {/* Previous check-ins */}
                {idea.fermentationCheckIns.length > 0 && (
                  <div className="mb-3 space-y-1.5">
                    {idea.fermentationCheckIns.slice(-2).map(ci => (
                      <div key={ci.id} className="text-xs text-muted-foreground font-mono pl-3 border-l border-border">
                        <span className="text-foreground/50">{new Date(ci.timestamp).toLocaleDateString()}</span>: "{ci.question}" → {ci.answer || '(no answer)'}
                      </div>
                    ))}
                  </div>
                )}

                {isCheckingIn ? (
                  <div className="mt-3 p-4 bg-secondary/30 rounded-md space-y-3">
                    <p className="text-sm text-accent font-mono italic">{question}</p>
                    <textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="(optional) your thoughts..." className="w-full h-20 bg-card border border-border rounded p-2 text-sm text-foreground font-mono resize-none focus:outline-none" />
                    <div className="flex gap-2">
                      <button onClick={() => submitCheckIn(true)} className="px-4 py-1.5 bg-accent/20 text-accent border border-accent/30 rounded text-xs font-mono">🌱 Ready to emerge!</button>
                      <button onClick={() => submitCheckIn(false)} className="px-4 py-1.5 bg-secondary/50 text-muted-foreground border border-border rounded text-xs font-mono">🫧 Keep fermenting</button>
                      <button onClick={() => setActiveCheckIn(null)} className="px-4 py-1.5 text-muted-foreground text-xs font-mono">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => startCheckIn(idea.id)} className="mt-2 px-4 py-1.5 text-xs font-mono text-accent border border-accent/20 rounded hover:bg-accent/10 transition-colors">
                    🔔 Check In
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Dormant ideas to potentially ferment */}
      {dormant.length > 0 && (
        <div>
          <h3 className="text-xs text-muted-foreground font-mono mb-4">🌑 DORMANT IDEAS ({dormant.length}) — Consider fermenting?</h3>
          <div className="space-y-2">
            {dormant.slice(0, 5).map(idea => (
              <div key={idea.id} className="p-3 bg-card border border-border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{MESS_TAXONOMY[idea.messType]?.emoji}</span>
                  <span className="text-sm text-foreground font-mono">{idea.title}</span>
                </div>
                <button onClick={() => startFermenting(idea.id)} className="text-xs font-mono text-accent hover:text-foreground transition-colors">
                  Start fermenting →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
