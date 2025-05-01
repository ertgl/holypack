import type { StrictResolvedConfig } from "../../config";
import { loadConfigDefinition, resolveConfigDefinition } from "../../config/definition";
import { HOOK_NAME_RESOLVE_CONFIG } from "../../config/hooks";
import { loadConfig } from "../../config/loader";
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
  StrictContext,
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

  const baseConfig = await resolveConfigDefinition({
    configDefinition: options.config,
    cwd,
  });

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

  const resolvedConfig: StrictResolvedConfig = {};

  const hooks = createHookSet();

  const integrations = createIntegrationMap();

  const plugins = createPluginMap();

  const strictContext: StrictContext = {
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

  initializeContext(strictContext);

  if (config.plugins != null)
  {
    for (const plugin of config.plugins)
    {
      if (!plugin)
      {
        continue;
      }

      bindPlugin(strictContext, plugin);
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

      bindIntegration(strictContext, integration);
    }
  }

  await strictContext.hooks[HOOK_NAME_SETUP].promise(
    strictContext,
    config,
  );

  await strictContext.hooks[HOOK_NAME_RESOLVE_CONFIG].promise(
    strictContext,
    config,
  );

  await strictContext.hooks[HOOK_NAME_RESOLVE_CONTEXT].promise(
    strictContext,
    options,
  );

  const context = strictContext as unknown as Context;

  await context.hooks[HOOK_NAME_POST_RESOLVE_CONTEXT].promise(
    context,
  );

  return context;
}
