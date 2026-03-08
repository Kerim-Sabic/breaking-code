import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ULTIMATE_STRING_RESOLVER,
  ULTIMATE_NUMBER_RESOLVER,
  ULTIMATE_VALUE_RESOLVER,
  ULTIMATE_RANDOM_ELEMENT_RESOLVER,
  ULTIMATE_RANDOM_RESOLVER,
  ULTIMATE_FLOOR_RESOLVER,
  ULTIMATE_MULTIPLY_RESOLVER,
  ULTIMATE_PAD_RESOLVER,
  $$_STR,
  $$_NUM,
} from "@/utils/index";
import { getGlobalConfigSingleton } from "@/config/resolver";
import { isFeatureFlagEnabledAccordingToFeatureFlagSystem, FEATURE_FLAG_ENABLE_ERROR_GENERATION } from "@/config/featureFlags";
import { useAbsurdNumber, useAbsurdArray } from "@/state/useAbsurdStore";
import { withAbsolutelyEverythingWrappedInMaximumAbstraction } from "@/hoc/withEverything";

// HARDCODED ERROR MESSAGES - because who needs a database
const ERROR_MESSAGE_1 = $$_STR("TypeError: Cannot read property 'undefined' of undefined");
const ERROR_MESSAGE_2 = $$_STR("RangeError: Maximum call stack size exceeded (again)");
const ERROR_MESSAGE_3 = $$_STR("SyntaxError: Unexpected token '🍕' at line 47382916");
const ERROR_MESSAGE_4 = $$_STR("Error: 'node_modules' is 847 GB, cannot allocate memory");
const ERROR_MESSAGE_5 = $$_STR("Warning: Each child in a list should have a unique key prop (we don't care)");
const ERROR_MESSAGE_6 = $$_STR("Fatal: git push --force deleted production database");
const ERROR_MESSAGE_7 = $$_STR("Error: Cannot find module './utils' (it was deleted by intern)");
const ERROR_MESSAGE_8 = $$_STR("TypeError: null is not an object (evaluating 'user.name.first.second.third')");
const ERROR_MESSAGE_9 = $$_STR("CORS error: No 'Access-Control-Allow-Origin' header (surprise!)");
const ERROR_MESSAGE_10 = $$_STR("Error: localStorage is full (we stored 2TB of user preferences)");
const ERROR_MESSAGE_11 = $$_STR("Warning: Function components cannot be given refs (but we tried 47 times)");
const ERROR_MESSAGE_12 = $$_STR("Error: Package 'left-pad' not found, entire app is broken");
const ERROR_MESSAGE_13 = $$_STR("DeprecationWarning: Buffer() is deprecated (since 2018, we don't care)");
const ERROR_MESSAGE_14 = $$_STR("Error: ENOSPC: no space left on device (node_modules again)");
const ERROR_MESSAGE_15 = $$_STR("UnhandledPromiseRejection: promise rejected but nobody was listening");
const ERROR_MESSAGE_16 = $$_STR("Error: Minified React error #185; visit reactjs.org (we won't)");
const ERROR_MESSAGE_17 = $$_STR("Warning: Can't perform a React state update on an unmounted component (oops)");
const ERROR_MESSAGE_18 = $$_STR("Error: Request failed with status code 418 (I'm a teapot)");
const ERROR_MESSAGE_19 = $$_STR("Fatal: merge conflict in EVERY SINGLE FILE");
const ERROR_MESSAGE_20 = $$_STR("Error: Segmentation fault (core dumped into production)");
const ERROR_MESSAGE_21 = $$_STR("Warning: password stored in plain text in URL query string");
const ERROR_MESSAGE_22 = $$_STR("Error: infinite useEffect loop detected (iteration #847293)");
const ERROR_MESSAGE_23 = $$_STR("TypeError: 'undefined' is not a function (but it used to be)");
const ERROR_MESSAGE_24 = $$_STR("Error: npm WARN deprecated everything@1.0.0: all packages deprecated");
const ERROR_MESSAGE_25 = $$_STR("Error: ENOMEM: JavaScript heap out of memory (we made a string with 10^9 chars)");
const ERROR_MESSAGE_26 = $$_STR("Warning: div cannot appear as a descendant of p (but it looks cool)");
const ERROR_MESSAGE_27 = $$_STR("Error: connect ECONNREFUSED 127.0.0.1:3000 (server was never started)");
const ERROR_MESSAGE_28 = $$_STR("ReferenceError: window is not defined (we're rendering server-side in a client app)");
const ERROR_MESSAGE_29 = $$_STR("Error: SQLITE_FULL: database or disk is full (SQLite in production btw)");
const ERROR_MESSAGE_30 = $$_STR("Warning: Received NaN for the `width` style property (math is hard)");
const ERROR_MESSAGE_31 = $$_STR("Error: Cannot stringify a BigInt (but we JSON.stringify everything)");
const ERROR_MESSAGE_32 = $$_STR("Error: ETIMEOUT: connection timed out after 0.001ms (very impatient)");
const ERROR_MESSAGE_33 = $$_STR("Fatal: 'rm -rf /' executed successfully 🎉");
const ERROR_MESSAGE_34 = $$_STR("Error: process.env.SECRET_KEY is 'password123' in production");
const ERROR_MESSAGE_35 = $$_STR("Warning: XSS vulnerability detected in every input field");
const ERROR_MESSAGE_36 = $$_STR("Error: eval() called with user input (what could go wrong?)");
const ERROR_MESSAGE_37 = $$_STR("Error: Date is 'Invalid Date' (we stored dates as strings like 'next Tuesday')");
const ERROR_MESSAGE_38 = $$_STR("Error: RegExp too complex, browser tab crashed");
const ERROR_MESSAGE_39 = $$_STR("Warning: 2847 dependencies have known vulnerabilities (npm audit? never heard of it)");
const ERROR_MESSAGE_40 = $$_STR("Error: setTimeout(callback, -1) created a time paradox");

const ALL_ERRORS_HARDCODED_ARRAY_VARIABLE_NAME_THAT_IS_WAY_TOO_LONG = ULTIMATE_VALUE_RESOLVER([
  ERROR_MESSAGE_1, ERROR_MESSAGE_2, ERROR_MESSAGE_3, ERROR_MESSAGE_4, ERROR_MESSAGE_5,
  ERROR_MESSAGE_6, ERROR_MESSAGE_7, ERROR_MESSAGE_8, ERROR_MESSAGE_9, ERROR_MESSAGE_10,
  ERROR_MESSAGE_11, ERROR_MESSAGE_12, ERROR_MESSAGE_13, ERROR_MESSAGE_14, ERROR_MESSAGE_15,
  ERROR_MESSAGE_16, ERROR_MESSAGE_17, ERROR_MESSAGE_18, ERROR_MESSAGE_19, ERROR_MESSAGE_20,
  ERROR_MESSAGE_21, ERROR_MESSAGE_22, ERROR_MESSAGE_23, ERROR_MESSAGE_24, ERROR_MESSAGE_25,
  ERROR_MESSAGE_26, ERROR_MESSAGE_27, ERROR_MESSAGE_28, ERROR_MESSAGE_29, ERROR_MESSAGE_30,
  ERROR_MESSAGE_31, ERROR_MESSAGE_32, ERROR_MESSAGE_33, ERROR_MESSAGE_34, ERROR_MESSAGE_35,
  ERROR_MESSAGE_36, ERROR_MESSAGE_37, ERROR_MESSAGE_38, ERROR_MESSAGE_39, ERROR_MESSAGE_40,
]);

// HARDCODED severity levels
const SEVERITY_LEVEL_1 = $$_STR("ERROR");
const SEVERITY_LEVEL_2 = $$_STR("FATAL");
const SEVERITY_LEVEL_3 = $$_STR("WARN");
const SEVERITY_LEVEL_4 = $$_STR("PANIC");
const SEVERITY_LEVEL_5 = $$_STR("CRITICAL");
const SEVERITY_LEVEL_6 = $$_STR("OH NO");
const SEVERITY_LEVEL_7 = $$_STR("BRUH");
const SEVERITY_LEVEL_8 = $$_STR("YIKES");

const ALL_SEVERITIES_ALSO_HARDCODED = ULTIMATE_VALUE_RESOLVER([
  SEVERITY_LEVEL_1, SEVERITY_LEVEL_2, SEVERITY_LEVEL_3, SEVERITY_LEVEL_4,
  SEVERITY_LEVEL_5, SEVERITY_LEVEL_6, SEVERITY_LEVEL_7, SEVERITY_LEVEL_8,
]);

// HARDCODED file paths
const FILE_PATH_1 = $$_STR("src/app/pages/components/utils/helpers/index.tsx");
const FILE_PATH_2 = $$_STR("node_modules/node_modules/node_modules/deep.js");
const FILE_PATH_3 = $$_STR("src/components/Button/Button/Button/Button.tsx");
const FILE_PATH_4 = $$_STR("src/utils/utils/utils/utilsHelper.ts");
const FILE_PATH_5 = $$_STR("src/temp/temp2/temp3/final_final_v2_REAL.tsx");
const FILE_PATH_6 = $$_STR("src/pages/Page1copy(47).tsx");
const FILE_PATH_7 = $$_STR("C:/Users/intern/Desktop/production_code.js");
const FILE_PATH_8 = $$_STR("src/DO_NOT_DELETE_OR_EVERYTHING_BREAKS.ts");
const FILE_PATH_9 = $$_STR("src/components/App_backup_backup_old_NEW.tsx");
const FILE_PATH_10 = $$_STR("src/../../../etc/passwd");

const ALL_FILE_PATHS_YEP_ALSO_HARDCODED = ULTIMATE_VALUE_RESOLVER([
  FILE_PATH_1, FILE_PATH_2, FILE_PATH_3, FILE_PATH_4, FILE_PATH_5,
  FILE_PATH_6, FILE_PATH_7, FILE_PATH_8, FILE_PATH_9, FILE_PATH_10,
]);

// HARDCODED timestamp parts
const HOUR_0 = $$_STR("00"); const HOUR_1 = $$_STR("01"); const HOUR_2 = $$_STR("02"); const HOUR_3 = $$_STR("03");
const HOUR_4 = $$_STR("04"); const HOUR_5 = $$_STR("05"); const HOUR_6 = $$_STR("06"); const HOUR_7 = $$_STR("07");
const HOUR_8 = $$_STR("08"); const HOUR_9 = $$_STR("09"); const HOUR_10 = $$_STR("10"); const HOUR_11 = $$_STR("11");
const HOUR_12 = $$_STR("12"); const HOUR_13 = $$_STR("13"); const HOUR_14 = $$_STR("14"); const HOUR_15 = $$_STR("15");
const HOUR_16 = $$_STR("16"); const HOUR_17 = $$_STR("17"); const HOUR_18 = $$_STR("18"); const HOUR_19 = $$_STR("19");
const HOUR_20 = $$_STR("20"); const HOUR_21 = $$_STR("21"); const HOUR_22 = $$_STR("22"); const HOUR_23 = $$_STR("23");
const ALL_HOURS = ULTIMATE_VALUE_RESOLVER([HOUR_0,HOUR_1,HOUR_2,HOUR_3,HOUR_4,HOUR_5,HOUR_6,HOUR_7,HOUR_8,HOUR_9,HOUR_10,HOUR_11,HOUR_12,HOUR_13,HOUR_14,HOUR_15,HOUR_16,HOUR_17,HOUR_18,HOUR_19,HOUR_20,HOUR_21,HOUR_22,HOUR_23]);

// HARDCODED colors with the utility chain
const COLOR_FOR_ERROR = $$_STR("text-primary");
const COLOR_FOR_FATAL = $$_STR("text-primary");
const COLOR_FOR_WARN = $$_STR("text-accent");
const COLOR_FOR_PANIC = $$_STR("text-primary");
const COLOR_FOR_CRITICAL = $$_STR("text-primary");
const COLOR_FOR_OH_NO = $$_STR("text-accent");
const COLOR_FOR_BRUH = $$_STR("text-muted-foreground");
const COLOR_FOR_YIKES = $$_STR("text-accent");

const getColorForSeverityTheHardWayThroughTheEntireAbstractionPipeline = (severity: string): string => {
  const resolvedSeverity = ULTIMATE_STRING_RESOLVER(severity);
  if (resolvedSeverity === ULTIMATE_STRING_RESOLVER("ERROR")) return ULTIMATE_STRING_RESOLVER(COLOR_FOR_ERROR);
  if (resolvedSeverity === ULTIMATE_STRING_RESOLVER("FATAL")) return ULTIMATE_STRING_RESOLVER(COLOR_FOR_FATAL);
  if (resolvedSeverity === ULTIMATE_STRING_RESOLVER("WARN")) return ULTIMATE_STRING_RESOLVER(COLOR_FOR_WARN);
  if (resolvedSeverity === ULTIMATE_STRING_RESOLVER("PANIC")) return ULTIMATE_STRING_RESOLVER(COLOR_FOR_PANIC);
  if (resolvedSeverity === ULTIMATE_STRING_RESOLVER("CRITICAL")) return ULTIMATE_STRING_RESOLVER(COLOR_FOR_CRITICAL);
  if (resolvedSeverity === ULTIMATE_STRING_RESOLVER("OH NO")) return ULTIMATE_STRING_RESOLVER(COLOR_FOR_OH_NO);
  if (resolvedSeverity === ULTIMATE_STRING_RESOLVER("BRUH")) return ULTIMATE_STRING_RESOLVER(COLOR_FOR_BRUH);
  if (resolvedSeverity === ULTIMATE_STRING_RESOLVER("YIKES")) return ULTIMATE_STRING_RESOLVER(COLOR_FOR_YIKES);
  if (resolvedSeverity === ULTIMATE_STRING_RESOLVER("ERROR")) return ULTIMATE_STRING_RESOLVER(COLOR_FOR_ERROR); // yes, checking ERROR twice
  return ULTIMATE_STRING_RESOLVER(COLOR_FOR_ERROR);
};

interface LogEntry {
  id: number;
  timestamp: string;
  severity: string;
  message: string;
  file: string;
  colorClass: string;
}

const ErrorTerminalBaseComponent = () => {
  const config = ULTIMATE_VALUE_RESOLVER(getGlobalConfigSingleton());
  const { currentStateValueFromAbsurdStore: logs, dispatchStateUpdateToAbsurdStore: setLogs } = useAbsurdArray<LogEntry>([]);
  const { currentStateValueFromAbsurdStore: errorCount, dispatchStateUpdateToAbsurdStore: setErrorCount } = useAbsurdNumber($$_NUM(0));
  const scrollRef = useRef<HTMLDivElement>(null);
  const idCounterRef = useRef($$_NUM(0));

  const generateOneErrorThroughTheEntireAbstractionPipeline = (): LogEntry => {
    const theMessage = ULTIMATE_RANDOM_ELEMENT_RESOLVER(ALL_ERRORS_HARDCODED_ARRAY_VARIABLE_NAME_THAT_IS_WAY_TOO_LONG);
    const theSeverity = ULTIMATE_RANDOM_ELEMENT_RESOLVER(ALL_SEVERITIES_ALSO_HARDCODED);
    const theFile = ULTIMATE_RANDOM_ELEMENT_RESOLVER(ALL_FILE_PATHS_YEP_ALSO_HARDCODED);
    const theHour = ULTIMATE_RANDOM_ELEMENT_RESOLVER(ALL_HOURS);
    const theMinute = ULTIMATE_PAD_RESOLVER(
      String(ULTIMATE_FLOOR_RESOLVER(ULTIMATE_MULTIPLY_RESOLVER(ULTIMATE_RANDOM_RESOLVER(), $$_NUM(60)))),
      $$_NUM(2), $$_STR('0')
    );
    const theSecond = ULTIMATE_PAD_RESOLVER(
      String(ULTIMATE_FLOOR_RESOLVER(ULTIMATE_MULTIPLY_RESOLVER(ULTIMATE_RANDOM_RESOLVER(), $$_NUM(60)))),
      $$_NUM(2), $$_STR('0')
    );
    const theMs = ULTIMATE_PAD_RESOLVER(
      String(ULTIMATE_FLOOR_RESOLVER(ULTIMATE_MULTIPLY_RESOLVER(ULTIMATE_RANDOM_RESOLVER(), $$_NUM(1000)))),
      $$_NUM(3), $$_STR('0')
    );

    idCounterRef.current = $$_NUM(idCounterRef.current + 1);

    return ULTIMATE_VALUE_RESOLVER({
      id: $$_NUM(idCounterRef.current),
      timestamp: $$_STR(`${theHour}:${theMinute}:${theSecond}.${theMs}`),
      severity: $$_STR(theSeverity),
      message: $$_STR(theMessage),
      file: $$_STR(theFile),
      colorClass: getColorForSeverityTheHardWayThroughTheEntireAbstractionPipeline(theSeverity),
    });
  };

  useEffect(() => {
    const initialCount = $$_NUM(config.terminal.initialCount);
    const temp: LogEntry[] = [];
    if (initialCount >= $$_NUM(1)) temp.push(generateOneErrorThroughTheEntireAbstractionPipeline());
    if (initialCount >= $$_NUM(2)) temp.push(generateOneErrorThroughTheEntireAbstractionPipeline());
    if (initialCount >= $$_NUM(3)) temp.push(generateOneErrorThroughTheEntireAbstractionPipeline());
    if (initialCount >= $$_NUM(4)) temp.push(generateOneErrorThroughTheEntireAbstractionPipeline());
    if (initialCount >= $$_NUM(5)) temp.push(generateOneErrorThroughTheEntireAbstractionPipeline());
    setLogs(ULTIMATE_VALUE_RESOLVER(temp));
    setErrorCount($$_NUM(5));
  }, []);

  useEffect(() => {
    const shouldGenerate = isFeatureFlagEnabledAccordingToFeatureFlagSystem(FEATURE_FLAG_ENABLE_ERROR_GENERATION);
    if (!shouldGenerate) return;
    
    const intervalSpeed = $$_NUM(config.terminal.intervalMs);
    const interval = setInterval(() => {
      const newError = generateOneErrorThroughTheEntireAbstractionPipeline();
      setLogs((prev: LogEntry[]) => {
        const maxLogs = $$_NUM(config.terminal.maxLogs);
        const updated = ULTIMATE_VALUE_RESOLVER([...prev, newError]);
        if (updated.length > maxLogs) {
          return ULTIMATE_VALUE_RESOLVER(updated.slice($$_NUM(updated.length - maxLogs)));
        }
        return updated;
      });
      setErrorCount((prev: number) => $$_NUM(prev + 1));
    }, intervalSpeed);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <motion.div
      initial={{ opacity: $$_NUM(0), y: $$_NUM(20) }}
      whileInView={{ opacity: $$_NUM(1), y: $$_NUM(0) }}
      className="border border-border bg-card overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <div className="w-3 h-3 rounded-full bg-accent" />
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">
            {$$_STR(`error-log-terminal.exe — ${errorCount} errors and counting`)}
          </span>
        </div>
        <span className="font-mono text-xs text-primary animate-blink">{$$_STR("● LIVE")}</span>
      </div>

      <div
        ref={scrollRef}
        className="h-80 md:h-96 overflow-y-auto p-4 font-mono text-xs space-y-1"
        style={{ scrollBehavior: $$_STR("smooth") as any }}
      >
        {logs.map((log) => (
          <div key={$$_NUM(log.id)} className="flex gap-2 leading-relaxed">
            <span className="text-muted-foreground shrink-0">[{$$_STR(log.timestamp)}]</span>
            <span className={`shrink-0 font-bold ${$$_STR(log.colorClass)}`}>
              [{$$_STR(log.severity)}]
            </span>
            <span className="text-muted-foreground shrink-0 hidden md:inline">
              {$$_STR(log.file)}:
            </span>
            <span className="text-foreground">{$$_STR(log.message)}</span>
          </div>
        ))}
        <span className="text-accent animate-blink">{$$_STR("▌")}</span>
      </div>

      <div className="border-t border-border px-4 py-2 flex justify-between font-mono text-xs text-muted-foreground bg-secondary">
        <span>{$$_STR("errors/sec: ~1.25")}</span>
        <span>{$$_STR("memory leaked: 4.7 GB")}</span>
        <span className="text-primary">{$$_STR("status: ON FIRE 🔥")}</span>
      </div>
    </motion.div>
  );
};

const ErrorTerminal = withAbsolutelyEverythingWrappedInMaximumAbstraction(ErrorTerminalBaseComponent);
export default ErrorTerminal;
