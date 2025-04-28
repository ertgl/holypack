import {
  type ContextResolutionOptions,
  type Integration,
  type StrictContext,
} from "@holypack/core";

import { INTEGRATION_NAME_JEST } from "./integration-name";
import type { JestIntegrationOptions } from "./integration-options";

export class JestIntegration implements Integration
{
  name = INTEGRATION_NAME_JEST;

  options: JestIntegrationOptions;

  constructor(
    options?: JestIntegrationOptions | null,
  )
  {
    this.options = options ?? {};
  }

  resolveContext(
    context: StrictContext,
    options: ContextResolutionOptions,
  ): void
  {
    context.jest = {};
  }
}

export function createJestIntegration(
  options?: JestIntegrationOptions | null,
): JestIntegration
{
  return new JestIntegration(options);
}
