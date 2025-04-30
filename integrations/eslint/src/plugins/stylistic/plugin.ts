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

import { ESLintIntegrationStylisticPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_STYLISTIC = `${INTEGRATION_NAME_ESLINT}/Stylistic`;

export class ESLintIntegrationStylisticPlugin implements Integration
{
  api: ESLintIntegrationStylisticPluginAPI;

  name = INTEGRATION_NAME_ESLINT_STYLISTIC;

  constructor()
  {
    this.api = new ESLintIntegrationStylisticPluginAPI(this);
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
      eslintIntegration.options.stylistic,
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
      INTEGRATION_NAME_ESLINT_STYLISTIC,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationStylisticPlugin(): ESLintIntegrationStylisticPlugin
{
  return new ESLintIntegrationStylisticPlugin();
}
