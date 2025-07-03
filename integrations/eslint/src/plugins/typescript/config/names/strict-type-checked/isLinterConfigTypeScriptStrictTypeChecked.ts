import type { Linter } from "eslint";

import { LINTER_CONFIG_NAME_PREFIX_TYPESCRIPT_STRICT_TYPE_CHECKED } from "./LINTER_CONFIG_NAME_PREFIX_TYPESCRIPT_STRICT_TYPE_CHECKED";

export function isLinterConfigTypeScriptStrictTypeChecked(
  config: Linter.Config,
): boolean
{
  return (
    config.name?.startsWith(
      LINTER_CONFIG_NAME_PREFIX_TYPESCRIPT_STRICT_TYPE_CHECKED,
    )
    ?? false
  );
}
