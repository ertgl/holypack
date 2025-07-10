import type { TransformOptions } from "@babel/core";

import type { BabelContext } from "../../context/BabelContext";
import type { BabelConfiguratorResolvedOptions } from "../options/BabelConfiguratorResolvedOptions";

export function configureFieldSourceType(
  babelContext: BabelContext,
  options: BabelConfiguratorResolvedOptions,
  transformOptions: TransformOptions,
): void
{
  transformOptions.sourceType = "unambiguous";
}
