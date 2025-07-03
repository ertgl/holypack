import type { ContextSync } from "../../context/ContextSync";
import { SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_SYNC } from "../../hooks/post-bind-context-command/SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_SYNC";
import { useSystemHookSync } from "../../system/hook/interop/useSystemHookSync";
import type { CommandSync } from "../CommandSync";
import { validateCommandUID } from "../uid/validation/validateCommandUID";

import { CommandIsAlreadyBoundError } from "./errors/CommandIsAlreadyBoundError";

export function bindCommandSync(
  context: ContextSync,
  command: CommandSync,
): void
{
  validateCommandUID(
    command.uid,
    command,
  );

  if (context.commands.has(command.uid))
  {
    throw new CommandIsAlreadyBoundError(command);
  }

  context.commands.set(
    command.uid,
    command,
  );

  useSystemHookSync(
    context,
    SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_SYNC,
    (hook) =>
    {
      hook.call(
        context,
        command,
      );
    },
  );
}
