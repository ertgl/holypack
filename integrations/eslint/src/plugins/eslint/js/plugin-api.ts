import type ESLintJSPluginModule from "@eslint/js";
import type { Linter } from "eslint";

import type { TypeSafeContext } from "@holypack/core";
import { ModuleNotFoundError } from "@holypack/core/lib/module";
import { emitWarning } from "@holypack/core/plugins/process/plugins/warning-monitor/utils/warning-emitter";

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
    context: TypeSafeContext,
    configs: Linter.Config[],
    options?: boolean | ESLintIntegrationESLintJSPluginOptions | null,
  ): Promise<void>
  {
    const resolvedOptions = resolveESLintIntegrationESLintJSPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    const packageName = "@eslint/js";

    let eslintJSPlugin: null | typeof ESLintJSPluginModule = null;

    try
    {
      const eslintJSPluginModule = await import(
        packageName,
      ) as {
        default: typeof ESLintJSPluginModule;
      };

      eslintJSPlugin = eslintJSPluginModule.default;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (eslintJSPlugin == null)
    {
      return;
    }

    configs.push({
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
}
