import type { LinterConfigIndex } from "./LinterConfigIndex";
import type { LinterConfigPredicateMapping } from "./LinterConfigPredicateMapping";

export type LinterConfigPredicateResultMapping<
  T_PredicateMapping extends LinterConfigPredicateMapping = LinterConfigPredicateMapping,
> = {
  [K in keyof T_PredicateMapping]: Set<LinterConfigIndex>;
};
