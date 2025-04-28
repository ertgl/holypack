import type { Linter } from "eslint";

import {
  Integration,
  requireIntegration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import { type ESLintIntegration } from "../../integration";
import { INTEGRATION_NAME_ESLINT } from "../../integration/integration-name";

import { ESLintIntegrationYMLPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_YML = `${INTEGRATION_NAME_ESLINT}/YML`;

export class ESLintIntegrationYMLPlugin implements Integration
{
  api: ESLintIntegrationYMLPluginAPI;

  name = INTEGRATION_NAME_ESLINT_YML;

  constructor()
  {
    this.api = new ESLintIntegrationYMLPluginAPI(this);
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
      eslintIntegration.options.yml,
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
      INTEGRATION_NAME_ESLINT_YML,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationYMLPlugin(): ESLintIntegrationYMLPlugin
{
  return new ESLintIntegrationYMLPlugin();
}
