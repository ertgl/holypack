import type { Linter } from "eslint";

import {
  generateHookSubscriptionIDForPlugin,
  type Integration,
  type StrictConfig,
  type StrictContext,
  useIntegration,
} from "@holypack/core";
import { ModuleNotFoundError } from "@holypack/core/lib/module";
import { emitWarning } from "@holypack/core/plugins/process/sub-plugins/warning-monitor/utils/warning-emitter";
import type * as ESLintIntegrationModule from "@holypack/integration-eslint";
import type { ESLintIntegration } from "@holypack/integration-eslint";

import { JestIntegrationESLintPluginAPI } from "./plugin-api";
import { INTEGRATION_NAME_JEST_PLUGIN_ESLINT } from "./plugin-name";

export class JestIntegrationESLintPlugin implements Integration
{
  api: JestIntegrationESLintPluginAPI;

  name = INTEGRATION_NAME_JEST_PLUGIN_ESLINT;

  constructor()
  {
    this.api = new JestIntegrationESLintPluginAPI(this);
  }

  async onESLintConfigGeneration(
    eslintIntegration: ESLintIntegration,
    context: StrictContext,
    configs: Linter.Config[],
  ): Promise<void>
  {
    await this.api.contributeToESLintConfigs(
      context,
      configs,
      eslintIntegration.options.jest,
    );
  }

  async setup(
    context: StrictContext,
    config: StrictConfig,
  ): Promise<void>
  {
    const packageName = "@holypack/integration-eslint";

    let eslintIntegrationModule: null | typeof ESLintIntegrationModule = null;

    try
    {
      eslintIntegrationModule = await import(
        packageName,
      ) as typeof ESLintIntegrationModule;
    }
    catch (err)
    {
      const err2 = new ModuleNotFoundError(packageName);
      err2.cause = err;
      await emitWarning(context, err2);
    }

    if (eslintIntegrationModule === null)
    {
      return;
    }

    const {
      HOOK_NAME_ESLINT_GENERATE_CONFIGS,
      INTEGRATION_NAME_ESLINT,
    } = eslintIntegrationModule;

    const eslintIntegration = useIntegration<ESLintIntegration>(
      context,
      INTEGRATION_NAME_ESLINT,
    );

    if (eslintIntegration == null)
    {
      return;
    }

    eslintIntegration.hooks[HOOK_NAME_ESLINT_GENERATE_CONFIGS].tapPromise(
      generateHookSubscriptionIDForPlugin(
        this,
        eslintIntegration.hooks[HOOK_NAME_ESLINT_GENERATE_CONFIGS],
      ),
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createJestIntegrationESLintPlugin(): JestIntegrationESLintPlugin
{
  return new JestIntegrationESLintPlugin();
}
