import type { SyncHook } from "tapable";

import type { Project } from "../../models/Project";

export type ResolveCurrentProjectHookSync = SyncHook<
  [
    project: Project,
  ]
>;
