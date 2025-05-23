import { AsyncParallelHook } from "tapable";

import type { StrictContext } from "../context";
import type { ContextResolutionOptions } from "../resolution";

export const HOOK_NAME_RESOLVE_CONTEXT = "@holypack/core#resolveContext";

export type ResolveContextHook = AsyncParallelHook<ResolveContextHookParameters, void>;

export type ResolveContextHookParameters = [
  StrictContext,
  ContextResolutionOptions,
];

export function createResolveContextHook(): ResolveContextHook
{
  return new AsyncParallelHook(
    [
      "context",
      "options",
    ] as const,
    HOOK_NAME_RESOLVE_CONTEXT,
  );
}
