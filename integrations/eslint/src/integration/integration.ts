import type { Integration } from "@holypack/core";

import { ESLintIntegrationAPI } from "./integration-api";
import type {
  Options,
  ResolvedOptions,
} from "./integration-options";
import { resolveOptions } from "./integration-options-resolution";

export const INTEGRATION_NAME_ESLINT = "@holypack/integration:ESLint";

export class ESLintIntegration implements Integration
{
  api: ESLintIntegrationAPI;

  name = INTEGRATION_NAME_ESLINT;

  options: ResolvedOptions;

  constructor(
    options?: null | Options,
  )
  {
    this.api = new ESLintIntegrationAPI(this);
    this.options = resolveOptions(options);
  }
}

export function createESLintIntegration(
  options?: null | Options,
): ESLintIntegration
{
  return new ESLintIntegration(options);
}
