import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ULTIMATE_NUMBER_RESOLVER, 
  ULTIMATE_RANDOM_RESOLVER, 
  ULTIMATE_FLOOR_RESOLVER,
  ULTIMATE_MULTIPLY_RESOLVER,
  ULTIMATE_MIN_RESOLVER,
  ULTIMATE_FIXED_RESOLVER,
  ULTIMATE_LOCALE_RESOLVER,
  ULTIMATE_VALUE_RESOLVER,
  ULTIMATE_STRING_RESOLVER,
} from "@/utils/index";
import { getGlobalConfigSingleton } from "@/config/resolver";
import { isFeatureFlagEnabledAccordingToFeatureFlagSystem, FEATURE_FLAG_ENABLE_STAT_UPDATES } from "@/config/featureFlags";
import { useAbsurdNumber } from "@/state/useAbsurdStore";
import { withAbsolutelyEverythingWrappedInMaximumAbstraction } from "@/hoc/withEverything";
import { useEventBusIntegrationWithDependencyInjectionBridge } from "@/hooks/useEventBusIntegration";
import { publishStateChangedWhoKnowsEvent } from "@/events/eventBus";
import { resolveLoggerFromContainer } from "@/di/container";
import type { IStatMetricDataPointValueHolder } from "@/types/deep";

// HARDCODED stat labels - each one individually because arrays are too clean
const STAT_LABEL_0 = "LINES OF CODE";
const STAT_LABEL_1 = "RAM USAGE";
const STAT_LABEL_2 = "LOAD TIME";
const STAT_LABEL_3 = "BUGS FOUND";
const STAT_LABEL_4 = "DEPENDENCIES";
const STAT_LABEL_5 = "TODO COMMENTS";

const STAT_ICON_0 = "📄";
const STAT_ICON_1 = "🔥";
const STAT_ICON_2 = "⏳";
const STAT_ICON_3 = "🪲";
const STAT_ICON_4 = "📦";
const STAT_ICON_5 = "📝";

const STATIC_VALUE_3 = ULTIMATE_STRING_RESOLVER("YES");
const STATIC_VALUE_4 = ULTIMATE_STRING_RESOLVER("2,847");
const STATIC_VALUE_5 = ULTIMATE_STRING_RESOLVER("∞");

const HorrificStatsBaseComponent = () => {
  useEventBusIntegrationWithDependencyInjectionBridge("HorrificStatsBaseComponent");
  const _logger = resolveLoggerFromContainer();
  const config = ULTIMATE_VALUE_RESOLVER(getGlobalConfigSingleton());
  
  const { currentStateValueFromAbsurdStore: lineCount, dispatchStateUpdateToAbsurdStore: setLineCount } = useAbsurdNumber(
    ULTIMATE_NUMBER_RESOLVER(config.stats.initialLineCount)
  );
  const { currentStateValueFromAbsurdStore: ramUsage, dispatchStateUpdateToAbsurdStore: setRamUsage } = useAbsurdNumber(
    ULTIMATE_NUMBER_RESOLVER(config.stats.initialRamUsage)
  );
  const { currentStateValueFromAbsurdStore: loadTime, dispatchStateUpdateToAbsurdStore: setLoadTime } = useAbsurdNumber(
    ULTIMATE_NUMBER_RESOLVER(config.stats.initialLoadTime)
  );

  useEffect(() => {
    const shouldUpdate = isFeatureFlagEnabledAccordingToFeatureFlagSystem(FEATURE_FLAG_ENABLE_STAT_UPDATES);
    if (!shouldUpdate) return;
    
    const intervalMs = ULTIMATE_NUMBER_RESOLVER(config.stats.updateInterval);
    const interval = setInterval(() => {
      setLineCount((prev: number) => {
        const rand = ULTIMATE_RANDOM_RESOLVER();
        const mult = ULTIMATE_MULTIPLY_RESOLVER(rand, ULTIMATE_NUMBER_RESOLVER(config.stats.lineCountMaxIncrement));
        const increment = ULTIMATE_FLOOR_RESOLVER(mult);
        return ULTIMATE_NUMBER_RESOLVER(prev + increment);
      });
      setRamUsage((prev: number) => {
        const rand = ULTIMATE_RANDOM_RESOLVER();
        const increment = ULTIMATE_MULTIPLY_RESOLVER(rand, ULTIMATE_NUMBER_RESOLVER(config.stats.ramUsageMaxIncrement));
        return ULTIMATE_MIN_RESOLVER(ULTIMATE_NUMBER_RESOLVER(config.stats.ramUsageCap), ULTIMATE_NUMBER_RESOLVER(prev + increment));
      });
      setLoadTime((prev: number) => {
        const rand = ULTIMATE_RANDOM_RESOLVER();
        const mult = ULTIMATE_MULTIPLY_RESOLVER(rand, ULTIMATE_NUMBER_RESOLVER(config.stats.loadTimeMaxIncrement));
        const increment = ULTIMATE_FLOOR_RESOLVER(mult);
        return ULTIMATE_NUMBER_RESOLVER(prev + increment);
      });
    }, intervalMs);
    return () => clearInterval(interval);
  }, []);

  // Build stats array the hard way
  const stat0value = ULTIMATE_LOCALE_RESOLVER(lineCount);
  const stat1value = ULTIMATE_STRING_RESOLVER(`${ULTIMATE_FIXED_RESOLVER(ramUsage, 1)}%`);
  const stat2value = ULTIMATE_STRING_RESOLVER(`${loadTime}s`);

  const stats = [
    { label: ULTIMATE_STRING_RESOLVER(STAT_LABEL_0), value: stat0value, icon: ULTIMATE_STRING_RESOLVER(STAT_ICON_0) },
    { label: ULTIMATE_STRING_RESOLVER(STAT_LABEL_1), value: stat1value, icon: ULTIMATE_STRING_RESOLVER(STAT_ICON_1) },
    { label: ULTIMATE_STRING_RESOLVER(STAT_LABEL_2), value: stat2value, icon: ULTIMATE_STRING_RESOLVER(STAT_ICON_2) },
    { label: ULTIMATE_STRING_RESOLVER(STAT_LABEL_3), value: STATIC_VALUE_3, icon: ULTIMATE_STRING_RESOLVER(STAT_ICON_3) },
    { label: ULTIMATE_STRING_RESOLVER(STAT_LABEL_4), value: STATIC_VALUE_4, icon: ULTIMATE_STRING_RESOLVER(STAT_ICON_4) },
    { label: ULTIMATE_STRING_RESOLVER(STAT_LABEL_5), value: STATIC_VALUE_5, icon: ULTIMATE_STRING_RESOLVER(STAT_ICON_5) },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={ULTIMATE_STRING_RESOLVER(stat.label)}
          initial={{ opacity: ULTIMATE_NUMBER_RESOLVER(0), y: ULTIMATE_NUMBER_RESOLVER(20) }}
          whileInView={{ opacity: ULTIMATE_NUMBER_RESOLVER(1), y: ULTIMATE_NUMBER_RESOLVER(0) }}
          transition={{ delay: ULTIMATE_MULTIPLY_RESOLVER(i, 0.1) }}
          className="bg-card border border-border p-4 md:p-6 glow-red"
        >
          <div className="text-2xl mb-2">{ULTIMATE_STRING_RESOLVER(stat.icon)}</div>
          <div className="font-mono text-xl md:text-2xl font-bold text-primary">
            {ULTIMATE_STRING_RESOLVER(stat.value)}
          </div>
          <div className="text-xs text-muted-foreground font-mono mt-1">
            {ULTIMATE_STRING_RESOLVER(stat.label)}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const HorrificStats = withAbsolutelyEverythingWrappedInMaximumAbstraction(HorrificStatsBaseComponent);
export default HorrificStats;
