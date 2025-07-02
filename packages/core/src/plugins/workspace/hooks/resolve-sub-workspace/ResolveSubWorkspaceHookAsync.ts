import type { AsyncParallelHook } from "tapable";

import type { Workspace } from "../../models/Workspace";

export type ResolveSubWorkspaceHookAsync = AsyncParallelHook<
  [
    workspace: Workspace,
    subWorkspace: Workspace,
  ]
>;
