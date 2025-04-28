import type { TransformOptions } from "@babel/core";

import {
  Integration,
  requireIntegration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import type { BabelIntegration } from "../../integration";
import { INTEGRATION_NAME_BABEL } from "../../integration/integration-name";

import { BabelIntegrationEnvPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_BABEL_ENV = `${INTEGRATION_NAME_BABEL}/Env`;

export class BabelIntegrationEnvPlugin implements Integration
{
  api: BabelIntegrationEnvPluginAPI;

  name = INTEGRATION_NAME_BABEL_ENV;

  constructor()
  {
    this.api = new BabelIntegrationEnvPluginAPI(this);
  }

  async onBabelTransformOptionsGeneration(
    babelIntegration: BabelIntegration,
    resolvedContext: StrictContext,
    transformOptions: TransformOptions,
  ): Promise<void>
  {
    await this.api.contributeToBabelTransformOptions(
      resolvedContext,
      transformOptions,
      babelIntegration.options.env,
    );
  }

  setup(
    context: StrictContext,
    config: StrictConfig,
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
