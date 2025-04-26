import type { Linter } from "eslint";
import { AsyncParallelHook } from "tapable";

export const HOOK_NAME_ESLINT_POST_CONFIG_GENERATION = "eslintPostConfigGeneration";

export type ESLintPostConfigGenerationHook = AsyncParallelHook<ESLintPostConfigGenerationHookParameters, void>;

export type ESLintPostConfigGenerationHookParameters = [
  Linter.Config[],
];

export function createESLintPostConfigGenerationHook(): ESLintPostConfigGenerationHook
{
  return new AsyncParallelHook(
    [
      "configs",
    ] as const,
    HOOK_NAME_ESLINT_POST_CONFIG_GENERATION,
  );
}
