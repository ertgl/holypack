import type { AsyncParallelHook } from "tapable";

import type { Project } from "../../models/Project";

export type ResolveCurrentProjectHookAsync = AsyncParallelHook<
  [
    project: Project,
  ]
>;
