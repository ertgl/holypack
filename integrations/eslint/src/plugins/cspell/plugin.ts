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

import { ESLintIntegrationCSpellPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_CSPELL = `${INTEGRATION_NAME_ESLINT}/CSpell`;

export class ESLintIntegrationCSpellPlugin extends BaseIntegration
{
  api: ESLintIntegrationCSpellPluginAPI;

  name = INTEGRATION_NAME_ESLINT_CSPELL;

  constructor()
  {
    super();
    this.api = new ESLintIntegrationCSpellPluginAPI(this);
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
      eslintIntegration.options.cspell,
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
      INTEGRATION_NAME_ESLINT_CSPELL,
      this.onESLintConfigGeneration.bind(
        this,
        eslintIntegration,
      ),
    );
  }
}

export function createESLintIntegrationCSpellPlugin(): ESLintIntegrationCSpellPlugin
{
  return new ESLintIntegrationCSpellPlugin();
}
