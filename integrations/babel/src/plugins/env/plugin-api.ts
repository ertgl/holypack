import type { TransformOptions } from "@babel/core";
import type BabelPresetEnvModule from "@babel/preset-env";

import type { StrictContext } from "@holypack/core";
import { ModuleNotFoundError } from "@holypack/core/lib/module";
import { emitWarning } from "@holypack/core/plugins/process/plugins/warning-monitor/utils/warning-emitter";

import type { BabelPresetEnvOptions } from "./config";
import type { BabelIntegrationEnvPlugin } from "./plugin";
import type { BabelIntegrationEnvPluginOptions } from "./plugin-options";
import { resolveBabelIntegrationEnvPluginOptions } from "./plugin-options-resolver";

export class BabelIntegrationEnvPluginAPI
{
  plugin: BabelIntegrationEnvPlugin;

  constructor(
    plugin: BabelIntegrationEnvPlugin,
  )
  {
    this.plugin = plugin;
  }

  async contributeToBabelTransformOptions(
    context: StrictContext,
    transformOptions: TransformOptions,
    options?: BabelIntegrationEnvPluginOptions | boolean | null,
  ): Promise<void>
  {
    const resolvedOptions = resolveBabelIntegrationEnvPluginOptions(
      context.cwd,
      context.legacy ?? false,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    const packageName = "@babel/preset-env";

    let presetEnv: null | typeof BabelPresetEnvModule = null;

    try
    {
      presetEnv = await import(
        packageName,
      ) as typeof BabelPresetEnvModule;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (presetEnv == null)
    {
      return;
    }

    const presetEnvOptions: BabelPresetEnvOptions = {
      ...resolvedOptions.overrides,
      modules: resolvedOptions.modules,
    };

    transformOptions.presets ??= [];

    transformOptions.presets.push(
      [
        packageName,
        presetEnvOptions,
      ],
    );
  }
}
