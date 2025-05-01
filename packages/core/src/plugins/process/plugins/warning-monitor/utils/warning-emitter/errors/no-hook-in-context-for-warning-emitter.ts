import { HookNotFoundError } from "../../../../../../../eventing";
import { HOOK_NAME_EMIT_WARNING } from "../../../hooks";

export const ERROR_NO_HOOK_IN_CONTEXT_FOR_WARNING_EMITTER = "NoHookInContextForWarningEmitterError";

export class NoHookInContextForWarningEmitterError extends HookNotFoundError
{
  warning: Error;

  constructor(
    warning: Error,
  )
  {
    super(HOOK_NAME_EMIT_WARNING);
    this.name = ERROR_NO_HOOK_IN_CONTEXT_FOR_WARNING_EMITTER;
    this.warning = warning;
  }
}
