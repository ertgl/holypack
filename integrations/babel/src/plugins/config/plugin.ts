import type { TransformOptions } from "@babel/core";

import {
  Integration,
  requireIntegration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import type { BabelIntegration } from "../../integration";
import { INTEGRATION_NAME_BABEL } from "../../integration/integration-name";

import { BabelIntegrationConfigPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_BABEL_CONFIG = `${INTEGRATION_NAME_BABEL}/Config`;

export class BabelIntegrationConfigPlugin implements Integration
{
  api: BabelIntegrationConfigPluginAPI;

  name = INTEGRATION_NAME_BABEL_CONFIG;

  constructor()
  {
    this.api = new BabelIntegrationConfigPluginAPI(this);
  }

  onBabelTransformOptionsGeneration(
    babelIntegration: BabelIntegration,
    context: StrictContext,
    transformOptions: TransformOptions,
  ): void
  {
    this.api.contributeToBabelTransformOptions(
      context,
      transformOptions,
      babelIntegration.options.config,
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

    babelIntegration.hooks.transformOptionsGeneration.tap(
      INTEGRATION_NAME_BABEL_CONFIG,
      this.onBabelTransformOptionsGeneration.bind(
        this,
        babelIntegration,
      ),
    );
  }
}

export function createBabelIntegrationConfigPlugin(): BabelIntegrationConfigPlugin
{
  return new BabelIntegrationConfigPlugin();
}
