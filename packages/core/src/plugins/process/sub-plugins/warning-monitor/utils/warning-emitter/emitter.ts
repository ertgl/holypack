import type { StrictContext } from "../../../../../../context";
import { HOOK_NAME_EMIT_WARNING } from "../../plugin/hooks";

import { NoHookInContextForWarningEmitterError } from "./errors";

export async function emitWarning(
  context: StrictContext,
  warning: Error,
): Promise<void>
{
  const emitWarningHook = context.hooks[HOOK_NAME_EMIT_WARNING];

  if (emitWarningHook == null)
  {
    const err = new NoHookInContextForWarningEmitterError(warning);
    throw err;
  }

  await emitWarningHook.promise(
    context,
    warning,
  );
}
