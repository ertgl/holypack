import type { TransformOptions } from "@babel/core";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import type { BabelContext } from "../../../../context/BabelContext";
import type { BabelIntegrationResolvedOptions } from "../../../../options/BabelIntegrationResolvedOptions";
import { configureBabelPresetTypeScript } from "../../configurator/configureBabelPresetTypeScript";
import { resolveBabelIntegrationPresetTypeScriptOptions } from "../../options/resolveBabelIntegrationPresetTypeScriptOptions";
import type { BabelIntegrationPresetTypeScript } from "../BabelIntegrationPresetTypeScript";
import { INTEGRATION_UID_BABEL_PRESET_TYPESCRIPT } from "../INTEGRATION_UID_BABEL_PRESET_TYPESCRIPT";

export class BabelPresetTypeScriptConfiguratorFacet
{
  // eslint-disable-next-line @typescript-eslint/require-await
  async configureBabelPresetTypeScript(
    context: ContextAsync,
    babelContext: BabelContext,
    options: BabelIntegrationResolvedOptions,
    transformOptions: TransformOptions,
  ): Promise<void>
  {
    const babelIntegrationPresetTypeScript = requireExtension<BabelIntegrationPresetTypeScript>(
      context,
      INTEGRATION_UID_BABEL_PRESET_TYPESCRIPT,
    );

    const presetTypeScriptOptions = resolveBabelIntegrationPresetTypeScriptOptions(
      babelIntegrationPresetTypeScript.options,
    );

    configureBabelPresetTypeScript(
      babelContext,
      options,
      presetTypeScriptOptions,
      transformOptions,
    );
  }

  configureBabelPresetTypeScriptSync(
    context: ContextSync,
    babelContext: BabelContext,
    options: BabelIntegrationResolvedOptions,
    transformOptions: TransformOptions,
  ): void
  {
    const babelIntegrationPresetTypeScript = requireExtension<BabelIntegrationPresetTypeScript>(
      context,
      INTEGRATION_UID_BABEL_PRESET_TYPESCRIPT,
    );

    const presetTypeScriptOptions = resolveBabelIntegrationPresetTypeScriptOptions(
      babelIntegrationPresetTypeScript.options,
    );

    configureBabelPresetTypeScript(
      babelContext,
      options,
      presetTypeScriptOptions,
      transformOptions,
    );
  }
}
