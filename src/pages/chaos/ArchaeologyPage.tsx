import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/chaos/PageHeader';
import { useChaosStore } from '@/store/chaosStore';
import { MESS_TAXONOMY, TASK_STATES } from '@/types/chaos';

function daysSince(ts: number) { return Math.floor((Date.now() - ts) / 86400000); }

export default function ArchaeologyPage() {
  const store = useChaosStore();
  const [showRevived, setShowRevived] = useState(false);

  // Find forgotten/dormant ideas worth resurfacing
  const excavations = useMemo(() => {
    const candidates = store.ideas.filter(i => {
      const days = daysSince(i.updatedAt);
      const isDormant = i.states.includes('dormant') || i.states.includes('useful-limbo');
      const isOld = days > 7;
      const notAbandoned = !i.states.includes('beautifully-abandoned');
      return (isDormant || isOld) && notAbandoned;
    });

    return candidates.map(idea => {
      const days = daysSince(idea.updatedAt);
      const reasons: string[] = [];
      const suggestions: string[] = [];

      if (days > 30) { reasons.push(`Untouched for ${days} days`); suggestions.push('Time for a check-in. Has anything changed?'); }
      else if (days > 14) { reasons.push(`${days} days of silence`); suggestions.push('This idea has been marinating. Worth a fresh look?'); }
      else if (days > 7) { reasons.push(`Quiet for ${days} days`); suggestions.push('Still relevant? Or ready for the compost heap?'); }

      if (idea.states.includes('dormant')) { reasons.push('Marked as dormant'); suggestions.push('Conditions may have changed. Consider reactivating.'); }
      if (idea.states.includes('useful-limbo')) { reasons.push('In useful limbo'); suggestions.push('The moment might be right now.'); }
      if (idea.energy > 60 && idea.clarity < 30) { reasons.push('High energy, low clarity'); suggestions.push('The energy is there — just needs direction.'); }
      if (idea.connections.length > 2) { reasons.push(`Connected to ${idea.connections.length} other ideas`); suggestions.push('This node is well-connected. Might unlock other things.'); }

      return { idea, reason: reasons.join(' • '), suggestion: suggestions[0] || 'Worth another look', days };
    }).sort((a, b) => b.days - a.days);
  }, [store.ideas]);

  const revive = (ideaId: string) => {
    store.removeState(ideaId, 'dormant');
    store.removeState(ideaId, 'useful-limbo');
    store.addState(ideaId, 'crystallizing');
    store.surfaceArchaeology(ideaId, 'Manually resurfaced', 'Moved to crystallizing');
  };

  return (
    <div>
      <PageHeader emoji="⛏️" title="Mess Archaeology" subtitle="Excavating forgotten brilliance. Strategic resurfacing of dormant ideas." />

      <div className="flex items-center justify-between mb-6">
        <span className="text-xs text-muted-foreground font-mono">{excavations.length} ideas buried in the sediment</span>
      </div>

      {excavations.length === 0 ? (
        <div className="p-12 bg-card border border-border rounded-lg text-center">
          <span className="text-4xl block mb-4">🏛️</span>
          <p className="text-muted-foreground font-mono text-sm">No buried treasures found. Your ideas are all recent and active.</p>
          <p className="text-muted-foreground/50 font-mono text-xs mt-2">Come back when you have ideas that have been sitting for a while.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {excavations.map((ex, i) => (
            <motion.div
              key={ex.idea.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-5 bg-card border border-border rounded-lg hover:border-accent/20 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span>{MESS_TAXONOMY[ex.idea.messType]?.emoji}</span>
                  <h4 className="font-display font-bold text-foreground">{ex.idea.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">{ex.days}d ago</span>
                  {ex.idea.states.map(s => (
                    <span key={s} className="text-xs">{TASK_STATES[s]?.emoji}</span>
                  ))}
                </div>
              </div>
              {ex.idea.content && <p className="text-xs text-muted-foreground font-mono mb-2 line-clamp-2">{ex.idea.content}</p>}
              <div className="text-xs text-accent/80 font-mono mb-1">🔍 {ex.reason}</div>
              <div className="text-xs text-foreground/60 font-mono mb-3">💡 {ex.suggestion}</div>

              <div className="flex gap-2">
                <button onClick={() => revive(ex.idea.id)} className="px-3 py-1.5 bg-accent/10 text-accent border border-accent/20 rounded text-xs font-mono hover:bg-accent/20 transition-colors">
                  🌱 Revive & Crystallize
                </button>
                <button onClick={() => store.abandonIdea(ex.idea.id, 'Excavated and released')} className="px-3 py-1.5 text-muted-foreground border border-border rounded text-xs font-mono hover:bg-secondary/50 transition-colors">
                  🦋 Release
                </button>
                <button onClick={() => store.addState(ex.idea.id, 'fermenting')} className="px-3 py-1.5 text-muted-foreground border border-border rounded text-xs font-mono hover:bg-secondary/50 transition-colors">
                  🫧 Ferment
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Previous archaeological finds */}
      {store.archaeologyFinds.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xs text-muted-foreground font-mono mb-4">📜 ARCHAEOLOGICAL RECORD ({store.archaeologyFinds.length} finds)</h3>
          <div className="space-y-2">
            {store.archaeologyFinds.slice(0, 10).map(find => {
              const idea = store.ideas.find(i => i.id === find.ideaId);
              return (
                <div key={find.id} className="p-3 bg-card border border-border rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{idea ? MESS_TAXONOMY[idea.messType]?.emoji : '❓'}</span>
                    <span className="text-sm text-foreground font-mono">{idea?.title || 'Unknown idea'}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{new Date(find.surfacedAt).toLocaleDateString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
