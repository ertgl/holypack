import {
  bindSubIntegration,
  type Config,
  type Context,
  type ContextResolutionOptions,
  type Integration,
} from "@holypack/core";

import {
  type BabelIntegrationHookSet,
  createBabelIntegrationHookSet,
} from "../eventing";
import createBabelIntegrationEnvPlugin from "../plugins/env";
import { createBabelIntegrationImportSourceTransformerPlugin } from "../plugins/import-source-transformer";
import createBabelIntegrationSourceMapPlugin from "../plugins/source-map";
import createBabelIntegrationTypeScriptPlugin from "../plugins/typescript";

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
    context: Context,
    options: ContextResolutionOptions,
  ): void
  {
    context.babel = {};
  }

  async setup(
    context: Context,
    config: Config,
  ): Promise<void>
  {
    const importSourceTransformerPlugin = createBabelIntegrationImportSourceTransformerPlugin();
    await bindSubIntegration(context, config, importSourceTransformerPlugin);

    const envPlugin = createBabelIntegrationEnvPlugin();
    await bindSubIntegration(context, config, envPlugin);

    const typescriptPlugin = createBabelIntegrationTypeScriptPlugin();
    await bindSubIntegration(context, config, typescriptPlugin);

    const sourceMapPlugin = createBabelIntegrationSourceMapPlugin();
    await bindSubIntegration(context, config, sourceMapPlugin);
  }
}

export function createBabelIntegration(
  options?: BabelIntegrationOptions | null,
): BabelIntegration
{
  return new BabelIntegration(options);
}
