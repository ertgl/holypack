import type { Optional } from "@holypack/core/lib/object/Optional";

import type { JestIntegrationOptions } from "../options/JestIntegrationOptions";

import { JestIntegration } from "./JestIntegration";

export function createJestIntegration(
  options?: Optional<JestIntegrationOptions>,
): JestIntegration
{
  return new JestIntegration(options);
}
