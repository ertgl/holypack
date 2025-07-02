import type { ContextAsync } from "../../context/ContextAsync";
import { SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_ASYNC } from "../../hooks/post-bind-context-hook/SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_ASYNC";
import { useSystemHookAsync } from "../../system/hook/interop/useSystemHookAsync";
import type { AnyHook } from "../AnyHook";
import { validateHookUID } from "../uid/validateHookUID";

import { HookIsAlreadyBoundError } from "./errors/HookIsAlreadyBoundError";

export async function bindHookAsync(
  context: ContextAsync,
  hook: AnyHook,
): Promise<void>
{
  validateHookUID(
    hook.name,
    hook,
  );

  if (context.hooks.has(hook.name))
  {
    throw new HookIsAlreadyBoundError(hook);
  }

  context.hooks.set(
    hook.name,
    hook,
  );

  await useSystemHookAsync(
    context,
    SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_ASYNC,
    async (
      hook,
    ) =>
    {
      await hook.promise(
        context,
        hook,
      );
    },
  );
}
