import type { StrictContext } from "../context";
import { generateHookSubscriptionIDForPlugin } from "../eventing";
import {
  bindPlugin,
  type PluginBinderOptions,
} from "../extension";

import type { Integration } from "./integration";
import { createIntegrationBinderLooseErrorFactory } from "./integration-binder-loose-error-factory";
import type { IntegrationBinderOptions } from "./integration-binder-options";
import { getIntegrationRegistry } from "./integration-registry-getter";

export function bindIntegration(
  context: StrictContext,
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
