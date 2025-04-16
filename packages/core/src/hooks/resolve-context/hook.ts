import { AsyncParallelHook } from "tapable";

import type { Context } from "../../context";
import type { ContextResolutionOptions } from "../../context-resolution-options";

export const HOOK_NAME_RESOLVE_CONTEXT = "resolveContext";

export type ResolveContextHook = AsyncParallelHook<ResolveContextHookParameters, void>;

export type ResolveContextHookParameters = [
  Context,
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
