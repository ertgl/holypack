import type { SyncHook } from "tapable";

import type { Workspace } from "../../models/Workspace";

export type ResolveCurrentWorkspaceHookSync = SyncHook<
  [
    workspace: Workspace,
  ]
>;
