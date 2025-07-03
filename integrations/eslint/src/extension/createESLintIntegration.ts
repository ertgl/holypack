import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ESLintIntegrationOptions } from "../options/ESLintIntegrationOptions";

import { ESLintIntegration } from "./ESLintIntegration";

export function createESLintIntegration(
  options?: Optional<ESLintIntegrationOptions>,
): ESLintIntegration
{
  return new ESLintIntegration(options);
}
