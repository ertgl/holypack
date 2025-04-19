import type { Linter } from "eslint";

import type { ResolvedContext } from "@holypack/core";

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

  // eslint-disable-next-line @typescript-eslint/require-await
  async generateConfig(
    context: ResolvedContext,
  ): Promise<Linter.Config[]>
  {
    return [];
  }
}
