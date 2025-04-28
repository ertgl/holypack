import type { Linter } from "eslint";

import {
  Integration,
  requireIntegration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import { type ESLintIntegration } from "../../integration";
import { INTEGRATION_NAME_ESLINT } from "../../integration/integration-name";

import { ESLintIntegrationNPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_N = `${INTEGRATION_NAME_ESLINT}/n`;

export class ESLintIntegrationNPlugin implements Integration
{
  api: ESLintIntegrationNPluginAPI;

  name = INTEGRATION_NAME_ESLINT_N;

  constructor()
  {
    this.api = new ESLintIntegrationNPluginAPI(this);
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
      eslintIntegration.options.n,
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
      INTEGRATION_NAME_ESLINT_N,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationNPlugin(): ESLintIntegrationNPlugin
{
  return new ESLintIntegrationNPlugin();
}
