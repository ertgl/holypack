import { AsyncParallelHook } from "tapable";

import type { ResolvedContext } from "../../context";

export const HOOK_NAME_POST_RESOLVE_CONTEXT = "postPostResolveContext";

export type PostResolveContextHook = AsyncParallelHook<PostResolveContextHookParameters, void>;

export type PostResolveContextHookParameters = [
  ResolvedContext,
];

export function createPostResolveContextHook(): PostResolveContextHook
{
  return new AsyncParallelHook(
    [
      "context",
    ] as const,
    HOOK_NAME_POST_RESOLVE_CONTEXT,
  );
}
