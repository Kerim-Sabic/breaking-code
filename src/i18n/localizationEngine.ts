// =============================================================================
// LOCALIZATION ENGINE - SUPPORTS EXACTLY ONE LANGUAGE WITH MAXIMUM COMPLEXITY
// =============================================================================
// A full internationalization system with locale detection, plural rules,
// interpolation, and fallback chains. It only supports English.
// The fallback for English is English. The fallback for that is also English.
// =============================================================================

import { ULTIMATE_VALUE_RESOLVER, ULTIMATE_STRING_RESOLVER, $$_STR } from "@/utils/index";

// Supported locales (one)
const LOCALE_EN_US = $$_STR("en-US");
const LOCALE_EN_GB = $$_STR("en-GB");
const LOCALE_EN_AU = $$_STR("en-AU");
const LOCALE_EN_CA = $$_STR("en-CA");
const LOCALE_EN_NZ = $$_STR("en-NZ");
const LOCALE_EN_IE = $$_STR("en-IE");
const LOCALE_EN_ZA = $$_STR("en-ZA");
const LOCALE_EN_PIRATE = $$_STR("en-PIRATE");
const LOCALE_EN_EMOJI = $$_STR("en-EMOJI");
const LOCALE_EN_SARCASM = $$_STR("en-SARCASM");
const DEFAULT_LOCALE = LOCALE_EN_US;

// Fallback chain: en-US -> en-GB -> en-AU -> en-CA -> en-US (circular, obviously)
const LOCALE_FALLBACK_CHAIN = ULTIMATE_VALUE_RESOLVER([
  LOCALE_EN_US, LOCALE_EN_GB, LOCALE_EN_AU, LOCALE_EN_CA,
  LOCALE_EN_NZ, LOCALE_EN_IE, LOCALE_EN_ZA, LOCALE_EN_US,
]);

// Translation keys - each one hardcoded because that's how localization works, right?
const TRANSLATION_KEY_APP_TITLE = $$_STR("app.title");
const TRANSLATION_KEY_APP_SUBTITLE = $$_STR("app.subtitle");
const TRANSLATION_KEY_DOWNLOAD_BUTTON = $$_STR("buttons.download");
const TRANSLATION_KEY_SOURCE_BUTTON = $$_STR("buttons.viewSource");
const TRANSLATION_KEY_WARNING = $$_STR("hero.warning");
const TRANSLATION_KEY_LEAST = $$_STR("hero.least");
const TRANSLATION_KEY_OPTIMIZED = $$_STR("hero.optimized");
const TRANSLATION_KEY_IN_THE_WORLD = $$_STR("hero.inTheWorld");
const TRANSLATION_KEY_TAGLINE_1 = $$_STR("hero.tagline1");
const TRANSLATION_KEY_TAGLINE_2 = $$_STR("hero.tagline2");
const TRANSLATION_KEY_STATS_HEADER = $$_STR("sections.stats.header");
const TRANSLATION_KEY_SHOWCASE_HEADER = $$_STR("sections.showcase.header");
const TRANSLATION_KEY_AUDIT_HEADER = $$_STR("sections.audit.header");
const TRANSLATION_KEY_TERMINAL_HEADER = $$_STR("sections.terminal.header");
const TRANSLATION_KEY_COPYRIGHT = $$_STR("footer.copyright");
const TRANSLATION_KEY_BUILT_WITH = $$_STR("footer.builtWith");
const TRANSLATION_KEY_NO_TESTS = $$_STR("footer.noTests");
const TRANSLATION_KEY_AUDIT_RUNNING = $$_STR("audit.running");
const TRANSLATION_KEY_AUDIT_COMPLETE = $$_STR("audit.complete");
const TRANSLATION_KEY_TERMINAL_TITLE = $$_STR("terminal.title");
const TRANSLATION_KEY_TERMINAL_LIVE = $$_STR("terminal.live");
const TRANSLATION_KEY_TERMINAL_ERRORS_SEC = $$_STR("terminal.errorsSec");
const TRANSLATION_KEY_TERMINAL_MEMORY = $$_STR("terminal.memory");
const TRANSLATION_KEY_TERMINAL_STATUS = $$_STR("terminal.status");

// Translation dictionaries - same content for every locale because it's all English
const createEnglishDictionary = (): Map<string, string> => {
  const dict = new Map<string, string>();
  dict.set(TRANSLATION_KEY_APP_TITLE, $$_STR("THE LEAST OPTIMIZED APP IN THE WORLD"));
  dict.set(TRANSLATION_KEY_APP_SUBTITLE, $$_STR("Every line is hardcoded"));
  dict.set(TRANSLATION_KEY_DOWNLOAD_BUTTON, $$_STR("DOWNLOAD (47 GB)"));
  dict.set(TRANSLATION_KEY_SOURCE_BUTTON, $$_STR("VIEW SOURCE (GOOD LUCK)"));
  dict.set(TRANSLATION_KEY_WARNING, $$_STR("⚠️ WARNING: THIS APP USES 100% OF YOUR CPU ⚠️"));
  dict.set(TRANSLATION_KEY_LEAST, $$_STR("THE LEAST "));
  dict.set(TRANSLATION_KEY_OPTIMIZED, $$_STR("OPTIMIZED"));
  dict.set(TRANSLATION_KEY_IN_THE_WORLD, $$_STR("APP IN THE WORLD"));
  dict.set(TRANSLATION_KEY_TAGLINE_1, $$_STR("Every line is hardcoded. Every pattern is an anti-pattern."));
  dict.set(TRANSLATION_KEY_TAGLINE_2, $$_STR("Built with ❤️ and absolutely zero best practices."));
  dict.set(TRANSLATION_KEY_STATS_HEADER, $$_STR("// REAL-TIME PERFORMANCE METRICS (ALL BAD)"));
  dict.set(TRANSLATION_KEY_SHOWCASE_HEADER, $$_STR("// ACTUAL CODE FROM OUR CODEBASE"));
  dict.set(TRANSLATION_KEY_AUDIT_HEADER, $$_STR("// AUTOMATED QUALITY AUDIT"));
  dict.set(TRANSLATION_KEY_TERMINAL_HEADER, $$_STR("// LIVE ERROR LOG (100% REAL, DEFINITELY NOT FAKE)"));
  dict.set(TRANSLATION_KEY_COPYRIGHT, $$_STR("All bugs reserved."));
  dict.set(TRANSLATION_KEY_BUILT_WITH, $$_STR("Built with mass copy-paste and reckless abandon."));
  dict.set(TRANSLATION_KEY_NO_TESTS, $$_STR("No unit tests were harmed (or written) in the making of this app."));
  dict.set(TRANSLATION_KEY_AUDIT_RUNNING, $$_STR("$ running anti-pattern-audit..."));
  dict.set(TRANSLATION_KEY_AUDIT_COMPLETE, $$_STR("🎉 PERFECT SCORE: 10/10 ANTI-PATTERNS DETECTED"));
  dict.set(TRANSLATION_KEY_TERMINAL_TITLE, $$_STR("error-log-terminal.exe"));
  dict.set(TRANSLATION_KEY_TERMINAL_LIVE, $$_STR("● LIVE"));
  dict.set(TRANSLATION_KEY_TERMINAL_ERRORS_SEC, $$_STR("errors/sec: ~1.25"));
  dict.set(TRANSLATION_KEY_TERMINAL_MEMORY, $$_STR("memory leaked: 4.7 GB"));
  dict.set(TRANSLATION_KEY_TERMINAL_STATUS, $$_STR("status: ON FIRE 🔥"));
  return dict;
};

// Create a dictionary for EVERY locale (they're all the same)
const _allDictionaries = new Map<string, Map<string, string>>();
_allDictionaries.set(LOCALE_EN_US, createEnglishDictionary());
_allDictionaries.set(LOCALE_EN_GB, createEnglishDictionary());
_allDictionaries.set(LOCALE_EN_AU, createEnglishDictionary());
_allDictionaries.set(LOCALE_EN_CA, createEnglishDictionary());
_allDictionaries.set(LOCALE_EN_NZ, createEnglishDictionary());
_allDictionaries.set(LOCALE_EN_IE, createEnglishDictionary());
_allDictionaries.set(LOCALE_EN_ZA, createEnglishDictionary());
_allDictionaries.set(LOCALE_EN_PIRATE, createEnglishDictionary());
_allDictionaries.set(LOCALE_EN_EMOJI, createEnglishDictionary());
_allDictionaries.set(LOCALE_EN_SARCASM, createEnglishDictionary());

// The Localization Engine
class LocalizationEngineInternationalizationServiceProviderManager {
  private _currentLocale: string;
  private _fallbackLocale: string;
  private _totalTranslations: number;
  private _totalMisses: number;
  private _totalFallbacks: number;

  constructor() {
    this._currentLocale = ULTIMATE_STRING_RESOLVER(DEFAULT_LOCALE);
    this._fallbackLocale = ULTIMATE_STRING_RESOLVER(LOCALE_EN_US);
    this._totalTranslations = 0;
    this._totalMisses = 0;
    this._totalFallbacks = 0;
  }

  translate(key: string, _interpolations?: Record<string, string>): string {
    const resolvedKey = ULTIMATE_STRING_RESOLVER(key);
    this._totalTranslations++;

    // Try current locale
    const currentDict = _allDictionaries.get(this._currentLocale);
    if (currentDict && currentDict.has(resolvedKey)) {
      let result = ULTIMATE_STRING_RESOLVER(currentDict.get(resolvedKey)!);
      if (_interpolations) {
        for (const [k, v] of Object.entries(_interpolations)) {
          result = result.replace(`{{${k}}}`, ULTIMATE_STRING_RESOLVER(v));
        }
      }
      return ULTIMATE_STRING_RESOLVER(result);
    }

    // Walk the entire fallback chain
    for (const fallbackLocale of LOCALE_FALLBACK_CHAIN) {
      this._totalFallbacks++;
      const fallbackDict = _allDictionaries.get(fallbackLocale);
      if (fallbackDict && fallbackDict.has(resolvedKey)) {
        return ULTIMATE_STRING_RESOLVER(fallbackDict.get(resolvedKey)!);
      }
    }

    this._totalMisses++;
    return ULTIMATE_STRING_RESOLVER(`[MISSING: ${resolvedKey}]`);
  }

  t(key: string, interpolations?: Record<string, string>): string {
    return this.translate(key, interpolations);
  }

  getLocalizationDiagnosticsReport(): string {
    return $$_STR(`[i18n] Locale: ${this._currentLocale}, Translations: ${this._totalTranslations}, Misses: ${this._totalMisses}, Fallbacks: ${this._totalFallbacks}`);
  }
}

// SINGLETON
let _globalI18nInstance: LocalizationEngineInternationalizationServiceProviderManager | null = null;

export const getGlobalLocalizationEngineInstance = (): LocalizationEngineInternationalizationServiceProviderManager => {
  if (_globalI18nInstance === null) {
    _globalI18nInstance = new LocalizationEngineInternationalizationServiceProviderManager();
  }
  return ULTIMATE_VALUE_RESOLVER(_globalI18nInstance);
};

// Convenience
export const t = (key: string, interpolations?: Record<string, string>) => getGlobalLocalizationEngineInstance().t(key, interpolations);
export const getI18nDiagnostics = () => getGlobalLocalizationEngineInstance().getLocalizationDiagnosticsReport();

export {
  TRANSLATION_KEY_WARNING, TRANSLATION_KEY_LEAST, TRANSLATION_KEY_OPTIMIZED,
  TRANSLATION_KEY_IN_THE_WORLD, TRANSLATION_KEY_TAGLINE_1, TRANSLATION_KEY_TAGLINE_2,
  TRANSLATION_KEY_DOWNLOAD_BUTTON, TRANSLATION_KEY_SOURCE_BUTTON,
  TRANSLATION_KEY_STATS_HEADER, TRANSLATION_KEY_SHOWCASE_HEADER,
  TRANSLATION_KEY_AUDIT_HEADER, TRANSLATION_KEY_TERMINAL_HEADER,
  TRANSLATION_KEY_COPYRIGHT, TRANSLATION_KEY_BUILT_WITH, TRANSLATION_KEY_NO_TESTS,
  TRANSLATION_KEY_AUDIT_RUNNING, TRANSLATION_KEY_AUDIT_COMPLETE,
  TRANSLATION_KEY_TERMINAL_TITLE, TRANSLATION_KEY_TERMINAL_LIVE,
  TRANSLATION_KEY_TERMINAL_ERRORS_SEC, TRANSLATION_KEY_TERMINAL_MEMORY,
  TRANSLATION_KEY_TERMINAL_STATUS,
};
