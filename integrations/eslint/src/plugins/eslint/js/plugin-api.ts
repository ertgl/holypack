import type ESLintJSPluginModule from "@eslint/js";

import type { ResolvedContext } from "@holypack/core";

import {
  GLOB_PATTERN_CJS_JS_MJS,
  GLOB_PATTERN_CJSX_JSX_MJSX,
} from "../../../constants/glob-patterns";

import type { ESLintIntegrationESLintJSPlugin } from "./plugin";
import type { ESLintIntegrationESLintJSPluginOptions } from "./plugin-options";
import { resolveESLintIntegrationESLintJSPluginOptions } from "./plugin-options-resolver";

export class ESLintIntegrationESLintJSPluginAPI
{
  plugin: ESLintIntegrationESLintJSPlugin;

  constructor(
    plugin: ESLintIntegrationESLintJSPlugin,
  )
  {
    this.plugin = plugin;
  }

  async addESLintConfig(
    context: ResolvedContext,
    options?: boolean | ESLintIntegrationESLintJSPluginOptions | null,
  ): Promise<void>
  {
    const packageName = "@eslint/js";

    try
    {
      const eslintJSPluginModule = await import(
        packageName,
      ) as {
        default: typeof ESLintJSPluginModule;
      };

      const eslintJSPlugin = eslintJSPluginModule.default;

      const resolvedOptions = resolveESLintIntegrationESLintJSPluginOptions(
        context.cwd,
        options,
      );

      if (resolvedOptions === false)
      {
        return;
      }

      context.eslint.config.push({
        ...eslintJSPlugin.configs.recommended,
        files: [
          GLOB_PATTERN_CJS_JS_MJS,
          GLOB_PATTERN_CJSX_JSX_MJSX,
        ],
      },

      {
        files: [
          GLOB_PATTERN_CJS_JS_MJS,
          GLOB_PATTERN_CJSX_JSX_MJSX,
        ],
        rules: {
          "no-unused-vars": [
            "warn",
            {
              args: "none",
            },
          ],
        },
      });
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
