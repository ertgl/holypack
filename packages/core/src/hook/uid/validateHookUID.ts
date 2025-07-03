import type { Optional } from "../../lib/object/Optional";
import type { AnyHook } from "../AnyHook";

import { HookUIDIsNotDefinedError } from "./errors/HookUIDIsNotDefinedError";

export function validateHookUID(
  hookUID: Optional<string>,
  hook: AnyHook,
): asserts hookUID is string
{
  if (hook.name == null || hook.name.length === 0)
  {
    throw new HookUIDIsNotDefinedError(hook);
  }
}
