import { motion } from 'framer-motion';
import PageHeader from '@/components/chaos/PageHeader';
import { useChaosStore } from '@/store/chaosStore';
import { EMOTIONAL_MODES, type EmotionalMode } from '@/types/chaos';

export default function EmotionalModePage() {
  const store = useChaosStore();

  return (
    <div>
      <PageHeader emoji="💗" title="Emotional Permission System" subtitle="How you feel is data, not a problem. Your mood shapes your best work." />

      {/* Current mood expanded */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 bg-card border border-primary/20 rounded-lg mb-8 text-center"
      >
        <span className="text-6xl block mb-4">{EMOTIONAL_MODES[store.currentMood].emoji}</span>
        <h2 className="text-xl font-display font-bold text-foreground mb-2">You're feeling: {EMOTIONAL_MODES[store.currentMood].label}</h2>
        <p className="text-foreground/70 text-sm italic max-w-md mx-auto mb-3">{EMOTIONAL_MODES[store.currentMood].message}</p>
        <p className="text-accent text-sm font-mono">{EMOTIONAL_MODES[store.currentMood].suggestion}</p>
        <div className="mt-4 text-xs text-muted-foreground font-mono">Interface: {EMOTIONAL_MODES[store.currentMood].interfaceMode} mode</div>
      </motion.div>

      {/* Mood selector */}
      <h3 className="text-xs text-muted-foreground font-mono mb-4">SET YOUR CURRENT MODE</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {(Object.entries(EMOTIONAL_MODES) as [EmotionalMode, typeof EMOTIONAL_MODES[EmotionalMode]][]).map(([key, info], i) => {
          const isActive = store.currentMood === key;
          return (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => store.setMood(key)}
              className={`p-5 rounded-lg border text-left transition-all ${
                isActive
                  ? 'bg-primary/10 border-primary/30'
                  : 'bg-card border-border hover:border-primary/20 hover:bg-secondary/30'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{info.emoji}</span>
                <div>
                  <h3 className="font-display font-bold text-foreground">{info.label}</h3>
                  {isActive && <span className="text-xs text-primary font-mono">ACTIVE</span>}
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic mb-2">{info.message}</p>
              <p className="text-xs text-accent font-mono">{info.suggestion}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Permission statements */}
      <div className="mt-10 p-6 bg-card border border-border rounded-lg">
        <h3 className="text-xs text-muted-foreground font-mono mb-4">🎫 PERMISSION SLIPS</h3>
        <div className="space-y-3">
          {[
            'You are allowed to feel stuck. Stuckness is information.',
            'You don\'t have to be productive right now. Rest is creative.',
            'It\'s okay to have 47 tabs open and no idea which one matters.',
            'Changing direction is not failure. It\'s navigation.',
            'You are allowed to abandon this and start something completely different.',
            'Your scattered attention might be connecting things you can\'t see yet.',
            'Frustration means you care. That\'s not a bug.',
            'You don\'t need to finish this. You need to follow what\'s alive.',
          ].map((statement, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="text-sm text-foreground/80 font-mono pl-4 border-l-2 border-accent/30"
            >
              {statement}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
