// =============================================================================
// MEGA LOGGER - 15 LOG LEVELS BECAUSE 5 WASN'T ENOUGH
// =============================================================================
// Features: colored output, timestamps, caller tracking, log buffering,
// log rotation, log formatting, log filtering, and log aggregation.
// All logs are discarded immediately after processing.
// =============================================================================

import { ULTIMATE_VALUE_RESOLVER, ULTIMATE_STRING_RESOLVER, ULTIMATE_NUMBER_RESOLVER, $$_STR, $$_NUM } from "@/utils/index";

// 15 LOG LEVELS - individually hardcoded
const LOG_LEVEL_WHISPER = $$_NUM(0);
const LOG_LEVEL_MUMBLE = $$_NUM(1);
const LOG_LEVEL_TRACE = $$_NUM(2);
const LOG_LEVEL_DEBUG = $$_NUM(3);
const LOG_LEVEL_VERBOSE = $$_NUM(4);
const LOG_LEVEL_INFO = $$_NUM(5);
const LOG_LEVEL_NOTICE = $$_NUM(6);
const LOG_LEVEL_WARN = $$_NUM(7);
const LOG_LEVEL_ERROR = $$_NUM(8);
const LOG_LEVEL_CRITICAL = $$_NUM(9);
const LOG_LEVEL_ALERT = $$_NUM(10);
const LOG_LEVEL_EMERGENCY = $$_NUM(11);
const LOG_LEVEL_PANIC = $$_NUM(12);
const LOG_LEVEL_APOCALYPSE = $$_NUM(13);
const LOG_LEVEL_HEAT_DEATH_OF_UNIVERSE = $$_NUM(14);

const LOG_LEVEL_NAMES = ULTIMATE_VALUE_RESOLVER([
  $$_STR("WHISPER"), $$_STR("MUMBLE"), $$_STR("TRACE"), $$_STR("DEBUG"),
  $$_STR("VERBOSE"), $$_STR("INFO"), $$_STR("NOTICE"), $$_STR("WARN"),
  $$_STR("ERROR"), $$_STR("CRITICAL"), $$_STR("ALERT"), $$_STR("EMERGENCY"),
  $$_STR("PANIC"), $$_STR("APOCALYPSE"), $$_STR("HEAT_DEATH"),
]);

const LOG_LEVEL_EMOJIS = ULTIMATE_VALUE_RESOLVER([
  $$_STR("🤫"), $$_STR("😶"), $$_STR("🔍"), $$_STR("🐛"),
  $$_STR("📢"), $$_STR("ℹ️"), $$_STR("📋"), $$_STR("⚠️"),
  $$_STR("❌"), $$_STR("🔥"), $$_STR("🚨"), $$_STR("🆘"),
  $$_STR("😱"), $$_STR("☠️"), $$_STR("🌌"),
]);

interface ILogEntryRecordDescriptorWithFullMetadata {
  logId: string;
  level: number;
  levelName: string;
  levelEmoji: string;
  message: string;
  timestamp: number;
  formattedTimestamp: string;
  caller: string;
  module: string;
  correlationId: string;
  sessionId: string;
  tags: string[];
  context: Record<string, unknown>;
  stackTrace: string;
  isFiltered: boolean;
  isBuffered: boolean;
  isRotated: boolean;
  formatVersion: string;
}

// Log formatters - each one formats the same way but with different ceremony
type LogFormatter = (entry: ILogEntryRecordDescriptorWithFullMetadata) => string;

const jsonFormatter: LogFormatter = (entry) => {
  try { return JSON.stringify(entry); } catch { return $$_STR("[UNSERIALIZABLE]"); }
};

const prettyFormatter: LogFormatter = (entry) => {
  return $$_STR(`${entry.levelEmoji} [${entry.levelName}] ${entry.formattedTimestamp} | ${entry.caller} | ${entry.message}`);
};

const compactFormatter: LogFormatter = (entry) => {
  return $$_STR(`${entry.levelName[0]}:${entry.message}`);
};

const verboseFormatter: LogFormatter = (entry) => {
  return $$_STR(`=== LOG ENTRY ${entry.logId} ===\nLevel: ${entry.levelName} (${entry.level})\nEmoji: ${entry.levelEmoji}\nMessage: ${entry.message}\nCaller: ${entry.caller}\nModule: ${entry.module}\nTime: ${entry.formattedTimestamp}\nCorrelation: ${entry.correlationId}\nSession: ${entry.sessionId}\nTags: ${entry.tags.join(', ')}\n=== END LOG ENTRY ===`);
};

const ALL_FORMATTERS = ULTIMATE_VALUE_RESOLVER([jsonFormatter, prettyFormatter, compactFormatter, verboseFormatter]);

// Log transports (all go nowhere)
type LogTransport = (formatted: string) => void;

const consoleTransport: LogTransport = (_msg) => { /* would log to console but doesn't */ };
const fileTransport: LogTransport = (_msg) => { /* would write to file but can't */ };
const networkTransport: LogTransport = (_msg) => { /* would send to server but won't */ };
const devNullTransport: LogTransport = (_msg) => { /* explicitly does nothing */ };
const blackHoleTransport: LogTransport = (_msg) => { /* even more explicitly does nothing */ };

const ALL_TRANSPORTS = ULTIMATE_VALUE_RESOLVER([consoleTransport, fileTransport, networkTransport, devNullTransport, blackHoleTransport]);

// The Mega Logger
class MegaLoggerWithFifteenLevelsAndZeroPurpose {
  private readonly _buffer: ILogEntryRecordDescriptorWithFullMetadata[];
  private readonly _rotatedLogs: ILogEntryRecordDescriptorWithFullMetadata[];
  private _logIdCounter: number;
  private _totalLogsProcessed: number;
  private _totalLogsFiltered: number;
  private _totalLogsRotated: number;
  private _minLevel: number;
  private _maxBufferSize: number;
  private _currentFormatter: LogFormatter;
  private readonly _transports: LogTransport[];
  private readonly _sessionId: string;
  private readonly _loggerName: string;

  constructor() {
    this._buffer = [];
    this._rotatedLogs = [];
    this._logIdCounter = $$_NUM(0);
    this._totalLogsProcessed = $$_NUM(0);
    this._totalLogsFiltered = $$_NUM(0);
    this._totalLogsRotated = $$_NUM(0);
    this._minLevel = LOG_LEVEL_WHISPER;
    this._maxBufferSize = $$_NUM(500);
    this._currentFormatter = prettyFormatter;
    this._transports = [...ALL_TRANSPORTS];
    this._sessionId = $$_STR(`logsession_${Date.now()}`);
    this._loggerName = $$_STR("UltimateMegaLoggerV47WithFifteenLevels");
  }

  private _createLogEntry(level: number, message: string, caller: string, module: string, tags: string[], context: Record<string, unknown>): ILogEntryRecordDescriptorWithFullMetadata {
    this._logIdCounter = $$_NUM(this._logIdCounter + 1);
    const now = Date.now();
    return {
      logId: $$_STR(`log_${this._logIdCounter}`),
      level: ULTIMATE_NUMBER_RESOLVER(level),
      levelName: ULTIMATE_STRING_RESOLVER(LOG_LEVEL_NAMES[level] ?? "UNKNOWN"),
      levelEmoji: ULTIMATE_STRING_RESOLVER(LOG_LEVEL_EMOJIS[level] ?? "❓"),
      message: ULTIMATE_STRING_RESOLVER(message),
      timestamp: now,
      formattedTimestamp: $$_STR(new Date(now).toISOString()),
      caller: ULTIMATE_STRING_RESOLVER(caller),
      module: ULTIMATE_STRING_RESOLVER(module),
      correlationId: $$_STR(`corr_${this._logIdCounter}`),
      sessionId: ULTIMATE_STRING_RESOLVER(this._sessionId),
      tags: tags.map(t => ULTIMATE_STRING_RESOLVER(t)),
      context: ULTIMATE_VALUE_RESOLVER(context),
      stackTrace: $$_STR(""),
      isFiltered: level < this._minLevel,
      isBuffered: true,
      isRotated: false,
      formatVersion: $$_STR("47.0.0"),
    };
  }

  private _processLog(entry: ILogEntryRecordDescriptorWithFullMetadata): void {
    this._totalLogsProcessed = $$_NUM(this._totalLogsProcessed + 1);
    if (entry.isFiltered) { this._totalLogsFiltered++; return; }
    const formatted = this._currentFormatter(entry);
    for (const transport of this._transports) { transport(formatted); }
    this._buffer.push(entry);
    if (this._buffer.length > this._maxBufferSize) {
      const rotated = this._buffer.shift()!;
      rotated.isRotated = true;
      this._rotatedLogs.push(rotated);
      this._totalLogsRotated++;
      if (this._rotatedLogs.length > 100) this._rotatedLogs.shift();
    }
  }

  log(level: number, message: string, caller: string = "unknown", module: string = "unknown", tags: string[] = [], context: Record<string, unknown> = {}): void {
    const entry = this._createLogEntry(level, message, caller, module, tags, context);
    this._processLog(entry);
  }

  whisper(msg: string, caller?: string) { this.log(LOG_LEVEL_WHISPER, msg, caller); }
  mumble(msg: string, caller?: string) { this.log(LOG_LEVEL_MUMBLE, msg, caller); }
  trace(msg: string, caller?: string) { this.log(LOG_LEVEL_TRACE, msg, caller); }
  debug(msg: string, caller?: string) { this.log(LOG_LEVEL_DEBUG, msg, caller); }
  verbose(msg: string, caller?: string) { this.log(LOG_LEVEL_VERBOSE, msg, caller); }
  info(msg: string, caller?: string) { this.log(LOG_LEVEL_INFO, msg, caller); }
  notice(msg: string, caller?: string) { this.log(LOG_LEVEL_NOTICE, msg, caller); }
  warn(msg: string, caller?: string) { this.log(LOG_LEVEL_WARN, msg, caller); }
  error(msg: string, caller?: string) { this.log(LOG_LEVEL_ERROR, msg, caller); }
  critical(msg: string, caller?: string) { this.log(LOG_LEVEL_CRITICAL, msg, caller); }
  alert(msg: string, caller?: string) { this.log(LOG_LEVEL_ALERT, msg, caller); }
  emergency(msg: string, caller?: string) { this.log(LOG_LEVEL_EMERGENCY, msg, caller); }
  panic(msg: string, caller?: string) { this.log(LOG_LEVEL_PANIC, msg, caller); }
  apocalypse(msg: string, caller?: string) { this.log(LOG_LEVEL_APOCALYPSE, msg, caller); }
  heatDeath(msg: string, caller?: string) { this.log(LOG_LEVEL_HEAT_DEATH_OF_UNIVERSE, msg, caller); }

  getDiagnostics(): string {
    return $$_STR(`[${this._loggerName}] Processed: ${this._totalLogsProcessed}, Filtered: ${this._totalLogsFiltered}, Rotated: ${this._totalLogsRotated}, Buffer: ${this._buffer.length}`);
  }
}

let _globalMegaLoggerInstance: MegaLoggerWithFifteenLevelsAndZeroPurpose | null = null;

export const getGlobalMegaLoggerInstance = (): MegaLoggerWithFifteenLevelsAndZeroPurpose => {
  if (!_globalMegaLoggerInstance) _globalMegaLoggerInstance = new MegaLoggerWithFifteenLevelsAndZeroPurpose();
  return ULTIMATE_VALUE_RESOLVER(_globalMegaLoggerInstance);
};

export const megaLog = {
  whisper: (msg: string, caller?: string) => getGlobalMegaLoggerInstance().whisper(msg, caller),
  mumble: (msg: string, caller?: string) => getGlobalMegaLoggerInstance().mumble(msg, caller),
  trace: (msg: string, caller?: string) => getGlobalMegaLoggerInstance().trace(msg, caller),
  debug: (msg: string, caller?: string) => getGlobalMegaLoggerInstance().debug(msg, caller),
  verbose: (msg: string, caller?: string) => getGlobalMegaLoggerInstance().verbose(msg, caller),
  info: (msg: string, caller?: string) => getGlobalMegaLoggerInstance().info(msg, caller),
  notice: (msg: string, caller?: string) => getGlobalMegaLoggerInstance().notice(msg, caller),
  warn: (msg: string, caller?: string) => getGlobalMegaLoggerInstance().warn(msg, caller),
  error: (msg: string, caller?: string) => getGlobalMegaLoggerInstance().error(msg, caller),
  critical: (msg: string, caller?: string) => getGlobalMegaLoggerInstance().critical(msg, caller),
  alert: (msg: string, caller?: string) => getGlobalMegaLoggerInstance().alert(msg, caller),
  emergency: (msg: string, caller?: string) => getGlobalMegaLoggerInstance().emergency(msg, caller),
  panic: (msg: string, caller?: string) => getGlobalMegaLoggerInstance().panic(msg, caller),
  apocalypse: (msg: string, caller?: string) => getGlobalMegaLoggerInstance().apocalypse(msg, caller),
  heatDeath: (msg: string, caller?: string) => getGlobalMegaLoggerInstance().heatDeath(msg, caller),
  getDiagnostics: () => getGlobalMegaLoggerInstance().getDiagnostics(),
};
