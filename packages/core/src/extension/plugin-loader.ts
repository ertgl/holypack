import type { StrictContext } from "../context";

import type { Plugin } from "./plugin";
import { createPluginLoaderLooseErrorFactory } from "./plugin-loader-loose-error-factory";
import type { PluginLoaderOptions } from "./plugin-loader-options";
import { getPluginRegistry } from "./plugin-registry-getter";

export function requirePlugin<
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  P extends Plugin = Plugin,
>(
  context: StrictContext,
  pluginName: string,
  options?: null | PluginLoaderOptions,
): P
{
  const plugin = usePlugin<P>(context, pluginName, options);

  if (plugin == null)
  {
    const looseErrorFactory = (
      options?.looseErrorFactory
      ?? createPluginLoaderLooseErrorFactory()
    );

    const err = looseErrorFactory.createNotFoundError(pluginName);
    throw err;
  }

  return plugin;
}

export function usePlugin<
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  P extends Plugin = Plugin,
>(
  context: StrictContext,
  pluginName: string,
  options?: null | PluginLoaderOptions,
): null | P | undefined
{
  const registry = (
    options?.registryGetter
    ?? getPluginRegistry
  )(context);

  return registry.get(pluginName) as null | P | undefined;
}
