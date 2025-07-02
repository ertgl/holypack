import type { TransformOptions } from "@babel/core";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { AbstractExtension } from "@holypack/core/extension/AbstractExtension";
import { maybeBindExtensionAsync } from "@holypack/core/extension/binder/maybeBindExtensionAsync";
import { maybeBindExtensionSync } from "@holypack/core/extension/binder/maybeBindExtensionSync";
import { maybeBindExtensionHookAsync } from "@holypack/core/extension/hook/binder/maybeBindExtensionHookAsync";
import { maybeBindExtensionHookSync } from "@holypack/core/extension/hook/binder/maybeBindExtensionHookSync";
import type { Optional } from "@holypack/core/lib/object/Optional";

import { createGenerateTransformOptionsHookAsync } from "../hooks/generate-transform-options/createGenerateTransformOptionsHookAsync";
import { createGenerateTransformOptionsHookSync } from "../hooks/generate-transform-options/createGenerateTransformOptionsHookSync";
import type { BabelIntegrationOptions } from "../options/BabelIntegrationOptions";
import { createBabelIntegrationPluginImportSourceTransformer } from "../plugins/transform-import-source/extension/createBabelIntegrationPluginImportSourceTransformer";
import { createBabelIntegrationPresetEnv } from "../presets/env/extension/createBabelIntegrationPresetEnv";
import { createBabelIntegrationPresetTypeScript } from "../presets/typescript/extension/createBabelIntegrationPresetTypeScript";

import type { BabelIntegrationFacets } from "./BabelIntegrationFacets";
import { BabelConfiguratorFacet } from "./facets/BabelConfiguratorFacet";
import { INTEGRATION_UID_BABEL } from "./INTEGRATION_UID_BABEL";

export class BabelIntegration extends AbstractExtension
{
  readonly $uid = INTEGRATION_UID_BABEL;

  readonly facets: BabelIntegrationFacets;

  readonly options: BabelIntegrationOptions;

  constructor(
    options?: Optional<BabelIntegrationOptions>,
  )
  {
    super();

    this.facets = {
      configurator: new BabelConfiguratorFacet(),
    };

    this.options = options ?? {};
  }

  async $augmentContext(
    context: ContextAsync,
  ): Promise<void>
  {
    await maybeBindExtensionAsync(
      context,
      createBabelIntegrationPluginImportSourceTransformer(),
    );

    await maybeBindExtensionAsync(
      context,
      createBabelIntegrationPresetEnv(),
    );

    await maybeBindExtensionAsync(
      context,
      createBabelIntegrationPresetTypeScript(),
    );
  }

  $augmentContextSync(
    context: ContextSync,
  ): void
  {
    maybeBindExtensionSync(
      context,
      createBabelIntegrationPluginImportSourceTransformer(),
    );

    maybeBindExtensionSync(
      context,
      createBabelIntegrationPresetEnv(),
    );

    maybeBindExtensionSync(
      context,
      createBabelIntegrationPresetTypeScript(),
    );
  }

  async $setup(
    context: ContextAsync,
  ): Promise<void>
  {
    await maybeBindExtensionHookAsync(
      context,
      this,
      createGenerateTransformOptionsHookAsync(),
    );
  }

  $setupSync(
    context: ContextSync,
  ): void
  {
    maybeBindExtensionHookSync(
      context,
      this,
      createGenerateTransformOptionsHookSync(),
    );
  }

  async generateTransformOptions(
    context: ContextAsync,
  ): Promise<TransformOptions>
  {
    return await this.facets.configurator.generateTransformOptions(context);
  }

  generateTransformOptionsSync(
    context: ContextSync,
  ): TransformOptions
  {
    return this.facets.configurator.generateTransformOptionsSync(context);
  }
}
