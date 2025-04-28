import type { Linter } from "eslint";

import {
  Integration,
  requireIntegration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import { type ESLintIntegration } from "../../../integration";
import { INTEGRATION_NAME_ESLINT } from "../../../integration/integration-name";

import { ESLintIntegrationESLintJSONPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_JSON = `${INTEGRATION_NAME_ESLINT}/ESLint/JSON`;

export class ESLintIntegrationESLintJSONPlugin implements Integration
{
  api: ESLintIntegrationESLintJSONPluginAPI;

  name = INTEGRATION_NAME_ESLINT_JSON;

  constructor()
  {
    this.api = new ESLintIntegrationESLintJSONPluginAPI(this);
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
      eslintIntegration.options.json,
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

    eslintIntegration.hooks.configGeneration.tapPromise(
      INTEGRATION_NAME_ESLINT_JSON,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationESLintJSONPlugin(): ESLintIntegrationESLintJSONPlugin
{
  return new ESLintIntegrationESLintJSONPlugin();
}
