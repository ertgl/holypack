import { AsyncParallelHook } from "tapable";

import type { StrictContext } from "../../context";
import type { StrictConfig } from "../config";

export const HOOK_NAME_RESOLVE_CONFIG = "@holypack/core#resolveConfig";

export type ResolveConfigHook = AsyncParallelHook<ResolveConfigHookParameters, void>;

export type ResolveConfigHookParameters = [
  StrictContext,
  StrictConfig,
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
