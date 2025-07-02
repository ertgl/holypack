import type { TransformOptions } from "@babel/core";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { AbstractExtension } from "@holypack/core/extension/AbstractExtension";
import type { Extension } from "@holypack/core/extension/Extension";
import type { AnyHook } from "@holypack/core/hook/AnyHook";
import type { AnyHookSync } from "@holypack/core/hook/AnyHookSync";
import type { Optional } from "@holypack/core/lib/object/Optional";

import type { BabelContext } from "../../../context/BabelContext";
import { BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_ASYNC } from "../../../hooks/generate-transform-options/BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_ASYNC";
import { BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_SYNC } from "../../../hooks/generate-transform-options/BABEL_INTEGRATION_HOOK_UID_GENERATE_TRANSFORM_OPTIONS_SYNC";
import type { GenerateTransformOptionsHookAsync } from "../../../hooks/generate-transform-options/GenerateTransformOptionsHookAsync";
import type { GenerateTransformOptionsHookSync } from "../../../hooks/generate-transform-options/GenerateTransformOptionsHookSync";
import type { BabelIntegrationResolvedOptions } from "../../../options/BabelIntegrationResolvedOptions";
import type { BabelIntegrationPresetEnvOptions } from "../options/BabelIntegrationPresetEnvOptions";

import type { BabelIntegrationPresetEnvFacets } from "./BabelIntegrationPresetEnvFacets";
import { BabelPresetEnvConfiguratorFacet } from "./facets/BabelPresetEnvConfiguratorFacet";
import { INTEGRATION_UID_BABEL_PRESET_ENV } from "./INTEGRATION_UID_BABEL_PRESET_ENV";

export class BabelIntegrationPresetEnv extends AbstractExtension
{
  readonly $uid = INTEGRATION_UID_BABEL_PRESET_ENV;

  readonly facets: BabelIntegrationPresetEnvFacets;

  readonly options: BabelIntegrationPresetEnvOptions;

  constructor(
    options?: Optional<BabelIntegrationPresetEnvOptions>,
  )
  {
    super();

    this.facets = {
      configurator: new BabelPresetEnvConfiguratorFacet(),
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
        this.configureBabelPresetEnv.bind(
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
        this.configureBabelPresetEnvSync.bind(
          this,
          context,
        ),
      );
    }
  }

  async configureBabelPresetEnv(
    context: ContextAsync,
    babelContext: BabelContext,
    babelIntegrationOptions: BabelIntegrationResolvedOptions,
    transformOptions: TransformOptions,
  ): Promise<void>
  {
    await this.facets.configurator.configureBabelPresetEnv(
      context,
      babelContext,
      babelIntegrationOptions,
      transformOptions,
    );
  }

  configureBabelPresetEnvSync(
    context: ContextSync,
    babelContext: BabelContext,
    babelIntegrationOptions: BabelIntegrationResolvedOptions,
    transformOptions: TransformOptions,
  ): void
  {
    this.facets.configurator.configureBabelPresetEnvSync(
      context,
      babelContext,
      babelIntegrationOptions,
      transformOptions,
    );
  }
}
