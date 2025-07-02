import type { Optional } from "@holypack/core/lib/object/Optional";

import type { WebpackIntegrationOptions } from "./WebpackIntegrationOptions";
import type { WebpackIntegrationResolvedOptions } from "./WebpackIntegrationResolvedOptions";

export function resolveWebpackIntegrationOptions(
  options?: Optional<WebpackIntegrationOptions>,
): WebpackIntegrationResolvedOptions
{
  options ??= {};

  return {};
}
