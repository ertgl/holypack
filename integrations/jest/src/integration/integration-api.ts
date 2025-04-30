import type { Config } from "jest";

import type { StrictContext } from "@holypack/core";

import { generateJestConfig } from "../config";

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

  async generateConfig(
    context: StrictContext,
  ): Promise<Config>
  {
    return await generateJestConfig(
      context,
      this.integration.hooks,
    );
  }
}
