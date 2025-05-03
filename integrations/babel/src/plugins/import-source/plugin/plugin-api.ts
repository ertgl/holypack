import type { TransformOptions } from "@babel/core";
import type BabelPresetEnvModule from "@babel/preset-env";

import type { Context, StrictContext } from "@holypack/core";
import { ModuleNotFoundError } from "@holypack/core/lib/module";
import { emitWarning } from "@holypack/core/plugins/process/plugins/warning-monitor/utils/warning-emitter";

import type { Assumptions } from "../../../config";
import { configureBabelImportSources } from "../config";

import type { BabelIntegrationImportSourcePlugin } from "./plugin";
import { BabelIntegrationImportSourcePluginOptions } from "./plugin-options";

export class BabelIntegrationImportSourcePluginAPI
{
  plugin: BabelIntegrationImportSourcePlugin;

  constructor(
    plugin: BabelIntegrationImportSourcePlugin,
  )
  {
    this.plugin = plugin;
  }

  async configureBabelEnv(
    context: Context,
    assumptions: Assumptions,
    transformOptions: TransformOptions,
    overrides?: null | TransformOptions,
    options?: BabelIntegrationImportSourcePluginOptions | boolean | null,
  ): Promise<void>
  {
    if (options === false)
    {
      return;
    }

    const optionsObject = (
      options === true
        ? {}
        : options ?? {}
    );

    const packageName = "@babel/preset-env";

    let babelPresetEnv: null | typeof BabelPresetEnvModule = null;

    try
    {
      babelPresetEnv = await import(
        packageName,
      ) as typeof BabelPresetEnvModule;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(
        context as unknown as StrictContext,
        err2,
      );
    }

    if (babelPresetEnv == null)
    {
      return;
    }

    configureBabelImportSources(
      context,
      assumptions,
      transformOptions,
      overrides,
      optionsObject,
    );
  }
}
