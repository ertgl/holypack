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

import { ESLintIntegrationPerfectionistPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_PERFECTIONIST = `${INTEGRATION_NAME_ESLINT}/Perfectionist`;

export class ESLintIntegrationPerfectionistPlugin extends BaseIntegration
{
  api: ESLintIntegrationPerfectionistPluginAPI;

  name = INTEGRATION_NAME_ESLINT_PERFECTIONIST;

  constructor()
  {
    super();
    this.api = new ESLintIntegrationPerfectionistPluginAPI(this);
  }

  async onESLintConfigGeneration(
    eslintIntegration: ESLintIntegration,
    resolvedContext: ResolvedContext,
  ): Promise<void>
  {
    await this.api.addESLintConfig(
      resolvedContext,
      eslintIntegration.options.perfectionist,
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
      INTEGRATION_NAME_ESLINT_PERFECTIONIST,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationPerfectionistPlugin(): ESLintIntegrationPerfectionistPlugin
{
  return new ESLintIntegrationPerfectionistPlugin();
}
