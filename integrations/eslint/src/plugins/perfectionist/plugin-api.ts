import type PluginPerfectionistModule from "eslint-plugin-perfectionist";

import type { ResolvedContext } from "@holypack/core";

import {
  GLOB_PATTERN_CJS_JS_MJS,
  GLOB_PATTERN_CJSX_JSX_MJSX,
  GLOB_PATTERN_CTS_MTS_TS,
  GLOB_PATTERN_CTSX_MTSX_TSX,
} from "../../constants/glob-patterns";

import type { ESLintIntegrationPerfectionistPlugin } from "./plugin";
import type { ESLintIntegrationPerfectionistPluginOptions } from "./plugin-options";
import { resolveESLintIntegrationPerfectionistPluginOptions } from "./plugin-options-resolver";

export class ESLintIntegrationPerfectionistPluginAPI
{
  plugin: ESLintIntegrationPerfectionistPlugin;

  constructor(
    plugin: ESLintIntegrationPerfectionistPlugin,
  )
  {
    this.plugin = plugin;
  }

  async addESLintConfig(
    context: ResolvedContext,
    options?: boolean | ESLintIntegrationPerfectionistPluginOptions | null,
  ): Promise<void>
  {
    const packageName = "eslint-plugin-perfectionist";

    let pluginPerfectionist: null | typeof PluginPerfectionistModule = null;

    try
    {
      const pluginPerfectionistModule = await import(
        packageName,
      ) as {
        default: typeof PluginPerfectionistModule;
      };

      pluginPerfectionist = pluginPerfectionistModule.default;
    }
    catch (err)
    {
      // TODO(ertgl): Standardize the missing package error handling.
      const err2 = new Error(`Package could not be imported: ${packageName}`);
      err2.cause = err;
      process.emitWarning(err2);
    }

    if (pluginPerfectionist == null)
    {
      return;
    }

    const resolvedOptions = resolveESLintIntegrationPerfectionistPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    context.eslint.config.push(
      {
        ...pluginPerfectionist.configs["recommended-natural"],
        files: [
          GLOB_PATTERN_CJS_JS_MJS,
          GLOB_PATTERN_CJSX_JSX_MJSX,
          GLOB_PATTERN_CTS_MTS_TS,
          GLOB_PATTERN_CTSX_MTSX_TSX,
        ],
      },

      {
        files: [
          GLOB_PATTERN_CJS_JS_MJS,
          GLOB_PATTERN_CJSX_JSX_MJSX,
          GLOB_PATTERN_CTS_MTS_TS,
          GLOB_PATTERN_CTSX_MTSX_TSX,
        ],
        rules: {
          "perfectionist/sort-imports": [
            "error",
            {
              customGroups: {
                type: {
                  "node-type": /^node:.+$/iu.source,
                },
                value: {
                  node: /^node:.+$/iu.source,
                },
              },
              groups: [
                [
                  "node-type",
                  "node",
                  "builtin",
                ],
                [
                  "type",
                  "external",
                ],
                [
                  "internal-type",
                  "internal",
                ],
                [
                  "parent-type",
                  "parent",
                ],
                [
                  "sibling-type",
                  "sibling",
                ],
                [
                  "index-type",
                  "index",
                ],
                ["object"],
                ["unknown"],
              ],
              ignoreCase: false,
              internalPattern: resolvedOptions.internalPattern,
              newlinesBetween: "always",
              // TODO(ertgl): Create workspace plugin, use it for determining `tsconfigRootDir`.
              // TODO(ertgl): Create TypeScriptIntegration for tsconfigRootDir resolution.
              tsconfigRootDir: context.project.path,
            },
          ],
        },
      },
    );
  }
}
