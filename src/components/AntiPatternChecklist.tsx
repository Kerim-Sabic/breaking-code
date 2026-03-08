import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const antiPatterns = [
  "✅ 847 nested if-else statements",
  "✅ All variables named 'temp'",
  "✅ CSS inline styles everywhere", 
  "✅ console.log() as error handling",
  "✅ Entire database in localStorage",
  "✅ One 50,000 line component",
  "✅ Copy-pasted Stack Overflow answers",
  "✅ jQuery AND React AND Vue together",
  "✅ node_modules committed to git",
  "✅ Production secrets in .env.example",
];

const AntiPatternChecklist = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount(prev => {
        if (prev >= antiPatterns.length) return prev;
        return prev + 1;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border border-border p-6 md:p-8">
      <h3 className="font-mono text-sm text-muted-foreground mb-4">
        $ running anti-pattern-audit...
      </h3>
      <div className="space-y-2 font-mono text-sm">
        {antiPatterns.slice(0, visibleCount).map((pattern, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-success"
          >
            {pattern}
          </motion.div>
        ))}
        {visibleCount < antiPatterns.length && (
          <span className="text-accent animate-blink">▌</span>
        )}
        {visibleCount >= antiPatterns.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary mt-4 font-bold"
          >
            🎉 PERFECT SCORE: 10/10 ANTI-PATTERNS DETECTED
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AntiPatternChecklist;
