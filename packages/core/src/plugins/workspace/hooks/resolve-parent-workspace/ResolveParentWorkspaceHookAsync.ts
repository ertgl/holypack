import type { AsyncParallelHook } from "tapable";

import type { Workspace } from "../../models/Workspace";

export type ResolveParentWorkspaceHookAsync = AsyncParallelHook<
  [
    workspace: Workspace,
    parentWorkspace: null | Workspace,
  ]
>;
