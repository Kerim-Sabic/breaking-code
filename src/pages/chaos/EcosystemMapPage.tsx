import { useMemo } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/chaos/PageHeader';
import { useChaosStore } from '@/store/chaosStore';
import { MESS_TAXONOMY, TASK_STATES } from '@/types/chaos';

export default function EcosystemMapPage() {
  const store = useChaosStore();

  const areas = store.projectAreas;
  const ideasByArea = useMemo(() => {
    const map: Record<string, typeof store.ideas> = {};
    areas.forEach(a => { map[a.id] = []; });
    map['unassigned'] = [];
    store.ideas.forEach(idea => {
      if (idea.projectArea && map[idea.projectArea]) {
        map[idea.projectArea].push(idea);
      } else {
        map['unassigned'].push(idea);
      }
    });
    return map;
  }, [store.ideas, areas]);

  const connections = useMemo(() => {
    const conns: { from: string; to: string; fromTitle: string; toTitle: string }[] = [];
    const seen = new Set<string>();
    store.ideas.forEach(idea => {
      idea.connections.forEach(connId => {
        const key = [idea.id, connId].sort().join('-');
        if (!seen.has(key)) {
          seen.add(key);
          const other = store.ideas.find(i => i.id === connId);
          if (other) {
            conns.push({ from: idea.id, to: connId, fromTitle: idea.title, toTitle: other.title });
          }
        }
      });
    });
    return conns;
  }, [store.ideas]);

  const messDistribution = useMemo(() => {
    const dist: Record<string, number> = {};
    store.ideas.forEach(i => { dist[i.messType] = (dist[i.messType] || 0) + 1; });
    return Object.entries(dist).sort((a, b) => b[1] - a[1]);
  }, [store.ideas]);

  const stateDistribution = useMemo(() => {
    const dist: Record<string, number> = {};
    store.ideas.forEach(i => { i.states.forEach(s => { dist[s] = (dist[s] || 0) + 1; }); });
    return Object.entries(dist).sort((a, b) => b[1] - a[1]);
  }, [store.ideas]);

  return (
    <div>
      <PageHeader emoji="🌐" title="Creative Ecosystem Map" subtitle="How your ideas, projects, and life areas interconnect and influence each other" />

      {store.ideas.length === 0 ? (
        <div className="p-12 bg-card border border-border rounded-lg text-center text-muted-foreground font-mono text-sm">
          Your ecosystem is empty. Start creating ideas to see connections emerge.
        </div>
      ) : (
        <>
          {/* Ecosystem overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <div className="p-4 bg-card border border-border rounded-lg text-center">
              <div className="text-2xl font-display font-bold text-foreground">{store.ideas.length}</div>
              <div className="text-xs text-muted-foreground font-mono">Total Nodes</div>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg text-center">
              <div className="text-2xl font-display font-bold text-accent">{connections.length}</div>
              <div className="text-xs text-muted-foreground font-mono">Connections</div>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg text-center">
              <div className="text-2xl font-display font-bold text-primary">{messDistribution.length}</div>
              <div className="text-xs text-muted-foreground font-mono">Mess Types Active</div>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg text-center">
              <div className="text-2xl font-display font-bold text-foreground">{stateDistribution.length}</div>
              <div className="text-xs text-muted-foreground font-mono">States In Use</div>
            </div>
          </div>

          {/* Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[...areas, { id: 'unassigned', name: 'Unassigned', emoji: '❓', color: '', description: 'Ideas without a home', ideaIds: [] }].map((area, i) => {
              const areaIdeas = ideasByArea[area.id] || [];
              if (areaIdeas.length === 0 && area.id !== 'unassigned') return null;
              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 bg-card border border-border rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{area.emoji}</span>
                    <h3 className="font-display font-bold text-foreground">{area.name}</h3>
                    <span className="text-xs text-muted-foreground font-mono ml-auto">{areaIdeas.length} ideas</span>
                  </div>
                  <div className="space-y-1.5">
                    {areaIdeas.slice(0, 6).map(idea => (
                      <div key={idea.id} className="flex items-center gap-2 text-sm">
                        <span className="text-xs">{MESS_TAXONOMY[idea.messType]?.emoji}</span>
                        <span className="text-foreground/70 font-mono truncate">{idea.title}</span>
                        <div className="flex gap-0.5 ml-auto">
                          {idea.states.slice(0, 2).map(s => (
                            <span key={s} className="text-xs">{TASK_STATES[s]?.emoji}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                    {areaIdeas.length > 6 && <div className="text-xs text-muted-foreground font-mono">+{areaIdeas.length - 6} more</div>}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Connections */}
          {connections.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs text-muted-foreground font-mono mb-4">🔗 CONNECTIONS ({connections.length})</h3>
              <div className="space-y-2">
                {connections.map((conn, i) => (
                  <div key={i} className="p-3 bg-card border border-border rounded-lg flex items-center gap-3 text-sm font-mono">
                    <span className="text-foreground">{conn.fromTitle}</span>
                    <span className="text-accent">↔</span>
                    <span className="text-foreground">{conn.toTitle}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Distributions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-card border border-border rounded-lg">
              <h3 className="text-xs text-muted-foreground font-mono mb-3">MESS TYPE DISTRIBUTION</h3>
              {messDistribution.map(([type, count]) => {
                const info = MESS_TAXONOMY[type as keyof typeof MESS_TAXONOMY];
                const pct = Math.round((count / store.ideas.length) * 100);
                return (
                  <div key={type} className="flex items-center gap-2 mb-2">
                    <span className="text-sm">{info?.emoji}</span>
                    <span className="text-xs text-foreground font-mono flex-1">{info?.label}</span>
                    <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono w-8 text-right">{count}</span>
                  </div>
                );
              })}
            </div>

            <div className="p-5 bg-card border border-border rounded-lg">
              <h3 className="text-xs text-muted-foreground font-mono mb-3">STATE DISTRIBUTION</h3>
              {stateDistribution.map(([state, count]) => {
                const info = TASK_STATES[state as keyof typeof TASK_STATES];
                const pct = Math.round((count / store.ideas.length) * 100);
                return (
                  <div key={state} className="flex items-center gap-2 mb-2">
                    <span className="text-sm">{info?.emoji}</span>
                    <span className="text-xs text-foreground font-mono flex-1">{info?.label}</span>
                    <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono w-8 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
