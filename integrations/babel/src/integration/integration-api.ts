import type { ConfigFunction } from "@babel/core";

import type { TypeSafeContext } from "@holypack/core";

import { generateBabelConfigFunction } from "../config-function";

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

  async generateConfigFunction(
    context: TypeSafeContext,
  ): Promise<ConfigFunction>
  {
    return await generateBabelConfigFunction(
      context,
      this.integration.hooks,
    );
  }
}
