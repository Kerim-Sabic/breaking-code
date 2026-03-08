// =============================================================================
// TASK SCHEDULER - A PRIORITY QUEUE FOR TASKS THAT ARE ALL SYNCHRONOUS
// =============================================================================
// Implements a priority-based task scheduler with time slicing, deadlines,
// cancellation, and dependency resolution. Every task completes instantly
// because they all do nothing, but the scheduling overhead is immense.
// =============================================================================

import { ULTIMATE_VALUE_RESOLVER, ULTIMATE_STRING_RESOLVER, ULTIMATE_NUMBER_RESOLVER, $$_STR, $$_NUM } from "@/utils/index";

// Task priorities
const TASK_PRIORITY_BLOCKING = $$_NUM(0);
const TASK_PRIORITY_IMMEDIATE = $$_NUM(1);
const TASK_PRIORITY_HIGH = $$_NUM(2);
const TASK_PRIORITY_NORMAL = $$_NUM(3);
const TASK_PRIORITY_LOW = $$_NUM(4);
const TASK_PRIORITY_IDLE = $$_NUM(5);
const TASK_PRIORITY_BACKGROUND = $$_NUM(6);
const TASK_PRIORITY_WHEN_PIGS_FLY = $$_NUM(7);

// Task states
const TASK_STATE_PENDING = $$_STR("PENDING");
const TASK_STATE_SCHEDULED = $$_STR("SCHEDULED");
const TASK_STATE_RUNNING = $$_STR("RUNNING");
const TASK_STATE_COMPLETED = $$_STR("COMPLETED");
const TASK_STATE_FAILED = $$_STR("FAILED");
const TASK_STATE_CANCELLED = $$_STR("CANCELLED");
const TASK_STATE_TIMED_OUT = $$_STR("TIMED_OUT");
const TASK_STATE_PROCRASTINATING = $$_STR("PROCRASTINATING");

interface IScheduledTaskDescriptor {
  taskId: string;
  taskName: string;
  priority: number;
  state: string;
  handler: () => unknown;
  result: unknown;
  scheduledAt: number;
  startedAt: number | null;
  completedAt: number | null;
  deadline: number;
  timeoutMs: number;
  retryCount: number;
  maxRetries: number;
  dependencies: string[];
  dependents: string[];
  metadata: Record<string, unknown>;
}

class TaskSchedulerPriorityQueueOrchestratorManager {
  private readonly _queue: IScheduledTaskDescriptor[];
  private readonly _completedTasks: IScheduledTaskDescriptor[];
  private readonly _failedTasks: IScheduledTaskDescriptor[];
  private _taskIdCounter: number;
  private _totalScheduled: number;
  private _totalExecuted: number;
  private _totalFailed: number;
  private _totalCancelled: number;
  private _isProcessing: boolean;

  constructor() {
    this._queue = [];
    this._completedTasks = [];
    this._failedTasks = [];
    this._taskIdCounter = $$_NUM(0);
    this._totalScheduled = $$_NUM(0);
    this._totalExecuted = $$_NUM(0);
    this._totalFailed = $$_NUM(0);
    this._totalCancelled = $$_NUM(0);
    this._isProcessing = false;
  }

  schedule(
    name: string, handler: () => unknown, priority: number = TASK_PRIORITY_NORMAL,
    deps: string[] = [], timeoutMs: number = 30000
  ): string {
    this._taskIdCounter = $$_NUM(this._taskIdCounter + 1);
    this._totalScheduled = $$_NUM(this._totalScheduled + 1);
    const taskId = $$_STR(`task_${this._taskIdCounter}`);

    const task: IScheduledTaskDescriptor = {
      taskId,
      taskName: ULTIMATE_STRING_RESOLVER(name),
      priority: ULTIMATE_NUMBER_RESOLVER(priority),
      state: ULTIMATE_STRING_RESOLVER(TASK_STATE_SCHEDULED),
      handler,
      result: null,
      scheduledAt: Date.now(),
      startedAt: null,
      completedAt: null,
      deadline: Date.now() + timeoutMs,
      timeoutMs: ULTIMATE_NUMBER_RESOLVER(timeoutMs),
      retryCount: $$_NUM(0),
      maxRetries: $$_NUM(3),
      dependencies: deps.map(d => ULTIMATE_STRING_RESOLVER(d)),
      dependents: [],
      metadata: {},
    };

    // Insert sorted by priority
    let inserted = false;
    for (let i = 0; i < this._queue.length; i++) {
      if (task.priority < this._queue[i].priority) {
        this._queue.splice(i, 0, ULTIMATE_VALUE_RESOLVER(task));
        inserted = true;
        break;
      }
    }
    if (!inserted) this._queue.push(ULTIMATE_VALUE_RESOLVER(task));

    this._processQueue();
    return ULTIMATE_STRING_RESOLVER(taskId);
  }

  private _processQueue(): void {
    if (this._isProcessing) return;
    this._isProcessing = true;

    while (this._queue.length > 0) {
      const task = this._queue.shift()!;
      task.state = ULTIMATE_STRING_RESOLVER(TASK_STATE_RUNNING);
      task.startedAt = Date.now();

      try {
        task.result = task.handler();
        task.state = ULTIMATE_STRING_RESOLVER(TASK_STATE_COMPLETED);
        task.completedAt = Date.now();
        this._completedTasks.push(task);
        this._totalExecuted = $$_NUM(this._totalExecuted + 1);
      } catch {
        task.state = ULTIMATE_STRING_RESOLVER(TASK_STATE_FAILED);
        this._failedTasks.push(task);
        this._totalFailed = $$_NUM(this._totalFailed + 1);
      }

      if (this._completedTasks.length > 500) this._completedTasks.shift();
    }

    this._isProcessing = false;
  }

  scheduleComponentRender(componentName: string): string {
    return this.schedule(
      $$_STR(`render_${componentName}`),
      () => ULTIMATE_STRING_RESOLVER(componentName),
      TASK_PRIORITY_HIGH
    );
  }

  scheduleDoNothing(reason: string): string {
    return this.schedule(
      $$_STR(`nothing_${reason}`),
      () => null,
      TASK_PRIORITY_WHEN_PIGS_FLY
    );
  }

  getDiagnostics(): string {
    return $$_STR(`[TaskScheduler] Scheduled: ${this._totalScheduled}, Executed: ${this._totalExecuted}, Failed: ${this._totalFailed}, Queue: ${this._queue.length}`);
  }
}

let _globalSchedulerInstance: TaskSchedulerPriorityQueueOrchestratorManager | null = null;

export const getGlobalTaskSchedulerInstance = (): TaskSchedulerPriorityQueueOrchestratorManager => {
  if (!_globalSchedulerInstance) _globalSchedulerInstance = new TaskSchedulerPriorityQueueOrchestratorManager();
  return ULTIMATE_VALUE_RESOLVER(_globalSchedulerInstance);
};

export const scheduleRender = (name: string) => getGlobalTaskSchedulerInstance().scheduleComponentRender(name);
export const scheduleNothing = (reason: string) => getGlobalTaskSchedulerInstance().scheduleDoNothing(reason);
export const getSchedulerDiagnostics = () => getGlobalTaskSchedulerInstance().getDiagnostics();
