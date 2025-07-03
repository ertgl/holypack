import type { Linter } from "eslint";

import { evaluateLinterConfigPredicate } from "./evaluateLinterConfigPredicate";
import type { LinterConfigName } from "./LinterConfigName";
import type { LinterConfigPredicateMapping } from "./LinterConfigPredicateMapping";
import type { LinterConfigPredicateResultMapping } from "./LinterConfigPredicateResultMapping";

export function evaluateLinterConfigPredicates<
  T_PredicateMapping extends LinterConfigPredicateMapping,
  T_ReturnType extends LinterConfigPredicateResultMapping<T_PredicateMapping> = LinterConfigPredicateResultMapping<T_PredicateMapping>,
>(
  linterConfigArray: readonly Readonly<Linter.Config>[],
  predicates: LinterConfigPredicateMapping,
): T_ReturnType
{
  const results: LinterConfigPredicateResultMapping = Object.keys(
    predicates,
  ).reduce<LinterConfigPredicateResultMapping>(
    (
      acc,
      predicateID,
    ) =>
    {
      acc[predicateID] = new Set();
      return acc;
    },
    {},
  );

  if (
    linterConfigArray.length === 0
    || Object.keys(predicates).length === 0
  )
  {
    return results as T_ReturnType;
  }

  const passedConfigNames: Set<LinterConfigName> = new Set();

  for (
    let configIdx = 0;
    configIdx < linterConfigArray.length;
    configIdx++
  )
  {
    const config = linterConfigArray[configIdx];

    for (const predicateID of Object.keys(predicates))
    {
      const predicate = predicates[predicateID];

      const configName = (
        typeof predicate === "string"
          ? predicate
          : null
      );

      if (configName != null && passedConfigNames.has(configName))
      {
        continue;
      }

      const passed = evaluateLinterConfigPredicate(
        config,
        predicate,
      );

      if (passed)
      {
        results[predicateID].add(configIdx);

        if (config.name != null)
        {
          passedConfigNames.add(config.name);
        }
      }
    }
  }

  return results as T_ReturnType;
}
