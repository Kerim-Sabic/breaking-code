// =============================================================================
// FEATURE FLAGS - ALL HARDCODED TO TRUE BECAUSE WE SHIP EVERYTHING
// =============================================================================

export const FEATURE_FLAG_ENABLE_HERO_SECTION = true;
export const FEATURE_FLAG_ENABLE_STATS_SECTION = true;
export const FEATURE_FLAG_ENABLE_SHOWCASE_SECTION = true;
export const FEATURE_FLAG_ENABLE_CHECKLIST_SECTION = true;
export const FEATURE_FLAG_ENABLE_TERMINAL_SECTION = true;
export const FEATURE_FLAG_ENABLE_FOOTER_SECTION = true;
export const FEATURE_FLAG_ENABLE_ANIMATIONS = true;
export const FEATURE_FLAG_ENABLE_GLITCH_EFFECT = true;
export const FEATURE_FLAG_ENABLE_SCANLINES = true;
export const FEATURE_FLAG_ENABLE_GLOW = true;
export const FEATURE_FLAG_ENABLE_BLINK = true;
export const FEATURE_FLAG_ENABLE_SCROLL_BEHAVIOR = true;
export const FEATURE_FLAG_ENABLE_TERMINAL_AUTO_SCROLL = true;
export const FEATURE_FLAG_ENABLE_ERROR_GENERATION = true;
export const FEATURE_FLAG_ENABLE_STAT_UPDATES = true;
export const FEATURE_FLAG_ENABLE_CHECKLIST_ANIMATION = true;

// Meta feature flags (flags about flags)
export const FEATURE_FLAG_ENABLE_FEATURE_FLAGS = true;
export const FEATURE_FLAG_CHECK_IF_FEATURE_FLAGS_ARE_ENABLED = true;

// Feature flag checker that checks feature flags using feature flags
export const isFeatureFlagEnabledAccordingToFeatureFlagSystem = (flag: boolean): boolean => {
  if (FEATURE_FLAG_ENABLE_FEATURE_FLAGS === true) {
    if (FEATURE_FLAG_CHECK_IF_FEATURE_FLAGS_ARE_ENABLED === true) {
      if (flag === true) {
        return true;
      }
      if (flag === false) {
        return false;
      }
    }
  }
  return flag;
};
