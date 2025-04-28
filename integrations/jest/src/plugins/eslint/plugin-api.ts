import type { Linter } from "eslint";
import type ESLingPluginJestModule from "eslint-plugin-jest";
import type GlobalsModule from "globals";

import type { StrictContext } from "@holypack/core";
import { ModuleNotFoundError } from "@holypack/core/lib/module";
import { emitWarning } from "@holypack/core/plugins/process/plugins/warning-monitor/utils/warning-emitter";

import type { JestIntegrationESLintPlugin } from "./plugin";
import type {
  JestIntegrationESLintPluginOptions,
  JestIntegrationESLintPluginResolvedOptions,
} from "./plugin-options";
import { resolveJestIntegrationESLintPluginOptions } from "./plugin-options-resolver";

export class JestIntegrationESLintPluginAPI
{
  plugin: JestIntegrationESLintPlugin;

  constructor(
    plugin: JestIntegrationESLintPlugin,
  )
  {
    this.plugin = plugin;
  }

  async contributeGlobalsToESLintConfigs(
    context: StrictContext,
    configs: Linter.Config[],
    options: JestIntegrationESLintPluginResolvedOptions,
  ): Promise<void>
  {
    const packageName = "globals";

    let globals: null | typeof GlobalsModule = null;

    try
    {
      globals = await import(
        packageName,
      ) as typeof GlobalsModule;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (globals == null)
    {
      return;
    }

    configs.push({
      files: [
        // TODO(ertgl): Define `files` option of `globals` config for `jest`.
      ],
      languageOptions: {
        globals: {
          ...globals.jest,
        },
      },
    });
  }

  async contributeJestConfigToESLintConfigs(
    context: StrictContext,
    configs: Linter.Config[],
    options: JestIntegrationESLintPluginResolvedOptions,
  ): Promise<void>
  {
    const packageName = "eslint-plugin-jest";

    let eslintPluginJest: null | typeof ESLingPluginJestModule = null;

    try
    {
      eslintPluginJest = await import(
        packageName,
      ) as typeof ESLingPluginJestModule;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (eslintPluginJest == null)
    {
      return;
    }

    configs.push({
      ...eslintPluginJest.configs["flat/recommended"],
      files: [
        // TODO(ertgl): Define `files` option of `eslint-plugin-jest` config.
      ],
    });
  }

  async contributeToESLintConfigs(
    context: StrictContext,
    configs: Linter.Config[],
    options?: boolean | JestIntegrationESLintPluginOptions | null,
  ): Promise<void>
  {
    const resolvedOptions = resolveJestIntegrationESLintPluginOptions(
      context.cwd,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    await this.contributeGlobalsToESLintConfigs(
      context,
      configs,
      resolvedOptions,
    );

    await this.contributeJestConfigToESLintConfigs(
      context,
      configs,
      resolvedOptions,
    );
  }
}
