import type { Config } from "jest";
import { AsyncParallelHook } from "tapable";

import { INTEGRATION_NAME_JEST } from "../../integration-metadata";

export const HOOK_NAME_JEST_POST_GENERATE_CONFIG = `${INTEGRATION_NAME_JEST}#postGenerateConfig`;

export type PostGenerateJestConfigHook = AsyncParallelHook<PostGenerateJestConfigHookParameters, void>;

export type PostGenerateJestConfigHookParameters = [
  Config,
];

export function createPostGenerateJestConfigHook(): PostGenerateJestConfigHook
{
  return new AsyncParallelHook(
    [
      "config",
    ] as const,
    HOOK_NAME_JEST_POST_GENERATE_CONFIG,
  );
}
