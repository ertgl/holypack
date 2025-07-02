import type { Linter } from "eslint";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import type { ESLintContext } from "../../../../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../../../../options/ESLintIntegrationResolvedOptions";
import { configureESLintPluginJSAsync } from "../../configurator/configureESLintPluginJSAsync";
import { configureESLintPluginJSSync } from "../../configurator/configureESLintPluginJSSync";
import { resolveESLintIntegrationPluginJSOptions } from "../../options/resolveESLintIntegrationPluginJSOptions";
import type { ESLintIntegrationPluginJS } from "../ESLintIntegrationPluginJS";
import { INTEGRATION_UID_ESLINT_PLUGIN_JS } from "../INTEGRATION_UID_ESLINT_PLUGIN_JS";

export class ESLintPluginJSConfiguratorFacet
{
  async configure(
    context: ContextAsync,
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ): Promise<void>
  {
    const eslintIntegrationPluginJS = requireExtension<ESLintIntegrationPluginJS>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_JS,
    );

    const pluginJSOptions = resolveESLintIntegrationPluginJSOptions(
      eslintIntegrationPluginJS.options,
    );

    await configureESLintPluginJSAsync(
      eslintContext,
      eslintIntegrationOptions,
      pluginJSOptions,
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
    const eslintIntegrationPluginJS = requireExtension<ESLintIntegrationPluginJS>(
      context,
      INTEGRATION_UID_ESLINT_PLUGIN_JS,
    );

    const pluginJSOptions = resolveESLintIntegrationPluginJSOptions(
      eslintIntegrationPluginJS.options,
    );

    configureESLintPluginJSSync(
      eslintContext,
      eslintIntegrationOptions,
      pluginJSOptions,
      linterConfigArray,
    );
  }
}
