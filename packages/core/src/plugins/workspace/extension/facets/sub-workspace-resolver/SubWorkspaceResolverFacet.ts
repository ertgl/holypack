import type { Context } from "../../../../../context/Context";
import type { ContextAsync } from "../../../../../context/ContextAsync";
import type { ContextSync } from "../../../../../context/ContextSync";
import { useExtensionHookAsync } from "../../../../../extension/hook/interop/useExtensionHookAsync";
import { useExtensionHookSync } from "../../../../../extension/hook/interop/useExtensionHookSync";
import { createMutex } from "../../../../../lib/mutex/createMutex";
import type { Mutex } from "../../../../../lib/mutex/Mutex";
import { withMutexAsync } from "../../../../../lib/mutex/withMutexAsync";
import { withMutexSync } from "../../../../../lib/mutex/withMutexSync";
import { absolutifyPath } from "../../../../../lib/path/absolutifyPath";
import type { Path } from "../../../../../lib/path/Path";
import type { PathLike } from "../../../../../lib/path/PathLike";
import { requireSystemExtension } from "../../../../../system/extension/registry/requireSystemExtension";
import { extractWorkspaceGlobPatterns } from "../../../../package/utils/workspace-glob-pattern-extractor/extractWorkspaceGlobPatterns";
import type { ResolveSubWorkspaceHookAsync } from "../../../hooks/resolve-sub-workspace/ResolveSubWorkspaceHookAsync";
import type { ResolveSubWorkspaceHookSync } from "../../../hooks/resolve-sub-workspace/ResolveSubWorkspaceHookSync";
import { WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_ASYNC } from "../../../hooks/resolve-sub-workspace/WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_ASYNC";
import { WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_SYNC } from "../../../hooks/resolve-sub-workspace/WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_SYNC";
import type { Workspace } from "../../../models/Workspace";
import { findSubWorkspaceRootPathsAsync } from "../../../utils/sub-root-finder/findSubWorkspaceRootPathsAsync";
import { findSubWorkspaceRootPathsSync } from "../../../utils/sub-root-finder/findSubWorkspaceRootPathsSync";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "../../SYSTEM_PLUGIN_UID_WORKSPACE";

export class SubWorkspaceResolverFacet
{
  readonly mutexes: WeakMap<readonly [Context, Path], Mutex>;

  readonly rootMutex: Mutex;

  constructor()
  {
    this.mutexes = new WeakMap();
    this.rootMutex = createMutex();
  }

  async resolveByPath(
    context: ContextAsync,
    workspacePathLike: PathLike,
  ): Promise<Workspace[]>
  {
    const workspacePath = this.#resolveWorkspacePath(
      context,
      workspacePathLike,
    );

    const mutex = withMutexSync(
      this.rootMutex,
      () =>
      {
        const cacheKey = [context, workspacePath] as const;

        let mutex = this.mutexes.get(cacheKey);

        if (mutex == null)
        {
          mutex = createMutex();

          this.mutexes.set(
            cacheKey,
            mutex,
          );
        }

        return mutex;
      },
    );

    return await withMutexAsync(
      mutex,
      this.resolveByPathWithoutMutex.bind(
        this,
        context,
        workspacePath,
      ),
    );
  }

  resolveByPathSync(
    context: ContextSync,
    workspacePathLike: PathLike,
  ): Workspace[]
  {
    const workspacePath = this.#resolveWorkspacePath(
      context,
      workspacePathLike,
    );

    const mutex = withMutexSync(
      this.rootMutex,
      () =>
      {
        const cacheKey = [context, workspacePath] as const;

        let mutex = this.mutexes.get(cacheKey);

        if (mutex == null)
        {
          mutex = createMutex();

          this.mutexes.set(
            cacheKey,
            mutex,
          );
        }

        return mutex;
      },
    );

    return withMutexSync(
      mutex,
      this.resolveByPathWithoutMutexSync.bind(
        this,
        context,
        workspacePath,
      ),
    );
  }

  async resolveByPathWithoutMutex(
    context: ContextAsync,
    workspacePathLike: PathLike,
  ): Promise<Workspace[]>
  {
    const workspacePlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_WORKSPACE,
    );

    const workspacePath = this.#resolveWorkspacePath(
      context,
      workspacePathLike,
    );

    const workspace = await workspacePlugin.resolveWorkspaceByPath(
      context,
      workspacePath,
    );

    const cacheKey = [context, workspacePath] as const;

    const cachedSubWorkspaces = (
      workspacePlugin.contextAndPathToSubWorkspacesMapping.get(
        cacheKey,
      )
      ?? null
    );

    if (cachedSubWorkspaces != null)
    {
      return [...cachedSubWorkspaces];
    }

    if (workspace.packageJSON == null)
    {
      return [];
    }

    const subWorkspaceGlobPattern = extractWorkspaceGlobPatterns(workspace.packageJSON);

    const subWorkspaceRootPaths = await findSubWorkspaceRootPathsAsync(
      workspace.path,
      {
        fs: context.fs,
        globPattern: subWorkspaceGlobPattern,
      },
    );

    const subWorkspaces: Workspace[] = [];

    for (const subWorkspaceRootPath of subWorkspaceRootPaths)
    {
      const subWorkspace = await workspacePlugin.resolveWorkspaceByPath(
        context,
        subWorkspaceRootPath,
      );

      subWorkspaces.push(subWorkspace);
    }

    workspacePlugin.contextAndPathToSubWorkspacesMapping.set(
      cacheKey,
      subWorkspaces,
    );

    await useExtensionHookAsync(
      workspacePlugin,
      WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_ASYNC,
      async (
        hook: ResolveSubWorkspaceHookAsync,
      ) =>
      {
        await Promise.all(
          subWorkspaces.map(
            (subWorkspace) => hook.promise(
              workspace,
              subWorkspace,
            ),
          ),
        );
      },
    );

    return [...subWorkspaces];
  }

  resolveByPathWithoutMutexSync(
    context: ContextSync,
    workspacePathLike: PathLike,
  ): Workspace[]
  {
    const workspacePlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_WORKSPACE,
    );

    const workspacePath = this.#resolveWorkspacePath(
      context,
      workspacePathLike,
    );

    const workspace = workspacePlugin.resolveWorkspaceByPathSync(
      context,
      workspacePath,
    );

    const cacheKey = [context, workspacePath] as const;

    const cachedSubWorkspaces = (
      workspacePlugin.contextAndPathToSubWorkspacesMapping.get(
        cacheKey,
      )
      ?? null
    );

    if (cachedSubWorkspaces != null)
    {
      return [...cachedSubWorkspaces];
    }

    if (workspace.packageJSON == null)
    {
      return [];
    }

    const subWorkspaceGlobPattern = extractWorkspaceGlobPatterns(workspace.packageJSON);

    const subWorkspaceRootPaths = findSubWorkspaceRootPathsSync(
      workspace.path,
      {
        fs: context.fs,
        globPattern: subWorkspaceGlobPattern,
      },
    );

    const subWorkspaces: Workspace[] = [];

    for (const subWorkspaceRootPath of subWorkspaceRootPaths)
    {
      const subWorkspace = workspacePlugin.resolveWorkspaceByPathSync(
        context,
        subWorkspaceRootPath,
      );

      subWorkspaces.push(subWorkspace);
    }

    workspacePlugin.contextAndPathToSubWorkspacesMapping.set(
      cacheKey,
      subWorkspaces,
    );

    useExtensionHookSync(
      workspacePlugin,
      WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_SYNC,
      (
        hook: ResolveSubWorkspaceHookSync,
      ) =>
      {
        for (const subWorkspace of subWorkspaces)
        {
          hook.call(
            workspace,
            subWorkspace,
          );
        }
      },
    );

    return [...subWorkspaces];
  }

  #resolveWorkspacePath(
    context: Context,
    workspacePathLike: PathLike,
  ): Path
  {
    return absolutifyPath(
      context.cwd,
      workspacePathLike,
    );
  }
}
