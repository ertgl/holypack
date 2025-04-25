import type { TransformOptions } from "@babel/core";

import {
  BaseIntegration,
  type Config,
  type Context,
  requireIntegration,
  type ResolvedContext,
} from "@holypack/core";

import { type BabelIntegration } from "../../integration";
import { INTEGRATION_NAME_BABEL } from "../../integration/integration-name";

import { BabelIntegrationTypeScriptPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_BABEL_TYPESCRIPT = `${INTEGRATION_NAME_BABEL}/TypeScript`;

export class BabelIntegrationTypeScriptPlugin extends BaseIntegration
{
  api: BabelIntegrationTypeScriptPluginAPI;

  name = INTEGRATION_NAME_BABEL_TYPESCRIPT;

  constructor()
  {
    super();
    this.api = new BabelIntegrationTypeScriptPluginAPI(this);
  }

  async onBabelTransformOptionsGeneration(
    babelIntegration: BabelIntegration,
    resolvedContext: ResolvedContext,
    transformOptions: TransformOptions,
  ): Promise<void>
  {
    await this.api.addBabelConfig(
      resolvedContext,
      transformOptions,
      babelIntegration.options.typescript,
    );
  }

  setup(
    context: Context,
    config: Config,
  ): void
  {
    const babelIntegration = requireIntegration<
      BabelIntegration
    >(
      context,
      INTEGRATION_NAME_BABEL,
    );

    babelIntegration.hooks.transformOptionsGeneration.tapPromise(
      INTEGRATION_NAME_BABEL_TYPESCRIPT,
      this.onBabelTransformOptionsGeneration.bind(
        this,
        babelIntegration,
      ),
    );
  }
}

export function createBabelIntegrationTypeScriptPlugin(): BabelIntegrationTypeScriptPlugin
{
  return new BabelIntegrationTypeScriptPlugin();
}
