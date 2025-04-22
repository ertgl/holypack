import {
  BaseIntegration,
  type Config,
  type Context,
  requireIntegration,
  type ResolvedContext,
} from "@holypack/core";

import { type ESLintIntegration } from "../../../integration";
import { INTEGRATION_NAME_ESLINT } from "../../../integration/integration-name";

import { ESLintIntegrationESLintJSONPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_JSON = `${INTEGRATION_NAME_ESLINT}/ESLint/JSON`;

export class ESLintIntegrationESLintJSONPlugin extends BaseIntegration
{
  api: ESLintIntegrationESLintJSONPluginAPI;

  name = INTEGRATION_NAME_ESLINT_JSON;

  constructor()
  {
    super();
    this.api = new ESLintIntegrationESLintJSONPluginAPI(this);
  }

  async onESLintConfigGeneration(
    eslintIntegration: ESLintIntegration,
    resolvedContext: ResolvedContext,
  ): Promise<void>
  {
    await this.api.addESLintConfig(
      resolvedContext,
      eslintIntegration.options.json,
    );
  }

  setup(
    context: Context,
    config: Config,
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
