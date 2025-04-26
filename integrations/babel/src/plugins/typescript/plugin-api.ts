import type { TransformOptions } from "@babel/core";

import { type ResolvedContext } from "@holypack/core";
import { emitWarning } from "@holypack/core/context/warnings";
import { ModuleNotFoundError } from "@holypack/core/lib/module";

import type { BabelPresetTypeScriptOptions } from "./config";
import type { BabelIntegrationTypeScriptPlugin } from "./plugin";
import type { BabelIntegrationTypeScriptPluginOptions } from "./plugin-options";
import { resolveBabelIntegrationTypeScriptPluginOptions } from "./plugin-options-resolver";

export class BabelIntegrationTypeScriptPluginAPI
{
  plugin: BabelIntegrationTypeScriptPlugin;

  constructor(
    plugin: BabelIntegrationTypeScriptPlugin,
  )
  {
    this.plugin = plugin;
  }

  async addBabelConfig(
    context: ResolvedContext,
    transformOptions: TransformOptions,
    options?: BabelIntegrationTypeScriptPluginOptions | boolean | null,
  ): Promise<void>
  {
    const resolvedOptions = resolveBabelIntegrationTypeScriptPluginOptions(
      context.cwd,
      context.legacy,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    const packageName = "@babel/preset-typescript";

    let presetTypeScript: unknown = null;

    try
    {
      presetTypeScript = await import(packageName);
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (presetTypeScript == null)
    {
      return;
    }

    const presetTypeScriptOptions: Partial<BabelPresetTypeScriptOptions> = {
      ...resolvedOptions.overrides,
    };

    transformOptions.presets ??= [];

    transformOptions.presets.push(
      [
        packageName,
        presetTypeScriptOptions,
      ],
    );
  }
}
