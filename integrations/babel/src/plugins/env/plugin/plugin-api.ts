import type { TransformOptions } from "@babel/core";
import type BabelPresetEnvModule from "@babel/preset-env";

import type { Context, StrictContext } from "@holypack/core";
import { ModuleNotFoundError } from "@holypack/core/lib/module";
import { emitWarning } from "@holypack/core/plugins/process/sub-plugins/warning-monitor/utils/warning-emitter";

import type { Assumptions } from "../../../config";
import { configureBabelEnv } from "../config";
import { PACKAGE_NAME_BABEL_PRESET_ENV } from "../constants/packages";

import type { BabelIntegrationEnvPlugin } from "./plugin";
import { BabelIntegrationEnvPluginOptions } from "./plugin-options";

export class BabelIntegrationEnvPluginAPI
{
  plugin: BabelIntegrationEnvPlugin;

  constructor(
    plugin: BabelIntegrationEnvPlugin,
  )
  {
    this.plugin = plugin;
  }

  async configureBabelEnv(
    context: Context,
    assumptions: Assumptions,
    transformOptions: TransformOptions,
    overrides?: null | TransformOptions,
    options?: BabelIntegrationEnvPluginOptions | boolean | null,
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

    let babelPresetEnv: null | typeof BabelPresetEnvModule = null;

    try
    {
      babelPresetEnv = await import(
        PACKAGE_NAME_BABEL_PRESET_ENV,
      ) as typeof BabelPresetEnvModule;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(PACKAGE_NAME_BABEL_PRESET_ENV);
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

    configureBabelEnv(
      context,
      assumptions,
      transformOptions,
      overrides,
      optionsObject,
    );
  }
}
