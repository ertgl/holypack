import type { Optional } from "@holypack/core/lib/object/Optional";

import type { BabelIntegrationPluginImportSourceTransformerOptions } from "./BabelIntegrationPluginImportSourceTransformerOptions";
import type { BabelIntegrationPluginImportSourceTransformerResolvedOptions } from "./BabelIntegrationPluginImportSourceTransformerResolvedOptions";

export function resolveBabelIntegrationPluginImportSourceTransformerOptions(
  options?: Optional<BabelIntegrationPluginImportSourceTransformerOptions>,
): BabelIntegrationPluginImportSourceTransformerResolvedOptions
{
  options ??= {};

  return {
    overrides: options.overrides ?? {},
  };
}
