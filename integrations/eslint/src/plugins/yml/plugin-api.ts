import type PluginYMLModule from "eslint-plugin-yml";

import type { ResolvedContext } from "@holypack/core";

import { GLOB_PATTERN_YAML_YML } from "../../constants/glob-patterns";

import type { ESLintIntegrationYMLPlugin } from "./plugin";
import type { ESLintIntegrationYMLPluginOptions } from "./plugin-options";
import { resolveESLintIntegrationYMLPluginOptions } from "./plugin-options-resolver";

export class ESLintIntegrationYMLPluginAPI
{
  plugin: ESLintIntegrationYMLPlugin;

  constructor(
    plugin: ESLintIntegrationYMLPlugin,
  )
  {
    this.plugin = plugin;
  }

  async addESLintConfig(
    context: ResolvedContext,
    options?: boolean | ESLintIntegrationYMLPluginOptions | null,
  ): Promise<void>
  {
    const packageName = "eslint-plugin-yml";

    let pluginYML: null | typeof PluginYMLModule = null;

    try
    {
      const pluginYMLModule = await import(
        packageName,
      ) as {
        default: typeof PluginYMLModule;
      };

      pluginYML = pluginYMLModule.default;
    }
    catch (err)
    {
      // TODO(ertgl): Standardize the missing package error handling.
      const err2 = new Error(`Package could not be imported: ${packageName}`);
      err2.cause = err;
      process.emitWarning(err2);
    }

    if (pluginYML == null)
    {
      return;
    }

    const resolvedOptions = resolveESLintIntegrationYMLPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    context.eslint.config.push(
      ...pluginYML.configs["flat/recommended"].map(
        (config) =>
        {
          return {
            ...config,
            files: [
              GLOB_PATTERN_YAML_YML,
            ],
          };
        },
      ),

      {
        files: [
          GLOB_PATTERN_YAML_YML,
        ],
        rules: {
          "yml/no-empty-mapping-value": "off",
        },
      },
    );
  }
}
