import type { Linter } from "eslint";

import type { LinterConfigName } from "./LinterConfigName";
import type { LinterConfigPredicate } from "./LinterConfigPredicate";

export function evaluateLinterConfigPredicate(
  config: Readonly<Linter.Config>,
  predicate: LinterConfigName | LinterConfigPredicate,
): boolean
{
  if (typeof predicate === "string")
  {
    return config.name === predicate;
  }

  return predicate(config);
}
