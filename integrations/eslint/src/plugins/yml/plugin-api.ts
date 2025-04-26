import type { Linter } from "eslint";
import type PluginYMLModule from "eslint-plugin-yml";

import type { ResolvedContext } from "@holypack/core";
import { emitWarning } from "@holypack/core/context/warnings";
import { ModuleNotFoundError } from "@holypack/core/lib/module";

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
    configs: Linter.Config[],
    options?: boolean | ESLintIntegrationYMLPluginOptions | null,
  ): Promise<void>
  {
    const resolvedOptions = resolveESLintIntegrationYMLPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

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
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (pluginYML == null)
    {
      return;
    }

    configs.push(
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
