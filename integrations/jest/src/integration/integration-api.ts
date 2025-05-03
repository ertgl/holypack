import type { Config } from "jest";

import type { Context } from "@holypack/core";

import {
  generateJestConfig,
  type JestConfigGeneratorOptions,
} from "../config";

import type { JestIntegration } from "./integration";

export class JestIntegrationAPI
{
  integration: JestIntegration;

  constructor(
    integration: JestIntegration,
  )
  {
    this.integration = integration;
  }

  async generateJestConfig(
    context: Context,
    options?: JestConfigGeneratorOptions | null,
  ): Promise<Config>
  {
    return await generateJestConfig(
      context,
      this.integration.hooks,
      options,
    );
  }
}
