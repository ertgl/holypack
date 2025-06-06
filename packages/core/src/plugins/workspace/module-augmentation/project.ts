import type {
  Workspace,
  WorkspacePackageName,
} from "../workspace";
import type { WorkspaceRegistry } from "../workspace-registry";

declare module "../../project/project/project"
{
  interface ProjectCustomProperties
  {
    workspaces?: null | Record<WorkspacePackageName, Workspace>;
  }

  interface ResolvedProjectCustomProperties
  {
    workspaces: WorkspaceRegistry;
  }
}

export {};
