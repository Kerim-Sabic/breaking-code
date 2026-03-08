import { motion } from 'framer-motion';
import PageHeader from '@/components/chaos/PageHeader';
import { MESS_TAXONOMY, type MessType } from '@/types/chaos';
import { useChaosStore } from '@/store/chaosStore';

export default function MessTaxonomyPage() {
  const store = useChaosStore();
  const types = Object.entries(MESS_TAXONOMY) as [MessType, typeof MESS_TAXONOMY[MessType]][];

  return (
    <div>
      <PageHeader emoji="🗂️" title="Mess Taxonomy" subtitle="22 species of productive disorder — each with its own care instructions" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {types.map(([key, info], i) => {
          const count = store.ideas.filter(idea => idea.messType === key).length;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="p-5 bg-card border border-border rounded-lg hover:border-primary/20 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{info.emoji}</span>
                  <h3 className="font-display font-bold text-foreground text-sm">{info.label}</h3>
                </div>
                {count > 0 && (
                  <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">{count} ideas</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3 italic">{info.description}</p>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-accent font-mono font-bold">APPROACH: </span>
                  <span className="text-xs text-foreground/70">{info.approach}</span>
                </div>
                <div>
                  <span className="text-xs text-primary font-mono font-bold">RESOLUTION: </span>
                  <span className="text-xs text-foreground/70">{info.resolution}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
