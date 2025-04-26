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

import { ESLintIntegrationIgnoresPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_IGNORES = `${INTEGRATION_NAME_ESLINT}/ignores`;

export class ESLintIntegrationIgnoresPlugin extends BaseIntegration
{
  api: ESLintIntegrationIgnoresPluginAPI;

  name = INTEGRATION_NAME_ESLINT_IGNORES;

  constructor()
  {
    super();
    this.api = new ESLintIntegrationIgnoresPluginAPI(this);
  }

  onESLintConfigGeneration(
    eslintIntegration: ESLintIntegration,
    resolvedContext: ResolvedContext,
    configs: Linter.Config[],
  ): void
  {
    this.api.addESLintConfig(
      resolvedContext,
      configs,
      eslintIntegration.options.globals,
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

    eslintIntegration.hooks.configGeneration.tap(
      INTEGRATION_NAME_ESLINT_IGNORES,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationIgnoresPlugin(): ESLintIntegrationIgnoresPlugin
{
  return new ESLintIntegrationIgnoresPlugin();
}
