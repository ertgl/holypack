import {
  BaseIntegration,
  type Config,
  type Context,
  requireIntegration,
  type ResolvedContext,
} from "@holypack/core";

import {
  type ESLintIntegration,
  INTEGRATION_NAME_ESLINT,
} from "../../integration";

import { ESLintIntegrationJSONPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_JSON = `${INTEGRATION_NAME_ESLINT}/JSON`;

export class ESLintIntegrationJSONPlugin extends BaseIntegration
{
  api: ESLintIntegrationJSONPluginAPI;

  name = INTEGRATION_NAME_ESLINT_JSON;

  constructor()
  {
    super();
    this.api = new ESLintIntegrationJSONPluginAPI(this);
  }

  async onESLintConfigGeneration(
    eslintIntegration: ESLintIntegration,
    resolvedContext: ResolvedContext,
  ): Promise<void>
  {
    await this.api.addESLintConfig(
      resolvedContext,
      eslintIntegration,
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

export function createESLintIntegrationJSONPlugin(): ESLintIntegrationJSONPlugin
{
  return new ESLintIntegrationJSONPlugin();
}
