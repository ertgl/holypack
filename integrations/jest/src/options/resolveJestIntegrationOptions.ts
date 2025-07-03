import type { Optional } from "@holypack/core/lib/object/Optional";

import type { JestIntegrationOptions } from "./JestIntegrationOptions";
import type { JestIntegrationResolvedOptions } from "./JestIntegrationResolvedOptions";

export function resolveJestIntegrationOptions(
  options?: Optional<JestIntegrationOptions>,
): JestIntegrationResolvedOptions
{
  options ??= {};

  return {
    overrides: options.overrides ?? {},
    plugins: options.plugins ?? {},
  };
}
