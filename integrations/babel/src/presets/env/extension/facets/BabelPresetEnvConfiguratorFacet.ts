import type { TransformOptions } from "@babel/core";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import type { BabelConfiguratorResolvedOptions } from "../../../../configurator/options/BabelConfiguratorResolvedOptions";
import type { BabelContext } from "../../../../context/BabelContext";
import { configureBabelPresetEnv } from "../../configurator/configureBabelPresetEnv";
import { resolveBabelIntegrationPresetEnvOptions } from "../../options/resolveBabelIntegrationPresetEnvOptions";
import type { BabelIntegrationPresetEnv } from "../BabelIntegrationPresetEnv";
import { INTEGRATION_UID_BABEL_PRESET_ENV } from "../INTEGRATION_UID_BABEL_PRESET_ENV";

export class BabelPresetEnvConfiguratorFacet
{
  // eslint-disable-next-line @typescript-eslint/require-await
  async configureBabelPresetEnv(
    context: ContextAsync,
    babelContext: BabelContext,
    options: BabelConfiguratorResolvedOptions,
    transformOptions: TransformOptions,
  ): Promise<void>
  {
    const babelIntegrationPresetEnv = requireExtension<BabelIntegrationPresetEnv>(
      context,
      INTEGRATION_UID_BABEL_PRESET_ENV,
    );

    const presetEnvOptions = resolveBabelIntegrationPresetEnvOptions(
      babelIntegrationPresetEnv.options,
    );

    configureBabelPresetEnv(
      babelContext,
      options,
      presetEnvOptions,
      transformOptions,
    );
  }

  configureBabelPresetEnvSync(
    context: ContextSync,
    babelContext: BabelContext,
    options: BabelConfiguratorResolvedOptions,
    transformOptions: TransformOptions,
  ): void
  {
    const babelIntegrationPresetEnv = requireExtension<BabelIntegrationPresetEnv>(
      context,
      INTEGRATION_UID_BABEL_PRESET_ENV,
    );

    const presetEnvOptions = resolveBabelIntegrationPresetEnvOptions(
      babelIntegrationPresetEnv.options,
    );

    configureBabelPresetEnv(
      babelContext,
      options,
      presetEnvOptions,
      transformOptions,
    );
  }
}
