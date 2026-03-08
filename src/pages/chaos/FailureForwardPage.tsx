import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/chaos/PageHeader';
import { useChaosStore } from '@/store/chaosStore';
import { MESS_TAXONOMY } from '@/types/chaos';

export default function FailureForwardPage() {
  const store = useChaosStore();
  const [selectedIdea, setSelectedIdea] = useState('');
  const [actionType, setActionType] = useState<'abandon' | 'pivot'>('pivot');
  const [note, setNote] = useState('');
  const [pivotDirection, setPivotDirection] = useState('');

  const handleAction = () => {
    if (!selectedIdea) return;
    if (actionType === 'abandon') {
      store.abandonIdea(selectedIdea, note || '🦋 Released with love');
    } else {
      store.pivotIdea(selectedIdea, pivotDirection || 'New direction');
    }
    setSelectedIdea('');
    setNote('');
    setPivotDirection('');
  };

  const allFailures = store.ideas.flatMap(idea =>
    idea.failureLog.map(f => ({ ...f, ideaTitle: idea.title, ideaEmoji: MESS_TAXONOMY[idea.messType]?.emoji }))
  ).sort((a, b) => b.timestamp - a.timestamp);

  const abandonedIdeas = store.ideas.filter(i => i.states.includes('beautifully-abandoned'));
  const activeIdeas = store.ideas.filter(i => !i.states.includes('beautifully-abandoned') && !i.archived);

  return (
    <div>
      <PageHeader emoji="🎉" title="Failure-Forward Momentum" subtitle="Every pivot, every abandonment, every 'this isn't working' — it's ALL progress" />

      {/* Momentum Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-5 bg-card border border-accent/20 rounded-lg text-center">
          <div className="text-3xl font-display font-bold text-accent">{store.failureCount}</div>
          <div className="text-xs text-muted-foreground font-mono">Failures Celebrated</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="p-5 bg-card border border-primary/20 rounded-lg text-center">
          <div className="text-3xl font-display font-bold text-primary">{store.pivotCount}</div>
          <div className="text-xs text-muted-foreground font-mono">Pivots Made</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="p-5 bg-card border border-border rounded-lg text-center">
          <div className="text-3xl font-display font-bold text-foreground">{store.abandonedCount}</div>
          <div className="text-xs text-muted-foreground font-mono">Beautiful Abandonments</div>
        </motion.div>
      </div>

      {/* New failure/pivot action */}
      {activeIdeas.length > 0 && (
        <div className="p-5 bg-card border border-border rounded-lg mb-8 space-y-4">
          <h3 className="text-xs text-muted-foreground font-mono">LOG A PIVOT OR ABANDONMENT</h3>

          <select value={selectedIdea} onChange={e => setSelectedIdea(e.target.value)} className="w-full bg-secondary/50 text-foreground text-sm rounded-md px-3 py-2 border border-border focus:outline-none">
            <option value="">Select an idea...</option>
            {activeIdeas.map(idea => (
              <option key={idea.id} value={idea.id}>{MESS_TAXONOMY[idea.messType]?.emoji} {idea.title}</option>
            ))}
          </select>

          <div className="flex gap-3">
            <button onClick={() => setActionType('pivot')} className={`px-4 py-2 rounded-md text-sm font-mono ${actionType === 'pivot' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-secondary/50 text-muted-foreground border border-border'}`}>
              🔀 Pivot
            </button>
            <button onClick={() => setActionType('abandon')} className={`px-4 py-2 rounded-md text-sm font-mono ${actionType === 'abandon' ? 'bg-accent/20 text-accent border border-accent/30' : 'bg-secondary/50 text-muted-foreground border border-border'}`}>
              🦋 Beautifully Abandon
            </button>
          </div>

          {actionType === 'pivot' && (
            <input value={pivotDirection} onChange={e => setPivotDirection(e.target.value)} placeholder="What's the new direction?" className="w-full bg-secondary/30 rounded-md p-2 text-sm text-foreground font-mono border border-border focus:outline-none" />
          )}

          <textarea value={note} onChange={e => setNote(e.target.value)} placeholder={actionType === 'abandon' ? 'A loving farewell note...' : 'What did you learn from the pivot?'} className="w-full h-20 bg-secondary/30 rounded-md p-2 text-sm text-foreground font-mono resize-none border border-border focus:outline-none" />

          <button onClick={handleAction} disabled={!selectedIdea} className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-mono text-sm font-bold disabled:opacity-40">
            {actionType === 'abandon' ? '🦋 Release with Love' : '🔀 Pivot!'}
          </button>
        </div>
      )}

      {/* Failure timeline */}
      <h3 className="text-xs text-muted-foreground font-mono mb-4">📜 MOMENTUM TIMELINE</h3>
      {allFailures.length === 0 ? (
        <div className="p-8 bg-card border border-border rounded-lg text-center text-muted-foreground font-mono text-sm">
          No failures yet. That either means you're just starting, or you're not taking enough risks. 😉
        </div>
      ) : (
        <div className="space-y-3">
          {allFailures.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 bg-card border border-border rounded-lg"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span>{f.ideaEmoji}</span>
                  <span className="text-sm font-display font-bold text-foreground">{f.ideaTitle}</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">{new Date(f.timestamp).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-foreground/70 font-mono mb-1">{f.description}</p>
              <p className="text-xs text-accent font-mono">💡 Lesson: {f.lesson}</p>
              {f.pivotDirection && <p className="text-xs text-primary font-mono mt-1">🔀 New direction: {f.pivotDirection}</p>}
              <p className="text-xs text-muted-foreground mt-1">{f.celebrationNote}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Abandoned ideas gallery */}
      {abandonedIdeas.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xs text-muted-foreground font-mono mb-4">🦋 BEAUTIFUL ABANDONMENT GALLERY</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {abandonedIdeas.map(idea => (
              <div key={idea.id} className="p-4 bg-card border border-border/50 rounded-lg opacity-70 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 mb-1">
                  <span>🦋</span>
                  <span className="text-sm font-display text-foreground line-through">{idea.title}</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono italic">Released {new Date(idea.updatedAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
