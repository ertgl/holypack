import type { Config } from "jest";
import { AsyncParallelHook } from "tapable";

import type { StrictContext } from "@holypack/core";

import { INTEGRATION_NAME_JEST } from "../integration/integration-name";
export const HOOK_NAME_JEST_GENERATE_CONFIG = `${INTEGRATION_NAME_JEST}#generateConfig`;

export type GenerateJestConfigHook = AsyncParallelHook<GenerateJestConfigHookParameters, void>;

export type GenerateJestConfigHookParameters = [
  StrictContext,
  Config,
];

export function createGenerateJestConfigHook(): GenerateJestConfigHook
{
  return new AsyncParallelHook(
    [
      "context",
      "config",
    ] as const,
    HOOK_NAME_JEST_GENERATE_CONFIG,
  );
}
