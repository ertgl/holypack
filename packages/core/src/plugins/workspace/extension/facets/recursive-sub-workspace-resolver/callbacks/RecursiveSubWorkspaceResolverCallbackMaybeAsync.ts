import type { MaybePromise } from "../../../../../../lib/promise/MaybePromise";
import type { Workspace } from "../../../../models/Workspace";

export type RecursiveSubWorkspaceResolverCallbackMaybeAsync = (
  workspace: Workspace,
) => MaybePromise<any>;
