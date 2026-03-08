import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/chaos/PageHeader';
import { useChaosStore } from '@/store/chaosStore';
import { EMOTIONAL_MODES, MESS_TAXONOMY, TASK_STATES, type MessType, type TaskState } from '@/types/chaos';
import { Brain, Flame, Layers, GitBranch, Heart, Clock, TrendingDown, Network, Pickaxe, Users } from 'lucide-react';

const QUICK_LINKS = [
  { path: '/chaos/braindump', icon: Brain, label: 'Brain Dump', desc: 'Dump the chaos. Extract the signal.', color: 'border-primary/30' },
  { path: '/chaos/friction', icon: Flame, label: 'Friction Engine', desc: 'Generate creative constraints.', color: 'border-accent/30' },
  { path: '/chaos/taxonomy', icon: Layers, label: 'Mess Taxonomy', desc: '22 types of productive mess.', color: 'border-primary/30' },
  { path: '/chaos/board', icon: GitBranch, label: 'Non-Linear Board', desc: 'Tasks in quantum superposition.', color: 'border-accent/30' },
  { path: '/chaos/emotional', icon: Heart, label: 'Emotional Mode', desc: 'How are you feeling? It matters.', color: 'border-primary/30' },
  { path: '/chaos/fermentation', icon: Clock, label: 'Fermentation', desc: 'Let ideas marinate.', color: 'border-accent/30' },
  { path: '/chaos/failures', icon: TrendingDown, label: 'Failure Forward', desc: 'Celebrate the pivots.', color: 'border-primary/30' },
  { path: '/chaos/ecosystem', icon: Network, label: 'Ecosystem', desc: 'See how everything connects.', color: 'border-accent/30' },
  { path: '/chaos/archaeology', icon: Pickaxe, label: 'Archaeology', desc: 'Resurface forgotten brilliance.', color: 'border-primary/30' },
  { path: '/chaos/rooms', icon: Users, label: 'Chaos Rooms', desc: 'Collaborative brainstorming.', color: 'border-accent/30' },
];

export default function ChaosCommandCenter() {
  const store = useChaosStore();
  const moodInfo = EMOTIONAL_MODES[store.currentMood];

  const activeIdeas = store.ideas.filter(i => i.states.includes('active')).length;
  const fermentingIdeas = store.ideas.filter(i => i.states.includes('fermenting')).length;
  const stuckIdeas = store.ideas.filter(i => i.states.includes('productively-stuck')).length;
  const totalIdeas = store.ideas.length;

  const messTypeCounts = Object.keys(MESS_TAXONOMY).reduce((acc, key) => {
    acc[key as MessType] = store.ideas.filter(i => i.messType === key).length;
    return acc;
  }, {} as Record<MessType, number>);

  const topMess = Object.entries(messTypeCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

  return (
    <div>
      <PageHeader emoji="🌀" title="Chaos Command Center" subtitle="Your creative entropy, organized (loosely)" />

      {/* Mood Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-5 rounded-lg bg-card border border-border mb-8"
      >
        <div className="flex items-start gap-4">
          <span className="text-4xl">{moodInfo.emoji}</span>
          <div className="flex-1">
            <div className="text-xs text-muted-foreground font-mono mb-1">CURRENT MODE: {moodInfo.label.toUpperCase()}</div>
            <p className="text-foreground text-sm mb-2 italic">{moodInfo.message}</p>
            <p className="text-accent text-xs font-mono">{moodInfo.suggestion}</p>
          </div>
          <Link to="/chaos/emotional" className="text-xs text-muted-foreground hover:text-foreground font-mono border border-border px-3 py-1.5 rounded hover:bg-secondary/50 transition-colors">
            Change mood
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Total Ideas', value: totalIdeas, emoji: '💡' },
          { label: 'Active', value: activeIdeas, emoji: '🔥' },
          { label: 'Fermenting', value: fermentingIdeas, emoji: '🫧' },
          { label: 'Productively Stuck', value: stuckIdeas, emoji: '🧱' },
          { label: 'Brain Dumps', value: store.totalBrainDumps, emoji: '🧠' },
          { label: 'Failures Celebrated', value: store.failureCount, emoji: '🎉' },
          { label: 'Pivots Made', value: store.pivotCount, emoji: '🔀' },
          { label: 'Beautiful Abandonments', value: store.abandonedCount, emoji: '🦋' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 rounded-lg bg-card border border-border"
          >
            <div className="text-2xl mb-1">{stat.emoji}</div>
            <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground font-mono">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Top Mess Types */}
      {topMess.some(([, count]) => count > 0) && (
        <div className="mb-8 p-4 rounded-lg bg-card border border-border">
          <h3 className="text-xs text-muted-foreground font-mono mb-3">YOUR DOMINANT MESS TYPES</h3>
          <div className="flex flex-wrap gap-2">
            {topMess.filter(([, count]) => count > 0).map(([type, count]) => {
              const info = MESS_TAXONOMY[type as MessType];
              return (
                <div key={type} className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-md">
                  <span>{info.emoji}</span>
                  <span className="text-sm text-foreground">{info.label}</span>
                  <span className="text-xs text-muted-foreground">×{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {QUICK_LINKS.map((link, i) => (
          <motion.div
            key={link.path}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.04 }}
          >
            <Link
              to={link.path}
              className={`flex items-start gap-4 p-4 rounded-lg bg-card border ${link.color} hover:bg-secondary/30 transition-colors group`}
            >
              <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground mt-0.5" />
              <div>
                <div className="text-sm font-medium text-foreground">{link.label}</div>
                <div className="text-xs text-muted-foreground">{link.desc}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
