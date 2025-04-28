import { AsyncParallelHook } from "tapable";

import type {
  Project,
  ResolvedProject,
} from "../project";
import type { ProjectPath } from "../project/project-path";

export const HOOK_NAME_PROJECT_RESOLUTION = "projectResolution";

export type ProjectResolutionHook = AsyncParallelHook<ProjectResolutionHookParameters, void>;

export type ProjectResolutionHookParameters = [
  ProjectPath,
  ResolvedProject,
  Project,
];

export function createProjectResolutionHook(): ProjectResolutionHook
{
  return new AsyncParallelHook(
    [
      "projectPath",
      "project",
      "projectConfig",
    ] as const,
    HOOK_NAME_PROJECT_RESOLUTION,
  );
}
