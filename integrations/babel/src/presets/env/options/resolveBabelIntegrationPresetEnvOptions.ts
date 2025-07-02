import type { Optional } from "@holypack/core/lib/object/Optional";

import type { BabelIntegrationPresetEnvOptions } from "./BabelIntegrationPresetEnvOptions";
import type { BabelIntegrationPresetEnvResolvedOptions } from "./BabelIntegrationPresetEnvResolvedOptions";

export function resolveBabelIntegrationPresetEnvOptions(
  options?: Optional<BabelIntegrationPresetEnvOptions>,
): BabelIntegrationPresetEnvResolvedOptions
{
  options ??= {};

  return {
    overrides: options.overrides ?? {},
  };
}
