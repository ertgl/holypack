import type { TransformOptions } from "@babel/core";

import {
  Integration,
  requireIntegration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import type { BabelIntegration } from "../../integration";
import { INTEGRATION_NAME_BABEL } from "../../integration/integration-name";

import { BabelIntegrationImportSourceTransformerPluginAPI } from "./plugin-api";

export const INTEGRATION_NAME_BABEL_IMPORT_SOURCE_TRANSFORMER = `${INTEGRATION_NAME_BABEL}/ImportSourceTransformer`;

export class BabelIntegrationImportSourceTransformerPlugin implements Integration
{
  api: BabelIntegrationImportSourceTransformerPluginAPI;

  name = INTEGRATION_NAME_BABEL_IMPORT_SOURCE_TRANSFORMER;

  constructor()
  {
    this.api = new BabelIntegrationImportSourceTransformerPluginAPI(this);
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
      babelIntegration.options.importSourceTransformer,
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
      INTEGRATION_NAME_BABEL_IMPORT_SOURCE_TRANSFORMER,
      this.onBabelTransformOptionsGeneration.bind(
        this,
        babelIntegration,
      ),
    );
  }
}

export function createBabelIntegrationImportSourceTransformerPlugin(): BabelIntegrationImportSourceTransformerPlugin
{
  return new BabelIntegrationImportSourceTransformerPlugin();
}
