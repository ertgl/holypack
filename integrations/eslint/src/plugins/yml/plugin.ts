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

import { ESLintIntegrationYMLPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_YML = `${INTEGRATION_NAME_ESLINT}/YML`;

export class ESLintIntegrationYMLPlugin extends BaseIntegration
{
  api: ESLintIntegrationYMLPluginAPI;

  name = INTEGRATION_NAME_ESLINT_YML;

  constructor()
  {
    super();
    this.api = new ESLintIntegrationYMLPluginAPI(this);
  }

  async onESLintConfigGeneration(
    eslintIntegration: ESLintIntegration,
    resolvedContext: ResolvedContext,
  ): Promise<void>
  {
    await this.api.addESLintConfig(
      resolvedContext,
      eslintIntegration.options.yml,
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
