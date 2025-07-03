import type { AsyncParallelHook } from "tapable";

import type { Workspace } from "../../models/Workspace";

export type ResolveWorkspaceHookAsync = AsyncParallelHook<
  [
    workspace: Workspace,
  ]
>;
