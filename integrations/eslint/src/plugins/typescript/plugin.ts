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

import { ESLintIntegrationTypeScriptPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_TYPESCRIPT = `${INTEGRATION_NAME_ESLINT}/typescript`;

export class ESLintIntegrationTypeScriptPlugin extends BaseIntegration
{
  api: ESLintIntegrationTypeScriptPluginAPI;

  name = INTEGRATION_NAME_ESLINT_TYPESCRIPT;

  constructor()
  {
    super();
    this.api = new ESLintIntegrationTypeScriptPluginAPI(this);
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
      eslintIntegration.options.typescript,
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
