import type { Context } from "@holypack/core";

import {
  generateWebpackConfig,
  type WebpackConfigGeneratorOptions,
} from "../config";

import type { WebpackIntegration } from "./integration";

export class WebpackIntegrationAPI
{
  integration: WebpackIntegration;

  constructor(
    integration: WebpackIntegration,
  )
  {
    this.integration = integration;
  }

  async generateWebpackConfig(
    context: Context,
    options?: null | WebpackConfigGeneratorOptions,
  )
  {
    return await generateWebpackConfig(
      context,
      options,
    );
  }
}
