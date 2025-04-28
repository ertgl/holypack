import type { Linter } from "eslint";

import {
  Integration,
  requireIntegration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import { type ESLintIntegration } from "../../../integration";
import { INTEGRATION_NAME_ESLINT } from "../../../integration/integration-name";

import { ESLintIntegrationESLintJSPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_ESLINT_JS = `${INTEGRATION_NAME_ESLINT}/ESLint/JS`;

export class ESLintIntegrationESLintJSPlugin implements Integration
{
  api: ESLintIntegrationESLintJSPluginAPI;

  name = INTEGRATION_NAME_ESLINT_ESLINT_JS;

  constructor()
  {
    this.api = new ESLintIntegrationESLintJSPluginAPI(this);
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
      eslintIntegration.options.js,
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
      INTEGRATION_NAME_ESLINT_ESLINT_JS,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationESLintJSPlugin(): ESLintIntegrationESLintJSPlugin
{
  return new ESLintIntegrationESLintJSPlugin();
}
