import type { Linter } from "eslint";

import type { ResolvedContext } from "@holypack/core";

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
    resolvedContext: ResolvedContext,
  ): Promise<Linter.Config[]>
  {
    return await generateESLintConfigs(
      resolvedContext,
      this.integration.hooks,
    );
  }
}
