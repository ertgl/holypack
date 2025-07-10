import type { Optional } from "@holypack/core/lib/object/Optional";

import { BabelIntegration } from "./BabelIntegration";
import type { BabelIntegrationOptions } from "./options/BabelIntegrationOptions";

export function createBabelIntegration(
  options?: Optional<BabelIntegrationOptions>,
): BabelIntegration
{
  return new BabelIntegration(options);
}
