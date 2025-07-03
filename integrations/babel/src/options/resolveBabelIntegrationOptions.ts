import type { Optional } from "@holypack/core/lib/object/Optional";

import { MODULE_FORMAT_DEFAULT } from "../compilation/MODULE_FORMAT_DEFAULT";

import type { BabelIntegrationOptions } from "./BabelIntegrationOptions";
import type { BabelIntegrationResolvedOptions } from "./BabelIntegrationResolvedOptions";

export function resolveBabelIntegrationOptions(
  options?: Optional<BabelIntegrationOptions>,
): BabelIntegrationResolvedOptions
{
  options ??= {};

  return {
    format: options.format ?? MODULE_FORMAT_DEFAULT,
    overrides: options.overrides ?? {},
  };
}
