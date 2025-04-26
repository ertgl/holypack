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
    configs: Linter.Config[],
  ): Promise<void>
  {
    await this.api.addESLintConfig(
      resolvedContext,
      configs,
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
