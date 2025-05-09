import type { Config } from "jest";
import { AsyncParallelHook } from "tapable";

import type { Context } from "@holypack/core";

import type { ConfigPreset } from "../../config/presets";
import { INTEGRATION_NAME_JEST } from "../../integration-metadata";

export const HOOK_NAME_JEST_GENERATE_CONFIG = `${INTEGRATION_NAME_JEST}#generateConfig`;

export type GenerateJestConfigHook = AsyncParallelHook<GenerateJestConfigHookParameters, void>;

export type GenerateJestConfigHookParameters = [
  Context,
  Config,
  ConfigPreset,
  Config | null | undefined,
];

export function createGenerateJestConfigHook(): GenerateJestConfigHook
{
  return new AsyncParallelHook(
    [
      "context",
      "config",
      "preset",
      "overrides",
    ] as const,
    HOOK_NAME_JEST_GENERATE_CONFIG,
  );
}
