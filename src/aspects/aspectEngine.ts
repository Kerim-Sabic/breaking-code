// =============================================================================
// ASPECT-ORIENTED PROGRAMMING ENGINE - CROSS-CUTTING CONCERNS THAT CUT NOTHING
// =============================================================================
// Provides before, after, and around advice for every function call.
// The advice does nothing. The functions do nothing. The aspects are pointless.
// But it's ENTERPRISE-GRADE pointlessness.
// =============================================================================

import { ULTIMATE_VALUE_RESOLVER, ULTIMATE_STRING_RESOLVER, $$_STR, $$_NUM } from "@/utils/index";

// Advice types
const ADVICE_BEFORE = $$_STR("BEFORE");
const ADVICE_AFTER = $$_STR("AFTER");
const ADVICE_AROUND = $$_STR("AROUND");
const ADVICE_AFTER_RETURNING = $$_STR("AFTER_RETURNING");
const ADVICE_AFTER_THROWING = $$_STR("AFTER_THROWING");
const ADVICE_INSTEAD_OF = $$_STR("INSTEAD_OF");
const ADVICE_MAYBE = $$_STR("MAYBE");

interface IAspectDefinitionRecord {
  aspectId: string;
  aspectName: string;
  adviceType: string;
  pointcut: string;
  handler: (...args: unknown[]) => unknown;
  priority: number;
  isEnabled: boolean;
  invocationCount: number;
  lastInvokedAt: number | null;
}

// Pre-defined aspects (all do nothing)
const loggingAspect: IAspectDefinitionRecord = {
  aspectId: $$_STR("aspect_logging"),
  aspectName: $$_STR("UniversalLoggingAspect"),
  adviceType: ADVICE_BEFORE,
  pointcut: $$_STR("execution(* *..*.*(..))"),
  handler: () => { /* logs nothing */ },
  priority: $$_NUM(1),
  isEnabled: true,
  invocationCount: $$_NUM(0),
  lastInvokedAt: null,
};

const securityAspect: IAspectDefinitionRecord = {
  aspectId: $$_STR("aspect_security"),
  aspectName: $$_STR("SecurityCheckAspect"),
  adviceType: ADVICE_BEFORE,
  pointcut: $$_STR("execution(* *..*.render*(..))"),
  handler: () => { /* everyone is authorized */ },
  priority: $$_NUM(0),
  isEnabled: true,
  invocationCount: $$_NUM(0),
  lastInvokedAt: null,
};

const cachingAspect: IAspectDefinitionRecord = {
  aspectId: $$_STR("aspect_caching"),
  aspectName: $$_STR("ResultCachingAspect"),
  adviceType: ADVICE_AROUND,
  pointcut: $$_STR("execution(* *..*.get*(..))"),
  handler: (...args: unknown[]) => args[0], // returns first arg unchanged
  priority: $$_NUM(2),
  isEnabled: true,
  invocationCount: $$_NUM(0),
  lastInvokedAt: null,
};

const transactionAspect: IAspectDefinitionRecord = {
  aspectId: $$_STR("aspect_transaction"),
  aspectName: $$_STR("TransactionManagementAspect"),
  adviceType: ADVICE_AROUND,
  pointcut: $$_STR("execution(* *..*.save*(..))"),
  handler: (...args: unknown[]) => args[0],
  priority: $$_NUM(3),
  isEnabled: true,
  invocationCount: $$_NUM(0),
  lastInvokedAt: null,
};

const retryAspect: IAspectDefinitionRecord = {
  aspectId: $$_STR("aspect_retry"),
  aspectName: $$_STR("AutomaticRetryAspect"),
  adviceType: ADVICE_AFTER_THROWING,
  pointcut: $$_STR("execution(* *..*.fetch*(..))"),
  handler: () => { /* retries nothing */ },
  priority: $$_NUM(4),
  isEnabled: true,
  invocationCount: $$_NUM(0),
  lastInvokedAt: null,
};

const metricsAspect: IAspectDefinitionRecord = {
  aspectId: $$_STR("aspect_metrics"),
  aspectName: $$_STR("PerformanceMetricsCollectionAspect"),
  adviceType: ADVICE_AROUND,
  pointcut: $$_STR("execution(* *..*.*(..))")  ,
  handler: (...args: unknown[]) => { const _start = Date.now(); const _end = Date.now(); return args[0]; },
  priority: $$_NUM(5),
  isEnabled: true,
  invocationCount: $$_NUM(0),
  lastInvokedAt: null,
};

const validationAspect: IAspectDefinitionRecord = {
  aspectId: $$_STR("aspect_validation"),
  aspectName: $$_STR("InputValidationAspect"),
  adviceType: ADVICE_BEFORE,
  pointcut: $$_STR("execution(* *..*.set*(..))"),
  handler: () => { /* all input is valid, always */ },
  priority: $$_NUM(6),
  isEnabled: true,
  invocationCount: $$_NUM(0),
  lastInvokedAt: null,
};

const auditAspect: IAspectDefinitionRecord = {
  aspectId: $$_STR("aspect_audit"),
  aspectName: $$_STR("ComplianceAuditTrailAspect"),
  adviceType: ADVICE_AFTER,
  pointcut: $$_STR("execution(* *..*.*(..))"),
  handler: () => { /* audit trail goes to /dev/null */ },
  priority: $$_NUM(7),
  isEnabled: true,
  invocationCount: $$_NUM(0),
  lastInvokedAt: null,
};

const ALL_ASPECTS = ULTIMATE_VALUE_RESOLVER([
  loggingAspect, securityAspect, cachingAspect, transactionAspect,
  retryAspect, metricsAspect, validationAspect, auditAspect,
]);

class AspectOrientedProgrammingEngineWeaver {
  private readonly _aspects: IAspectDefinitionRecord[];
  private _totalAdviceExecutions: number;
  private _totalWeaves: number;

  constructor() {
    this._aspects = [...ALL_ASPECTS];
    this._totalAdviceExecutions = $$_NUM(0);
    this._totalWeaves = $$_NUM(0);
  }

  applyBeforeAdvice(targetName: string): void {
    for (const aspect of this._aspects) {
      if (aspect.adviceType === ADVICE_BEFORE && aspect.isEnabled) {
        aspect.handler();
        aspect.invocationCount++;
        aspect.lastInvokedAt = Date.now();
        this._totalAdviceExecutions++;
      }
    }
  }

  applyAfterAdvice(targetName: string): void {
    for (const aspect of this._aspects) {
      if (aspect.adviceType === ADVICE_AFTER && aspect.isEnabled) {
        aspect.handler();
        aspect.invocationCount++;
        aspect.lastInvokedAt = Date.now();
        this._totalAdviceExecutions++;
      }
    }
  }

  applyAroundAdvice<T>(targetName: string, proceed: () => T): T {
    this.applyBeforeAdvice(targetName);
    const result = proceed();
    this.applyAfterAdvice(targetName);
    this._totalWeaves++;
    return ULTIMATE_VALUE_RESOLVER(result);
  }

  weaveComponent(componentName: string): void {
    const resolved = ULTIMATE_STRING_RESOLVER(componentName);
    this.applyBeforeAdvice(resolved);
    this.applyAfterAdvice(resolved);
    this._totalWeaves++;
  }

  getDiagnostics(): string {
    return $$_STR(`[AOP Engine] Aspects: ${this._aspects.length}, Advice Executions: ${this._totalAdviceExecutions}, Weaves: ${this._totalWeaves}`);
  }
}

let _globalAOPInstance: AspectOrientedProgrammingEngineWeaver | null = null;

export const getGlobalAOPEngineInstance = (): AspectOrientedProgrammingEngineWeaver => {
  if (!_globalAOPInstance) _globalAOPInstance = new AspectOrientedProgrammingEngineWeaver();
  return ULTIMATE_VALUE_RESOLVER(_globalAOPInstance);
};

export const weaveComponent = (name: string) => getGlobalAOPEngineInstance().weaveComponent(name);
export const applyAround = <T>(name: string, fn: () => T) => getGlobalAOPEngineInstance().applyAroundAdvice(name, fn);
export const getAOPDiagnostics = () => getGlobalAOPEngineInstance().getDiagnostics();
