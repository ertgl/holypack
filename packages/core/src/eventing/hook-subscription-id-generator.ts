import type { Plugin } from "../extension";

import { HookNameIsNotDefinedError } from "./errors";
import type { HookSubscriptionID } from "./hook-subscription-id";
import type { KnownHook } from "./known-hook";

export type HookSubscriptionIDGenerator = (
  plugin: Plugin,
  hook: KnownHook,
) => HookSubscriptionID;

export function generateHookSubscriptionIDForPlugin(
  plugin: Plugin,
  hook: KnownHook,
): HookSubscriptionID
{
  if (!hook.name)
  {
    const err = new HookNameIsNotDefinedError(hook);
    throw err;
  }

  let id = plugin.generateHookSubscriptionID?.(hook);

  if (!id)
  {
    id = `${plugin.name}#${hook.name}`;
  }

  return id;
}
