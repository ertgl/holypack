import {
  bindSubIntegration,
  type ContextResolutionOptions,
  type Integration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import { INTEGRATION_NAME_BABEL } from "../integration-metadata";
import { createBabelIntegrationEnvPlugin } from "../plugins/env";
import { createBabelIntegrationImportSourcePlugin } from "../plugins/import-source";
import { createBabelIntegrationTypeScriptPlugin } from "../plugins/typescript";

import {
  type BabelIntegrationHookSet,
  createBabelIntegrationHookSet,
} from "./eventing";
import { BabelIntegrationAPI } from "./integration-api";
import type { BabelIntegrationOptions } from "./integration-options";

export class BabelIntegration implements Integration
{
  api: BabelIntegrationAPI;

  hooks: BabelIntegrationHookSet;

  name = INTEGRATION_NAME_BABEL;

  options: BabelIntegrationOptions;

  constructor(
    options?: BabelIntegrationOptions | null,
  )
  {
    this.api = new BabelIntegrationAPI(this);
    this.hooks = createBabelIntegrationHookSet();
    this.options = options ?? {};
  }

  resolveContext(
    context: StrictContext,
    options: ContextResolutionOptions,
  ): void
  {
    context.babel = {};
  }

  async setup(
    context: StrictContext,
    config: StrictConfig,
  ): Promise<void>
  {
    const importSourcePlugin = createBabelIntegrationImportSourcePlugin();
    await bindSubIntegration(context, config, importSourcePlugin);

    const envPlugin = createBabelIntegrationEnvPlugin();
    await bindSubIntegration(context, config, envPlugin);

    const typescriptPlugin = createBabelIntegrationTypeScriptPlugin();
    await bindSubIntegration(context, config, typescriptPlugin);
  }
}

export function createBabelIntegration(
  options?: BabelIntegrationOptions | null,
): BabelIntegration
{
  return new BabelIntegration(options);
}
