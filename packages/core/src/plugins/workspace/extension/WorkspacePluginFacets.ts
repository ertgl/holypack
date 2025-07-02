import type { CurrentWorkspaceResolverFacet } from "./facets/current-workspace-resolver/CurrentWorkspaceResolverFacet";
import type { ParentWorkspaceResolverFacet } from "./facets/parent-workspace-resolver/ParentWorkspaceResolverFacet";
import type { RecursiveSubWorkspaceResolverFacet } from "./facets/recursive-sub-workspace-resolver/RecursiveSubWorkspaceResolverFacet";
import type { RootWorkspaceResolverFacet } from "./facets/root-workspace-resolver/RootWorkspaceResolverFacet";
import type { SubWorkspaceResolverFacet } from "./facets/sub-workspace-resolver/SubWorkspaceResolverFacet";
import type { WorkspaceResolverFacet } from "./facets/workspace-resolver/WorkspaceResolverFacet";

export type WorkspacePluginFacets = {
  currentWorkspaceResolver: CurrentWorkspaceResolverFacet;
  parentWorkspaceResolver: ParentWorkspaceResolverFacet;
  recursiveSubWorkspaceResolver: RecursiveSubWorkspaceResolverFacet;
  rootWorkspaceResolver: RootWorkspaceResolverFacet;
  subWorkspaceResolver: SubWorkspaceResolverFacet;
  workspaceResolver: WorkspaceResolverFacet;
};
