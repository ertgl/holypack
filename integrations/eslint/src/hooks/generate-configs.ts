import type { Linter } from "eslint";
import { AsyncParallelHook } from "tapable";

import type { StrictContext } from "@holypack/core";

import { INTEGRATION_NAME_ESLINT } from "../integration/integration-name";

export const HOOK_NAME_ESLINT_GENERATE_CONFIGS = `${INTEGRATION_NAME_ESLINT}#generateConfigs`;

export type GenerateESLintConfigsHook = AsyncParallelHook<GenerateESLintConfigsHookParameters, void>;

export type GenerateESLintConfigsHookParameters = [
  StrictContext,
  Linter.Config[],
];

export function createGenerateESLintConfigsHook(): GenerateESLintConfigsHook
{
  return new AsyncParallelHook(
    [
      "context",
      "configs",
    ] as const,
    HOOK_NAME_ESLINT_GENERATE_CONFIGS,
  );
}
