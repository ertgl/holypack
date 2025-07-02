import type { LinterConfigName } from "./LinterConfigName";
import type { LinterConfigPredicate } from "./LinterConfigPredicate";
import type { LinterConfigPredicateID } from "./LinterConfigPredicateID";

export type LinterConfigPredicateMapping = Record<
  LinterConfigPredicateID,
  LinterConfigName | LinterConfigPredicate
>;
