import { motion } from "framer-motion";

const hardcodedItems = [
  { code: `if (user === "john") return true;`, comment: "// auth system" },
  { code: `if (user === "jane") return true;`, comment: "// auth system v2" },
  { code: `const pi = 3;`, comment: "// close enough" },
  { code: `const isWeekend = day === "Sat" || day === "Sun" || day === "Mon";`, comment: "// 3-day weekends" },
  { code: `try { } catch(e) { }`, comment: "// problem solved" },
  { code: `// TODO: fix this later`, comment: "// written 4 years ago" },
  { code: `const password = "admin123";`, comment: "// ultra secure" },
  { code: `while(true) { break; }`, comment: "// infinite wisdom" },
  { code: `return !(!(!(!true)));`, comment: "// definitely true" },
  { code: `sleep(10000);`, comment: "// let the CPU rest" },
  { code: `if (x > 0 && x < 0) { }`, comment: "// quantum logic" },
  { code: `const arr = [1]; arr.length = 99999;`, comment: "// pre-optimization" },
];

const HardcodedShowcase = () => {
  return (
    <div className="space-y-2">
      {hardcodedItems.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-card border border-border p-3 md:p-4 font-mono text-xs md:text-sm flex flex-col md:flex-row md:items-center gap-1 md:gap-4 overflow-x-auto"
        >
          <span className="text-primary shrink-0">{'>'}</span>
          <code className="text-foreground flex-1 whitespace-nowrap">{item.code}</code>
          <span className="text-muted-foreground italic shrink-0">{item.comment}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default HardcodedShowcase;
