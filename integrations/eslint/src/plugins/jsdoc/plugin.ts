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

import { ESLintIntegrationJSDocPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_JSDOC = `${INTEGRATION_NAME_ESLINT}/JSDoc`;

export class ESLintIntegrationJSDocPlugin extends BaseIntegration
{
  api: ESLintIntegrationJSDocPluginAPI;

  name = INTEGRATION_NAME_ESLINT_JSDOC;

  constructor()
  {
    super();
    this.api = new ESLintIntegrationJSDocPluginAPI(this);
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
      eslintIntegration.options.jsdoc,
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
      INTEGRATION_NAME_ESLINT_JSDOC,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationJSDocPlugin(): ESLintIntegrationJSDocPlugin
{
  return new ESLintIntegrationJSDocPlugin();
}
