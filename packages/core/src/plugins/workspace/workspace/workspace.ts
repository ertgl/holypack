import type { PackageJSON } from "../../package";

export type ResolvedWorkspace = (
  & ResolvedWorkspaceBaseProperties
  & ResolvedWorkspaceCustomProperties
);

export type ResolvedWorkspaceBaseProperties = {
  isExternal: boolean;
  name: string;
  packageJSON: PackageJSON;
  path: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ResolvedWorkspaceCustomProperties
{}

export type Workspace = (
  & WorkspaceBaseProperties
  & WorkspaceCustomProperties
);

export type WorkspaceBaseProperties = {
  isExternal?: boolean | null;
  packageJSON?: null | PackageJSON;
  path?: null | string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WorkspaceCustomProperties
{}

export type WorkspacePackageName = string;
