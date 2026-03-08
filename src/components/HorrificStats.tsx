import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HorrificStats = () => {
  const [lineCount, setLineCount] = useState(47_382_916);
  const [ramUsage, setRamUsage] = useState(98.2);
  const [loadTime, setLoadTime] = useState(847);

  useEffect(() => {
    const interval = setInterval(() => {
      setLineCount(prev => prev + Math.floor(Math.random() * 1000));
      setRamUsage(prev => Math.min(99.9, prev + Math.random() * 0.1));
      setLoadTime(prev => prev + Math.floor(Math.random() * 5));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "LINES OF CODE", value: lineCount.toLocaleString(), icon: "📄" },
    { label: "RAM USAGE", value: `${ramUsage.toFixed(1)}%`, icon: "🔥" },
    { label: "LOAD TIME", value: `${loadTime}s`, icon: "⏳" },
    { label: "BUGS FOUND", value: "YES", icon: "🪲" },
    { label: "DEPENDENCIES", value: "2,847", icon: "📦" },
    { label: "TODO COMMENTS", value: "∞", icon: "📝" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-card border border-border p-4 md:p-6 glow-red"
        >
          <div className="text-2xl mb-2">{stat.icon}</div>
          <div className="font-mono text-xl md:text-2xl font-bold text-primary">
            {stat.value}
          </div>
          <div className="text-xs text-muted-foreground font-mono mt-1">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HorrificStats;
