import type { Linter } from "eslint";

import {
  Integration,
  requireIntegration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import { type ESLintIntegration } from "../../integration";
import { INTEGRATION_NAME_ESLINT } from "../../integration/integration-name";

import { ESLintIntegrationJSDocPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_JSDOC = `${INTEGRATION_NAME_ESLINT}/JSDoc`;

export class ESLintIntegrationJSDocPlugin implements Integration
{
  api: ESLintIntegrationJSDocPluginAPI;

  name = INTEGRATION_NAME_ESLINT_JSDOC;

  constructor()
  {
    this.api = new ESLintIntegrationJSDocPluginAPI(this);
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
      eslintIntegration.options.jsdoc,
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
      INTEGRATION_NAME_ESLINT_JSDOC,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationJSDocPlugin(): ESLintIntegrationJSDocPlugin
{
  return new ESLintIntegrationJSDocPlugin();
}
