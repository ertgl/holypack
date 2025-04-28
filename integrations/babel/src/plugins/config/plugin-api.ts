import type { TransformOptions } from "@babel/core";

import type { StrictContext } from "@holypack/core";

import type { BabelIntegrationConfigPlugin } from "./plugin";
import type { BabelIntegrationConfigPluginOptions } from "./plugin-options";
import { resolveBabelIntegrationConfigPluginOptions } from "./plugin-options-resolver";

export class BabelIntegrationConfigPluginAPI
{
  plugin: BabelIntegrationConfigPlugin;

  constructor(
    plugin: BabelIntegrationConfigPlugin,
  )
  {
    this.plugin = plugin;
  }

  contributeToBabelTransformOptions(
    context: StrictContext,
    transformOptions: TransformOptions,
    options?: BabelIntegrationConfigPluginOptions | boolean | null,
  ): void
  {
    const resolvedOptions = resolveBabelIntegrationConfigPluginOptions(
      context.cwd,
      context.legacy ?? false,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    Object.assign(
      transformOptions,
      resolvedOptions.overrides,
    );
  }
}
