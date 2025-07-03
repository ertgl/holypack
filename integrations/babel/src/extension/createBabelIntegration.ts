import type { Optional } from "@holypack/core/lib/object/Optional";

import type { BabelIntegrationOptions } from "../options/BabelIntegrationOptions";

import { BabelIntegration } from "./BabelIntegration";

export function createBabelIntegration(
  options?: Optional<BabelIntegrationOptions>,
): BabelIntegration
{
  return new BabelIntegration(options);
}
