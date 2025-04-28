import type { StrictContext } from "../context";
import { requirePlugin, usePlugin } from "../extension";
import type { PluginLoaderOptions } from "../extension/plugin-loader-options";

import type { Integration } from "./integration";
import { createIntegrationLoaderLooseErrorFactory } from "./integration-loader-loose-error-factory";
import type { IntegrationLoaderOptions } from "./integration-loader-options";
import { getIntegrationRegistry } from "./integration-registry-getter";

export function requireIntegration<
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  I extends Integration = Integration,
>(
  context: StrictContext,
  integrationName: string,
  options?: IntegrationLoaderOptions | null,
): I
{
  options ??= {};

  const pluginLoaderOptions: PluginLoaderOptions = {
    ...options,
    looseErrorFactory: (
      options.looseErrorFactory
      ?? createIntegrationLoaderLooseErrorFactory()
    ),
    registryGetter: (
      options.registryGetter
      ?? getIntegrationRegistry
    ),
  };

  return requirePlugin(
    context,
    integrationName,
    pluginLoaderOptions,
  );
}

export function useIntegration<
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  I extends Integration = Integration,
>(
  context: StrictContext,
  pluginName: string,
  options?: IntegrationLoaderOptions | null,
): I | null | undefined
{
  options ??= {};

  const pluginLoaderOptions: PluginLoaderOptions = {
    ...options,
    looseErrorFactory: (
      options.looseErrorFactory
      ?? createIntegrationLoaderLooseErrorFactory()
    ),
    registryGetter: (
      options.registryGetter
      ?? getIntegrationRegistry
    ),
  };

  return usePlugin(
    context,
    pluginName,
    pluginLoaderOptions,
  );
}
