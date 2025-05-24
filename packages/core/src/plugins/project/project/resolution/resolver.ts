import {
  basename,
  isAbsolute as isAbsolutePath,
  resolve as resolvePath,
} from "node:path";

import type { StrictContext } from "../../../../context";
import { resolveCWD } from "../../../../lib/process/cwd";
import { requirePackageJSONByDirectoryPath } from "../../../package/utils/package-json-loader";
import type { ProjectHookSet } from "../../plugin/eventing";
import {
  HOOK_NAME_POST_RESOLVE_PROJECT,
  HOOK_NAME_RESOLVE_PROJECT,
} from "../../plugin/hooks";
import { findProjectRootPath } from "../../utils/project-root-path-finder";
import type { ResolvedProject } from "../project";

import { SubProjectPathIsNotDefinedError } from "./errors";
import type { ProjectResolutionOptions } from "./options";

export async function resolveProject(
  context: StrictContext,
  hooks: ProjectHookSet,
  options?: null | ProjectResolutionOptions,
): Promise<ResolvedProject>
{
  options ??= {};

  const cwd = resolveCWD(options.cwd);

  const projectConfig = options.project ?? {};

  let projectPath = projectConfig.path;
  if (!projectPath)
  {
    projectPath = await findProjectRootPath({
      cwd,
    });
  }

  const packageJSON = requirePackageJSONByDirectoryPath(projectPath);

  let projectName = projectConfig.name;
  if (!projectName)
  {
    projectName = basename(projectPath);
  }

  const subProjects: ResolvedProject[] = [];

  const project: Partial<ResolvedProject> = {
    name: projectName,
    packageJSON,
    path: projectPath,
    subProjects,
  };

  await hooks[HOOK_NAME_RESOLVE_PROJECT].promise(
    projectPath,
    project as unknown as ResolvedProject,
    projectConfig,
  );

  if (projectConfig.subProjects != null)
  {
    for (const subProjectConfig of projectConfig.subProjects)
    {
      const subProjectPath = subProjectConfig.path ?? "";
      if (!subProjectPath)
      {
        const err = new SubProjectPathIsNotDefinedError();
        throw err;
      }

      const subProjectAbsolutePath = (
        isAbsolutePath(subProjectPath)
          ? subProjectPath
          : resolvePath(projectPath, subProjectPath)
      );

      const subProject = await resolveProject(
        context,
        hooks,
        {
          ...options,
          cwd,
          project: {
            ...subProjectConfig,
            path: subProjectAbsolutePath,
          },
        },
      );

      subProjects.push(subProject);
    }
  }

  await hooks[HOOK_NAME_POST_RESOLVE_PROJECT].promise(
    project as ResolvedProject,
  );

  return project as ResolvedProject;
}
