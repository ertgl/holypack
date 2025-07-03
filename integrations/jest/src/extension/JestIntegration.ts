import type { Config } from "jest";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { AbstractExtension } from "@holypack/core/extension/AbstractExtension";
import { maybeBindExtensionAsync } from "@holypack/core/extension/binder/maybeBindExtensionAsync";
import { maybeBindExtensionSync } from "@holypack/core/extension/binder/maybeBindExtensionSync";
import { maybeBindExtensionHookAsync } from "@holypack/core/extension/hook/binder/maybeBindExtensionHookAsync";
import { maybeBindExtensionHookSync } from "@holypack/core/extension/hook/binder/maybeBindExtensionHookSync";
import type { Optional } from "@holypack/core/lib/object/Optional";

import { createGenerateConfigHookAsync } from "../hooks/generate-config/createGenerateConfigHookAsync";
import { createGenerateConfigHookSync } from "../hooks/generate-config/createGenerateConfigHookSync";
import type { JestIntegrationOptions } from "../options/JestIntegrationOptions";
import { createJestIntegrationPluginESLint } from "../plugins/eslint/extension/createJestIntegrationPluginESLint";

import { JestConfiguratorFacet } from "./facets/JestConfiguratorFacet";
import { INTEGRATION_UID_JEST } from "./INTEGRATION_UID_JEST";
import type { JestIntegrationFacets } from "./JestIntegrationFacets";

export class JestIntegration extends AbstractExtension
{
  readonly $uid = INTEGRATION_UID_JEST;

  readonly facets: JestIntegrationFacets;

  readonly options: JestIntegrationOptions;

  constructor(
    options?: Optional<JestIntegrationOptions>,
  )
  {
    super();

    this.facets = {
      configurator: new JestConfiguratorFacet(),
    };

    this.options = options ?? {};
  }

  async $augmentContext(
    context: ContextAsync,
  ): Promise<void>
  {
    const pluginOptions = this.options.plugins ?? {};

    if (pluginOptions.eslint !== false)
    {
      await maybeBindExtensionAsync(
        context,
        createJestIntegrationPluginESLint(pluginOptions.eslint),
      );
    }
  }

  $augmentContextSync(
    context: ContextSync,
  ): void
  {
    const pluginOptions = this.options.plugins ?? {};

    if (pluginOptions.eslint !== false)
    {
      maybeBindExtensionSync(
        context,
        createJestIntegrationPluginESLint(pluginOptions.eslint),
      );
    }
  }

  async $setup(
    context: ContextAsync,
  ): Promise<void>
  {
    await maybeBindExtensionHookAsync(
      context,
      this,
      createGenerateConfigHookAsync(),
    );
  }

  $setupSync(
    context: ContextSync,
  ): void
  {
    maybeBindExtensionHookSync(
      context,
      this,
      createGenerateConfigHookSync(),
    );
  }

  async generateConfig(
    context: ContextAsync,
  ): Promise<Config>
  {
    return await this.facets.configurator.generateConfig(context);
  }

  generateConfigSync(
    context: ContextSync,
  ): Config
  {
    return this.facets.configurator.generateConfigSync(context);
  }
}
