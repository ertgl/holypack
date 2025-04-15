import type { Hook } from "./hook";
import type { Integration } from "./integration";

export type HookSubscriptionID = string;

export function generateHookSubscriptionIDForIntegration(
  integration: Integration,
  hook: Hook,
): HookSubscriptionID
{
  let id = integration.generateHookSubscriptionID?.(hook);

  if (!id)
  {
    if (!hook.name)
    {
      const err = new Error(`Hook name is not defined.`);
      err.cause = {
        hook,
      };
      throw err;
    }

    id = `${integration.name}-${hook.name}`;
  }

  return id;
}
