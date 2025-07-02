import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import type { ESLintContext } from "../../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../../options/ESLintIntegrationResolvedOptions";
import { configureESLintPluginPerfectionistAsync } from "../../configurator/configureESLintPluginPerfectionistAsync";
import { configureESLintPluginPerfectionistSync } from "../../configurator/configureESLintPluginPerfectionistSync";
import { resolveESLintIntegrationPluginPerfectionistOptions } from "../../options/resolveESLintIntegrationPluginPerfectionistOptions";
import type { ESLintIntegrationPluginPerfectionist } from "../ESLintIntegrationPluginPerfectionist";
import { INTEGRATION_UID_ESLINT_PLUGIN_PERFECTIONIST } from "../INTEGRATION_UID_ESLINT_PLUGIN_PERFECTIONIST";

export class ESLintPluginPerfectionistConfiguratorFacet
{
  async configure(
    context: ContextAsync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): Promise<void>
  {
    const eslintIntegrationPlugin = requireExtension<ESLintIntegrationPluginPerfectionist>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_PERFECTIONIST,
    );

    const eslintIntegrationPluginOptions = resolveESLintIntegrationPluginPerfectionistOptions(
      eslintIntegrationPlugin.options,
    );

    await configureESLintPluginPerfectionistAsync(
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
    const eslintIntegrationPlugin = requireExtension<ESLintIntegrationPluginPerfectionist>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_PERFECTIONIST,
    );

    const eslintIntegrationPluginOptions = resolveESLintIntegrationPluginPerfectionistOptions(
      eslintIntegrationPlugin.options,
    );

    configureESLintPluginPerfectionistSync(
      eslintContext,
      eslintIntegrationOptions,
      eslintIntegrationPluginOptions,
      linterConfigArray,
    );
  }
}
