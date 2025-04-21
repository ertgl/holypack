import type JSONPluginModule from "@eslint/json";

import type { ResolvedContext } from "@holypack/core";

import {
  GLOB_PATTERN_JSON,
  GLOB_PATTERN_JSON5,
  GLOB_PATTERN_JSONC,
} from "../../../constants/glob-patterns";

import type { ESLintIntegrationESLintJSONPlugin } from "./plugin";
import type { ESLintIntegrationESLintJSONPluginOptions } from "./plugin-options";
import { resolveESLintIntegrationESLintJSONPluginOptions } from "./plugin-options-resolver";

export class ESLintIntegrationESLintJSONPluginAPI
{
  plugin: ESLintIntegrationESLintJSONPlugin;

  constructor(
    plugin: ESLintIntegrationESLintJSONPlugin,
  )
  {
    this.plugin = plugin;
  }

  async addESLintConfig(
    context: ResolvedContext,
    options?: boolean | ESLintIntegrationESLintJSONPluginOptions | null,
  ): Promise<void>
  {
    const packageName = "@eslint/json";

    let jsonPlugin: null | typeof JSONPluginModule = null;

    try
    {
      const jsonPluginModule = await import(
        packageName,
      ) as {
        default: typeof JSONPluginModule;
      };

      jsonPlugin = jsonPluginModule.default;
    }
    catch (err)
    {
      // TODO(ertgl): Standardize the missing package error handling.
      const err2 = new Error(`Package could not be imported: ${packageName}`);
      err2.cause = err;
      process.emitWarning(err2);
    }

    if (jsonPlugin == null)
    {
      return;
    }

    const resolvedOptions = resolveESLintIntegrationESLintJSONPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    context.eslint.config.push(
      {
        ...jsonPlugin.configs.recommended,
        files: [
          GLOB_PATTERN_JSON,
          GLOB_PATTERN_JSON5,
          GLOB_PATTERN_JSONC,
        ],
      },

      {
        files: [
          GLOB_PATTERN_JSON,
        ],
        language: "json/json",
      },

      {
        files: [
          GLOB_PATTERN_JSON5,
        ],
        language: "json/json5",
      },

      {
        files: [
          GLOB_PATTERN_JSONC,
        ],
        language: "json/jsonc",
      },
    );
  }
}
