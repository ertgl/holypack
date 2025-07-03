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
import type { ResolveParentWorkspaceHookAsync } from "../../../hooks/resolve-parent-workspace/ResolveParentWorkspaceHookAsync";
import type { ResolveParentWorkspaceHookSync } from "../../../hooks/resolve-parent-workspace/ResolveParentWorkspaceHookSync";
import { WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_ASYNC } from "../../../hooks/resolve-parent-workspace/WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_ASYNC";
import { WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_SYNC } from "../../../hooks/resolve-parent-workspace/WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_SYNC";
import type { Workspace } from "../../../models/Workspace";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "../../SYSTEM_PLUGIN_UID_WORKSPACE";

export class ParentWorkspaceResolverFacet
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
  ): Promise<null | Workspace>
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
  ): null | Workspace
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
  ): Promise<null | Workspace>
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

    let parentWorkspace = (
      workspacePlugin.contextAndPathToParentWorkspaceMapping.get(
        cacheKey,
      )
      ?? null
    );

    if (parentWorkspace != null)
    {
      return parentWorkspace;
    }

    const parentWorkspacePath = (
      (
        await workspacePlugin.api.findParentWorkspaceRootPath(
          workspacePath,
          {
            cwd: context.cwd,
            fs: context.fs,
          },
        )
      )
    );

    if (parentWorkspacePath != null)
    {
      parentWorkspace = await workspacePlugin.resolveWorkspaceByPath(
        context,
        parentWorkspacePath,
      );
    }

    workspacePlugin.contextAndPathToParentWorkspaceMapping.set(
      cacheKey,
      parentWorkspace,
    );

    await useExtensionHookAsync(
      workspacePlugin,
      WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_ASYNC,
      async (
        hook: ResolveParentWorkspaceHookAsync,
      ) =>
      {
        await hook.promise(
          workspace,
          parentWorkspace,
        );
      },
    );

    return parentWorkspace;
  }

  resolveByPathWithoutMutexSync(
    context: ContextSync,
    workspacePathLike: PathLike,
  ): null | Workspace
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

    let parentWorkspace = (
      workspacePlugin.contextAndPathToParentWorkspaceMapping.get(
        cacheKey,
      )
      ?? null
    );

    if (parentWorkspace != null)
    {
      return parentWorkspace;
    }

    const parentWorkspacePath = workspacePlugin.api.findParentWorkspaceRootPathSync(
      workspacePath,
      {
        cwd: context.cwd,
        fs: context.fs,
      },
    );

    if (parentWorkspacePath != null)
    {
      parentWorkspace = workspacePlugin.resolveWorkspaceByPathSync(
        context,
        parentWorkspacePath,
      );

      workspacePlugin.contextAndPathToParentWorkspaceMapping.set(
        cacheKey,
        parentWorkspace,
      );

      useExtensionHookSync(
        workspacePlugin,
        WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_SYNC,
        (
          hook: ResolveParentWorkspaceHookSync,
        ) =>
        {
          hook.call(
            workspace,
            parentWorkspace,
          );
        },
      );
    }

    return parentWorkspace;
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
