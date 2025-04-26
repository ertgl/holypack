import type { TransformOptions } from "@babel/core";

import { type ResolvedContext } from "@holypack/core";

import type { BabelIntegrationSourceMapPlugin } from "./plugin";
import type { BabelIntegrationSourceMapPluginOptions } from "./plugin-options";
import { resolveBabelIntegrationSourceMapPluginOptions } from "./plugin-options-resolver";

export class BabelIntegrationSourceMapPluginAPI
{
  plugin: BabelIntegrationSourceMapPlugin;

  constructor(
    plugin: BabelIntegrationSourceMapPlugin,
  )
  {
    this.plugin = plugin;
  }

  addBabelConfig(
    context: ResolvedContext,
    transformOptions: TransformOptions,
    options?: BabelIntegrationSourceMapPluginOptions | boolean | null,
  ): void
  {
    const resolvedOptions = resolveBabelIntegrationSourceMapPluginOptions(
      context.cwd,
      context.legacy,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    transformOptions.sourceMaps = resolvedOptions.isEnabled;
  }
}
