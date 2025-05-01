import type { TransformOptions } from "@babel/core";

import {
  Integration,
  requireIntegration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import type { BabelIntegration } from "../../integration";
import { INTEGRATION_NAME_BABEL } from "../../integration/integration-name";

import { BabelIntegrationTypeScriptPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_BABEL_TYPESCRIPT = `${INTEGRATION_NAME_BABEL}/TypeScript`;

export class BabelIntegrationTypeScriptPlugin implements Integration
{
  api: BabelIntegrationTypeScriptPluginAPI;

  name = INTEGRATION_NAME_BABEL_TYPESCRIPT;

  constructor()
  {
    this.api = new BabelIntegrationTypeScriptPluginAPI(this);
  }

  async onBabelTransformOptionsGeneration(
    babelIntegration: BabelIntegration,
    context: StrictContext,
    transformOptions: TransformOptions,
  ): Promise<void>
  {
    await this.api.contributeToBabelTransformOptions(
      context,
      transformOptions,
      babelIntegration.options.typescript,
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
