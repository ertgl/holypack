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

import { ESLintIntegrationCSpellPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_ESLINT_CSPELL = `${INTEGRATION_NAME_ESLINT}/CSpell`;

export class ESLintIntegrationCSpellPlugin implements Integration
{
  api: ESLintIntegrationCSpellPluginAPI;

  name = INTEGRATION_NAME_ESLINT_CSPELL;

  constructor()
  {
    this.api = new ESLintIntegrationCSpellPluginAPI(this);
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
      eslintIntegration.options.cspell,
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
