import type { ContextAsync } from "../../context/ContextAsync";
import { SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_ASYNC } from "../../hooks/post-bind-context-command/SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_ASYNC";
import { useSystemHookAsync } from "../../system/hook/interop/useSystemHookAsync";
import type { CommandAsync } from "../CommandAsync";
import { validateCommandUID } from "../uid/validation/validateCommandUID";

import { CommandIsAlreadyBoundError } from "./errors/CommandIsAlreadyBoundError";

export async function bindCommandAsync(
  context: ContextAsync,
  command: CommandAsync,
): Promise<void>
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

  await useSystemHookAsync(
    context,
    SYSTEM_HOOK_UID_POST_BIND_CONTEXT_COMMAND_ASYNC,
    async (hook) =>
    {
      await hook.promise(
        context,
        command,
      );
    },
  );
}
