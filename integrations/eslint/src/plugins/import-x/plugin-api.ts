import type { Linter } from "eslint";
import type PluginImportXModule from "eslint-plugin-import-x";

import type { ResolvedContext } from "@holypack/core";
import { emitWarning } from "@holypack/core/context/warnings";
import { ModuleNotFoundError } from "@holypack/core/module";

import {
  GLOB_PATTERN_CJS_JS_MJS,
  GLOB_PATTERN_CJSX_JSX_MJSX,
  GLOB_PATTERN_CTS_MTS_TS,
  GLOB_PATTERN_CTSX_MTSX_TSX,
} from "../../constants/glob-patterns";

import type { ESLintIntegrationImportXPlugin } from "./plugin";
import type { ESLintIntegrationImportXPluginOptions } from "./plugin-options";
import { resolveESLintIntegrationImportXPluginOptions } from "./plugin-options-resolver";

export class ESLintIntegrationImportXPluginAPI
{
  plugin: ESLintIntegrationImportXPlugin;

  constructor(
    plugin: ESLintIntegrationImportXPlugin,
  )
  {
    this.plugin = plugin;
  }

  async addESLintConfig(
    context: ResolvedContext,
    options?: boolean | ESLintIntegrationImportXPluginOptions | null,
  ): Promise<void>
  {
    const resolvedOptions = resolveESLintIntegrationImportXPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    const packageName = "eslint-plugin-import-x";

    let pluginImportX: null | typeof PluginImportXModule = null;

    try
    {
      const pluginImportXModule = await import(
        packageName,
      ) as {
        default: typeof PluginImportXModule;
      };

      pluginImportX = pluginImportXModule.default;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (pluginImportX == null)
    {
      return;
    }

    // TODO(ertgl): Make `eslint-import-resolver-typescript` dependency optional.
    const {
      createTypeScriptImportResolver,
    } = await import(
      "eslint-import-resolver-typescript",
    );

    const extensions = [
      ".d.ts",
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".mts",
      ".mtsx",
      ".mjs",
      ".mjsx",
      ".cts",
      ".ctsx",
      ".cjs",
      ".cjsx",
      ".node",
      ".json",
    ];

    const nodeExtensions = [
      ".js",
      ".mjs",
      ".cjs",
      ".node",
      ".json",
    ];

    context.eslint.config.push(
      {
        settings: {
          "import-x/extensions": extensions,
          "import-x/internal-regex": resolvedOptions.internalPatternSource,
          "import-x/parsers": {
            "@typescript-eslint/parser": extensions,
          },
          "import-x/resolver": {
            node: {
              extensions: nodeExtensions,
            },
            typescript: true,
          },
          "import-x/resolver-next": [
            pluginImportX.createNodeResolver(),
            createTypeScriptImportResolver(),
          ],
        },
      },

      {
        ...pluginImportX.flatConfigs.recommended,
        files: [
          GLOB_PATTERN_CJS_JS_MJS,
          GLOB_PATTERN_CJSX_JSX_MJSX,
        ],
      } as Linter.Config,

      {
        ...pluginImportX.flatConfigs.typescript,
        files: [
          GLOB_PATTERN_CTS_MTS_TS,
          GLOB_PATTERN_CTSX_MTSX_TSX,
        ],
      } as Linter.Config,
    );
  }
}
