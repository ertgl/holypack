import { basename } from "node:path";

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
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "../../../../workspace/extension/SYSTEM_PLUGIN_UID_WORKSPACE";
import { PROJECT_HOOK_UID_RESOLVE_PROJECT_ASYNC } from "../../../hooks/resolve-project/PROJECT_HOOK_UID_RESOLVE_PROJECT_ASYNC";
import { PROJECT_HOOK_UID_RESOLVE_PROJECT_SYNC } from "../../../hooks/resolve-project/PROJECT_HOOK_UID_RESOLVE_PROJECT_SYNC";
import type { ResolveProjectHookAsync } from "../../../hooks/resolve-project/ResolveProjectHookAsync";
import type { ResolveProjectHookSync } from "../../../hooks/resolve-project/ResolveProjectHookSync";
import type { Project } from "../../../models/Project";
import { SYSTEM_PLUGIN_UID_PROJECT } from "../../SYSTEM_PLUGIN_UID_PROJECT";

export class ProjectResolverFacet
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
  ): Promise<Project>
  {
    const projectPath = this.#resolveProjectPath(
      context,
      projectPathLike,
    );

    const mutex = withMutexSync(
      this.rootMutex,
      () =>
      {
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

    return await withMutexAsync(
      mutex,
      this.resolveByPathWithoutMutex.bind(
        this,
        context,
        projectPath,
      ),
    );
  }

  resolveByPathSync(
    context: ContextSync,
    projectPathLike: PathLike,
  ): Project
  {
    const projectPath = this.#resolveProjectPath(
      context,
      projectPathLike,
    );

    const mutex = withMutexSync(
      this.rootMutex,
      () =>
      {
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

    return withMutexSync(
      mutex,
      this.resolveByPathWithoutMutexSync.bind(
        this,
        context,
        projectPath,
      ),
    );
  }

  async resolveByPathWithoutMutex(
    context: ContextAsync,
    projectPathLike: PathLike,
  ): Promise<Project>
  {
    const projectPlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_PROJECT,
    );

    const projectPath = this.#resolveProjectPath(
      context,
      projectPathLike,
    );

    const cacheKey = [context, projectPath] as const;

    let project = projectPlugin.contextAndPathToProjectMapping.get(
      cacheKey,
    );

    if (project != null)
    {
      return project;
    }

    const workspacePlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_WORKSPACE,
    );

    const projectWorkspace = await workspacePlugin.resolveWorkspaceByPath(
      context,
      projectPath,
    );

    const projectName = (
      (projectWorkspace.name as null | string | undefined)
      ?? basename(projectPath)
    );

    project = {
      name: projectName,
      path: projectPath,
      workspace: projectWorkspace,
    };

    projectPlugin.contextAndPathToProjectMapping.set(
      cacheKey,
      project,
    );

    await useExtensionHookAsync(
      projectPlugin,
      PROJECT_HOOK_UID_RESOLVE_PROJECT_ASYNC,
      async (
        hook: ResolveProjectHookAsync,
      ) =>
      {
        await hook.promise(project);
      },
    );

    return project;
  }

  resolveByPathWithoutMutexSync(
    context: ContextSync,
    projectPathLike: PathLike,
  ): Project
  {
    const projectPlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_PROJECT,
    );

    const projectPath = this.#resolveProjectPath(
      context,
      projectPathLike,
    );

    const cacheKey = [context, projectPath] as const;

    let project = projectPlugin.contextAndPathToProjectMapping.get(
      cacheKey,
    );

    if (project != null)
    {
      return project;
    }

    const workspacePlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_WORKSPACE,
    );

    const projectWorkspace = workspacePlugin.resolveWorkspaceByPathSync(
      context,
      projectPath,
    );

    const projectName = (
      (projectWorkspace.name as null | string | undefined)
      ?? basename(projectPath)
    );

    project = {
      name: projectName,
      path: projectPath,
      workspace: projectWorkspace,
    };

    projectPlugin.contextToCurrentProjectMapping.set(
      context,
      project,
    );

    useExtensionHookSync(
      projectPlugin,
      PROJECT_HOOK_UID_RESOLVE_PROJECT_SYNC,
      (
        hook: ResolveProjectHookSync,
      ) =>
      {
        hook.call(project);
      },
    );

    return project;
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
