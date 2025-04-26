import type { TransformOptions } from "@babel/core";
import type {
  default as BabelImportSourceTransformerPluginModule,
  Options as BabelImportSourceTransformerPluginOptions,
} from "babel-plugin-transform-import-source";

import { type ResolvedContext } from "@holypack/core";
import { emitWarning } from "@holypack/core/context/warnings";
import { ModuleNotFoundError } from "@holypack/core/lib/module";

import type { BabelIntegrationImportSourceTransformerPlugin } from "./plugin";
import type { BabelIntegrationImportSourceTransformerPluginOptions } from "./plugin-options";
import { resolveBabelIntegrationImportSourceTransformerPluginOptions } from "./plugin-options-resolver";

const PATTERN_ANY_RELATIVE_PATH = /^[.\\/]+.*$/;

const PATTERN_ANY_JS_EXTENSION_OR_NO_EXTENSION = /(?:\.[cm]?[jt]s[x]?)?$/iu;

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
      context.legacy,
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

    const importSourceTransformerPluginOptions: BabelImportSourceTransformerPluginOptions = {
      ...resolvedOptions.overrides,
      transform: {
        ...resolvedOptions.overrides.transform,
        rules: [
          ...resolvedOptions.overrides.transform?.rules ?? [],
          {
            find: PATTERN_ANY_JS_EXTENSION_OR_NO_EXTENSION,
            replace: resolvedOptions.targetExtension,
            resolveIndex: true,
            // Match any relative path.
            test: PATTERN_ANY_RELATIVE_PATH,
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
