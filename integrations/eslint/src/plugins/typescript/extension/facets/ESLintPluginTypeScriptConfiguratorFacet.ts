import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import type { ESLintContext } from "../../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../../options/ESLintIntegrationResolvedOptions";
import { configureESLintPluginTypeScriptAsync } from "../../configurator/configureESLintPluginTypeScriptAsync";
import { configureESLintPluginTypeScriptSync } from "../../configurator/configureESLintPluginTypeScriptSync";
import { resolveESLintIntegrationPluginTypeScriptOptions } from "../../options/resolveESLintIntegrationPluginTypeScriptOptions";
import type { ESLintIntegrationPluginTypeScript } from "../ESLintIntegrationPluginTypeScript";
import { INTEGRATION_UID_ESLINT_PLUGIN_TYPESCRIPT } from "../INTEGRATION_UID_ESLINT_PLUGIN_TYPESCRIPT";

export class ESLintPluginTypeScriptConfiguratorFacet
{
  async configure(
    context: ContextAsync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): Promise<void>
  {
    const eslintIntegrationPluginTypeScript = requireExtension<ESLintIntegrationPluginTypeScript>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_TYPESCRIPT,
    );

    const pluginTypeScriptOptions = resolveESLintIntegrationPluginTypeScriptOptions(
      eslintIntegrationPluginTypeScript.options,
    );

    await configureESLintPluginTypeScriptAsync(
      eslintContext,
      eslintIntegrationOptions,
      pluginTypeScriptOptions,
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
    const eslintIntegrationPluginTypeScript = requireExtension<ESLintIntegrationPluginTypeScript>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_TYPESCRIPT,
    );

    const pluginTypeScriptOptions = resolveESLintIntegrationPluginTypeScriptOptions(
      eslintIntegrationPluginTypeScript.options,
    );

    configureESLintPluginTypeScriptSync(
      eslintContext,
      eslintIntegrationOptions,
      pluginTypeScriptOptions,
      linterConfigArray,
    );
  }
}
