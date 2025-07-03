import type { Linter } from "eslint";

export type LinterConfigPredicate = (
  config: Linter.Config,
) => boolean;
