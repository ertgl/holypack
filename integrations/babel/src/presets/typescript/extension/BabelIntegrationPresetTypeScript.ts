import type { TransformOptions } from "@babel/core";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { AbstractExtension } from "@holypack/core/extension/AbstractExtension";
import type { Extension } from "@holypack/core/extension/Extension";
import type { AnyHook } from "@holypack/core/hook/AnyHook";
import type { AnyHookSync } from "@holypack/core/hook/AnyHookSync";
import type { Optional } from "@holypack/core/lib/object/Optional";

import type { BabelConfiguratorResolvedOptions } from "../../../configurator/options/BabelConfiguratorResolvedOptions";
import type { BabelContext } from "../../../context/BabelContext";
import { BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_ASYNC } from "../../../hooks/generate-transform-options/BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_ASYNC";
import { BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_SYNC } from "../../../hooks/generate-transform-options/BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_SYNC";
import type { GenerateTransformOptionsHookAsync } from "../../../hooks/generate-transform-options/GenerateTransformOptionsHookAsync";
import type { GenerateTransformOptionsHookSync } from "../../../hooks/generate-transform-options/GenerateTransformOptionsHookSync";
import type { BabelIntegrationPresetTypeScriptOptions } from "../options/BabelIntegrationPresetTypeScriptOptions";

import type { BabelIntegrationPresetTypeScriptFacets } from "./BabelIntegrationPresetTypeScriptFacets";
import { BabelPresetTypeScriptConfiguratorFacet } from "./facets/BabelPresetTypeScriptConfiguratorFacet";
import { INTEGRATION_UID_BABEL_PRESET_TYPESCRIPT } from "./INTEGRATION_UID_BABEL_PRESET_TYPESCRIPT";

export class BabelIntegrationPresetTypeScript extends AbstractExtension
{
  readonly $uid = INTEGRATION_UID_BABEL_PRESET_TYPESCRIPT;

  readonly facets: BabelIntegrationPresetTypeScriptFacets;

  readonly options: BabelIntegrationPresetTypeScriptOptions;

  constructor(
    options?: Optional<BabelIntegrationPresetTypeScriptOptions>,
  )
  {
    super();

    this.facets = {
      configurator: new BabelPresetTypeScriptConfiguratorFacet(),
    };

    this.options = options ?? {};
  }

  $postBindExtensionHook(
    context: ContextAsync,
    extension: Extension,
    hook: AnyHook,
  ): void
  {
    if (hook.name === BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_ASYNC)
    {
      const stage = (hook.taps.length + 1) * 1000;

      (hook as GenerateTransformOptionsHookAsync).tapPromise(
        {
          name: this.$uid,
          stage,
        },
        this.configureBabelPresetTypeScript.bind(
          this,
          context,
        ),
      );
    }
  }

  $postBindExtensionHookSync(
    context: ContextSync,
    extension: Extension,
    hook: AnyHookSync,
  ): void
  {
    if (hook.name === BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_SYNC)
    {
      const stage = (hook.taps.length + 1) * 1000;

      (hook as GenerateTransformOptionsHookSync).tap(
        {
          name: this.$uid,
          stage,
        },
        this.configureBabelPresetTypeScriptSync.bind(
          this,
          context,
        ),
      );
    }
  }

  async configureBabelPresetTypeScript(
    context: ContextAsync,
    babelContext: BabelContext,
    configuratorOptions: BabelConfiguratorResolvedOptions,
    transformOptions: TransformOptions,
  ): Promise<void>
  {
    await this.facets.configurator.configureBabelPresetTypeScript(
      context,
      babelContext,
      configuratorOptions,
      transformOptions,
    );
  }

  configureBabelPresetTypeScriptSync(
    context: ContextSync,
    babelContext: BabelContext,
    configuratorOptions: BabelConfiguratorResolvedOptions,
    transformOptions: TransformOptions,
  ): void
  {
    this.facets.configurator.configureBabelPresetTypeScriptSync(
      context,
      babelContext,
      configuratorOptions,
      transformOptions,
    );
  }
}
