import {
  bindSubIntegration,
  type Config,
  type Context,
  type Integration,
  type ResolvedContext,
} from "@holypack/core";

import { generateBabelConfigFunction } from "../config-function";
import {
  type BabelIntegrationHookSet,
  createBabelIntegrationHookSet,
} from "../eventing";
import createBabelIntegrationEnvPlugin from "../plugins/env";
import { createBabelIntegrationImportSourceTransformerPlugin } from "../plugins/import-source-transformer";
import createBabelIntegrationTypeScriptPlugin from "../plugins/typescript";

import { INTEGRATION_NAME_BABEL } from "./integration-name";
import type { BabelIntegrationOptions } from "./integration-options";

export class BabelIntegration implements Integration
{
  hooks: BabelIntegrationHookSet;

  name = INTEGRATION_NAME_BABEL;

  options: BabelIntegrationOptions;

  constructor(
    options?: BabelIntegrationOptions | null,
  )
  {
    this.hooks = createBabelIntegrationHookSet();
    this.options = options ?? {};
  }

  async onContextReady(
    resolvedContext: ResolvedContext,
  ): Promise<void>
  {
    resolvedContext.babel = {
      configFunction: await generateBabelConfigFunction(
        resolvedContext,
        this.hooks,
      ),
    };
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
  }
}

export function createBabelIntegration(
  options?: BabelIntegrationOptions | null,
): BabelIntegration
{
  return new BabelIntegration(options);
}
