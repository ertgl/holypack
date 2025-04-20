import {
  BaseIntegration,
  type Config,
  type Context,
  requireIntegration,
  type ResolvedContext,
} from "@holypack/core";

import {
  type ESLintIntegration,
  INTEGRATION_NAME_ESLINT,
} from "../../integration";

import { ESLintIntegrationCSpellPluginAPI } from "./plugin-api";

export const INTEGRATION_PLUGIN_NAME_ESLINT_CSPELL = `${INTEGRATION_NAME_ESLINT}/CSpell`;

export class ESLintIntegrationCSpellPlugin extends BaseIntegration
{
  api: ESLintIntegrationCSpellPluginAPI;

  name = INTEGRATION_PLUGIN_NAME_ESLINT_CSPELL;

  constructor()
  {
    super();
    this.api = new ESLintIntegrationCSpellPluginAPI(this);
  }

  async onESLintConfigGeneration(
    eslintIntegration: ESLintIntegration,
    resolvedContext: ResolvedContext,
  ): Promise<void>
  {
    await this.api.addESLintConfig(
      resolvedContext,
      eslintIntegration,
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
      INTEGRATION_PLUGIN_NAME_ESLINT_CSPELL,
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
