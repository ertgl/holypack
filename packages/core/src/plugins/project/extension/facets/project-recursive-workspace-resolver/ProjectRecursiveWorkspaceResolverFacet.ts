import type { Context } from "../../../../../context/Context";
import type { ContextAsync } from "../../../../../context/ContextAsync";
import type { ContextSync } from "../../../../../context/ContextSync";
import { useExtensionAsync } from "../../../../../extension/interop/useExtensionAsync";
import { useExtensionSync } from "../../../../../extension/interop/useExtensionSync";
import { createMutex } from "../../../../../lib/mutex/createMutex";
import type { Mutex } from "../../../../../lib/mutex/Mutex";
import { withMutexAsync } from "../../../../../lib/mutex/withMutexAsync";
import { withMutexSync } from "../../../../../lib/mutex/withMutexSync";
import { absolutifyPath } from "../../../../../lib/path/absolutifyPath";
import type { Path } from "../../../../../lib/path/Path";
import type { PathLike } from "../../../../../lib/path/PathLike";
import { requireSystemExtension } from "../../../../../system/extension/registry/requireSystemExtension";
import type { RecursiveSubWorkspaceResolverCallbackMaybeAsync } from "../../../../workspace/extension/facets/recursive-sub-workspace-resolver/callbacks/RecursiveSubWorkspaceResolverCallbackMaybeAsync";
import type { RecursiveSubWorkspaceResolverCallbackSync } from "../../../../workspace/extension/facets/recursive-sub-workspace-resolver/callbacks/RecursiveSubWorkspaceResolverCallbackSync";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "../../../../workspace/extension/SYSTEM_PLUGIN_UID_WORKSPACE";
import type { WorkspacePlugin } from "../../../../workspace/extension/WorkspacePlugin";
import { SYSTEM_PLUGIN_UID_PROJECT } from "../../SYSTEM_PLUGIN_UID_PROJECT";

export class ProjectRecursiveWorkspaceResolverFacet
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
    projectPathLike: PathLike,
    callback: RecursiveSubWorkspaceResolverCallbackMaybeAsync,
  ): Promise<void>
  {
    const mutex = withMutexSync(
      this.rootMutex,
      () =>
      {
        const projectPath = this.#resolveProjectPath(
          context,
          projectPathLike,
        );

        const cacheKey = [context, projectPath] as const;

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
        projectPathLike,
        callback,
      ),
    );
  }

  resolveByPathSync(
    context: ContextSync,
    projectPathLike: PathLike,
    callback: RecursiveSubWorkspaceResolverCallbackSync,
  ): void
  {
    const projectPath = this.#resolveProjectPath(
      context,
      projectPathLike,
    );

    const cacheKey = [context, projectPath] as const;

    const mutex = withMutexSync(
      this.rootMutex,
      () =>
      {
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
        projectPathLike,
        callback,
      ),
    );
  }

  async resolveByPathWithoutMutex(
    context: ContextAsync,
    projectPathLike: PathLike,
    callback: RecursiveSubWorkspaceResolverCallbackMaybeAsync,
  ): Promise<void>
  {
    const projectPlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_PROJECT,
    );

    const project = await projectPlugin.resolveProjectByPath(
      context,
      projectPathLike,
    );

    await useExtensionAsync(
      context,
      SYSTEM_PLUGIN_UID_WORKSPACE,
      async (
        workspacePlugin: WorkspacePlugin,
      ) =>
      {
        await workspacePlugin.resolveSubWorkspacesByPathRecursively(
          context,
          project.workspace.path,
          callback,
        );
      },
    );
  }

  resolveByPathWithoutMutexSync(
    context: ContextSync,
    projectPathLike: PathLike,
    callback: RecursiveSubWorkspaceResolverCallbackSync,
  ): void
  {
    const projectPlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_PROJECT,
    );

    const project = projectPlugin.resolveProjectByPathSync(
      context,
      projectPathLike,
    );

    useExtensionSync(
      context,
      SYSTEM_PLUGIN_UID_WORKSPACE,
      (
        workspacePlugin: WorkspacePlugin,
      ) =>
      {
        workspacePlugin.resolveSubWorkspacesByPathRecursivelySync(
          context,
          project.workspace.path,
          callback,
        );
      },
    );
  }

  #resolveProjectPath(
    context: Context,
    projectPathLike: PathLike,
  ): Path
  {
    return absolutifyPath(
      context.cwd,
      projectPathLike,
    );
  }
}
