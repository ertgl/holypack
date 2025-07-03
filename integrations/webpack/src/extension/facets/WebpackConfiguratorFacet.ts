import type { Configuration } from "webpack";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { useExtensionHookAsync } from "@holypack/core/extension/hook/interop/useExtensionHookAsync";
import { useExtensionHookSync } from "@holypack/core/extension/hook/interop/useExtensionHookSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import { generateConfiguration } from "../../configurator/generateConfiguration";
import { resolveWebpackConfigurationOptions } from "../../configurator/options/resolveWebpackConfigurationOptions";
import type { WebpackConfigurationOptions } from "../../configurator/options/WebpackConfigurationOptions";
import { resolveWebpackContextAsync } from "../../context/resolver/resolveWebpackContextAsync";
import { resolveWebpackContextSync } from "../../context/resolver/resolveWebpackContextSync";
import type { GenerateConfigurationHookAsync } from "../../hooks/generate-configuration/GenerateConfigurationHookAsync";
import type { GenerateConfigurationHookSync } from "../../hooks/generate-configuration/GenerateConfigurationHookSync";
import { WEBPACK_INTEGRATION_HOOK_UID_GENERATE_CONFIGURATION_ASYNC } from "../../hooks/generate-configuration/WEBPACK_INTEGRATION_HOOK_UID_GENERATE_CONFIGURATION_ASYNC";
import { WEBPACK_INTEGRATION_HOOK_UID_GENERATE_CONFIGURATION_SYNC } from "../../hooks/generate-configuration/WEBPACK_INTEGRATION_HOOK_UID_GENERATE_CONFIGURATION_SYNC";
import { resolveWebpackIntegrationOptions } from "../../options/resolveWebpackIntegrationOptions";
import { INTEGRATION_UID_WEBPACK } from "../INTEGRATION_UID_WEBPACK";
import type { WebpackIntegration } from "../WebpackIntegration";

export class WebpackConfiguratorFacet
{
  async generateConfiguration(
    context: ContextAsync,
    options?: null | WebpackConfigurationOptions,
  ): Promise<Configuration>
  {
    options ??= {};

    const resolvedOptions = resolveWebpackConfigurationOptions(options);

    const webpackIntegration = requireExtension<WebpackIntegration>(
      context,
      INTEGRATION_UID_WEBPACK,
    );

    const integrationOptions = resolveWebpackIntegrationOptions(webpackIntegration.options);

    const webpackContext = await resolveWebpackContextAsync(
      context,
      integrationOptions,
    );

    const config = generateConfiguration(
      webpackContext,
      integrationOptions,
      resolvedOptions,
    );

    await useExtensionHookAsync(
      webpackIntegration,
      WEBPACK_INTEGRATION_HOOK_UID_GENERATE_CONFIGURATION_ASYNC,
      async (
        generateConfigurationHook: GenerateConfigurationHookAsync,
      ) =>
      {
        await generateConfigurationHook.promise(
          webpackContext,
          integrationOptions,
          config,
          resolvedOptions,
        );
      },
    );

    return config;
  }

  generateConfigurationSync(
    context: ContextSync,
    options?: null | WebpackConfigurationOptions,
  ): Configuration
  {
    options ??= {};

    const resolvedOptions = resolveWebpackConfigurationOptions(options);

    const webpackIntegration = requireExtension<WebpackIntegration>(
      context,
      INTEGRATION_UID_WEBPACK,
    );

    const integrationOptions = resolveWebpackIntegrationOptions(webpackIntegration.options);

    const webpackContext = resolveWebpackContextSync(
      context,
      integrationOptions,
    );

    const config = generateConfiguration(
      webpackContext,
      integrationOptions,
      resolvedOptions,
    );

    useExtensionHookSync(
      webpackIntegration,
      WEBPACK_INTEGRATION_HOOK_UID_GENERATE_CONFIGURATION_SYNC,
      (
        generateConfigurationHook: GenerateConfigurationHookSync,
      ) =>
      {
        generateConfigurationHook.call(
          webpackContext,
          integrationOptions,
          config,
          resolvedOptions,
        );
      },
    );

    return config;
  }
}
