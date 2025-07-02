import type { Optional } from "@holypack/core/lib/object/Optional";

import type { BabelIntegrationPresetTypeScriptOptions } from "./BabelIntegrationPresetTypeScriptOptions";
import type { BabelIntegrationPresetTypeScriptResolvedOptions } from "./BabelIntegrationPresetTypeScriptResolvedOptions";

export function resolveBabelIntegrationPresetTypeScriptOptions(
  options?: Optional<BabelIntegrationPresetTypeScriptOptions>,
): BabelIntegrationPresetTypeScriptResolvedOptions
{
  options ??= {};

  return {
    overrides: options.overrides ?? {},
  };
}
