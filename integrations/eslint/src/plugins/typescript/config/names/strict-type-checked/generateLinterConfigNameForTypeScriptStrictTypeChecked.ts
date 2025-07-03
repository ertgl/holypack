import { LINTER_CONFIG_NAME_PREFIX_TYPESCRIPT_STRICT_TYPE_CHECKED } from "./LINTER_CONFIG_NAME_PREFIX_TYPESCRIPT_STRICT_TYPE_CHECKED";

export function generateLinterConfigNameForTypeScriptStrictTypeChecked(
  configIdx: number,
): string
{
  return `${LINTER_CONFIG_NAME_PREFIX_TYPESCRIPT_STRICT_TYPE_CHECKED}[${String(configIdx)}]`;
}
