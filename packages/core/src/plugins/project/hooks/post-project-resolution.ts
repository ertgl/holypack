import { AsyncParallelHook } from "tapable";

import type { ResolvedProject } from "../project";

export const HOOK_NAME_POST_PROJECT_RESOLUTION = "postProjectResolution";

export type PostProjectResolutionHook = AsyncParallelHook<PostProjectResolutionHookParameters, void>;

export type PostProjectResolutionHookParameters = [
  ResolvedProject,
];

export function createPostProjectResolutionHook(): PostProjectResolutionHook
{
  return new AsyncParallelHook(
    [
      "project",
    ] as const,
    HOOK_NAME_POST_PROJECT_RESOLUTION,
  );
}
