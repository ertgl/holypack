import type { TransformOptions } from "@babel/core";

import {
  type Context,
  generateHookSubscriptionIDForPlugin,
  Integration,
  requireIntegration,
  type StrictConfig,
  type StrictContext,
} from "@holypack/core";

import type { Assumptions } from "../../../config";
import type { BabelIntegration } from "../../../integration";
import { INTEGRATION_NAME_BABEL } from "../../../integration-metadata";
import { HOOK_NAME_BABEL_GENERATE_TRANSFORM_OPTIONS } from "../../../integration/hooks";
import { INTEGRATION_NAME_BABEL_ENV } from "../plugin-metadata";

import { BabelIntegrationEnvPluginAPI } from "./plugin-api";
import type { BabelIntegrationEnvPluginOptions } from "./plugin-options";

export class BabelIntegrationEnvPlugin implements Integration
{
  api: BabelIntegrationEnvPluginAPI;

  name = INTEGRATION_NAME_BABEL_ENV;

  constructor()
  {
    this.api = new BabelIntegrationEnvPluginAPI(this);
  }

  static extractOptionsFromIntegration(
    babelIntegration: BabelIntegration,
  ): BabelIntegrationEnvPluginOptions | boolean | null | undefined
  {
    return babelIntegration.options.env;
  }

  async onGenerateBabelTransformOptions(
    babelIntegration: BabelIntegration,
    context: Context,
    assumptions: Assumptions,
    transformOptions: TransformOptions,
    overrides?: null | TransformOptions,
  ): Promise<void>
  {
    await this.api.configureBabelEnv(
      context,
      assumptions,
      transformOptions,
      overrides,
      BabelIntegrationEnvPlugin.extractOptionsFromIntegration(babelIntegration),
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

    babelIntegration.hooks[HOOK_NAME_BABEL_GENERATE_TRANSFORM_OPTIONS].tapPromise(
      generateHookSubscriptionIDForPlugin(
        this,
        babelIntegration.hooks[HOOK_NAME_BABEL_GENERATE_TRANSFORM_OPTIONS],
      ),
      this.onGenerateBabelTransformOptions.bind(
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
