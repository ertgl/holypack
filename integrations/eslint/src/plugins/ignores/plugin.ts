import type { Linter } from "eslint";

import {
  Integration,
  requireIntegration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import { type ESLintIntegration } from "../../integration";
import { INTEGRATION_NAME_ESLINT } from "../../integration/integration-name";

import { ESLintIntegrationIgnoresPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_IGNORES = `${INTEGRATION_NAME_ESLINT}/ignores`;

export class ESLintIntegrationIgnoresPlugin implements Integration
{
  api: ESLintIntegrationIgnoresPluginAPI;

  name = INTEGRATION_NAME_ESLINT_IGNORES;

  constructor()
  {
    this.api = new ESLintIntegrationIgnoresPluginAPI(this);
  }

  onESLintConfigGeneration(
    eslintIntegration: ESLintIntegration,
    context: StrictContext,
    configs: Linter.Config[],
  ): void
  {
    this.api.contributeToESLintConfigs(
      context,
      configs,
      eslintIntegration.options.ignores,
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

    eslintIntegration.hooks.configGeneration.tap(
      INTEGRATION_NAME_ESLINT_IGNORES,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationIgnoresPlugin(): ESLintIntegrationIgnoresPlugin
{
  return new ESLintIntegrationIgnoresPlugin();
}
