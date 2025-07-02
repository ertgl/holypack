import type { Configuration } from "webpack";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { AbstractExtension } from "@holypack/core/extension/AbstractExtension";
import { maybeBindExtensionHookAsync } from "@holypack/core/extension/hook/binder/maybeBindExtensionHookAsync";
import { maybeBindExtensionHookSync } from "@holypack/core/extension/hook/binder/maybeBindExtensionHookSync";
import type { Optional } from "@holypack/core/lib/object/Optional";

import type { WebpackConfigurationOptions } from "../configurator/options/WebpackConfigurationOptions";
import { createGenerateConfigurationHookAsync } from "../hooks/generate-configuration/createGenerateConfigurationHookAsync";
import { createGenerateConfigurationHookSync } from "../hooks/generate-configuration/createGenerateConfigurationHookSync";
import type { WebpackIntegrationOptions } from "../options/WebpackIntegrationOptions";

import { WebpackConfiguratorFacet } from "./facets/WebpackConfiguratorFacet";
import { INTEGRATION_UID_WEBPACK } from "./INTEGRATION_UID_WEBPACK";
import type { WebpackIntegrationFacets } from "./WebpackIntegrationFacets";

export class WebpackIntegration extends AbstractExtension
{
  readonly $uid = INTEGRATION_UID_WEBPACK;

  readonly facets: WebpackIntegrationFacets;

  readonly options: WebpackIntegrationOptions;

  constructor(
    options?: Optional<WebpackIntegrationOptions>,
  )
  {
    super();

    this.facets = {
      configurator: new WebpackConfiguratorFacet(),
    };

    this.options = options ?? {};
  }

  async $setup(
    context: ContextAsync,
  ): Promise<void>
  {
    await maybeBindExtensionHookAsync(
      context,
      this,
      createGenerateConfigurationHookAsync(),
    );
  }

  $setupSync(
    context: ContextSync,
  ): void
  {
    maybeBindExtensionHookSync(
      context,
      this,
      createGenerateConfigurationHookSync(),
    );
  }

  async generateConfiguration(
    context: ContextAsync,
    options?: null | WebpackConfigurationOptions,
  ): Promise<Configuration>
  {
    return await this.facets.configurator.generateConfiguration(
      context,
      options,
    );
  }

  generateConfigurationSync(
    context: ContextSync,
    options?: null | WebpackConfigurationOptions,
  ): Configuration
  {
    return this.facets.configurator.generateConfigurationSync(
      context,
      options,
    );
  }
}
