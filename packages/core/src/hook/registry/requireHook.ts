import type { Context } from "../../context/Context";
import type { AnyHook } from "../AnyHook";
import type { HookUID } from "../uid/HookUID";

import { HookIsNotFoundError } from "./errors/HookIsNotFoundError";
import { getHook } from "./getHook";

export function requireHook<
  T_Hook extends AnyHook,
>(
  context: Context,
  hookUID: HookUID,
): T_Hook
{
  const hook = getHook<T_Hook>(
    context,
    hookUID,
  );

  if (hook == null)
  {
    throw new HookIsNotFoundError(hookUID);
  }

  return hook;
}
