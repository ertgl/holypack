import type { ResolvedProject } from "../../../project";
import { iterateProjectsRecursively } from "../../../project/utils/recursive-project-iterator";
import type { ResolvedWorkspace } from "../../workspace";

import type { RecursiveWorkspaceIteratorOptions } from "./options";

export function* iterateWorkspacesRecursivelyByRootProject(
  project: ResolvedProject,
  options?: null | RecursiveWorkspaceIteratorOptions,
): Generator<ResolvedWorkspace>
{
  options ??= {};

  const excludeExternal = options.excludeExternal ?? false;

  const projectIterator = iterateProjectsRecursively(
    project,
    {
      includeSelf: true,
    },
  );

  for (const project of projectIterator)
  {
    if (!excludeExternal)
    {
      yield* project.workspaces.values();
    }
    else
    {
      for (const workspace of project.workspaces.values())
      {
        if (!workspace.isExternal)
        {
          yield workspace;
        }
      }
    }
  }
}
