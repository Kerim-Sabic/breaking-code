import { motion } from "framer-motion";
import HorrificStats from "@/components/HorrificStats";
import HardcodedShowcase from "@/components/HardcodedShowcase";
import AntiPatternChecklist from "@/components/AntiPatternChecklist";
import ErrorTerminal from "@/components/ErrorTerminal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scanline">
      {/* Hero */}
      <section className="relative px-4 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-mono text-xs text-muted-foreground mb-6 tracking-widest">
              ⚠️ WARNING: THIS APP USES 100% OF YOUR CPU ⚠️
            </div>
            <h1 className="text-4xl md:text-7xl font-bold font-display leading-tight mb-6">
              THE LEAST{" "}
              <span className="text-gradient-danger animate-glitch inline-block">
                OPTIMIZED
              </span>
              <br />
              APP IN THE WORLD
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-mono">
              Every line is hardcoded. Every pattern is an anti-pattern.
              <br />
              Built with ❤️ and absolutely zero best practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-8 py-4 font-mono font-bold text-sm tracking-wider glow-red"
              >
                DOWNLOAD (47 GB)
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-border text-foreground px-8 py-4 font-mono font-bold text-sm tracking-wider hover:bg-secondary transition-colors"
              >
                VIEW SOURCE (GOOD LUCK)
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-mono text-xs text-muted-foreground mb-8 tracking-widest"
          >
            // REAL-TIME PERFORMANCE METRICS (ALL BAD)
          </motion.h2>
          <HorrificStats />
        </div>
      </section>

      {/* Hardcoded Showcase */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-mono text-xs text-muted-foreground mb-8 tracking-widest"
          >
            // ACTUAL CODE FROM OUR CODEBASE
          </motion.h2>
          <HardcodedShowcase />
        </div>
      </section>

      {/* Anti-pattern Checklist */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-mono text-xs text-muted-foreground mb-8 tracking-widest"
          >
            // AUTOMATED QUALITY AUDIT
          </motion.h2>
          <AntiPatternChecklist />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 border-t border-border">
        <div className="max-w-4xl mx-auto text-center font-mono text-xs text-muted-foreground space-y-2">
          <p>© 2026 Worst Practices Inc. All bugs reserved.</p>
          <p>Built with mass copy-paste and reckless abandon.</p>
          <p className="text-primary">
            No unit tests were harmed (or written) in the making of this app.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
