import type { Linter } from "eslint";
import { AsyncParallelHook } from "tapable";

import { INTEGRATION_NAME_ESLINT } from "../integration/integration-name";

export const HOOK_NAME_ESLINT_POST_GENERATE_CONFIGS = `${INTEGRATION_NAME_ESLINT}#postGenerateConfigs`;

export type PostGenerateESLintConfigsHook = AsyncParallelHook<PostGenerateESLintConfigsHookParameters, void>;

export type PostGenerateESLintConfigsHookParameters = [
  Linter.Config[],
];

export function createPostGenerateESLintConfigsHook(): PostGenerateESLintConfigsHook
{
  return new AsyncParallelHook(
    [
      "configs",
    ] as const,
    HOOK_NAME_ESLINT_POST_GENERATE_CONFIGS,
  );
}
