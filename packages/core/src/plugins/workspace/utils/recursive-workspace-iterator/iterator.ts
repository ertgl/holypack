import type { ResolvedProject } from "../../../project";
import { iterateProjectsRecursively } from "../../../project/utils/recursive-project-iterator";
import type { ResolvedWorkspace } from "../../workspace";

export function* iterateWorkspacesRecursivelyByRootProject(
  project: ResolvedProject,
): Generator<ResolvedWorkspace>
{
  const projectIterator = iterateProjectsRecursively(
    project,
    {
      includeSelf: true,
    },
  );

  for (const project of projectIterator)
  {
    yield* project.workspaces.values();
  }
}
