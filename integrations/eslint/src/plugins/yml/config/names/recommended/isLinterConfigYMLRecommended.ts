import type { Linter } from "eslint";

import { LINTER_CONFIG_NAME_PREFIX_YML_RECOMMENDED } from "./LINTER_CONFIG_NAME_PREFIX_YML_RECOMMENDED";

export function isLinterConfigYMLRecommended(
  config: Linter.Config,
): boolean
{
  return (
    config.name?.startsWith(
      LINTER_CONFIG_NAME_PREFIX_YML_RECOMMENDED,
    )
    ?? false
  );
}
