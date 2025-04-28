import type { ResolvedProject } from "../../project";

import type { RecursiveProjectIteratorOptions } from "./options";

export function* iterateProjectsRecursively(
  project: ResolvedProject,
  options?: null | RecursiveProjectIteratorOptions,
): Generator<ResolvedProject>
{
  options ??= {};

  const includeSelf = options.includeSelf ?? true;

  if (includeSelf)
  {
    yield project;
  }

  for (const subProject of project.subProjects)
  {
    yield subProject;

    yield* iterateProjectsRecursively(
      subProject,
      {
        ...options,
        includeSelf: false,
      },
    );
  }
}
