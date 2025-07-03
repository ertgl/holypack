import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import type { ESLintContext } from "../../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../../options/ESLintIntegrationResolvedOptions";
import { configureESLintPluginCSpellAsync } from "../../configurator/configureESLintPluginCSpellAsync";
import { configureESLintPluginCSpellSync } from "../../configurator/configureESLintPluginCSpellSync";
import { resolveESLintIntegrationPluginCSpellOptions } from "../../options/resolveESLintIntegrationPluginCSpellOptions";
import type { ESLintIntegrationPluginCSpell } from "../ESLintIntegrationPluginCSpell";
import { INTEGRATION_UID_ESLINT_PLUGIN_CSPELL } from "../INTEGRATION_UID_ESLINT_PLUGIN_CSPELL";

export class ESLintPluginCSpellConfiguratorFacet
{
  async configure(
    context: ContextAsync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): Promise<void>
  {
    const eslintIntegrationPlugin = requireExtension<ESLintIntegrationPluginCSpell>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_CSPELL,
    );

    const eslintIntegrationPluginOptions = resolveESLintIntegrationPluginCSpellOptions(
      eslintIntegrationPlugin.options,
    );

    await configureESLintPluginCSpellAsync(
      eslintContext,
      eslintIntegrationOptions,
      eslintIntegrationPluginOptions,
      linterConfigArray,
    );
  }

  configureSync(
    context: ContextSync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): void
  {
    const eslintIntegrationPlugin = requireExtension<ESLintIntegrationPluginCSpell>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_CSPELL,
    );

    const eslintIntegrationPluginOptions = resolveESLintIntegrationPluginCSpellOptions(
      eslintIntegrationPlugin.options,
    );

    configureESLintPluginCSpellSync(
      eslintContext,
      eslintIntegrationOptions,
      eslintIntegrationPluginOptions,
      linterConfigArray,
    );
  }
}
