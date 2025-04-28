import type { Linter } from "eslint";

import type { StrictContext } from "@holypack/core";

import { generateESLintConfigs } from "../config";

import type { ESLintIntegration } from "./integration";

export class ESLintIntegrationAPI
{
  integration: ESLintIntegration;

  constructor(
    integration: ESLintIntegration,
  )
  {
    this.integration = integration;
  }

  async generateConfigs(
    context: StrictContext,
  ): Promise<Linter.Config[]>
  {
    return await generateESLintConfigs(
      context,
      this.integration.hooks,
    );
  }
}
