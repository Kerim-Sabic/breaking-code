import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/chaos/PageHeader';
import { useChaosStore } from '@/store/chaosStore';
import { TASK_STATES, MESS_TAXONOMY, type TaskState, type MessType } from '@/types/chaos';

export default function NonLinearBoardPage() {
  const store = useChaosStore();
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newMessType, setNewMessType] = useState<MessType>('generative');
  const [selectedStates, setSelectedStates] = useState<TaskState[]>(['nebulous']);
  const [showCreate, setShowCreate] = useState(false);
  const [filterState, setFilterState] = useState<TaskState | 'all'>('all');

  const toggleState = (state: TaskState) => {
    setSelectedStates(prev => prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]);
  };

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    store.addIdea({
      title: newTitle,
      content: newContent,
      messType: newMessType,
      states: selectedStates.length > 0 ? selectedStates : ['nebulous'],
      emotionalContext: store.currentMood,
      tags: [],
      connections: [],
      energy: 50,
      clarity: 30,
      urgency: 40,
    });
    setNewTitle('');
    setNewContent('');
    setSelectedStates(['nebulous']);
    setShowCreate(false);
  };

  const filtered = filterState === 'all' ? store.ideas : store.ideas.filter(i => i.states.includes(filterState));

  return (
    <div>
      <PageHeader emoji="🔀" title="Non-Linear Board" subtitle="Tasks exist in multiple states. Ambiguity is a feature, not a bug." />

      {/* State filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterState('all')}
          className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${filterState === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary/50 text-muted-foreground hover:text-foreground'}`}
        >
          All ({store.ideas.length})
        </button>
        {(Object.entries(TASK_STATES) as [TaskState, typeof TASK_STATES[TaskState]][]).map(([key, info]) => {
          const count = store.ideas.filter(i => i.states.includes(key)).length;
          return (
            <button
              key={key}
              onClick={() => setFilterState(key)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${filterState === key ? 'bg-primary text-primary-foreground' : 'bg-secondary/50 text-muted-foreground hover:text-foreground'}`}
            >
              {info.emoji} {info.label} {count > 0 && `(${count})`}
            </button>
          );
        })}
      </div>

      {/* Create */}
      <button onClick={() => setShowCreate(!showCreate)} className="mb-6 px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded-md font-mono text-sm hover:bg-accent/20 transition-colors">
        + New Idea
      </button>

      <AnimatePresence>
        {showCreate && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-6">
            <div className="p-5 bg-card border border-border rounded-lg space-y-4">
              <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Idea title..." className="w-full bg-transparent border-b border-border text-foreground text-lg font-display pb-2 focus:outline-none focus:border-primary/50" />
              <textarea value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="Describe it (or don't)..." className="w-full h-24 bg-secondary/30 rounded-md p-3 text-sm text-foreground font-mono resize-none focus:outline-none" />

              <div>
                <div className="text-xs text-muted-foreground font-mono mb-2">STATES (select multiple — embrace superposition)</div>
                <div className="flex flex-wrap gap-1.5">
                  {(Object.entries(TASK_STATES) as [TaskState, typeof TASK_STATES[TaskState]][]).map(([key, info]) => (
                    <button key={key} onClick={() => toggleState(key)} className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${selectedStates.includes(key) ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-secondary/50 text-muted-foreground border border-transparent hover:text-foreground'}`}>
                      {info.emoji} {info.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground font-mono mb-2">MESS TYPE</div>
                <select value={newMessType} onChange={e => setNewMessType(e.target.value as MessType)} className="bg-secondary/50 text-foreground text-sm rounded-md px-3 py-1.5 border border-border focus:outline-none">
                  {(Object.entries(MESS_TAXONOMY) as [MessType, typeof MESS_TAXONOMY[MessType]][]).map(([key, info]) => (
                    <option key={key} value={key}>{info.emoji} {info.label}</option>
                  ))}
                </select>
              </div>

              <button onClick={handleCreate} disabled={!newTitle.trim()} className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-mono text-sm font-bold disabled:opacity-40">Create</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Board */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground font-mono text-sm">
            {store.ideas.length === 0 ? 'No ideas yet. Start with a Brain Dump or create one above.' : 'No ideas match this filter.'}
          </div>
        )}
        {filtered.map((idea, i) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="p-4 bg-card border border-border rounded-lg hover:border-primary/20 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{MESS_TAXONOMY[idea.messType]?.emoji}</span>
                  <h4 className="font-display font-bold text-foreground text-sm">{idea.title}</h4>
                </div>
                {idea.content && <p className="text-xs text-muted-foreground line-clamp-2 mb-2 font-mono">{idea.content}</p>}
                <div className="flex flex-wrap gap-1.5">
                  {idea.states.map(st => {
                    const info = TASK_STATES[st];
                    return (
                      <span key={st} className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary/50 rounded text-xs text-foreground/70 font-mono">
                        {info?.emoji} {info?.label}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground font-mono">
                <div className="flex gap-2">
                  <span title="Energy">⚡{idea.energy}</span>
                  <span title="Clarity">💎{idea.clarity}</span>
                  <span title="Urgency">🔥{idea.urgency}</span>
                </div>
                <span>{new Date(idea.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Quick state toggles */}
            <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border/50">
              {(['active', 'productively-stuck', 'useful-limbo', 'fermenting', 'dormant', 'beautifully-abandoned'] as TaskState[]).map(st => {
                const info = TASK_STATES[st];
                const has = idea.states.includes(st);
                return (
                  <button
                    key={st}
                    onClick={() => has ? store.removeState(idea.id, st) : store.addState(idea.id, st)}
                    className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${has ? 'bg-primary/20 text-primary' : 'text-muted-foreground/50 hover:text-muted-foreground'}`}
                  >
                    {info?.emoji}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
