import type { Linter } from "eslint";

import {
  BaseIntegration,
  requireIntegration,
  type TypeSafeConfig,
  type TypeSafeContext,
} from "@holypack/core";

import { type ESLintIntegration } from "../../../integration";
import { INTEGRATION_NAME_ESLINT } from "../../../integration/integration-name";

import { ESLintIntegrationESLintJSPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_ESLINT_JS = `${INTEGRATION_NAME_ESLINT}/ESLint/JS`;

export class ESLintIntegrationESLintJSPlugin extends BaseIntegration
{
  api: ESLintIntegrationESLintJSPluginAPI;

  name = INTEGRATION_NAME_ESLINT_ESLINT_JS;

  constructor()
  {
    super();
    this.api = new ESLintIntegrationESLintJSPluginAPI(this);
  }

  async onESLintConfigGeneration(
    eslintIntegration: ESLintIntegration,
    context: TypeSafeContext,
    configs: Linter.Config[],
  ): Promise<void>
  {
    await this.api.addESLintConfig(
      context,
      configs,
      eslintIntegration.options.js,
    );
  }

  setup(
    context: TypeSafeContext,
    config: TypeSafeConfig,
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
