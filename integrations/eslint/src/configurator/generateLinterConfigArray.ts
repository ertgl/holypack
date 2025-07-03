import type { Linter } from "eslint";

import type { ESLintContext } from "../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../options/ESLintIntegrationResolvedOptions";

export function generateLinterConfigArray(
  eslintContext: ESLintContext,
  options: ESLintIntegrationResolvedOptions,
): Linter.Config[]
{
  return [];
}
