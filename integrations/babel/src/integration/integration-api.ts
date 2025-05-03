import type { TransformOptions } from "@babel/core";

import type { Context } from "@holypack/core";

import { generateBabelTransformOptions } from "../config";

import type { BabelIntegration } from "./integration";

export class BabelIntegrationAPI
{
  integration: BabelIntegration;

  constructor(
    integration: BabelIntegration,
  )
  {
    this.integration = integration;
  }

  async generateBabelTransformOptions(
    context: Context,
  ): Promise<TransformOptions>
  {
    return await generateBabelTransformOptions(
      context,
      this.integration.hooks,
    );
  }
}
