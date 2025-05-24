import type { TransformOptions } from "@babel/core";
import type BabelPluginTransformImportSourceModule from "babel-plugin-transform-import-source";

import type { Context, StrictContext } from "@holypack/core";
import { ModuleNotFoundError } from "@holypack/core/lib/module";
import { emitWarning } from "@holypack/core/plugins/process/sub-plugins/warning-monitor/utils/warning-emitter";

import type { Assumptions } from "../../../config";
import { configureBabelImportSources } from "../config";
import { PACKAGE_NAME_BABEL_PLUGIN_TRANSFORM_IMPORT_SOURCE } from "../constants/packages";

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

    let babelPlugin: null | typeof BabelPluginTransformImportSourceModule = null;

    try
    {
      babelPlugin = await import(
        PACKAGE_NAME_BABEL_PLUGIN_TRANSFORM_IMPORT_SOURCE,
      ) as typeof BabelPluginTransformImportSourceModule;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(
        PACKAGE_NAME_BABEL_PLUGIN_TRANSFORM_IMPORT_SOURCE,
      );
      err2.cause = err;
      await emitWarning(
        context as unknown as StrictContext,
        err2,
      );
    }

    if (babelPlugin == null)
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
