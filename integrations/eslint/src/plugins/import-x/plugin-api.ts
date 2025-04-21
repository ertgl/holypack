import type { Linter } from "eslint";
import type PluginImportXModule from "eslint-plugin-import-x";

import type { ResolvedContext } from "@holypack/core";

import { GLOB_PATTERN_JS_JSX_TS_TSX, GLOB_PATTERN_MJS_MJSX_MTS_MTSX } from "../../constants/glob-patterns";

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
    const packageName = "eslint-plugin-import-x";

    try
    {
      const pluginImportXModule = await import(
        packageName,
      ) as {
        default: typeof PluginImportXModule;
      };

      const pluginImportX = pluginImportXModule.default;

      const resolvedOptions = resolveESLintIntegrationImportXPluginOptions(
        context.cwd,
        options,
      );

      if (resolvedOptions === false)
      {
        return;
      }

      const {
        createTypeScriptImportResolver,
      } = await import(
        "eslint-import-resolver-typescript",
      );

      context.eslint.config.push(
        {
          ...pluginImportX.flatConfigs.recommended,
          files: [
            GLOB_PATTERN_JS_JSX_TS_TSX,
            GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
          ],
        } as Linter.Config,

        {
          ...pluginImportX.flatConfigs.typescript,
          files: [
            GLOB_PATTERN_JS_JSX_TS_TSX,
            GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
          ],
        } as Linter.Config,

        {
          settings: {
            "import-x/extensions": [
              ".d.ts",
              ".ts",
              ".tsx",
              ".js",
              ".jsx",
              ".json",
            ],
            "import-x/internal-regex": resolvedOptions.internalRegexSource,
            "import-x/parsers": {
              "@typescript-eslint/parser": [
                ".cjs",
                ".cjsx",
                ".cts",
                ".ctsx",
                ".js",
                ".jsx",
                ".mjs",
                ".mjsx",
                ".mts",
                ".mtsx",
                ".ts",
                ".tsx",
              ],
            },
            "import-x/resolver": {
              node: {
                extensions: [
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
                ],
              },
              typescript: true,
            },
            "import-x/resolver-next": [
              pluginImportX.createNodeResolver(),
              createTypeScriptImportResolver(),
            ],
          },
        },
      );
    }
    catch (err)
    {
      // TODO(ertgl): Standardize the missing package error handling.
      const err2 = new Error(`Package could not be imported: ${packageName}`);
      err2.cause = err;
      process.emitWarning(err2);
      return;
    }
  }
}
