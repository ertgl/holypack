import type { Config } from "jest";

import {
  Integration,
  requireIntegration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import { HOOK_NAME_JEST_GENERATE_CONFIG } from "../../hooks";
import type { JestIntegration } from "../../integration";
import { INTEGRATION_NAME_JEST } from "../../integration/integration-name";

import { JestIntegrationConfigPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_JEST_PLUGIN_CONFIG = `${INTEGRATION_NAME_JEST}/Config`;

export class JestIntegrationConfigPlugin implements Integration
{
  api: JestIntegrationConfigPluginAPI;

  name = INTEGRATION_NAME_JEST_PLUGIN_CONFIG;

  constructor()
  {
    this.api = new JestIntegrationConfigPluginAPI(this);
  }

  onJestConfigGeneration(
    jestIntegration: JestIntegration,
    resolvedContext: StrictContext,
    config: Config,
  ): void
  {
    this.api.contributeToJestConfig(
      resolvedContext,
      config,
      jestIntegration.options.config,
    );
  }

  setup(
    context: StrictContext,
    config: StrictConfig,
  ): void
  {
    const jestIntegration = requireIntegration<
      JestIntegration
    >(
      context,
      INTEGRATION_NAME_JEST,
    );

    jestIntegration.hooks[HOOK_NAME_JEST_GENERATE_CONFIG].tap(
      INTEGRATION_NAME_JEST_PLUGIN_CONFIG,
      this.onJestConfigGeneration.bind(
        this,
        jestIntegration,
      ),
    );
  }
}

export function createJestIntegrationConfigPlugin(): JestIntegrationConfigPlugin
{
  return new JestIntegrationConfigPlugin();
}
