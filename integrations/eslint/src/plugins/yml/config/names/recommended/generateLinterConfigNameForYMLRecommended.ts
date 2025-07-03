import { LINTER_CONFIG_NAME_PREFIX_YML_RECOMMENDED } from "./LINTER_CONFIG_NAME_PREFIX_YML_RECOMMENDED";

export function generateLinterConfigNameForYMLRecommended(
  configIdx: number,
): string
{
  return `${LINTER_CONFIG_NAME_PREFIX_YML_RECOMMENDED}[${String(configIdx)}]`;
}
