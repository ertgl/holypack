import type { ConfigFunction } from "@babel/core";

import type { ResolvedContext } from "@holypack/core";

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
    resolvedContext: ResolvedContext,
  ): Promise<ConfigFunction>
  {
    return await generateBabelConfigFunction(
      resolvedContext,
      this.integration.hooks,
    );
  }
}
