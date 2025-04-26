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

import { ESLintIntegrationImportXPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_IMPORT_X = `${INTEGRATION_NAME_ESLINT}/import-x`;

export class ESLintIntegrationImportXPlugin extends BaseIntegration
{
  api: ESLintIntegrationImportXPluginAPI;

  name = INTEGRATION_NAME_ESLINT_IMPORT_X;

  constructor()
  {
    super();
    this.api = new ESLintIntegrationImportXPluginAPI(this);
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
      eslintIntegration.options.importX,
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
