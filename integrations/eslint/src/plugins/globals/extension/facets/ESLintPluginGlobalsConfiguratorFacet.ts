import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import type { ESLintContext } from "../../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../../options/ESLintIntegrationResolvedOptions";
import { configureESLintPluginGlobalsAsync } from "../../configurator/configureESLintPluginGlobalsAsync";
import { configureESLintPluginGlobalsSync } from "../../configurator/configureESLintPluginGlobalsSync";
import { resolveESLintIntegrationPluginGlobalsOptions } from "../../options/resolveESLintIntegrationPluginGlobalsOptions";
import type { ESLintIntegrationPluginGlobals } from "../ESLintIntegrationPluginGlobals";
import { INTEGRATION_UID_ESLINT_PLUGIN_GLOBALS } from "../INTEGRATION_UID_ESLINT_PLUGIN_GLOBALS";

export class ESLintPluginGlobalsConfiguratorFacet
{
  async configure(
    context: ContextAsync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): Promise<void>
  {
    const eslintIntegrationPlugin = requireExtension<ESLintIntegrationPluginGlobals>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_GLOBALS,
    );

    const eslintIntegrationPluginOptions = resolveESLintIntegrationPluginGlobalsOptions(
      eslintIntegrationPlugin.options,
    );

    await configureESLintPluginGlobalsAsync(
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
    const eslintIntegrationPlugin = requireExtension<ESLintIntegrationPluginGlobals>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_GLOBALS,
    );

    const eslintIntegrationPluginOptions = resolveESLintIntegrationPluginGlobalsOptions(
      eslintIntegrationPlugin.options,
    );

    configureESLintPluginGlobalsSync(
      eslintContext,
      eslintIntegrationOptions,
      eslintIntegrationPluginOptions,
      linterConfigArray,
    );
  }
}
