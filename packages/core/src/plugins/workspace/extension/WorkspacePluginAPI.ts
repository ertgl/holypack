import { findParentWorkspaceRootPathAsync } from "../utils/parent-root-finder/findParentWorkspaceRootPathAsync";
import { findParentWorkspaceRootPathSync } from "../utils/parent-root-finder/findParentWorkspaceRootPathSync";
import { findWorkspaceRootPathAsync } from "../utils/root-finder/findWorkspaceRootPathAsync";
import { findWorkspaceRootPathSync } from "../utils/root-finder/findWorkspaceRootPathSync";

export class WorkspacePluginAPI
{
  readonly findParentWorkspaceRootPath = findParentWorkspaceRootPathAsync;

  readonly findParentWorkspaceRootPathSync = findParentWorkspaceRootPathSync;

  readonly findWorkspaceRootPath = findWorkspaceRootPathAsync;

  readonly findWorkspaceRootPathSync = findWorkspaceRootPathSync;
}
