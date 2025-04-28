import type { Linter } from "eslint";

import {
  Integration,
  requireIntegration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import { HOOK_NAME_ESLINT_GENERATE_CONFIGS } from "../../hooks";
import { type ESLintIntegration } from "../../integration";
import { INTEGRATION_NAME_ESLINT } from "../../integration/integration-name";

import { ESLintIntegrationTypeScriptPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_TYPESCRIPT = `${INTEGRATION_NAME_ESLINT}/typescript`;

export class ESLintIntegrationTypeScriptPlugin implements Integration
{
  api: ESLintIntegrationTypeScriptPluginAPI;

  name = INTEGRATION_NAME_ESLINT_TYPESCRIPT;

  constructor()
  {
    this.api = new ESLintIntegrationTypeScriptPluginAPI(this);
  }

  async onESLintConfigGeneration(
    eslintIntegration: ESLintIntegration,
    context: StrictContext,
    configs: Linter.Config[],
  ): Promise<void>
  {
    await this.api.contributeToESLintConfigs(
      context,
      configs,
      eslintIntegration.options.typescript,
    );
  }

  setup(
    context: StrictContext,
    config: StrictConfig,
  ): void
  {
    const eslintIntegration = requireIntegration<
      ESLintIntegration
    >(
      context,
      INTEGRATION_NAME_ESLINT,
    );

    eslintIntegration.hooks[HOOK_NAME_ESLINT_GENERATE_CONFIGS].tapPromise(
      INTEGRATION_NAME_ESLINT_TYPESCRIPT,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationTypeScriptPlugin(): ESLintIntegrationTypeScriptPlugin
{
  return new ESLintIntegrationTypeScriptPlugin();
}
