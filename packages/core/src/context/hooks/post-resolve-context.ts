import { AsyncParallelHook } from "tapable";

import type { Context } from "../context";

export const HOOK_NAME_POST_RESOLVE_CONTEXT = "@holypack/core#postPostResolveContext";

export type PostResolveContextHook = AsyncParallelHook<PostResolveContextHookParameters, void>;

export type PostResolveContextHookParameters = [
  Context,
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
