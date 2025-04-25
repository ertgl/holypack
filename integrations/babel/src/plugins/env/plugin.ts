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

import { BabelIntegrationEnvPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_BABEL_ENV = `${INTEGRATION_NAME_BABEL}/Env`;

export class BabelIntegrationEnvPlugin extends BaseIntegration
{
  api: BabelIntegrationEnvPluginAPI;

  name = INTEGRATION_NAME_BABEL_ENV;

  constructor()
  {
    super();
    this.api = new BabelIntegrationEnvPluginAPI(this);
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
      babelIntegration.options.env,
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
      INTEGRATION_NAME_BABEL_ENV,
      this.onBabelTransformOptionsGeneration.bind(
        this,
        babelIntegration,
      ),
    );
  }
}

export function createBabelIntegrationEnvPlugin(): BabelIntegrationEnvPlugin
{
  return new BabelIntegrationEnvPlugin();
}
