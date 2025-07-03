import type { Linter } from "eslint";
import type { AsyncParallelHook } from "tapable";

import type { ESLintContext } from "../../context/ESLintContext";
import type { ESLintIntegrationResolvedOptions } from "../../options/ESLintIntegrationResolvedOptions";

export type GenerateLinterConfigArrayHookAsync = AsyncParallelHook<
  [
    eslintContext: ESLintContext,
    eslintIntegrationOptions: ESLintIntegrationResolvedOptions,
    linterConfigArray: Linter.Config[],
  ]
>;
