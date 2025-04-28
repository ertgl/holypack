import type { Linter } from "eslint";

import {
  BaseIntegration,
  requireIntegration,
  type TypeSafeConfig,
  type TypeSafeContext,
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
    context: TypeSafeContext,
    configs: Linter.Config[],
  ): Promise<void>
  {
    await this.api.addESLintConfig(
      context,
      configs,
      eslintIntegration.options.yml,
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
