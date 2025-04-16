import type { ConfigInput } from "./config-input";
import { loadConfigInput } from "./config-input-loader";
import { loadConfig } from "./config-loader";
import type { Context } from "./context";
import { getCWD } from "./cwd";
import { createHookSet } from "./hook-set";
import { bindIntegration } from "./integration-binder";
import { createIntegrationMap } from "./integration-map";
import { bindPlugin } from "./plugin-binder";
import { createPluginMap } from "./plugin-map";

export type ContextResolutionOptions = {
  config?: ConfigInput | null;
  configFilePath?: null | string;
  cwd?: null | string;
};

export async function resolveContext(
  options?: ContextResolutionOptions | null,
): Promise<Context>
{
  options ??= {};

  const configFilePath = options.configFilePath ?? "";

  const cwd = options.cwd ?? getCWD();

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
    config: {},
    cwd,
    hooks,
    integrations: createIntegrationMap(),
    plugins: createPluginMap(),
  };

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

  await context.hooks.resolveConfig.promise(
    context,
    config,
  );

  await context.hooks.resolveContext.promise(
    context,
    options,
  );

  return context;
}
