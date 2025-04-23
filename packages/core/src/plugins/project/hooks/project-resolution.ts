import { AsyncParallelHook } from "tapable";

import type { Context } from "../../../context";

export const HOOK_NAME_PROJECT_RESOLUTION = "projectResolution";

export type ProjectResolutionHook = AsyncParallelHook<ProjectResolutionHookParameters, void>;

export type ProjectResolutionHookParameters = [
  Context,
];

export function createProjectResolutionHook(): ProjectResolutionHook
{
  return new AsyncParallelHook(
    [
      "context",
    ] as const,
    HOOK_NAME_PROJECT_RESOLUTION,
  );
}
