import { bindDefaultSystemPlugins } from "../bootstrap";
import {
  loadConfig,
  loadConfigInput,
} from "../config";
import { createHookSet } from "../eventing";
import {
  bindPlugin,
  createPluginMap,
} from "../extension";
import {
  bindIntegration,
  createIntegrationMap,
} from "../integration";
import { resolveCWD } from "../lib/process/cwd";

import type {
  Context,
  ResolvedContext,
} from "./context";
import type { ContextResolutionOptions } from "./context-resolution-options";

export async function resolveContext(
  options?: ContextResolutionOptions | null,
): Promise<ResolvedContext>
{
  options ??= {};

  const overrides = options.overrides ?? {};

  const configFilePath = options.configFilePath ?? "";

  const cwd = resolveCWD(options.cwd);

  const bindSystemPlugins = (
    options.systemPluginBinder
    ?? bindDefaultSystemPlugins
  );

  const configInput = (
    options.config
    ?? await loadConfigInput(
      {
        configFilePath,
        cwd,
      },
    )
  );

  const config = await loadConfig({
    configInput,
    cwd,
  });

  const hooks = createHookSet();

  const context: Context = {
    ...overrides,
    // @ts-expect-error - The config in the context will be filled in by the plugins.
    config: overrides.config ?? {},
    cwd: (
      overrides.cwd != null
        ? resolveCWD(overrides.cwd)
        : cwd
    ),
    hooks: overrides.hooks ?? hooks,
    integrations: overrides.integrations ?? createIntegrationMap(),
    plugins: overrides.plugins ?? createPluginMap(),
  };

  bindSystemPlugins(context);

  if (config.plugins != null)
  {
    for (const plugin of config.plugins)
    {
      if (!plugin)
      {
        continue;
      }

      bindPlugin(context, plugin);
    }
  }

  if (config.integrations != null)
  {
    for (const integration of config.integrations)
    {
      if (!integration)
      {
        continue;
      }

      bindIntegration(context, integration);
    }
  }

  await context.hooks.setup.promise(
    context,
    config,
  );

  await context.hooks.resolveConfig.promise(
    context,
    config,
  );

  await context.hooks.resolveContext.promise(
    context,
    options,
  );

  await context.hooks.postResolveContext.promise(
    context as ResolvedContext,
  );

  return context as ResolvedContext;
}
