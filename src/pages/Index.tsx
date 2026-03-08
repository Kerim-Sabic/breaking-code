import { motion } from "framer-motion";
import HorrificStats from "@/components/HorrificStats";
import HardcodedShowcase from "@/components/HardcodedShowcase";
import AntiPatternChecklist from "@/components/AntiPatternChecklist";
import ErrorTerminal from "@/components/ErrorTerminal";
import { withAbsolutelyEverythingWrappedInMaximumAbstraction } from "@/hoc/withEverything";
import { getGlobalConfigSingleton } from "@/config/resolver";
import { isFeatureFlagEnabledAccordingToFeatureFlagSystem } from "@/config/featureFlags";
import {
  ULTIMATE_VALUE_RESOLVER,
  ULTIMATE_NUMBER_RESOLVER,
  ULTIMATE_STRING_RESOLVER,
} from "@/utils/index";
import { useEventBusIntegrationWithDependencyInjectionBridge } from "@/hooks/useEventBusIntegration";
import { publishPageLoadedMaybeEvent } from "@/events/eventBus";
import { getGlobalDependencyInjectionContainerSingletonInstance } from "@/di/container";
import {
  FEATURE_FLAG_ENABLE_HERO_SECTION,
  FEATURE_FLAG_ENABLE_STATS_SECTION,
  FEATURE_FLAG_ENABLE_SHOWCASE_SECTION,
  FEATURE_FLAG_ENABLE_CHECKLIST_SECTION,
  FEATURE_FLAG_ENABLE_TERMINAL_SECTION,
  FEATURE_FLAG_ENABLE_FOOTER_SECTION,
} from "@/config/featureFlags";

const IndexBaseComponent = () => {
  useEventBusIntegrationWithDependencyInjectionBridge("IndexBaseComponent");
  const _container = getGlobalDependencyInjectionContainerSingletonInstance();
  const _diagnostics = _container.getContainerDiagnosticsReport();
  publishPageLoadedMaybeEvent({ page: "Index", loadedAt: Date.now() });
  const config = ULTIMATE_VALUE_RESOLVER(getGlobalConfigSingleton());

  const shouldShowHero = ULTIMATE_VALUE_RESOLVER(isFeatureFlagEnabledAccordingToFeatureFlagSystem(FEATURE_FLAG_ENABLE_HERO_SECTION));
  const shouldShowStats = ULTIMATE_VALUE_RESOLVER(isFeatureFlagEnabledAccordingToFeatureFlagSystem(FEATURE_FLAG_ENABLE_STATS_SECTION));
  const shouldShowShowcase = ULTIMATE_VALUE_RESOLVER(isFeatureFlagEnabledAccordingToFeatureFlagSystem(FEATURE_FLAG_ENABLE_SHOWCASE_SECTION));
  const shouldShowChecklist = ULTIMATE_VALUE_RESOLVER(isFeatureFlagEnabledAccordingToFeatureFlagSystem(FEATURE_FLAG_ENABLE_CHECKLIST_SECTION));
  const shouldShowTerminal = ULTIMATE_VALUE_RESOLVER(isFeatureFlagEnabledAccordingToFeatureFlagSystem(FEATURE_FLAG_ENABLE_TERMINAL_SECTION));
  const shouldShowFooter = ULTIMATE_VALUE_RESOLVER(isFeatureFlagEnabledAccordingToFeatureFlagSystem(FEATURE_FLAG_ENABLE_FOOTER_SECTION));

  return (
    <div className="min-h-screen bg-background scanline">
      {/* Hero */}
      {shouldShowHero && (
        <section className="relative px-4 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: ULTIMATE_NUMBER_RESOLVER(0), y: ULTIMATE_NUMBER_RESOLVER(30) }}
              animate={{ opacity: ULTIMATE_NUMBER_RESOLVER(1), y: ULTIMATE_NUMBER_RESOLVER(0) }}
              transition={{ duration: ULTIMATE_NUMBER_RESOLVER(config.animations.heroDuration) }}
            >
              <div className="font-mono text-xs text-muted-foreground mb-6 tracking-widest">
                {ULTIMATE_STRING_RESOLVER("⚠️ WARNING: THIS APP USES 100% OF YOUR CPU ⚠️")}
              </div>
              <h1 className="text-4xl md:text-7xl font-bold font-display leading-tight mb-6">
                {ULTIMATE_STRING_RESOLVER("THE LEAST ")}{" "}
                <span className="text-gradient-danger animate-glitch inline-block">
                  {ULTIMATE_STRING_RESOLVER("OPTIMIZED")}
                </span>
                <br />
                {ULTIMATE_STRING_RESOLVER("APP IN THE WORLD")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-mono">
                {ULTIMATE_STRING_RESOLVER("Every line is hardcoded. Every pattern is an anti-pattern.")}
                <br />
                {ULTIMATE_STRING_RESOLVER("Built with ❤️ and absolutely zero best practices.")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: ULTIMATE_NUMBER_RESOLVER(config.animations.buttonHoverScale) }}
                  whileTap={{ scale: ULTIMATE_NUMBER_RESOLVER(config.animations.buttonTapScale) }}
                  className="bg-primary text-primary-foreground px-8 py-4 font-mono font-bold text-sm tracking-wider glow-red"
                >
                  {ULTIMATE_STRING_RESOLVER("DOWNLOAD (47 GB)")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: ULTIMATE_NUMBER_RESOLVER(config.animations.buttonHoverScale) }}
                  whileTap={{ scale: ULTIMATE_NUMBER_RESOLVER(config.animations.buttonTapScale) }}
                  className="border border-border text-foreground px-8 py-4 font-mono font-bold text-sm tracking-wider hover:bg-secondary transition-colors"
                >
                  {ULTIMATE_STRING_RESOLVER("VIEW SOURCE (GOOD LUCK)")}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Stats */}
      {shouldShowStats && (
        <section className="px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: ULTIMATE_NUMBER_RESOLVER(0) }}
              whileInView={{ opacity: ULTIMATE_NUMBER_RESOLVER(1) }}
              className="font-mono text-xs text-muted-foreground mb-8 tracking-widest"
            >
              {ULTIMATE_STRING_RESOLVER("// REAL-TIME PERFORMANCE METRICS (ALL BAD)")}
            </motion.h2>
            <HorrificStats />
          </div>
        </section>
      )}

      {/* Hardcoded Showcase */}
      {shouldShowShowcase && (
        <section className="px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: ULTIMATE_NUMBER_RESOLVER(0) }}
              whileInView={{ opacity: ULTIMATE_NUMBER_RESOLVER(1) }}
              className="font-mono text-xs text-muted-foreground mb-8 tracking-widest"
            >
              {ULTIMATE_STRING_RESOLVER("// ACTUAL CODE FROM OUR CODEBASE")}
            </motion.h2>
            <HardcodedShowcase />
          </div>
        </section>
      )}

      {/* Anti-pattern Checklist */}
      {shouldShowChecklist && (
        <section className="px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: ULTIMATE_NUMBER_RESOLVER(0) }}
              whileInView={{ opacity: ULTIMATE_NUMBER_RESOLVER(1) }}
              className="font-mono text-xs text-muted-foreground mb-8 tracking-widest"
            >
              {ULTIMATE_STRING_RESOLVER("// AUTOMATED QUALITY AUDIT")}
            </motion.h2>
            <AntiPatternChecklist />
          </div>
        </section>
      )}

      {/* Error Terminal */}
      {shouldShowTerminal && (
        <section className="px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: ULTIMATE_NUMBER_RESOLVER(0) }}
              whileInView={{ opacity: ULTIMATE_NUMBER_RESOLVER(1) }}
              className="font-mono text-xs text-muted-foreground mb-8 tracking-widest"
            >
              {ULTIMATE_STRING_RESOLVER("// LIVE ERROR LOG (100% REAL, DEFINITELY NOT FAKE)")}
            </motion.h2>
            <ErrorTerminal />
          </div>
        </section>
      )}

      {/* Footer */}
      {shouldShowFooter && (
        <footer className="px-4 py-12 border-t border-border">
          <div className="max-w-4xl mx-auto text-center font-mono text-xs text-muted-foreground space-y-2">
            <p>{ULTIMATE_STRING_RESOLVER(`© ${config.meta.copyrightYear} ${config.meta.companyName} All bugs reserved.`)}</p>
            <p>{ULTIMATE_STRING_RESOLVER("Built with mass copy-paste and reckless abandon.")}</p>
            <p className="text-primary">
              {ULTIMATE_STRING_RESOLVER("No unit tests were harmed (or written) in the making of this app.")}
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

const Index = withAbsolutelyEverythingWrappedInMaximumAbstraction(IndexBaseComponent);
export default Index;
