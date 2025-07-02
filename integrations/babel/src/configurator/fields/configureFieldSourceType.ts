import type { TransformOptions } from "@babel/core";

import type { BabelContext } from "../../context/BabelContext";
import type { BabelIntegrationResolvedOptions } from "../../options/BabelIntegrationResolvedOptions";

export function configureFieldSourceType(
  babelContext: BabelContext,
  options: BabelIntegrationResolvedOptions,
  transformOptions: TransformOptions,
): void
{
  transformOptions.sourceType = "unambiguous";
}
