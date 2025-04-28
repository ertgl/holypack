import type StylisticPluginModule from "@stylistic/eslint-plugin";
import type { Linter } from "eslint";

import type { StrictContext } from "@holypack/core";
import { ModuleNotFoundError } from "@holypack/core/lib/module";
import { emitWarning } from "@holypack/core/plugins/process/plugins/warning-monitor/utils/warning-emitter";

import {
  GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
  GLOB_PATTERN_CJS_JS_MJS,
  GLOB_PATTERN_CJSX_JSX_MJSX,
  GLOB_PATTERN_CTS_MTS_TS,
  GLOB_PATTERN_CTSX_MTSX_TSX,
  GLOB_PATTERN_JS_JSX_TS_TSX,
  GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
} from "../../constants/glob-patterns";

import type { ESLintIntegrationStylisticPlugin } from "./plugin";
import type { ESLintIntegrationStylisticPluginOptions } from "./plugin-options";
import { resolveESLintIntegrationStylisticPluginOptions } from "./plugin-options-resolver";

export class ESLintIntegrationStylisticPluginAPI
{
  plugin: ESLintIntegrationStylisticPlugin;

  constructor(
    plugin: ESLintIntegrationStylisticPlugin,
  )
  {
    this.plugin = plugin;
  }

  async contributeToESLintConfigs(
    context: StrictContext,
    configs: Linter.Config[],
    options?: boolean | ESLintIntegrationStylisticPluginOptions | null,
  ): Promise<void>
  {
    const resolvedOptions = resolveESLintIntegrationStylisticPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    const packageName = "@stylistic/eslint-plugin";

    let stylisticPlugin: null | typeof StylisticPluginModule = null;

    try
    {
      const stylisticPluginModule = await import(
        packageName,
      ) as {
        default: typeof StylisticPluginModule;
      };

      stylisticPlugin = stylisticPluginModule.default;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (stylisticPlugin == null)
    {
      return;
    }

    const quoteType = (
      resolvedOptions.overrides.quotes
      ?? "double"
    );

    configs.push(
      {
        ...stylisticPlugin.configs.recommended,
        files: [
          GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
          GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
          GLOB_PATTERN_JS_JSX_TS_TSX,
        ],
      },

      {
        ...stylisticPlugin.configs.customize({
          ...resolvedOptions.overrides,
        }),
        files: [
          GLOB_PATTERN_CJS_JS_MJS,
          GLOB_PATTERN_CTS_MTS_TS,
        ],
      },

      {
        ...stylisticPlugin.configs.customize({
          ...resolvedOptions.overrides,
          jsx: true,
        }),
        files: [
          GLOB_PATTERN_CJSX_JSX_MJSX,
          GLOB_PATTERN_CTSX_MTSX_TSX,
        ],
      },

      {
        files: [
          GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
          GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
          GLOB_PATTERN_JS_JSX_TS_TSX,
        ],
        rules: {
          "@stylistic/object-property-newline": [
            "error",
            {
              allowAllPropertiesOnSameLine: false,
            },
          ],
          "@stylistic/quotes": [
            "error",
            quoteType,
            {
              allowTemplateLiterals: true,
              avoidEscape: false,
              ignoreStringLiterals: false,
            },
          ],
        },
      },
    );
  }
}
