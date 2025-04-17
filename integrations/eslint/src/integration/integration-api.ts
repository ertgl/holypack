import type { Linter } from "eslint";

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
  async generateConfig(): Promise<Linter.Config[]>
  {
    return [];
  }
}
