import { AsyncParallelHook } from "tapable";

import type { Config } from "../../config";
import type { Context } from "../../context";

export const HOOK_NAME_RESOLVE_CONFIG = "resolveConfig";

export type ResolveConfigHook = AsyncParallelHook<ResolveConfigHookParameters, void>;

export type ResolveConfigHookParameters = [
  Context,
  Config,
];

export function createResolveConfigHook(): ResolveConfigHook
{
  return new AsyncParallelHook(
    [
      "context",
      "config",
    ] as const,
    HOOK_NAME_RESOLVE_CONFIG,
  );
}
