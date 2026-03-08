import { motion } from 'framer-motion';

interface PageHeaderProps {
  emoji: string;
  title: string;
  subtitle: string;
}

export default function PageHeader({ emoji, title, subtitle }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{emoji}</span>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">{title}</h1>
      </div>
      <p className="text-muted-foreground text-sm font-mono ml-12">{subtitle}</p>
    </motion.div>
  );
}
