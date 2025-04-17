import type { Plugin } from "../plugin-system";

import { HookNameIsNotDefinedError } from "./errors";
import type { Hook } from "./hook";
import type { HookSubscriptionID } from "./hook-subscription-id";

export type HookSubscriptionIDGenerator = (
  plugin: Plugin,
  hook: Hook,
) => HookSubscriptionID;

export function generateHookSubscriptionIDForPlugin(
  plugin: Plugin,
  hook: Hook,
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
