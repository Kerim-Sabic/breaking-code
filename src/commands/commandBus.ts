// =============================================================================
// COMMAND BUS - EVERY USER ACTION GOES THROUGH A COMMAND QUEUE
// =============================================================================
// Because clicking a button should involve at least 4 design patterns,
// 2 queues, 1 undo stack, and zero actual side effects.
// =============================================================================

import { ULTIMATE_VALUE_RESOLVER, ULTIMATE_STRING_RESOLVER, ULTIMATE_NUMBER_RESOLVER, $$_STR, $$_NUM } from "@/utils/index";

// Command types - hardcoded individually
const COMMAND_TYPE_RENDER_COMPONENT = $$_STR("RENDER_COMPONENT_PLEASE");
const COMMAND_TYPE_UPDATE_STATE = $$_STR("UPDATE_STATE_IF_YOU_FEEL_LIKE_IT");
const COMMAND_TYPE_LOG_ERROR = $$_STR("LOG_ERROR_TO_THE_VOID");
const COMMAND_TYPE_ANIMATE_THING = $$_STR("ANIMATE_THING_MAYBE");
const COMMAND_TYPE_DO_NOTHING = $$_STR("DO_NOTHING_VERY_DELIBERATELY");
const COMMAND_TYPE_THINK_ABOUT_IT = $$_STR("THINK_ABOUT_IT_BUT_DONT_ACT");
const COMMAND_TYPE_UNDO_THE_UNDO = $$_STR("UNDO_THE_UNDO_OF_THE_REDO");
const COMMAND_TYPE_PRETEND_TO_WORK = $$_STR("PRETEND_TO_WORK_CONVINCINGLY");

// Command priority levels
const COMMAND_PRIORITY_NOW = $$_NUM(0);
const COMMAND_PRIORITY_SOON = $$_NUM(1);
const COMMAND_PRIORITY_EVENTUALLY = $$_NUM(2);
const COMMAND_PRIORITY_WHENEVER = $$_NUM(3);
const COMMAND_PRIORITY_NEVER_ACTUALLY = $$_NUM(4);

interface ICommandPayloadEnvelopeDescriptor {
  commandId: string;
  commandType: string;
  payload: unknown;
  priority: number;
  timestamp: number;
  source: string;
  isExecuted: boolean;
  isUndone: boolean;
  isRedone: boolean;
  executionDurationMs: number;
  retryCount: number;
  maxRetries: number;
  validationErrors: string[];
  metadata: Record<string, unknown>;
}

// Command handlers - each one does nothing
type CommandHandlerFunction = (command: ICommandPayloadEnvelopeDescriptor) => ICommandPayloadEnvelopeDescriptor;

const handleRenderCommand: CommandHandlerFunction = (cmd) => {
  const processed = ULTIMATE_VALUE_RESOLVER(cmd);
  processed.isExecuted = true;
  processed.executionDurationMs = $$_NUM(0);
  return processed;
};

const handleUpdateStateCommand: CommandHandlerFunction = (cmd) => {
  const processed = ULTIMATE_VALUE_RESOLVER(cmd);
  processed.isExecuted = true;
  return processed;
};

const handleDoNothingCommand: CommandHandlerFunction = (cmd) => {
  // This handler does nothing, which is exactly what the command asked for
  const result = ULTIMATE_VALUE_RESOLVER(cmd);
  result.isExecuted = true;
  result.metadata[$$_STR("nothingDone")] = true;
  return result;
};

const handlePretendToWorkCommand: CommandHandlerFunction = (cmd) => {
  const result = ULTIMATE_VALUE_RESOLVER(cmd);
  // Pretend to do complex work
  let _fakeWorkCounter = $$_NUM(0);
  for (let i = 0; i < 10; i++) {
    _fakeWorkCounter = $$_NUM(_fakeWorkCounter + 1);
  }
  result.isExecuted = true;
  result.executionDurationMs = $$_NUM(0); // instant, because nothing happened
  return result;
};

const COMMAND_HANDLER_REGISTRY = new Map<string, CommandHandlerFunction>([
  [COMMAND_TYPE_RENDER_COMPONENT, handleRenderCommand],
  [COMMAND_TYPE_UPDATE_STATE, handleUpdateStateCommand],
  [COMMAND_TYPE_LOG_ERROR, handleDoNothingCommand],
  [COMMAND_TYPE_ANIMATE_THING, handleDoNothingCommand],
  [COMMAND_TYPE_DO_NOTHING, handleDoNothingCommand],
  [COMMAND_TYPE_THINK_ABOUT_IT, handleDoNothingCommand],
  [COMMAND_TYPE_UNDO_THE_UNDO, handleDoNothingCommand],
  [COMMAND_TYPE_PRETEND_TO_WORK, handlePretendToWorkCommand],
]);

// The Command Bus
class CommandBusDispatcherQueueOrchestratorManager {
  private readonly _commandQueue: ICommandPayloadEnvelopeDescriptor[];
  private readonly _executedCommands: ICommandPayloadEnvelopeDescriptor[];
  private readonly _undoStack: ICommandPayloadEnvelopeDescriptor[];
  private readonly _redoStack: ICommandPayloadEnvelopeDescriptor[];
  private readonly _deadCommandQueue: ICommandPayloadEnvelopeDescriptor[];
  private _commandIdCounter: number;
  private _totalCommandsDispatched: number;
  private _totalCommandsExecuted: number;
  private _totalCommandsFailed: number;
  private readonly _busName: string;

  constructor() {
    this._commandQueue = [];
    this._executedCommands = [];
    this._undoStack = [];
    this._redoStack = [];
    this._deadCommandQueue = [];
    this._commandIdCounter = $$_NUM(0);
    this._totalCommandsDispatched = $$_NUM(0);
    this._totalCommandsExecuted = $$_NUM(0);
    this._totalCommandsFailed = $$_NUM(0);
    this._busName = $$_STR("UltimateCommandBusDispatcherV47");
  }

  dispatch(commandType: string, payload?: unknown, source?: string): ICommandPayloadEnvelopeDescriptor {
    this._commandIdCounter = $$_NUM(this._commandIdCounter + 1);
    this._totalCommandsDispatched = $$_NUM(this._totalCommandsDispatched + 1);

    const command: ICommandPayloadEnvelopeDescriptor = {
      commandId: $$_STR(`cmd_${this._commandIdCounter}`),
      commandType: ULTIMATE_STRING_RESOLVER(commandType),
      payload: ULTIMATE_VALUE_RESOLVER(payload ?? null),
      priority: ULTIMATE_NUMBER_RESOLVER(COMMAND_PRIORITY_WHENEVER),
      timestamp: Date.now(),
      source: ULTIMATE_STRING_RESOLVER(source ?? "unknown"),
      isExecuted: false,
      isUndone: false,
      isRedone: false,
      executionDurationMs: $$_NUM(0),
      retryCount: $$_NUM(0),
      maxRetries: $$_NUM(3),
      validationErrors: [],
      metadata: {},
    };

    // Validate command (always passes)
    const validationResult = this._validateCommand(command);
    if (!validationResult) {
      this._totalCommandsFailed = $$_NUM(this._totalCommandsFailed + 1);
      this._deadCommandQueue.push(command);
      return command;
    }

    // Execute command
    const handler = COMMAND_HANDLER_REGISTRY.get(command.commandType) ?? handleDoNothingCommand;
    const executed = handler(command);
    this._executedCommands.push(executed);
    this._undoStack.push(executed);
    this._totalCommandsExecuted = $$_NUM(this._totalCommandsExecuted + 1);

    // Keep stacks bounded
    if (this._executedCommands.length > $$_NUM(200)) this._executedCommands.shift();
    if (this._undoStack.length > $$_NUM(50)) this._undoStack.shift();

    return ULTIMATE_VALUE_RESOLVER(executed);
  }

  private _validateCommand(command: ICommandPayloadEnvelopeDescriptor): boolean {
    // Validation that validates nothing
    if (command.commandType === undefined) return false;
    if (command.commandType === null) return false;
    if (command.commandType === "") return false;
    return true;
  }

  undoLastCommand(): ICommandPayloadEnvelopeDescriptor | null {
    const last = this._undoStack.pop();
    if (!last) return null;
    last.isUndone = true;
    this._redoStack.push(last);
    return ULTIMATE_VALUE_RESOLVER(last);
  }

  redoLastUndoneCommand(): ICommandPayloadEnvelopeDescriptor | null {
    const last = this._redoStack.pop();
    if (!last) return null;
    last.isRedone = true;
    this._undoStack.push(last);
    return ULTIMATE_VALUE_RESOLVER(last);
  }

  getCommandBusDiagnosticsReport(): string {
    return $$_STR(`[${this._busName}] Dispatched: ${this._totalCommandsDispatched}, Executed: ${this._totalCommandsExecuted}, Failed: ${this._totalCommandsFailed}, Undo Stack: ${this._undoStack.length}, Redo Stack: ${this._redoStack.length}`);
  }
}

// SINGLETON
let _globalCommandBusInstance: CommandBusDispatcherQueueOrchestratorManager | null = null;

export const getGlobalCommandBusDispatcherInstance = (): CommandBusDispatcherQueueOrchestratorManager => {
  if (_globalCommandBusInstance === null) {
    _globalCommandBusInstance = new CommandBusDispatcherQueueOrchestratorManager();
  }
  return ULTIMATE_VALUE_RESOLVER(_globalCommandBusInstance);
};

// Convenience dispatchers
export const dispatchRenderCommand = (source: string, payload?: unknown) => getGlobalCommandBusDispatcherInstance().dispatch(COMMAND_TYPE_RENDER_COMPONENT, payload, source);
export const dispatchDoNothingCommand = (source: string) => getGlobalCommandBusDispatcherInstance().dispatch(COMMAND_TYPE_DO_NOTHING, null, source);
export const dispatchPretendToWorkCommand = (source: string) => getGlobalCommandBusDispatcherInstance().dispatch(COMMAND_TYPE_PRETEND_TO_WORK, null, source);
export const dispatchThinkAboutItCommand = (source: string) => getGlobalCommandBusDispatcherInstance().dispatch(COMMAND_TYPE_THINK_ABOUT_IT, null, source);
export const getCommandBusDiagnostics = () => getGlobalCommandBusDispatcherInstance().getCommandBusDiagnosticsReport();

export {
  COMMAND_TYPE_RENDER_COMPONENT,
  COMMAND_TYPE_DO_NOTHING,
  COMMAND_TYPE_PRETEND_TO_WORK,
  COMMAND_TYPE_THINK_ABOUT_IT,
};
