import type NPluginModule from "eslint-plugin-n";

import type { ResolvedContext } from "@holypack/core";

import {
  GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
  GLOB_PATTERN_JS_JSX_TS_TSX,
  GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
} from "../../constants/glob-patterns";

import type { ESLintIntegrationNPlugin } from "./plugin";
import type { ESLintIntegrationNPluginOptions } from "./plugin-options";
import { resolveESLintIntegrationNPluginOptions } from "./plugin-options-resolver";

export class ESLintIntegrationNPluginAPI
{
  plugin: ESLintIntegrationNPlugin;

  constructor(
    plugin: ESLintIntegrationNPlugin,
  )
  {
    this.plugin = plugin;
  }

  async addESLintConfig(
    context: ResolvedContext,
    options?: boolean | ESLintIntegrationNPluginOptions | null,
  ): Promise<void>
  {
    const packageName = "eslint-plugin-n";

    try
    {
      const nodePluginModule = await import(
        packageName,
      ) as {
        default: typeof NPluginModule;
      };

      const nodePlugin = nodePluginModule.default;

      const resolvedOptions = resolveESLintIntegrationNPluginOptions(
        context.cwd,
        options,
      );

      if (resolvedOptions === false)
      {
        return;
      }

      context.eslint.config.push(
        {
          ...nodePlugin.configs["flat/recommended"],
          files: [
            GLOB_PATTERN_JS_JSX_TS_TSX,
          ],
        },

        {
          ...nodePlugin.configs["flat/recommended-module"],
          files: [
            GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
          ],
        },

        {
          ...nodePlugin.configs["flat/recommended-script"],
          files: [
            GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
          ],
        },

        {
          files: [
            GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
            GLOB_PATTERN_JS_JSX_TS_TSX,
            GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
          ],
          settings: {
            n: {
              allowModules: [
                // TODO(ertgl): Configure eslint-plugin-n better to resolve installed modules in monorepos.
                ...Object.keys(context.project.packageJSON.devDependencies ?? {}),
                ...Object.keys(context.project.packageJSON.resolution ?? {}),
              ],
              resolverConfig: {
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
                  ".json",
                  ".node",
                ],
                modules: [
                  "node_modules",
                ],
                // TODO(ertgl): Consider creating a plugin for workspaces.
                roots: [
                  context.cwd,
                  context.project.path,
                ],
              },
              tryExtensions: [
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
                ".cjsx",
                ".cjs",
                ".json",
                ".node",
              ],
            },
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
