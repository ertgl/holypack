import type { Linter } from "eslint";
import type TypeScriptPluginModule from "typescript-eslint";

import type { TypeSafeContext } from "@holypack/core";
import { ModuleNotFoundError } from "@holypack/core/lib/module";
import { emitWarning } from "@holypack/core/plugins/process/plugins/warning-monitor/utils/warning-emitter";

import {
  GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
  GLOB_PATTERN_CJS_JS_MJS,
  GLOB_PATTERN_CJSX_JSX_MJSX,
  GLOB_PATTERN_CTS_MTS_TS,
  GLOB_PATTERN_CTSX_MTSX_TSX,
} from "../../constants/glob-patterns";

import type { ESLintIntegrationTypeScriptPlugin } from "./plugin";
import type { ESLintIntegrationTypeScriptPluginOptions } from "./plugin-options";
import { resolveESLintIntegrationTypeScriptPluginOptions } from "./plugin-options-resolver";

export class ESLintIntegrationTypeScriptPluginAPI
{
  plugin: ESLintIntegrationTypeScriptPlugin;

  constructor(
    plugin: ESLintIntegrationTypeScriptPlugin,
  )
  {
    this.plugin = plugin;
  }

  async addESLintConfig(
    context: TypeSafeContext,
    configs: Linter.Config[],
    options?: boolean | ESLintIntegrationTypeScriptPluginOptions | null,
  ): Promise<void>
  {
    const resolvedOptions = resolveESLintIntegrationTypeScriptPluginOptions(
      context.cwd,
      options,
      {
        tsconfigRootDir: context.typescript?.tsconfigRootDirectoryPath,
      },
    );

    if (resolvedOptions === false)
    {
      return;
    }

    const packageName = "typescript-eslint";

    let typescriptPlugin: null | typeof TypeScriptPluginModule = null;

    try
    {
      const typescriptPluginModule = await import(
        packageName,
      ) as {
        default: typeof TypeScriptPluginModule;
      };

      typescriptPlugin = typescriptPluginModule.default;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (typescriptPlugin == null)
    {
      return;
    }

    const eslintBaseLanguageOptions: Linter.Config["languageOptions"] = {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: resolvedOptions.tsconfigRootDir,
        warnOnUnsupportedTypeScriptVersion: resolvedOptions.warnOnUnsupportedTypeScriptVersion,
      },
    };

    configs.push(
      ...typescriptPlugin.config([
        ...typescriptPlugin.configs.strictTypeChecked.map(
          (config) =>
          {
            return {
              ...config,
              files: [
                GLOB_PATTERN_CJS_JS_MJS,
                GLOB_PATTERN_CJSX_JSX_MJSX,
                GLOB_PATTERN_CTS_MTS_TS,
                GLOB_PATTERN_CTSX_MTSX_TSX,
              ],
            };
          },
        ),

        {
          files: [
            GLOB_PATTERN_CJS_JS_MJS,
            GLOB_PATTERN_CJSX_JSX_MJSX,
            GLOB_PATTERN_CTS_MTS_TS,
            GLOB_PATTERN_CTSX_MTSX_TSX,
          ],
          rules: {
            "@typescript-eslint/ban-ts-comment": "warn",
            "@typescript-eslint/no-empty-object-type": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": [
              "warn",
              {
                args: "none",
              },
            ],
          },
        },

        {
          files: [
            GLOB_PATTERN_CJS_CJSX_CTS_CTSX,
          ],
          rules: {
            "@typescript-eslint/no-require-imports": "off",
          },
        },

        {
          files: [
            GLOB_PATTERN_CJS_JS_MJS,
            GLOB_PATTERN_CTS_MTS_TS,
          ],
          languageOptions: {
            ...eslintBaseLanguageOptions,
          },
        },

        {
          files: [
            GLOB_PATTERN_CJSX_JSX_MJSX,
            GLOB_PATTERN_CTSX_MTSX_TSX,
          ],
          languageOptions: {
            ...eslintBaseLanguageOptions,
            parserOptions: {
              ...eslintBaseLanguageOptions.parserOptions,
              ecmaFeatures: {
                ...eslintBaseLanguageOptions.parserOptions?.ecmaFeatures,
                jsx: true,
              },
            },
          },
        },
      ]) as Linter.Config[],
    );
  }
}
