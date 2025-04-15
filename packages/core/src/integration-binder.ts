import type { Context } from "./context";
import { _maybeAwait } from "./function-tools";
import { generateHookSubscriptionIDForIntegration } from "./hook-subscription-id";
import type { Integration } from "./integration";

export function bindIntegration(
  context: Context,
  integration: Integration,
): void
{
  if (!integration.name)
  {
    const err = new Error(`Integration name is not defined.`);
    err.cause = {
      integration,
    };
    throw err;
  }

  if (context.integrations.has(integration.name))
  {
    const err = new Error(`Integration is already bound.`);
    err.cause = {
      integration,
    };
    throw err;
  }

  if (integration.resolveConfig != null)
  {
    context.hooks.resolveConfig.tapPromise(
      generateHookSubscriptionIDForIntegration(
        integration,
        context.hooks.resolveConfig,
      ),
      async (
        context,
        config,
      ) =>
      {
        await _maybeAwait(
          integration.resolveConfig?.(
            context,
            config,
          ),
        );
      },
    );
  }

  if (integration.resolveContext != null)
  {
    context.hooks.resolveContext.tapPromise(
      generateHookSubscriptionIDForIntegration(
        integration,
        context.hooks.resolveContext,
      ),
      async (
        context,
        options,
      ) =>
      {
        await _maybeAwait(
          integration.resolveContext?.(
            context,
            options,
          ),
        );
      },
    );
  }

  context.integrations.set(integration.name, integration);
}
