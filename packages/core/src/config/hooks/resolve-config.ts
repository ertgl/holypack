import { AsyncParallelHook } from "tapable";

import type { TypeSafeContext } from "../../context";
import type { TypeSafeConfig } from "../config";

export const HOOK_NAME_RESOLVE_CONFIG = "@holypack/core#resolveConfig";

export type ResolveConfigHook = AsyncParallelHook<ResolveConfigHookParameters, void>;

export type ResolveConfigHookParameters = [
  TypeSafeContext,
  TypeSafeConfig,
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
