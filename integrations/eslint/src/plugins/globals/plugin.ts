import type { Linter } from "eslint";

import {
  Integration,
  requireIntegration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import { type ESLintIntegration } from "../../integration";
import { INTEGRATION_NAME_ESLINT } from "../../integration/integration-name";

import { ESLintIntegrationGlobalsPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_GLOBALS = `${INTEGRATION_NAME_ESLINT}/globals`;

export class ESLintIntegrationGlobalsPlugin implements Integration
{
  api: ESLintIntegrationGlobalsPluginAPI;

  name = INTEGRATION_NAME_ESLINT_GLOBALS;

  constructor()
  {
    this.api = new ESLintIntegrationGlobalsPluginAPI(this);
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
      eslintIntegration.options.globals,
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
      INTEGRATION_NAME_ESLINT_GLOBALS,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationGlobalsPlugin(): ESLintIntegrationGlobalsPlugin
{
  return new ESLintIntegrationGlobalsPlugin();
}
