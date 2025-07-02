import type { Config } from "jest";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { useExtensionHookAsync } from "@holypack/core/extension/hook/interop/useExtensionHookAsync";
import { useExtensionHookSync } from "@holypack/core/extension/hook/interop/useExtensionHookSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import { generateConfig } from "../../configurator/generateConfig";
import { resolveJestContextAsync } from "../../context/resolver/resolveJestContextAsync";
import { resolveJestContextSync } from "../../context/resolver/resolveJestContextSync";
import type { GenerateConfigHookAsync } from "../../hooks/generate-config/GenerateConfigHookAsync";
import type { GenerateConfigHookSync } from "../../hooks/generate-config/GenerateConfigHookSync";
import { JEST_INTEGRATION_HOOK_UID_GENERATE_CONFIG_ASYNC } from "../../hooks/generate-config/JEST_INTEGRATION_HOOK_UID_GENERATE_CONFIG_ASYNC";
import { JEST_INTEGRATION_HOOK_UID_GENERATE_CONFIG_SYNC } from "../../hooks/generate-config/JEST_INTEGRATION_HOOK_UID_GENERATE_CONFIG_SYNC";
import { resolveJestIntegrationOptions } from "../../options/resolveJestIntegrationOptions";
import { INTEGRATION_UID_JEST } from "../INTEGRATION_UID_JEST";
import type { JestIntegration } from "../JestIntegration";

export class JestConfiguratorFacet
{
  async generateConfig(
    context: ContextAsync,
  ): Promise<Config>
  {
    const jestIntegration = requireExtension<JestIntegration>(
      context,
      INTEGRATION_UID_JEST,
    );

    const options = resolveJestIntegrationOptions(jestIntegration.options);

    const jestContext = await resolveJestContextAsync(
      context,
      options,
    );

    const config = generateConfig(
      jestContext,
      options,
    );

    await useExtensionHookAsync(
      jestIntegration,
      JEST_INTEGRATION_HOOK_UID_GENERATE_CONFIG_ASYNC,
      async (
        generateConfigHook: GenerateConfigHookAsync,
      ) =>
      {
        await generateConfigHook.promise(
          jestContext,
          options,
          config,
        );
      },
    );

    return config;
  }

  generateConfigSync(
    context: ContextSync,
  ): Config
  {
    const jestIntegration = requireExtension<JestIntegration>(
      context,
      INTEGRATION_UID_JEST,
    );

    const options = resolveJestIntegrationOptions(jestIntegration.options);

    const jestContext = resolveJestContextSync(
      context,
      options,
    );

    const config = generateConfig(
      jestContext,
      options,
    );

    useExtensionHookSync(
      jestIntegration,
      JEST_INTEGRATION_HOOK_UID_GENERATE_CONFIG_SYNC,
      (
        generateConfigHook: GenerateConfigHookSync,
      ) =>
      {
        generateConfigHook.call(
          jestContext,
          options,
          config,
        );
      },
    );

    return config;
  }
}
