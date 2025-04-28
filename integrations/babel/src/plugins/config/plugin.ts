import type { TransformOptions } from "@babel/core";

import {
  BaseIntegration,
  requireIntegration,
  type TypeSafeConfig,
  type TypeSafeContext,
} from "@holypack/core";

import type { BabelIntegration } from "../../integration";
import { INTEGRATION_NAME_BABEL } from "../../integration/integration-name";

import { BabelIntegrationConfigPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_BABEL_CONFIG = `${INTEGRATION_NAME_BABEL}/Config`;

export class BabelIntegrationConfigPlugin extends BaseIntegration
{
  api: BabelIntegrationConfigPluginAPI;

  name = INTEGRATION_NAME_BABEL_CONFIG;

  constructor()
  {
    super();
    this.api = new BabelIntegrationConfigPluginAPI(this);
  }

  onBabelTransformOptionsGeneration(
    babelIntegration: BabelIntegration,
    resolvedContext: TypeSafeContext,
    transformOptions: TransformOptions,
  ): void
  {
    this.api.addBabelConfig(
      resolvedContext,
      transformOptions,
      babelIntegration.options.config,
    );
  }

  setup(
    context: TypeSafeContext,
    config: TypeSafeConfig,
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
