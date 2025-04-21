import type GlobalsModule from "globals";

import type { ResolvedContext } from "@holypack/core";

import {
  GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
  GLOB_PATTERN_JS_JSX_TS_TSX,
  GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
} from "../../constants/glob-patterns";

import type { ESLintIntegrationGlobalsPlugin } from "./plugin";
import type { ESLintIntegrationGlobalsPluginOptions } from "./plugin-options";
import { resolveESLintIntegrationGlobalsPluginOptions } from "./plugin-options-resolver";

export class ESLintIntegrationGlobalsPluginAPI
{
  plugin: ESLintIntegrationGlobalsPlugin;

  constructor(
    plugin: ESLintIntegrationGlobalsPlugin,
  )
  {
    this.plugin = plugin;
  }

  async addESLintConfig(
    context: ResolvedContext,
    options?: boolean | ESLintIntegrationGlobalsPluginOptions | null,
  ): Promise<void>
  {
    const packageName = "globals";

    try
    {
      const globalsModule = await import(
        packageName,
      ) as {
        default: typeof GlobalsModule;
      };

      const globals = globalsModule.default;

      const resolvedOptions = resolveESLintIntegrationGlobalsPluginOptions(
        context.cwd,
        options,
      );

      if (resolvedOptions === false)
      {
        return;
      }

      context.eslint.config.push(
        {
          files: [
            GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
          ],
          languageOptions: {
            globals: {
              ...globals.builtin,
              ...globals.commonjs,
              ...globals.node,
              ...globals.nodeBuiltin,
            },
          },
        },

        {
          files: [
            GLOB_PATTERN_JS_JSX_TS_TSX,
          ],
          languageOptions: {
            globals: {
              ...globals.builtin,
              ...globals.commonjs,
              ...globals.es2025,
            },
          },
        },

        {
          files: [
            GLOB_PATTERN_MJS_MJSX_MTS_MTSX,
          ],
          languageOptions: {
            globals: {
              ...globals.builtin,
              ...globals.es2025,
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
