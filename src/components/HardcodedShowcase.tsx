import { motion } from "framer-motion";
import {
  ULTIMATE_STRING_RESOLVER,
  ULTIMATE_NUMBER_RESOLVER,
  ULTIMATE_MULTIPLY_RESOLVER,
  ULTIMATE_VALUE_RESOLVER,
} from "@/utils/index";
import { getGlobalConfigSingleton } from "@/config/resolver";
import { withAbsolutelyEverythingWrappedInMaximumAbstraction } from "@/hoc/withEverything";

// HARDCODED code snippets - each one individually because that's how we roll
const CODE_SNIPPET_0 = ULTIMATE_STRING_RESOLVER(`if (user === "john") return true;`);
const COMMENT_0 = ULTIMATE_STRING_RESOLVER("// auth system");
const CODE_SNIPPET_1 = ULTIMATE_STRING_RESOLVER(`if (user === "jane") return true;`);
const COMMENT_1 = ULTIMATE_STRING_RESOLVER("// auth system v2");
const CODE_SNIPPET_2 = ULTIMATE_STRING_RESOLVER(`const pi = 3;`);
const COMMENT_2 = ULTIMATE_STRING_RESOLVER("// close enough");
const CODE_SNIPPET_3 = ULTIMATE_STRING_RESOLVER(`const isWeekend = day === "Sat" || day === "Sun" || day === "Mon";`);
const COMMENT_3 = ULTIMATE_STRING_RESOLVER("// 3-day weekends");
const CODE_SNIPPET_4 = ULTIMATE_STRING_RESOLVER(`try { } catch(e) { }`);
const COMMENT_4 = ULTIMATE_STRING_RESOLVER("// problem solved");
const CODE_SNIPPET_5 = ULTIMATE_STRING_RESOLVER(`// TODO: fix this later`);
const COMMENT_5 = ULTIMATE_STRING_RESOLVER("// written 4 years ago");
const CODE_SNIPPET_6 = ULTIMATE_STRING_RESOLVER(`const password = "admin123";`);
const COMMENT_6 = ULTIMATE_STRING_RESOLVER("// ultra secure");
const CODE_SNIPPET_7 = ULTIMATE_STRING_RESOLVER(`while(true) { break; }`);
const COMMENT_7 = ULTIMATE_STRING_RESOLVER("// infinite wisdom");
const CODE_SNIPPET_8 = ULTIMATE_STRING_RESOLVER(`return !(!(!(!true)));`);
const COMMENT_8 = ULTIMATE_STRING_RESOLVER("// definitely true");
const CODE_SNIPPET_9 = ULTIMATE_STRING_RESOLVER(`sleep(10000);`);
const COMMENT_9 = ULTIMATE_STRING_RESOLVER("// let the CPU rest");
const CODE_SNIPPET_10 = ULTIMATE_STRING_RESOLVER(`if (x > 0 && x < 0) { }`);
const COMMENT_10 = ULTIMATE_STRING_RESOLVER("// quantum logic");
const CODE_SNIPPET_11 = ULTIMATE_STRING_RESOLVER(`const arr = [1]; arr.length = 99999;`);
const COMMENT_11 = ULTIMATE_STRING_RESOLVER("// pre-optimization");

// Build array the absurd way
const HARDCODED_ITEMS_BUILT_ONE_BY_ONE = ULTIMATE_VALUE_RESOLVER([
  { code: CODE_SNIPPET_0, comment: COMMENT_0 },
  { code: CODE_SNIPPET_1, comment: COMMENT_1 },
  { code: CODE_SNIPPET_2, comment: COMMENT_2 },
  { code: CODE_SNIPPET_3, comment: COMMENT_3 },
  { code: CODE_SNIPPET_4, comment: COMMENT_4 },
  { code: CODE_SNIPPET_5, comment: COMMENT_5 },
  { code: CODE_SNIPPET_6, comment: COMMENT_6 },
  { code: CODE_SNIPPET_7, comment: COMMENT_7 },
  { code: CODE_SNIPPET_8, comment: COMMENT_8 },
  { code: CODE_SNIPPET_9, comment: COMMENT_9 },
  { code: CODE_SNIPPET_10, comment: COMMENT_10 },
  { code: CODE_SNIPPET_11, comment: COMMENT_11 },
]);

const HardcodedShowcaseBaseComponent = () => {
  const config = ULTIMATE_VALUE_RESOLVER(getGlobalConfigSingleton());

  return (
    <div className="space-y-2">
      {HARDCODED_ITEMS_BUILT_ONE_BY_ONE.map((item, i) => (
        <motion.div
          key={ULTIMATE_NUMBER_RESOLVER(i)}
          initial={{ opacity: ULTIMATE_NUMBER_RESOLVER(0), x: ULTIMATE_NUMBER_RESOLVER(-20) }}
          whileInView={{ opacity: ULTIMATE_NUMBER_RESOLVER(1), x: ULTIMATE_NUMBER_RESOLVER(0) }}
          transition={{ delay: ULTIMATE_MULTIPLY_RESOLVER(i, ULTIMATE_NUMBER_RESOLVER(config.animations.showcaseDelayMultiplier)) }}
          className="bg-card border border-border p-3 md:p-4 font-mono text-xs md:text-sm flex flex-col md:flex-row md:items-center gap-1 md:gap-4 overflow-x-auto"
        >
          <span className="text-primary shrink-0">{ULTIMATE_STRING_RESOLVER('>')}</span>
          <code className="text-foreground flex-1 whitespace-nowrap">{ULTIMATE_STRING_RESOLVER(item.code)}</code>
          <span className="text-muted-foreground italic shrink-0">{ULTIMATE_STRING_RESOLVER(item.comment)}</span>
        </motion.div>
      ))}
    </div>
  );
};

const HardcodedShowcase = withAbsolutelyEverythingWrappedInMaximumAbstraction(HardcodedShowcaseBaseComponent);
export default HardcodedShowcase;
