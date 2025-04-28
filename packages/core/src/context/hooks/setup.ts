import { AsyncParallelHook } from "tapable";

import type { StrictConfig } from "../../config";
import type { StrictContext } from "../context";

export const HOOK_NAME_SETUP = "@holypack/core#setup";

export type SetupHook = AsyncParallelHook<SetupHookParameters, void>;

export type SetupHookParameters = [
  StrictContext,
  StrictConfig,
];

export function createSetupHook(): SetupHook
{
  return new AsyncParallelHook(
    [
      "context",
      "config",
    ] as const,
    HOOK_NAME_SETUP,
  );
}
