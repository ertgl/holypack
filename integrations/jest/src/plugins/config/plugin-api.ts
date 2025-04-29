import type { Config } from "jest";

import {
  requirePlugin,
  type StrictContext,
} from "@holypack/core";
import {
  PLUGIN_NAME_PROJECT,
  type ResolvedProject,
} from "@holypack/core/plugins/project";

import type { JestIntegrationConfigPlugin } from "./plugin";
import type { JestIntegrationConfigPluginOptions } from "./plugin-options";
import { resolveJestIntegrationConfigPluginOptions } from "./plugin-options-resolver";

export class JestIntegrationConfigPluginAPI
{
  plugin: JestIntegrationConfigPlugin;

  constructor(
    plugin: JestIntegrationConfigPlugin,
  )
  {
    this.plugin = plugin;
  }

  contributeToJestConfig(
    context: StrictContext,
    config: Config,
    options?: boolean | JestIntegrationConfigPluginOptions | null,
  ): void
  {
    requirePlugin(context, PLUGIN_NAME_PROJECT);

    const resolvedOptions = resolveJestIntegrationConfigPluginOptions(
      context.cwd,
      context.project as unknown as ResolvedProject,
      options,
    );

    if (resolvedOptions === false)
    {
      return;
    }

    Object.assign(
      config,
      resolvedOptions.overrides,
    );
  }
}
