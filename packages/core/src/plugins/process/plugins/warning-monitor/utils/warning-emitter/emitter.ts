import type { StrictContext } from "../../../../../../context";
import { HOOK_NAME_EMIT_WARNING } from "../../hooks";

export async function emitWarning(
  context: StrictContext,
  err: Error,
): Promise<void>
{
  // TODO(ertgl): Make `emitWarning` throw an error if the hook is not registered.
  await context.hooks[HOOK_NAME_EMIT_WARNING]?.promise(
    context,
    err,
  );
}
