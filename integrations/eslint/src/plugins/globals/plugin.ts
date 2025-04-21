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

import { ESLintIntegrationGlobalsPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_GLOBALS = `${INTEGRATION_NAME_ESLINT}/globals`;

export class ESLintIntegrationGlobalsPlugin extends BaseIntegration
{
  api: ESLintIntegrationGlobalsPluginAPI;

  name = INTEGRATION_NAME_ESLINT_GLOBALS;

  constructor()
  {
    super();
    this.api = new ESLintIntegrationGlobalsPluginAPI(this);
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
