import type StylisticPluginModule from "@stylistic/eslint-plugin";

import type { ResolvedContext } from "@holypack/core";

import {
  GLOB_PATTERN_CJS_JS_MJS,
  GLOB_PATTERN_CJSX_JSX_MJSX,
  GLOB_PATTERN_CTS_MTS_TS,
  GLOB_PATTERN_CTSX_MTSX_TSX,
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

  async addESLintConfig(
    context: ResolvedContext,
    options?: boolean | ESLintIntegrationStylisticPluginOptions | null,
  ): Promise<void>
  {
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
      // TODO(ertgl): Standardize the missing package error handling.
      const err2 = new Error(`Package could not be imported: ${packageName}`);
      err2.cause = err;
      process.emitWarning(err2);
    }

    if (stylisticPlugin == null)
    {
      return;
    }

    const resolvedOptions = resolveESLintIntegrationStylisticPluginOptions(
      context.cwd,
      options,
    );

    if (!resolvedOptions)
    {
      return;
    }

    context.eslint.config.push(
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
    );
  }
}
