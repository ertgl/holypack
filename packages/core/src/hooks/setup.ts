import { AsyncParallelHook } from "tapable";

import type { Config } from "../config";
import type { Context } from "../context";

export const HOOK_NAME_SETUP = "setup";

export type SetupHook = AsyncParallelHook<SetupHookParameters, void>;

export type SetupHookParameters = [
  Context,
  Config,
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
