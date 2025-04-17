import type { Context } from "./context";
import { generateHookSubscriptionIDForPlugin } from "./hook-subscription-id-generator";
import type { Integration } from "./integration";
import { createIntegrationBinderLooseErrorFactory } from "./integration-binder-errors";
import { type IntegrationBinderOptions } from "./integration-binder-options";
import { getIntegrationRegistry } from "./integration-registry-getter";
import { bindPlugin } from "./plugin-binder";
import type { PluginBinderOptions } from "./plugin-binder-options";

export function bindIntegration(
  context: Context,
  integration: Integration,
  options?: IntegrationBinderOptions | null,
): void
{
  options ??= {};

  const pluginBinderOptions: PluginBinderOptions = {
    ...options,
    hookSubscriptionIDGenerator: (
      options.hookSubscriptionIDGenerator
      ?? generateHookSubscriptionIDForPlugin
    ),
    looseErrorFactory: (
      options.looseErrorFactory
      ?? createIntegrationBinderLooseErrorFactory()
    ),
    registryGetter: (
      options.registryGetter
      ?? getIntegrationRegistry
    ),
  };

  bindPlugin(
    context,
    integration,
    pluginBinderOptions,
  );
}
