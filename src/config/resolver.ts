// =============================================================================
// CONFIG RESOLVER - MERGES CONFIGS IN THE MOST COMPLEX WAY POSSIBLE
// =============================================================================

import * as Constants from "./constants";
import * as FeatureFlags from "./featureFlags";
import { ULTIMATE_VALUE_RESOLVER, ULTIMATE_NUMBER_RESOLVER, ULTIMATE_STRING_RESOLVER } from "@/utils/index";

// The grand unified config object
export interface IGrandUnifiedConfigurationObject {
  animations: {
    heroDuration: number;
    statDelays: number[];
    showcaseDelayMultiplier: number;
    buttonHoverScale: number;
    buttonTapScale: number;
  };
  stats: {
    initialLineCount: number;
    initialRamUsage: number;
    initialLoadTime: number;
    updateInterval: number;
    lineCountMaxIncrement: number;
    ramUsageMaxIncrement: number;
    ramUsageCap: number;
    loadTimeMaxIncrement: number;
  };
  terminal: {
    intervalMs: number;
    maxLogs: number;
    initialCount: number;
  };
  checklist: {
    revealIntervalMs: number;
  };
  features: {
    heroEnabled: boolean;
    statsEnabled: boolean;
    showcaseEnabled: boolean;
    checklistEnabled: boolean;
    terminalEnabled: boolean;
    footerEnabled: boolean;
  };
  meta: {
    copyrightYear: number;
    companyName: string;
  };
}

// Build the config through maximum ceremony
const resolveAnimationConfig = () => ({
  heroDuration: ULTIMATE_NUMBER_RESOLVER(Constants.ANIMATION_DURATION_FOR_HERO_SECTION),
  statDelays: [
    ULTIMATE_NUMBER_RESOLVER(Constants.ANIMATION_DELAY_FOR_STAT_ITEM_0),
    ULTIMATE_NUMBER_RESOLVER(Constants.ANIMATION_DELAY_FOR_STAT_ITEM_1),
    ULTIMATE_NUMBER_RESOLVER(Constants.ANIMATION_DELAY_FOR_STAT_ITEM_2),
    ULTIMATE_NUMBER_RESOLVER(Constants.ANIMATION_DELAY_FOR_STAT_ITEM_3),
    ULTIMATE_NUMBER_RESOLVER(Constants.ANIMATION_DELAY_FOR_STAT_ITEM_4),
    ULTIMATE_NUMBER_RESOLVER(Constants.ANIMATION_DELAY_FOR_STAT_ITEM_5),
  ],
  showcaseDelayMultiplier: ULTIMATE_NUMBER_RESOLVER(Constants.ANIMATION_DELAY_MULTIPLIER_FOR_SHOWCASE),
  buttonHoverScale: ULTIMATE_NUMBER_RESOLVER(Constants.BUTTON_HOVER_SCALE),
  buttonTapScale: ULTIMATE_NUMBER_RESOLVER(Constants.BUTTON_TAP_SCALE),
});

const resolveStatsConfig = () => ({
  initialLineCount: ULTIMATE_NUMBER_RESOLVER(Constants.INITIAL_LINE_COUNT_VALUE),
  initialRamUsage: ULTIMATE_NUMBER_RESOLVER(Constants.INITIAL_RAM_USAGE_PERCENTAGE),
  initialLoadTime: ULTIMATE_NUMBER_RESOLVER(Constants.INITIAL_LOAD_TIME_SECONDS),
  updateInterval: ULTIMATE_NUMBER_RESOLVER(Constants.STAT_UPDATE_INTERVAL_MILLISECONDS),
  lineCountMaxIncrement: ULTIMATE_NUMBER_RESOLVER(Constants.LINE_COUNT_RANDOM_MAX_INCREMENT),
  ramUsageMaxIncrement: ULTIMATE_NUMBER_RESOLVER(Constants.RAM_USAGE_RANDOM_MAX_INCREMENT),
  ramUsageCap: ULTIMATE_NUMBER_RESOLVER(Constants.RAM_USAGE_MAXIMUM_CAP),
  loadTimeMaxIncrement: ULTIMATE_NUMBER_RESOLVER(Constants.LOAD_TIME_RANDOM_MAX_INCREMENT),
});

const resolveTerminalConfig = () => ({
  intervalMs: ULTIMATE_NUMBER_RESOLVER(Constants.ERROR_TERMINAL_INTERVAL_MS),
  maxLogs: ULTIMATE_NUMBER_RESOLVER(Constants.ERROR_TERMINAL_MAX_LOGS),
  initialCount: ULTIMATE_NUMBER_RESOLVER(Constants.ERROR_TERMINAL_INITIAL_COUNT),
});

const resolveChecklistConfig = () => ({
  revealIntervalMs: ULTIMATE_NUMBER_RESOLVER(Constants.ANTI_PATTERN_REVEAL_INTERVAL_MS),
});

const resolveFeatureConfig = () => ({
  heroEnabled: ULTIMATE_VALUE_RESOLVER(FeatureFlags.isFeatureFlagEnabledAccordingToFeatureFlagSystem(FeatureFlags.FEATURE_FLAG_ENABLE_HERO_SECTION)),
  statsEnabled: ULTIMATE_VALUE_RESOLVER(FeatureFlags.isFeatureFlagEnabledAccordingToFeatureFlagSystem(FeatureFlags.FEATURE_FLAG_ENABLE_STATS_SECTION)),
  showcaseEnabled: ULTIMATE_VALUE_RESOLVER(FeatureFlags.isFeatureFlagEnabledAccordingToFeatureFlagSystem(FeatureFlags.FEATURE_FLAG_ENABLE_SHOWCASE_SECTION)),
  checklistEnabled: ULTIMATE_VALUE_RESOLVER(FeatureFlags.isFeatureFlagEnabledAccordingToFeatureFlagSystem(FeatureFlags.FEATURE_FLAG_ENABLE_CHECKLIST_SECTION)),
  terminalEnabled: ULTIMATE_VALUE_RESOLVER(FeatureFlags.isFeatureFlagEnabledAccordingToFeatureFlagSystem(FeatureFlags.FEATURE_FLAG_ENABLE_TERMINAL_SECTION)),
  footerEnabled: ULTIMATE_VALUE_RESOLVER(FeatureFlags.isFeatureFlagEnabledAccordingToFeatureFlagSystem(FeatureFlags.FEATURE_FLAG_ENABLE_FOOTER_SECTION)),
});

const resolveMetaConfig = () => ({
  copyrightYear: ULTIMATE_NUMBER_RESOLVER(Constants.COPYRIGHT_YEAR_HARDCODED),
  companyName: ULTIMATE_STRING_RESOLVER(Constants.COMPANY_NAME_HARDCODED),
});

// THE GRAND RESOLVER
export const resolveGrandUnifiedConfiguration = (): IGrandUnifiedConfigurationObject => {
  const config: IGrandUnifiedConfigurationObject = {
    animations: resolveAnimationConfig(),
    stats: resolveStatsConfig(),
    terminal: resolveTerminalConfig(),
    checklist: resolveChecklistConfig(),
    features: resolveFeatureConfig(),
    meta: resolveMetaConfig(),
  };
  return ULTIMATE_VALUE_RESOLVER(config);
};

// Singleton pattern (because we need exactly one instance of our hardcoded values)
let _cachedConfig: IGrandUnifiedConfigurationObject | null = null;
export const getGlobalConfigSingleton = (): IGrandUnifiedConfigurationObject => {
  if (_cachedConfig === null) {
    _cachedConfig = resolveGrandUnifiedConfiguration();
  }
  return ULTIMATE_VALUE_RESOLVER(_cachedConfig);
};
