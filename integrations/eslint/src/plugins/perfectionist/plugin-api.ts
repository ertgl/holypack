import type { Linter } from "eslint";
import type PluginPerfectionistModule from "eslint-plugin-perfectionist";

import type { ResolvedContext } from "@holypack/core";
import { emitWarning } from "@holypack/core/context/warnings";
import { ModuleNotFoundError } from "@holypack/core/lib/module";

import {
  GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
  GLOB_PATTERN_JS_JSX_TS_TSX,
  GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
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
    configs: Linter.Config[],
    options?: boolean | ESLintIntegrationPerfectionistPluginOptions | null,
  ): Promise<void>
  {
    const resolvedOptions = resolveESLintIntegrationPerfectionistPluginOptions(
      context.cwd,
      context.workspaces,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

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
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (pluginPerfectionist == null)
    {
      return;
    }

    configs.push(
      {
        ...pluginPerfectionist.configs["recommended-natural"],
        files: [
          GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
          GLOB_PATTERN_JS_JSX_TS_TSX,
          GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
        ],
      },

      {
        files: [
          GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
          GLOB_PATTERN_JS_JSX_TS_TSX,
          GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
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
              tsconfigRootDir: context.cwd,
            },
          ],
        },
      },
    );
  }
}
