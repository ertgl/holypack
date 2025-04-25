import type { Integration } from "@holypack/core";

import type { BabelIntegrationOptions } from "./integration-options";

export const INTEGRATION_NAME_BABEL = "@holypack/integration:Babel";

export class BabelIntegration implements Integration
{
  name = INTEGRATION_NAME_BABEL;

  options: BabelIntegrationOptions;

  constructor(
    options?: BabelIntegrationOptions | null,
  )
  {
    this.options = options ?? {};
  }
}

export function createBabelIntegration(
  options?: BabelIntegrationOptions | null,
): BabelIntegration
{
  return new BabelIntegration(options);
}
