import type { Context } from "../../../../../context/Context";
import type { ContextAsync } from "../../../../../context/ContextAsync";
import type { ContextSync } from "../../../../../context/ContextSync";
import { createMutex } from "../../../../../lib/mutex/createMutex";
import type { Mutex } from "../../../../../lib/mutex/Mutex";
import { withMutexAsync } from "../../../../../lib/mutex/withMutexAsync";
import { withMutexSync } from "../../../../../lib/mutex/withMutexSync";
import { absolutifyPath } from "../../../../../lib/path/absolutifyPath";
import type { Path } from "../../../../../lib/path/Path";
import type { PathLike } from "../../../../../lib/path/PathLike";
import { maybeAwait } from "../../../../../lib/promise/maybeAwait";
import { requireSystemExtension } from "../../../../../system/extension/registry/requireSystemExtension";
import type { Workspace } from "../../../models/Workspace";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "../../SYSTEM_PLUGIN_UID_WORKSPACE";

import type { RecursiveSubWorkspaceResolverCallbackMaybeAsync } from "./callbacks/RecursiveSubWorkspaceResolverCallbackMaybeAsync";
import type { RecursiveSubWorkspaceResolverCallbackSync } from "./callbacks/RecursiveSubWorkspaceResolverCallbackSync";

export class RecursiveSubWorkspaceResolverFacet
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
    callback: RecursiveSubWorkspaceResolverCallbackMaybeAsync,
  ): Promise<void>
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

    await withMutexAsync(
      mutex,
      this.resolveByPathWithoutMutex.bind(
        this,
        context,
        workspacePath,
        callback,
      ),
    );
  }

  resolveByPathSync(
    context: ContextSync,
    workspacePathLike: PathLike,
    callback: RecursiveSubWorkspaceResolverCallbackSync,
  ): void
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

    withMutexSync(
      mutex,
      this.resolveByPathWithoutMutexSync.bind(
        this,
        context,
        workspacePath,
        callback,
      ),
    );
  }

  async resolveByPathWithoutMutex(
    context: ContextAsync,
    workspacePathLike: PathLike,
    callback: RecursiveSubWorkspaceResolverCallbackMaybeAsync,
  ): Promise<void>
  {
    const workspacePlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_WORKSPACE,
    );

    const subWorkspaces = await workspacePlugin.resolveSubWorkspacesByPath(
      context,
      workspacePathLike,
    );

    const deferredWorkspaces: Workspace[] = [];

    for (const subWorkspace of subWorkspaces)
    {
      await maybeAwait(callback(subWorkspace));
      deferredWorkspaces.push(subWorkspace);
    }

    for (const deferredWorkspace of deferredWorkspaces)
    {
      await this.resolveByPathWithoutMutex(
        context,
        deferredWorkspace.path,
        callback,
      );
    }
  }

  resolveByPathWithoutMutexSync(
    context: ContextSync,
    workspacePathLike: PathLike,
    callback: RecursiveSubWorkspaceResolverCallbackSync,
  ): void
  {
    const workspacePlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_WORKSPACE,
    );

    const subWorkspaces = workspacePlugin.resolveSubWorkspacesByPathSync(
      context,
      workspacePathLike,
    );

    const deferredWorkspaces: Workspace[] = [];

    for (const subWorkspace of subWorkspaces)
    {
      callback(subWorkspace);
      deferredWorkspaces.push(subWorkspace);
    }

    for (const deferredWorkspace of deferredWorkspaces)
    {
      this.resolveByPathWithoutMutexSync(
        context,
        deferredWorkspace.path,
        callback,
      );
    }
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
