import {
  BaseIntegration,
  type Config,
  type Context,
  requireIntegration,
  type ResolvedContext,
} from "@holypack/core";

import { type ESLintIntegration } from "../../integration";
import { INTEGRATION_NAME_ESLINT } from "../../integration/integration-name";

import { ESLintIntegrationNPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_N = `${INTEGRATION_NAME_ESLINT}/n`;

export class ESLintIntegrationNPlugin extends BaseIntegration
{
  api: ESLintIntegrationNPluginAPI;

  name = INTEGRATION_NAME_ESLINT_N;

  constructor()
  {
    super();
    this.api = new ESLintIntegrationNPluginAPI(this);
  }

  async onESLintConfigGeneration(
    eslintIntegration: ESLintIntegration,
    resolvedContext: ResolvedContext,
  ): Promise<void>
  {
    await this.api.addESLintConfig(
      resolvedContext,
      eslintIntegration.options.n,
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
      INTEGRATION_NAME_ESLINT_N,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationNPlugin(): ESLintIntegrationNPlugin
{
  return new ESLintIntegrationNPlugin();
}
