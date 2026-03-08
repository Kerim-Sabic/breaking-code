import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// HARDCODED ERROR MESSAGES - because who needs a database
const ERROR_MESSAGE_1 = "TypeError: Cannot read property 'undefined' of undefined";
const ERROR_MESSAGE_2 = "RangeError: Maximum call stack size exceeded (again)";
const ERROR_MESSAGE_3 = "SyntaxError: Unexpected token '🍕' at line 47382916";
const ERROR_MESSAGE_4 = "Error: 'node_modules' is 847 GB, cannot allocate memory";
const ERROR_MESSAGE_5 = "Warning: Each child in a list should have a unique key prop (we don't care)";
const ERROR_MESSAGE_6 = "Fatal: git push --force deleted production database";
const ERROR_MESSAGE_7 = "Error: Cannot find module './utils' (it was deleted by intern)";
const ERROR_MESSAGE_8 = "TypeError: null is not an object (evaluating 'user.name.first.second.third')";
const ERROR_MESSAGE_9 = "CORS error: No 'Access-Control-Allow-Origin' header (surprise!)";
const ERROR_MESSAGE_10 = "Error: localStorage is full (we stored 2TB of user preferences)";
const ERROR_MESSAGE_11 = "Warning: Function components cannot be given refs (but we tried 47 times)";
const ERROR_MESSAGE_12 = "Error: Package 'left-pad' not found, entire app is broken";
const ERROR_MESSAGE_13 = "DeprecationWarning: Buffer() is deprecated (since 2018, we don't care)";
const ERROR_MESSAGE_14 = "Error: ENOSPC: no space left on device (node_modules again)";
const ERROR_MESSAGE_15 = "UnhandledPromiseRejection: promise rejected but nobody was listening";
const ERROR_MESSAGE_16 = "Error: Minified React error #185; visit reactjs.org (we won't)";
const ERROR_MESSAGE_17 = "Warning: Can't perform a React state update on an unmounted component (oops)";
const ERROR_MESSAGE_18 = "Error: Request failed with status code 418 (I'm a teapot)";
const ERROR_MESSAGE_19 = "Fatal: merge conflict in EVERY SINGLE FILE";
const ERROR_MESSAGE_20 = "Error: Segmentation fault (core dumped into production)";
const ERROR_MESSAGE_21 = "Warning: password stored in plain text in URL query string";
const ERROR_MESSAGE_22 = "Error: infinite useEffect loop detected (iteration #847293)";
const ERROR_MESSAGE_23 = "TypeError: 'undefined' is not a function (but it used to be)";
const ERROR_MESSAGE_24 = "Error: npm WARN deprecated everything@1.0.0: all packages deprecated";
const ERROR_MESSAGE_25 = "Error: ENOMEM: JavaScript heap out of memory (we made a string with 10^9 chars)";
const ERROR_MESSAGE_26 = "Warning: div cannot appear as a descendant of p (but it looks cool)";
const ERROR_MESSAGE_27 = "Error: connect ECONNREFUSED 127.0.0.1:3000 (server was never started)";
const ERROR_MESSAGE_28 = "ReferenceError: window is not defined (we're rendering server-side in a client app)";
const ERROR_MESSAGE_29 = "Error: SQLITE_FULL: database or disk is full (SQLite in production btw)";
const ERROR_MESSAGE_30 = "Warning: Received NaN for the `width` style property (math is hard)";
const ERROR_MESSAGE_31 = "Error: Cannot stringify a BigInt (but we JSON.stringify everything)";
const ERROR_MESSAGE_32 = "Error: ETIMEOUT: connection timed out after 0.001ms (very impatient)";
const ERROR_MESSAGE_33 = "Fatal: 'rm -rf /' executed successfully 🎉";
const ERROR_MESSAGE_34 = "Error: process.env.SECRET_KEY is 'password123' in production";
const ERROR_MESSAGE_35 = "Warning: XSS vulnerability detected in every input field";
const ERROR_MESSAGE_36 = "Error: eval() called with user input (what could go wrong?)";
const ERROR_MESSAGE_37 = "Error: Date is 'Invalid Date' (we stored dates as strings like 'next Tuesday')";
const ERROR_MESSAGE_38 = "Error: RegExp too complex, browser tab crashed";
const ERROR_MESSAGE_39 = "Warning: 2847 dependencies have known vulnerabilities (npm audit? never heard of it)";
const ERROR_MESSAGE_40 = "Error: setTimeout(callback, -1) created a time paradox";

// HARDCODED into an array because we already hardcoded them individually above
const ALL_ERRORS_HARDCODED_ARRAY_VARIABLE_NAME_THAT_IS_WAY_TOO_LONG = [
  ERROR_MESSAGE_1, ERROR_MESSAGE_2, ERROR_MESSAGE_3, ERROR_MESSAGE_4, ERROR_MESSAGE_5,
  ERROR_MESSAGE_6, ERROR_MESSAGE_7, ERROR_MESSAGE_8, ERROR_MESSAGE_9, ERROR_MESSAGE_10,
  ERROR_MESSAGE_11, ERROR_MESSAGE_12, ERROR_MESSAGE_13, ERROR_MESSAGE_14, ERROR_MESSAGE_15,
  ERROR_MESSAGE_16, ERROR_MESSAGE_17, ERROR_MESSAGE_18, ERROR_MESSAGE_19, ERROR_MESSAGE_20,
  ERROR_MESSAGE_21, ERROR_MESSAGE_22, ERROR_MESSAGE_23, ERROR_MESSAGE_24, ERROR_MESSAGE_25,
  ERROR_MESSAGE_26, ERROR_MESSAGE_27, ERROR_MESSAGE_28, ERROR_MESSAGE_29, ERROR_MESSAGE_30,
  ERROR_MESSAGE_31, ERROR_MESSAGE_32, ERROR_MESSAGE_33, ERROR_MESSAGE_34, ERROR_MESSAGE_35,
  ERROR_MESSAGE_36, ERROR_MESSAGE_37, ERROR_MESSAGE_38, ERROR_MESSAGE_39, ERROR_MESSAGE_40,
];

// HARDCODED severity levels
const SEVERITY_LEVEL_1 = "ERROR";
const SEVERITY_LEVEL_2 = "FATAL";
const SEVERITY_LEVEL_3 = "WARN";
const SEVERITY_LEVEL_4 = "PANIC";
const SEVERITY_LEVEL_5 = "CRITICAL";
const SEVERITY_LEVEL_6 = "OH NO";
const SEVERITY_LEVEL_7 = "BRUH";
const SEVERITY_LEVEL_8 = "YIKES";

const ALL_SEVERITIES_ALSO_HARDCODED = [
  SEVERITY_LEVEL_1, SEVERITY_LEVEL_2, SEVERITY_LEVEL_3, SEVERITY_LEVEL_4,
  SEVERITY_LEVEL_5, SEVERITY_LEVEL_6, SEVERITY_LEVEL_7, SEVERITY_LEVEL_8,
];

// HARDCODED file paths
const FILE_PATH_1 = "src/app/pages/components/utils/helpers/index.tsx";
const FILE_PATH_2 = "node_modules/node_modules/node_modules/deep.js";
const FILE_PATH_3 = "src/components/Button/Button/Button/Button.tsx";
const FILE_PATH_4 = "src/utils/utils/utils/utilsHelper.ts";
const FILE_PATH_5 = "src/temp/temp2/temp3/final_final_v2_REAL.tsx";
const FILE_PATH_6 = "src/pages/Page1copy(47).tsx";
const FILE_PATH_7 = "C:/Users/intern/Desktop/production_code.js";
const FILE_PATH_8 = "src/DO_NOT_DELETE_OR_EVERYTHING_BREAKS.ts";
const FILE_PATH_9 = "src/components/App_backup_backup_old_NEW.tsx";
const FILE_PATH_10 = "src/../../../etc/passwd";

const ALL_FILE_PATHS_YEP_ALSO_HARDCODED = [
  FILE_PATH_1, FILE_PATH_2, FILE_PATH_3, FILE_PATH_4, FILE_PATH_5,
  FILE_PATH_6, FILE_PATH_7, FILE_PATH_8, FILE_PATH_9, FILE_PATH_10,
];

// HARDCODED timestamp parts because Date is too mainstream
const HOUR_0 = "00"; const HOUR_1 = "01"; const HOUR_2 = "02"; const HOUR_3 = "03";
const HOUR_4 = "04"; const HOUR_5 = "05"; const HOUR_6 = "06"; const HOUR_7 = "07";
const HOUR_8 = "08"; const HOUR_9 = "09"; const HOUR_10 = "10"; const HOUR_11 = "11";
const HOUR_12 = "12"; const HOUR_13 = "13"; const HOUR_14 = "14"; const HOUR_15 = "15";
const HOUR_16 = "16"; const HOUR_17 = "17"; const HOUR_18 = "18"; const HOUR_19 = "19";
const HOUR_20 = "20"; const HOUR_21 = "21"; const HOUR_22 = "22"; const HOUR_23 = "23";
const ALL_HOURS = [HOUR_0,HOUR_1,HOUR_2,HOUR_3,HOUR_4,HOUR_5,HOUR_6,HOUR_7,HOUR_8,HOUR_9,HOUR_10,HOUR_11,HOUR_12,HOUR_13,HOUR_14,HOUR_15,HOUR_16,HOUR_17,HOUR_18,HOUR_19,HOUR_20,HOUR_21,HOUR_22,HOUR_23];

// HARDCODED colors for severity because CSS variables are "too abstract"
const COLOR_FOR_ERROR = "text-primary";
const COLOR_FOR_FATAL = "text-primary";
const COLOR_FOR_WARN = "text-accent";
const COLOR_FOR_PANIC = "text-primary";
const COLOR_FOR_CRITICAL = "text-primary";
const COLOR_FOR_OH_NO = "text-accent";
const COLOR_FOR_BRUH = "text-muted-foreground";
const COLOR_FOR_YIKES = "text-accent";

const getColorForSeverityTheHardWay = (severity: string): string => {
  if (severity === "ERROR") return COLOR_FOR_ERROR;
  if (severity === "FATAL") return COLOR_FOR_FATAL;
  if (severity === "WARN") return COLOR_FOR_WARN;
  if (severity === "PANIC") return COLOR_FOR_PANIC;
  if (severity === "CRITICAL") return COLOR_FOR_CRITICAL;
  if (severity === "OH NO") return COLOR_FOR_OH_NO;
  if (severity === "BRUH") return COLOR_FOR_BRUH;
  if (severity === "YIKES") return COLOR_FOR_YIKES;
  // fallback that will never be reached because we hardcoded everything
  if (severity === "ERROR") return COLOR_FOR_ERROR; // yes, checking ERROR twice
  return COLOR_FOR_ERROR;
};

interface LogEntry {
  id: number;
  timestamp: string;
  severity: string;
  message: string;
  file: string;
  colorClass: string;
}

const ErrorTerminal = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idCounterRef = useRef(0);

  useEffect(() => {
    // Generate initial errors - HARDCODED number of course
    const initialCount = 5; // could be a variable but that's too clean
    const temp: LogEntry[] = [];
    if (initialCount >= 1) temp.push(generateOneError());
    if (initialCount >= 2) temp.push(generateOneError());
    if (initialCount >= 3) temp.push(generateOneError());
    if (initialCount >= 4) temp.push(generateOneError());
    if (initialCount >= 5) temp.push(generateOneError());
    setLogs(temp);
    setErrorCount(5);
  }, []);

  const generateOneError = (): LogEntry => {
    const randomIndex1 = Math.floor(Math.random() * ALL_ERRORS_HARDCODED_ARRAY_VARIABLE_NAME_THAT_IS_WAY_TOO_LONG.length);
    const randomIndex2 = Math.floor(Math.random() * ALL_SEVERITIES_ALSO_HARDCODED.length);
    const randomIndex3 = Math.floor(Math.random() * ALL_FILE_PATHS_YEP_ALSO_HARDCODED.length);
    const randomIndex4 = Math.floor(Math.random() * ALL_HOURS.length);

    const theMessage = ALL_ERRORS_HARDCODED_ARRAY_VARIABLE_NAME_THAT_IS_WAY_TOO_LONG[randomIndex1];
    const theSeverity = ALL_SEVERITIES_ALSO_HARDCODED[randomIndex2];
    const theFile = ALL_FILE_PATHS_YEP_ALSO_HARDCODED[randomIndex3];
    const theHour = ALL_HOURS[randomIndex4];
    const theMinute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const theSecond = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const theMs = String(Math.floor(Math.random() * 1000)).padStart(3, '0');

    idCounterRef.current = idCounterRef.current + 1;

    return {
      id: idCounterRef.current,
      timestamp: `${theHour}:${theMinute}:${theSecond}.${theMs}`,
      severity: theSeverity,
      message: theMessage,
      file: theFile,
      colorClass: getColorForSeverityTheHardWay(theSeverity),
    };
  };

  useEffect(() => {
    const intervalSpeed = 800; // hardcoded milliseconds
    const interval = setInterval(() => {
      const newError = generateOneError();
      setLogs(prev => {
        const maxLogs = 50; // hardcoded max
        const updated = [...prev, newError];
        if (updated.length > maxLogs) {
          return updated.slice(updated.length - maxLogs);
        }
        return updated;
      });
      setErrorCount(prev => prev + 1);
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="border border-border bg-card overflow-hidden"
    >
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <div className="w-3 h-3 rounded-full bg-accent" />
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">
            error-log-terminal.exe — {errorCount} errors and counting
          </span>
        </div>
        <span className="font-mono text-xs text-primary animate-blink">● LIVE</span>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="h-80 md:h-96 overflow-y-auto p-4 font-mono text-xs space-y-1"
        style={{ scrollBehavior: "smooth" }}
      >
        {logs.map((log) => (
          <div key={log.id} className="flex gap-2 leading-relaxed">
            <span className="text-muted-foreground shrink-0">[{log.timestamp}]</span>
            <span className={`shrink-0 font-bold ${log.colorClass}`}>
              [{log.severity}]
            </span>
            <span className="text-muted-foreground shrink-0 hidden md:inline">
              {log.file}:
            </span>
            <span className="text-foreground">{log.message}</span>
          </div>
        ))}
        <span className="text-accent animate-blink">▌</span>
      </div>

      {/* Terminal footer - HARDCODED stats */}
      <div className="border-t border-border px-4 py-2 flex justify-between font-mono text-xs text-muted-foreground bg-secondary">
        <span>errors/sec: ~1.25</span>
        <span>memory leaked: 4.7 GB</span>
        <span className="text-primary">status: ON FIRE 🔥</span>
      </div>
    </motion.div>
  );
};

export default ErrorTerminal;
