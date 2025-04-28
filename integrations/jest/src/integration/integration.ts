import {
  bindSubIntegration,
  type ContextResolutionOptions,
  type Integration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import { createJestIntegrationESLintPlugin } from "../plugins/eslint";

import { INTEGRATION_NAME_JEST } from "./integration-name";
import type { JestIntegrationOptions } from "./integration-options";

export class JestIntegration implements Integration
{
  name = INTEGRATION_NAME_JEST;

  options: JestIntegrationOptions;

  constructor(
    options?: JestIntegrationOptions | null,
  )
  {
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
