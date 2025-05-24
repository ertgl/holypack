import { AsyncParallelHook } from "tapable";

import { PLUGIN_NAME_PROJECT } from "../../plugin-metadata";
import type { ResolvedProject } from "../../project";

export const HOOK_NAME_POST_RESOLVE_PROJECT = `${PLUGIN_NAME_PROJECT}#postResolveProject`;

export type PostResolveProjectHook = AsyncParallelHook<PostResolveProjectHookParameters, void>;

export type PostResolveProjectHookParameters = [
  ResolvedProject,
];

export function createPostResolveProjectHook(): PostResolveProjectHook
{
  return new AsyncParallelHook(
    [
      "project",
    ] as const,
    HOOK_NAME_POST_RESOLVE_PROJECT,
  );
}
