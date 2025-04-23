import type {
  ResolvedWorkspace,
  WorkspacePackageName,
} from "./workspace";

export type WorkspaceRegistry = Map<WorkspacePackageName, ResolvedWorkspace>;

export function createWorkspaceRegistry(): WorkspaceRegistry
{
  return new Map();
}
