import type { Context } from "../../../context/Context";
import type { ContextAsync } from "../../../context/ContextAsync";
import type { ContextSync } from "../../../context/ContextSync";
import { AbstractExtension } from "../../../extension/AbstractExtension";
import { maybeBindExtensionHookAsync } from "../../../extension/hook/binder/maybeBindExtensionHookAsync";
import { maybeBindExtensionHookSync } from "../../../extension/hook/binder/maybeBindExtensionHookSync";
import type { Optional } from "../../../lib/object/Optional";
import type { Path } from "../../../lib/path/Path";
import type { PathLike } from "../../../lib/path/PathLike";
import { createResolveCurrentWorkspaceHookAsync } from "../hooks/resolve-current-workspace/createResolveCurrentWorkspaceHookAsync";
import { createResolveCurrentWorkspaceHookSync } from "../hooks/resolve-current-workspace/createResolveCurrentWorkspaceHookSync";
import { createResolveParentWorkspaceHookAsync } from "../hooks/resolve-parent-workspace/createResolveParentWorkspaceHookAsync";
import { createResolveParentWorkspaceHookSync } from "../hooks/resolve-parent-workspace/createResolveParentWorkspaceHookSync";
import { createResolveRootWorkspaceHookAsync } from "../hooks/resolve-root-workspace/createResolveRootWorkspaceHookAsync";
import { createResolveRootWorkspaceHookSync } from "../hooks/resolve-root-workspace/createResolveRootWorkspaceHookSync";
import { createResolveSubWorkspaceHookAsync } from "../hooks/resolve-sub-workspace/createResolveSubWorkspaceHookAsync";
import { createResolveSubWorkspaceHookSync } from "../hooks/resolve-sub-workspace/createResolveSubWorkspaceHookSync";
import { createResolveWorkspaceHookAsync } from "../hooks/resolve-workspace/createResolveWorkspaceHookAsync";
import { createResolveWorkspaceHookSync } from "../hooks/resolve-workspace/createResolveWorkspaceHookSync";
import type { Workspace } from "../models/Workspace";

import { CurrentWorkspaceResolverFacet } from "./facets/current-workspace-resolver/CurrentWorkspaceResolverFacet";
import { ParentWorkspaceResolverFacet } from "./facets/parent-workspace-resolver/ParentWorkspaceResolverFacet";
import type { RecursiveSubWorkspaceResolverCallbackMaybeAsync } from "./facets/recursive-sub-workspace-resolver/callbacks/RecursiveSubWorkspaceResolverCallbackMaybeAsync";
import type { RecursiveSubWorkspaceResolverCallbackSync } from "./facets/recursive-sub-workspace-resolver/callbacks/RecursiveSubWorkspaceResolverCallbackSync";
import { RecursiveSubWorkspaceResolverFacet } from "./facets/recursive-sub-workspace-resolver/RecursiveSubWorkspaceResolverFacet";
import { RootWorkspaceResolverFacet } from "./facets/root-workspace-resolver/RootWorkspaceResolverFacet";
import { SubWorkspaceResolverFacet } from "./facets/sub-workspace-resolver/SubWorkspaceResolverFacet";
import { WorkspaceResolverFacet } from "./facets/workspace-resolver/WorkspaceResolverFacet";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "./SYSTEM_PLUGIN_UID_WORKSPACE";
import { WorkspacePluginAPI } from "./WorkspacePluginAPI";
import type { WorkspacePluginFacets } from "./WorkspacePluginFacets";

export class WorkspacePlugin extends AbstractExtension
{
  readonly $uid = SYSTEM_PLUGIN_UID_WORKSPACE;

  readonly api: WorkspacePluginAPI;

  readonly contextAndPathToParentWorkspaceMapping: WeakMap<readonly [Context, Path], Optional<Workspace>>;

  readonly contextAndPathToSubWorkspacesMapping: WeakMap<readonly [Context, Path], readonly Workspace[]>;

  readonly contextAndPathToWorkspaceMapping: WeakMap<readonly [Context, Path], Optional<Workspace>>;

  readonly contextToCurrentWorkspaceMapping: WeakMap<Context, Optional<Workspace>>;

  readonly contextToRootWorkspaceMapping: WeakMap<Context, Optional<Workspace>>;

  readonly facets: WorkspacePluginFacets;

  constructor()
  {
    super();

    this.api = new WorkspacePluginAPI();

    this.contextAndPathToParentWorkspaceMapping = new WeakMap();
    this.contextAndPathToSubWorkspacesMapping = new WeakMap();
    this.contextAndPathToWorkspaceMapping = new WeakMap();
    this.contextToCurrentWorkspaceMapping = new WeakMap();
    this.contextToRootWorkspaceMapping = new WeakMap();

    this.facets = {
      currentWorkspaceResolver: new CurrentWorkspaceResolverFacet(),
      parentWorkspaceResolver: new ParentWorkspaceResolverFacet(),
      recursiveSubWorkspaceResolver: new RecursiveSubWorkspaceResolverFacet(),
      rootWorkspaceResolver: new RootWorkspaceResolverFacet(),
      subWorkspaceResolver: new SubWorkspaceResolverFacet(),
      workspaceResolver: new WorkspaceResolverFacet(),
    };
  }

  async $setup(
    context: ContextAsync,
  ): Promise<void>
  {
    await maybeBindExtensionHookAsync(
      context,
      this,
      createResolveWorkspaceHookAsync(),
    );

    await maybeBindExtensionHookAsync(
      context,
      this,
      createResolveCurrentWorkspaceHookAsync(),
    );

    await maybeBindExtensionHookAsync(
      context,
      this,
      createResolveParentWorkspaceHookAsync(),
    );

    await maybeBindExtensionHookAsync(
      context,
      this,
      createResolveRootWorkspaceHookAsync(),
    );

    await maybeBindExtensionHookAsync(
      context,
      this,
      createResolveSubWorkspaceHookAsync(),
    );
  }

  $setupSync(
    context: ContextSync,
  ): void
  {
    maybeBindExtensionHookSync(
      context,
      this,
      createResolveWorkspaceHookSync(),
    );

    maybeBindExtensionHookSync(
      context,
      this,
      createResolveCurrentWorkspaceHookSync(),
    );

    maybeBindExtensionHookSync(
      context,
      this,
      createResolveParentWorkspaceHookSync(),
    );

    maybeBindExtensionHookSync(
      context,
      this,
      createResolveRootWorkspaceHookSync(),
    );

    maybeBindExtensionHookSync(
      context,
      this,
      createResolveSubWorkspaceHookSync(),
    );
  }

  async resolveCurrentWorkspace(
    context: ContextAsync,
  ): Promise<Workspace>
  {
    return await this.facets.currentWorkspaceResolver.resolve(context);
  }

  resolveCurrentWorkspaceSync(
    context: ContextSync,
  ): Workspace
  {
    return this.facets.currentWorkspaceResolver.resolveSync(context);
  }

  async resolveParentWorkspaceByPath(
    context: ContextAsync,
    workspacePathLike: PathLike,
  ): Promise<null | Workspace>
  {
    return await this.facets.parentWorkspaceResolver.resolveByPath(
      context,
      workspacePathLike,
    );
  }

  resolveParentWorkspaceByPathSync(
    context: ContextSync,
    workspacePathLike: PathLike,
  ): null | Workspace
  {
    return this.facets.parentWorkspaceResolver.resolveByPathSync(
      context,
      workspacePathLike,
    );
  }

  async resolveRootWorkspace(
    context: ContextAsync,
  ): Promise<Workspace>
  {
    return await this.facets.rootWorkspaceResolver.resolve(context);
  }

  resolveRootWorkspaceSync(
    context: ContextSync,
  ): Workspace
  {
    return this.facets.rootWorkspaceResolver.resolveSync(context);
  }

  async resolveSubWorkspacesByPath(
    context: ContextAsync,
    workspacePathLike: PathLike,
  ): Promise<Workspace[]>
  {
    return await this.facets.subWorkspaceResolver.resolveByPath(
      context,
      workspacePathLike,
    );
  }

  async resolveSubWorkspacesByPathRecursively(
    context: ContextAsync,
    workspacePathLike: PathLike,
    callback: RecursiveSubWorkspaceResolverCallbackMaybeAsync,
  ): Promise<void>
  {
    await this.facets.recursiveSubWorkspaceResolver.resolveByPath(
      context,
      workspacePathLike,
      callback,
    );
  }

  resolveSubWorkspacesByPathRecursivelySync(
    context: ContextSync,
    workspacePathLike: PathLike,
    callback: RecursiveSubWorkspaceResolverCallbackSync,
  ): void
  {
    this.facets.recursiveSubWorkspaceResolver.resolveByPathSync(
      context,
      workspacePathLike,
      callback,
    );
  }

  resolveSubWorkspacesByPathSync(
    context: ContextSync,
    workspacePathLike: PathLike,
  ): Workspace[]
  {
    return this.facets.subWorkspaceResolver.resolveByPathSync(
      context,
      workspacePathLike,
    );
  }

  async resolveWorkspaceByPath(
    context: ContextAsync,
    workspacePathLike: PathLike,
  ): Promise<Workspace>
  {
    return await this.facets.workspaceResolver.resolveByPath(
      context,
      workspacePathLike,
    );
  }

  resolveWorkspaceByPathSync(
    context: ContextSync,
    workspacePathLike: PathLike,
  ): Workspace
  {
    return this.facets.workspaceResolver.resolveByPathSync(
      context,
      workspacePathLike,
    );
  }
}
