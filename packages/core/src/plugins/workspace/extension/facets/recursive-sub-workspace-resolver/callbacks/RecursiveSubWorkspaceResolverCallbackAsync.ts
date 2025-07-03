import type { Workspace } from "../../../../models/Workspace";

export type RecursiveSubWorkspaceResolverCallbackAsync = (
  workspace: Workspace,
) => Promise<any>;
