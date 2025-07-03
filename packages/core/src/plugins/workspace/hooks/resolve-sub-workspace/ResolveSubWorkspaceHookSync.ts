import type { SyncHook } from "tapable";

import type { Workspace } from "../../models/Workspace";

export type ResolveSubWorkspaceHookSync = SyncHook<
  [
    workspace: Workspace,
    subWorkspace: Workspace,
  ]
>;
