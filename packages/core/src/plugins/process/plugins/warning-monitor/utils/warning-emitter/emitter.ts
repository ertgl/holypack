import type { StrictContext } from "../../../../../../context";
import { HOOK_NAME_EMIT_WARNING } from "../../hooks";
import { NoHookInContextForWarningEmitterError } from "./errors";

export async function emitWarning(
  context: StrictContext,
  warning: Error,
): Promise<void>
{
  if (context.hooks[HOOK_NAME_EMIT_WARNING] == null)
  {
    const err = new NoHookInContextForWarningEmitterError(warning);
    throw err;
  }

  await context.hooks[HOOK_NAME_EMIT_WARNING]?.promise(
    context,
    warning,
  );
}
