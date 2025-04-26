import type { TransformOptions } from "@babel/core";

import {
  BaseIntegration,
  type Config,
  type Context,
  requireIntegration,
  type ResolvedContext,
} from "@holypack/core";

import type { BabelIntegration } from "../../integration";
import { INTEGRATION_NAME_BABEL } from "../../integration/integration-name";

import { BabelIntegrationSourceMapPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_BABEL_SOURCE_MAP = `${INTEGRATION_NAME_BABEL}/SourceMap`;

export class BabelIntegrationSourceMapPlugin extends BaseIntegration
{
  api: BabelIntegrationSourceMapPluginAPI;

  name = INTEGRATION_NAME_BABEL_SOURCE_MAP;

  constructor()
  {
    super();
    this.api = new BabelIntegrationSourceMapPluginAPI(this);
  }

  onBabelTransformOptionsGeneration(
    babelIntegration: BabelIntegration,
    resolvedContext: ResolvedContext,
    transformOptions: TransformOptions,
  ): void
  {
    this.api.addBabelConfig(
      resolvedContext,
      transformOptions,
      babelIntegration.options.sourceMap,
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

    babelIntegration.hooks.transformOptionsGeneration.tap(
      INTEGRATION_NAME_BABEL_SOURCE_MAP,
      this.onBabelTransformOptionsGeneration.bind(
        this,
        babelIntegration,
      ),
    );
  }
}

export function createBabelIntegrationSourceMapPlugin(): BabelIntegrationSourceMapPlugin
{
  return new BabelIntegrationSourceMapPlugin();
}
