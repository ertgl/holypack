import type { Linter } from "eslint";
import { AsyncParallelHook } from "tapable";

import type { TypeSafeContext } from "@holypack/core";

export const HOOK_NAME_ESLINT_CONFIG_GENERATION = "eslintConfigGeneration";

export type ESLintConfigGenerationHook = AsyncParallelHook<ESLintConfigGenerationHookParameters, void>;

export type ESLintConfigGenerationHookParameters = [
  TypeSafeContext,
  Linter.Config[],
];

export function createESLintConfigGenerationHook(): ESLintConfigGenerationHook
{
  return new AsyncParallelHook(
    [
      "context",
      "configs",
    ] as const,
    HOOK_NAME_ESLINT_CONFIG_GENERATION,
  );
}
