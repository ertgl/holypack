import type { TransformOptions } from "@babel/core";
import type {
  default as BabelImportSourceTransformerPluginModule,
  Options as BabelImportSourceTransformerPluginOptions,
} from "babel-plugin-transform-import-source";

import { type ResolvedContext } from "@holypack/core";
import { emitWarning } from "@holypack/core/context/warnings";
import { ModuleNotFoundError } from "@holypack/core/module";

import type { BabelIntegrationImportSourceTransformerPlugin } from "./plugin";
import type { BabelIntegrationImportSourceTransformerPluginOptions } from "./plugin-options";
import { resolveBabelIntegrationImportSourceTransformerPluginOptions } from "./plugin-options-resolver";

export class BabelIntegrationImportSourceTransformerPluginAPI
{
  plugin: BabelIntegrationImportSourceTransformerPlugin;

  constructor(
    plugin: BabelIntegrationImportSourceTransformerPlugin,
  )
  {
    this.plugin = plugin;
  }

  async addBabelConfig(
    context: ResolvedContext,
    transformOptions: TransformOptions,
    options?: BabelIntegrationImportSourceTransformerPluginOptions | boolean | null,
  ): Promise<void>
  {
    const resolvedOptions = resolveBabelIntegrationImportSourceTransformerPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    const packageName = "babel-plugin-transform-import-source";

    let importSourceTransformerPlugin: null | typeof BabelImportSourceTransformerPluginModule = null;

    try
    {
      importSourceTransformerPlugin = await import(
        packageName,
      ) as typeof BabelImportSourceTransformerPluginModule;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (importSourceTransformerPlugin == null)
    {
      return;
    }

    // TODO(ertgl): Create `LegacyPlugin` and augment the context with a flag that indicates whether the legacy mode is enabled.
    // TODO(ertgl): Determine the target extension for `BabelImportSourceTransformerPlugin` using the context (requires `LegacyPlugin` to be ready).
    const targetExtension = ".mjs";

    const importSourceTransformerPluginOptions: BabelImportSourceTransformerPluginOptions = {
      transform: {
        rules: [
          {
            find: /(?:\.[cm]?[jt]s[x]?)?$/iu,
            replace: targetExtension,
            resolveIndex: true,
            test: /^[.\\/]+.*$/,
          },
        ],
      },
    };

    transformOptions.plugins ??= [];

    transformOptions.plugins.push(
      [
        packageName,
        importSourceTransformerPluginOptions,
      ],
    );
  }
}
