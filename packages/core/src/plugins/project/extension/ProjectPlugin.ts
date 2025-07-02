import type { Context } from "../../../context/Context";
import type { ContextAsync } from "../../../context/ContextAsync";
import type { ContextSync } from "../../../context/ContextSync";
import { AbstractExtension } from "../../../extension/AbstractExtension";
import { maybeBindExtensionHookAsync } from "../../../extension/hook/binder/maybeBindExtensionHookAsync";
import { maybeBindExtensionHookSync } from "../../../extension/hook/binder/maybeBindExtensionHookSync";
import type { Optional } from "../../../lib/object/Optional";
import type { Path } from "../../../lib/path/Path";
import type { PathLike } from "../../../lib/path/PathLike";
import type { RecursiveSubWorkspaceResolverCallbackMaybeAsync } from "../../workspace/extension/facets/recursive-sub-workspace-resolver/callbacks/RecursiveSubWorkspaceResolverCallbackMaybeAsync";
import type { RecursiveSubWorkspaceResolverCallbackSync } from "../../workspace/extension/facets/recursive-sub-workspace-resolver/callbacks/RecursiveSubWorkspaceResolverCallbackSync";
import { createResolveCurrentProjectHookAsync } from "../hooks/resolve-current-project/createResolveCurrentProjectHookAsync";
import { createResolveCurrentProjectHookSync } from "../hooks/resolve-current-project/createResolveCurrentProjectHookSync";
import { createResolveProjectHookAsync } from "../hooks/resolve-project/createResolveProjectHookAsync";
import { createResolveProjectHookSync } from "../hooks/resolve-project/createResolveProjectHookSync";
import type { Project } from "../models/Project";

import { CurrentProjectRecursiveWorkspaceResolverFacet } from "./facets/current-project-recursive-workspace-resolver/CurrentProjectRecursiveWorkspaceResolverFacet";
import { CurrentProjectResolverFacet } from "./facets/current-project-resolver/CurrentProjectResolverFacet";
import { ProjectRecursiveWorkspaceResolverFacet } from "./facets/project-recursive-workspace-resolver/ProjectRecursiveWorkspaceResolverFacet";
import { ProjectResolverFacet } from "./facets/project-resolver/ProjectResolverFacet";
import type { ProjectPluginFacets } from "./ProjectPluginFacets";
import { SYSTEM_PLUGIN_UID_PROJECT } from "./SYSTEM_PLUGIN_UID_PROJECT";

export class ProjectPlugin extends AbstractExtension
{
  readonly $uid = SYSTEM_PLUGIN_UID_PROJECT;

  readonly contextAndPathToProjectMapping: WeakMap<readonly [Context, Path], Optional<Project>>;

  readonly contextToCurrentProjectMapping: WeakMap<Context, Optional<Project>>;

  readonly facets: ProjectPluginFacets;

  constructor()
  {
    super();

    this.contextAndPathToProjectMapping = new WeakMap();
    this.contextToCurrentProjectMapping = new WeakMap();

    this.facets = {
      currentProjectRecursiveWorkspaceResolver: new CurrentProjectRecursiveWorkspaceResolverFacet(),
      currentProjectResolver: new CurrentProjectResolverFacet(),
      projectRecursiveWorkspaceResolver: new ProjectRecursiveWorkspaceResolverFacet(),
      projectResolver: new ProjectResolverFacet(),
    };
  }

  async $setup(
    context: ContextAsync,
  ): Promise<void>
  {
    await maybeBindExtensionHookAsync(
      context,
      this,
      createResolveProjectHookAsync(),
    );

    await maybeBindExtensionHookAsync(
      context,
      this,
      createResolveCurrentProjectHookAsync(),
    );
  }

  $setupSync(
    context: ContextSync,
  ): void
  {
    maybeBindExtensionHookSync(
      context,
      this,
      createResolveProjectHookSync(),
    );

    maybeBindExtensionHookSync(
      context,
      this,
      createResolveCurrentProjectHookSync(),
    );
  }

  async resolveCurrentProject(
    context: ContextAsync,
  ): Promise<Project>
  {
    return await this.facets.currentProjectResolver.resolve(context);
  }

  resolveCurrentProjectSync(
    context: ContextSync,
  ): Project
  {
    return this.facets.currentProjectResolver.resolveSync(context);
  }

  async resolveProjectByPath(
    context: ContextAsync,
    projectPathLike: PathLike,
  ): Promise<Project>
  {
    return await this.facets.projectResolver.resolveByPath(
      context,
      projectPathLike,
    );
  }

  resolveProjectByPathSync(
    context: ContextSync,
    projectPathLike: PathLike,
  ): Project
  {
    return this.facets.projectResolver.resolveByPathSync(
      context,
      projectPathLike,
    );
  }

  async resolveWorkspacesByCurrentProjectRecursively(
    context: ContextAsync,
    callback: RecursiveSubWorkspaceResolverCallbackMaybeAsync,
  ): Promise<void>
  {
    await this.facets.currentProjectRecursiveWorkspaceResolver.resolve(
      context,
      callback,
    );
  }

  resolveWorkspacesByCurrentProjectRecursivelySync(
    context: ContextSync,
    callback: RecursiveSubWorkspaceResolverCallbackSync,
  ): void
  {
    this.facets.currentProjectRecursiveWorkspaceResolver.resolveSync(
      context,
      callback,
    );
  }

  async resolveWorkspacesByPathRecursively(
    context: ContextAsync,
    projectPathLike: PathLike,
    callback: RecursiveSubWorkspaceResolverCallbackMaybeAsync,
  ): Promise<void>
  {
    await this.facets.projectRecursiveWorkspaceResolver.resolveByPath(
      context,
      projectPathLike,
      callback,
    );
  }

  resolveWorkspacesByPathRecursivelySync(
    context: ContextSync,
    projectPathLike: PathLike,
    callback: RecursiveSubWorkspaceResolverCallbackSync,
  ): void
  {
    this.facets.projectRecursiveWorkspaceResolver.resolveByPathSync(
      context,
      projectPathLike,
      callback,
    );
  }
}
