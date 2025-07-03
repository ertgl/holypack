import type { SyncHook } from "tapable";

import type { Workspace } from "../../models/Workspace";

export type ResolveParentWorkspaceHookSync = SyncHook<
  [
    workspace: Workspace,
    parentWorkspace: null | Workspace,
  ]
>;
