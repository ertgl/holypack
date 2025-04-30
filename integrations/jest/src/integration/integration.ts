import {
  bindSubIntegration,
  type ContextResolutionOptions,
  type Integration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import {
  createJestIntegrationHookSet,
  type JestIntegrationHookSet,
} from "../eventing";
import { createJestIntegrationConfigPlugin } from "../plugins/config";
import { createJestIntegrationESLintPlugin } from "../plugins/eslint";

import { JestIntegrationAPI } from "./integration-api";
import { INTEGRATION_NAME_JEST } from "./integration-name";
import type { JestIntegrationOptions } from "./integration-options";

export class JestIntegration implements Integration
{
  api: JestIntegrationAPI;

  hooks: JestIntegrationHookSet;

  name = INTEGRATION_NAME_JEST;

  options: JestIntegrationOptions;

  constructor(
    options?: JestIntegrationOptions | null,
  )
  {
    this.api = new JestIntegrationAPI(this);
    this.hooks = createJestIntegrationHookSet();
    this.options = options ?? {};
  }

  resolveContext(
    context: StrictContext,
    options: ContextResolutionOptions,
  ): void
  {
    context.jest = {};
  }

  async setup(
    context: StrictContext,
    config: StrictConfig,
  ): Promise<void>
  {
    const configPlugin = createJestIntegrationConfigPlugin();
    await bindSubIntegration(context, config, configPlugin);

    const eslintPlugin = createJestIntegrationESLintPlugin();
    await bindSubIntegration(context, config, eslintPlugin);
  }
}

export function createJestIntegration(
  options?: JestIntegrationOptions | null,
): JestIntegration
{
  return new JestIntegration(options);
}
