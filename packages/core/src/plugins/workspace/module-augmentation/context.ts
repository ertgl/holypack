import type { WorkspaceRegistry } from "../workspace-registry";

declare module "../../../context/context"
{
  interface ContextCustomProperties
  {
    workspaces?: null | WorkspaceRegistry;
  }

  interface ResolvedContextCustomProperties
  {
    workspaces: WorkspaceRegistry;
  }
}

export {};
