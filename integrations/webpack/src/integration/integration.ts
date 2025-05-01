import type {
  ContextResolutionOptions,
  Integration,
  StrictContext,
} from "@holypack/core";

import { INTEGRATION_NAME_WEBPACK } from "./integration-name";
import type { WebpackIntegrationOptions } from "./integration-options";

export class WebpackIntegration implements Integration
{
  name = INTEGRATION_NAME_WEBPACK;

  options: WebpackIntegrationOptions;

  constructor(
    options?: null | WebpackIntegrationOptions,
  )
  {
    this.options = options ?? {};
  }

  resolveContext(
    context: StrictContext,
    options: ContextResolutionOptions,
  ): void
  {
    context.webpack = {};
  }
}

export function createWebpackIntegration(
  options?: null | WebpackIntegrationOptions,
): WebpackIntegration
{
  return new WebpackIntegration(options);
}
