import type { Linter } from "eslint";

import {
  BaseIntegration,
  type Config,
  type Context,
  requireIntegration,
  type ResolvedContext,
} from "@holypack/core";

import { type ESLintIntegration } from "../../integration";
import { INTEGRATION_NAME_ESLINT } from "../../integration/integration-name";

import { ESLintIntegrationStylisticPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_STYLISTIC = `${INTEGRATION_NAME_ESLINT}/Stylistic`;

export class ESLintIntegrationStylisticPlugin extends BaseIntegration
{
  api: ESLintIntegrationStylisticPluginAPI;

  name = INTEGRATION_NAME_ESLINT_STYLISTIC;

  constructor()
  {
    super();
    this.api = new ESLintIntegrationStylisticPluginAPI(this);
  }

  async onESLintConfigGeneration(
    eslintIntegration: ESLintIntegration,
    resolvedContext: ResolvedContext,
    configs: Linter.Config[],
  ): Promise<void>
  {
    await this.api.addESLintConfig(
      resolvedContext,
      configs,
      eslintIntegration.options.stylistic,
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
      INTEGRATION_NAME_ESLINT_STYLISTIC,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationStylisticPlugin(): ESLintIntegrationStylisticPlugin
{
  return new ESLintIntegrationStylisticPlugin();
}
