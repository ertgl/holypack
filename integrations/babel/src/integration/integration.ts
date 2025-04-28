import {
  bindSubIntegration,
  type ContextResolutionOptions,
  type Integration,
  type TypeSafeConfig,
  type TypeSafeContext,
} from "@holypack/core";

import {
  type BabelIntegrationHookSet,
  createBabelIntegrationHookSet,
} from "../eventing";
import { createBabelIntegrationConfigPlugin } from "../plugins/config";
import { createBabelIntegrationEnvPlugin } from "../plugins/env";
import { createBabelIntegrationImportSourceTransformerPlugin } from "../plugins/import-source-transformer";
import { createBabelIntegrationTypeScriptPlugin } from "../plugins/typescript";

import { BabelIntegrationAPI } from "./integration-api";
import { INTEGRATION_NAME_BABEL } from "./integration-name";
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
    context: TypeSafeContext,
    options: ContextResolutionOptions,
  ): void
  {
    context.babel = {};
  }

  async setup(
    context: TypeSafeContext,
    config: TypeSafeConfig,
  ): Promise<void>
  {
    const configPlugin = createBabelIntegrationConfigPlugin();
    await bindSubIntegration(context, config, configPlugin);

    const importSourceTransformerPlugin = createBabelIntegrationImportSourceTransformerPlugin();
    await bindSubIntegration(context, config, importSourceTransformerPlugin);

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
