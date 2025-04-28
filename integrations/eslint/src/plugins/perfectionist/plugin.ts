import type { Linter } from "eslint";

import {
  Integration,
  requireIntegration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import { HOOK_NAME_ESLINT_GENERATE_CONFIGS } from "../../hooks";
import { type ESLintIntegration } from "../../integration";
import { INTEGRATION_NAME_ESLINT } from "../../integration/integration-name";

import { ESLintIntegrationPerfectionistPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_PERFECTIONIST = `${INTEGRATION_NAME_ESLINT}/Perfectionist`;

export class ESLintIntegrationPerfectionistPlugin implements Integration
{
  api: ESLintIntegrationPerfectionistPluginAPI;

  name = INTEGRATION_NAME_ESLINT_PERFECTIONIST;

  constructor()
  {
    this.api = new ESLintIntegrationPerfectionistPluginAPI(this);
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
      eslintIntegration.options.perfectionist,
    );
  }

  setup(
    context: StrictContext,
    config: StrictConfig,
  ): void
  {
    const eslintIntegration = requireIntegration<
      ESLintIntegration
    >(
      context,
      INTEGRATION_NAME_ESLINT,
    );

    eslintIntegration.hooks[HOOK_NAME_ESLINT_GENERATE_CONFIGS].tapPromise(
      INTEGRATION_NAME_ESLINT_PERFECTIONIST,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationPerfectionistPlugin(): ESLintIntegrationPerfectionistPlugin
{
  return new ESLintIntegrationPerfectionistPlugin();
}
