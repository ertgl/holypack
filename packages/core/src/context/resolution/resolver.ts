import {
  loadConfig,
  loadConfigDefinition,
  type TypeSafeResolvedConfig,
} from "../../config";
import { HOOK_NAME_RESOLVE_CONFIG } from "../../config/hooks";
import { createHookSet } from "../../eventing";
import {
  bindPlugin,
  createPluginMap,
} from "../../extension";
import {
  bindIntegration,
  createIntegrationMap,
} from "../../integration";
import { resolveCWD } from "../../lib/process/cwd";
import type {
  Context,
  TypeSafeContext,
} from "../context";
import {
  HOOK_NAME_POST_RESOLVE_CONTEXT,
  HOOK_NAME_RESOLVE_CONTEXT,
  HOOK_NAME_SETUP,
} from "../hooks";
import {
  initializeContext as defaultContextInitializer,
} from "../initializer";

import type { ContextResolutionOptions } from "./options";

export async function resolveContext(
  options?: ContextResolutionOptions | null,
): Promise<Context>
{
  options ??= {};

  const cwd = resolveCWD(options.cwd);

  const shouldLoadConfigFile = (
    options.loadConfigFile
    ?? true
  );

  const baseConfig = (
    options.config
      ? await loadConfig({
        configDefinition: options.config,
      })
      : {}
  );

  const config = (
    shouldLoadConfigFile
      ? {
          ...baseConfig,
          ...await loadConfig({
            configDefinition: await loadConfigDefinition({
              configFilePath: (
                options.configFilePath
                ?? ""
              ),
              cwd,
            }),
          }),
        }
      : {
          ...baseConfig,
        }
  );

  const resolvedConfig: TypeSafeResolvedConfig = {};

  const hooks = createHookSet();

  const integrations = createIntegrationMap();

  const plugins = createPluginMap();

  const context: TypeSafeContext = {
    config: resolvedConfig,
    cwd,
    hooks,
    integrations,
    plugins,
  };

  const initializeContext = (
    options.initializer
    ?? defaultContextInitializer
  );

  initializeContext(context);

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

  await context.hooks[HOOK_NAME_SETUP].promise(
    context,
    config,
  );

  await context.hooks[HOOK_NAME_RESOLVE_CONFIG].promise(
    context,
    config,
  );

  await context.hooks[HOOK_NAME_RESOLVE_CONTEXT].promise(
    context,
    options,
  );

  const resolvedContext = context as Context;

  await context.hooks[HOOK_NAME_POST_RESOLVE_CONTEXT].promise(
    resolvedContext,
  );

  return resolvedContext;
}
