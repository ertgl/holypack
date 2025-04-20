import type { Linter } from "eslint";
import type TypeScriptPluginModule from "typescript-eslint";

import type { ResolvedContext } from "@holypack/core";

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
    context: ResolvedContext,
    options?: boolean | ESLintIntegrationTypeScriptPluginOptions | null,
  ): Promise<void>
  {
    const packageName = "typescript-eslint";

    try
    {
      const typescriptPluginModule = await import(
        packageName,
      ) as {
        default: typeof TypeScriptPluginModule;
      };

      const typescriptPlugin = typescriptPluginModule.default;

      const resolvedOptions = resolveESLintIntegrationTypeScriptPluginOptions(
        context.cwd,
        options,
      );

      if (resolvedOptions === false)
      {
        return;
      }

      const eslintBaseLanguageOptions: Linter.Config["languageOptions"] = {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: resolvedOptions.tsconfigRootDir,
          warnOnUnsupportedTypeScriptVersion: false,
        },
      };

      context.eslint.config.push(
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
