import type { Context } from "../../context/Context";
import type { AnyHook } from "../AnyHook";
import type { HookUID } from "../uid/HookUID";

export function getHook<
  T_Hook extends AnyHook,
>(
  context: Context,
  hookUID: HookUID,
): T_Hook | undefined
{
  return context.hooks.get(hookUID) as T_Hook | undefined;
}
