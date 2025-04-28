import { AsyncParallelHook } from "tapable";

import { PLUGIN_NAME_PROJECT } from "../plugin-name";
import type {
  Project,
  ResolvedProject,
} from "../project";
import type { ProjectPath } from "../project/project-path";

export const HOOK_NAME_RESOLVE_PROJECT = `${PLUGIN_NAME_PROJECT}#resolveProject`;

export type ResolveProjectHook = AsyncParallelHook<ResolveProjectHookParameters, void>;

export type ResolveProjectHookParameters = [
  ProjectPath,
  ResolvedProject,
  Project,
];

export function createResolveProjectHook(): ResolveProjectHook
{
  return new AsyncParallelHook(
    [
      "projectPath",
      "project",
      "projectConfig",
    ] as const,
    HOOK_NAME_RESOLVE_PROJECT,
  );
}
