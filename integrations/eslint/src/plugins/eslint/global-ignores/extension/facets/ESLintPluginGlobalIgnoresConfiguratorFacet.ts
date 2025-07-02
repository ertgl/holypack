import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import type { ESLintContext } from "../../../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../../../options/ESLintIntegrationResolvedOptions";
import { configureESLintPluginGlobalIgnoresAsync } from "../../configurator/configureESLintPluginGlobalIgnoresAsync";
import { configureESLintPluginGlobalIgnoresSync } from "../../configurator/configureESLintPluginGlobalIgnoresSync";
import { resolveESLintIntegrationPluginGlobalIgnoresOptions } from "../../options/resolveESLintIntegrationPluginGlobalIgnoresOptions";
import type { ESLintIntegrationPluginGlobalIgnores } from "../ESLintIntegrationPluginGlobalIgnores";
import { INTEGRATION_UID_ESLINT_PLUGIN_GLOBAL_IGNORES } from "../INTEGRATION_UID_ESLINT_PLUGIN_GLOBAL_IGNORES";

export class ESLintPluginGlobalIgnoresConfiguratorFacet
{
  async configure(
    context: ContextAsync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): Promise<void>
  {
    const eslintIntegrationPluginGlobalIgnores = requireExtension<ESLintIntegrationPluginGlobalIgnores>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_GLOBAL_IGNORES,
    );

    const pluginGlobalIgnoresOptions = resolveESLintIntegrationPluginGlobalIgnoresOptions(
      eslintIntegrationPluginGlobalIgnores.options,
    );

    await configureESLintPluginGlobalIgnoresAsync(
      eslintContext,
      eslintIntegrationOptions,
      pluginGlobalIgnoresOptions,
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
    const eslintIntegrationPluginGlobalIgnores = requireExtension<ESLintIntegrationPluginGlobalIgnores>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_GLOBAL_IGNORES,
    );

    const pluginGlobalIgnoresOptions = resolveESLintIntegrationPluginGlobalIgnoresOptions(
      eslintIntegrationPluginGlobalIgnores.options,
    );

    configureESLintPluginGlobalIgnoresSync(
      eslintContext,
      eslintIntegrationOptions,
      pluginGlobalIgnoresOptions,
      linterConfigArray,
    );
  }
}
