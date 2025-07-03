import type { CurrentProjectRecursiveWorkspaceResolverFacet } from "./facets/current-project-recursive-workspace-resolver/CurrentProjectRecursiveWorkspaceResolverFacet";
import type { CurrentProjectResolverFacet } from "./facets/current-project-resolver/CurrentProjectResolverFacet";
import type { ProjectRecursiveWorkspaceResolverFacet } from "./facets/project-recursive-workspace-resolver/ProjectRecursiveWorkspaceResolverFacet";
import type { ProjectResolverFacet } from "./facets/project-resolver/ProjectResolverFacet";

export type ProjectPluginFacets = {
  currentProjectRecursiveWorkspaceResolver: CurrentProjectRecursiveWorkspaceResolverFacet;
  currentProjectResolver: CurrentProjectResolverFacet;
  projectRecursiveWorkspaceResolver: ProjectRecursiveWorkspaceResolverFacet;
  projectResolver: ProjectResolverFacet;
};
