import type { ContextSync } from "../../context/ContextSync";
import { SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_SYNC } from "../../hooks/post-bind-context-hook/SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_SYNC";
import { useSystemHookSync } from "../../system/hook/interop/useSystemHookSync";
import type { AnyHookSync } from "../AnyHookSync";
import { validateHookUID } from "../uid/validateHookUID";

import { HookIsAlreadyBoundError } from "./errors/HookIsAlreadyBoundError";

export function bindHookSync(
  context: ContextSync,
  hook: AnyHookSync,
): void
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

  useSystemHookSync(
    context,
    SYSTEM_HOOK_UID_POST_BIND_CONTEXT_HOOK_SYNC,
    (
      hook,
    ) =>
    {
      hook.call(
        context,
        hook,
      );
    },
  );
}
