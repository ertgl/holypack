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
import { INTEGRATION_NAME_BABEL_TYPESCRIPT } from "../plugin-metadata";

import { BabelIntegrationTypeScriptPluginAPI } from "./plugin-api";
import type { BabelIntegrationTypeScriptPluginOptions } from "./plugin-options";

export class BabelIntegrationTypeScriptPlugin implements Integration
{
  api: BabelIntegrationTypeScriptPluginAPI;

  name = INTEGRATION_NAME_BABEL_TYPESCRIPT;

  constructor()
  {
    this.api = new BabelIntegrationTypeScriptPluginAPI(this);
  }

  static extractOptionsFromIntegration(
    babelIntegration: BabelIntegration,
  ): BabelIntegrationTypeScriptPluginOptions | boolean | null | undefined
  {
    return babelIntegration.options.typescript;
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
      BabelIntegrationTypeScriptPlugin.extractOptionsFromIntegration(babelIntegration),
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

export function createBabelIntegrationTypeScriptPlugin(): BabelIntegrationTypeScriptPlugin
{
  return new BabelIntegrationTypeScriptPlugin();
}
