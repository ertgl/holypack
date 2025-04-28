import { AsyncParallelHook } from "tapable";

import type { TypeSafeConfig } from "../../config";
import type { TypeSafeContext } from "../context";

export const HOOK_NAME_SETUP = "@holypack/core#setup";

export type SetupHook = AsyncParallelHook<SetupHookParameters, void>;

export type SetupHookParameters = [
  TypeSafeContext,
  TypeSafeConfig,
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
