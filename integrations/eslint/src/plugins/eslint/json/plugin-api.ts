import type JSONPluginModule from "@eslint/json";
import type { Linter } from "eslint";

import type { TypeSafeContext } from "@holypack/core";
import { ModuleNotFoundError } from "@holypack/core/lib/module";
import { emitWarning } from "@holypack/core/plugins/process/plugins/warning-monitor/utils/warning-emitter";

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
    context: TypeSafeContext,
    configs: Linter.Config[],
    options?: boolean | ESLintIntegrationESLintJSONPluginOptions | null,
  ): Promise<void>
  {
    const resolvedOptions = resolveESLintIntegrationESLintJSONPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

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
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (jsonPlugin == null)
    {
      return;
    }

    configs.push(
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
