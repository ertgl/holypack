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

import { ESLintIntegrationImportXPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_IMPORT_X = `${INTEGRATION_NAME_ESLINT}/import-x`;

export class ESLintIntegrationImportXPlugin implements Integration
{
  api: ESLintIntegrationImportXPluginAPI;

  name = INTEGRATION_NAME_ESLINT_IMPORT_X;

  constructor()
  {
    this.api = new ESLintIntegrationImportXPluginAPI(this);
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
      eslintIntegration.options.importX,
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
      INTEGRATION_NAME_ESLINT_IMPORT_X,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationImportXPlugin(): ESLintIntegrationImportXPlugin
{
  return new ESLintIntegrationImportXPlugin();
}
