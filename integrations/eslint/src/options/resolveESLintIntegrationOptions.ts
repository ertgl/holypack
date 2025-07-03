import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationOptions } from "./ESLintIntegrationOptions";
import type { ESLintIntegrationResolvedOptions } from "./ESLintIntegrationResolvedOptions";

export function resolveESLintIntegrationOptions(
  options?: Optional<ESLintIntegrationOptions>,
): ESLintIntegrationResolvedOptions
{
  options ??= {};

  return {
    plugins: options.plugins ?? {},
  };
}
