import type { Linter } from "eslint";

import {
  BaseIntegration,
  requireIntegration,
  type TypeSafeConfig,
  type TypeSafeContext,
} from "@holypack/core";

import { type ESLintIntegration } from "../../integration";
import { INTEGRATION_NAME_ESLINT } from "../../integration/integration-name";

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
    context: TypeSafeContext,
    configs: Linter.Config[],
  ): Promise<void>
  {
    await this.api.addESLintConfig(
      context,
      configs,
      eslintIntegration.options.perfectionist,
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
