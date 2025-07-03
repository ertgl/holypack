import type { Context } from "../../../../../context/Context";
import type { ContextAsync } from "../../../../../context/ContextAsync";
import type { ContextSync } from "../../../../../context/ContextSync";
import { useExtensionHookAsync } from "../../../../../extension/hook/interop/useExtensionHookAsync";
import { useExtensionHookSync } from "../../../../../extension/hook/interop/useExtensionHookSync";
import { createMutex } from "../../../../../lib/mutex/createMutex";
import type { Mutex } from "../../../../../lib/mutex/Mutex";
import { withMutexAsync } from "../../../../../lib/mutex/withMutexAsync";
import { withMutexSync } from "../../../../../lib/mutex/withMutexSync";
import { requireSystemExtension } from "../../../../../system/extension/registry/requireSystemExtension";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "../../../../workspace/extension/SYSTEM_PLUGIN_UID_WORKSPACE";
import { PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_ASYNC } from "../../../hooks/resolve-current-project/PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_ASYNC";
import { PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_SYNC } from "../../../hooks/resolve-current-project/PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_SYNC";
import type { ResolveCurrentProjectHookAsync } from "../../../hooks/resolve-current-project/ResolveCurrentProjectHookAsync";
import type { ResolveCurrentProjectHookSync } from "../../../hooks/resolve-current-project/ResolveCurrentProjectHookSync";
import type { Project } from "../../../models/Project";
import { SYSTEM_PLUGIN_UID_PROJECT } from "../../SYSTEM_PLUGIN_UID_PROJECT";

export class CurrentProjectResolverFacet
{
  readonly mutexes: WeakMap<Context, Mutex>;

  readonly rootMutex: Mutex;

  constructor()
  {
    this.mutexes = new WeakMap();
    this.rootMutex = createMutex();
  }

  async resolve(
    context: ContextAsync,
  ): Promise<Project>
  {
    const mutex = withMutexSync(
      this.rootMutex,
      () =>
      {
        let mutex = this.mutexes.get(context);

        if (mutex == null)
        {
          mutex = createMutex();

          this.mutexes.set(
            context,
            mutex,
          );
        }

        return mutex;
      },
    );

    return await withMutexAsync(
      mutex,
      this.resolveWithoutMutex.bind(
        this,
        context,
      ),
    );
  }

  resolveSync(
    context: ContextSync,
  ): Project
  {
    const mutex = withMutexSync(
      this.rootMutex,
      () =>
      {
        let mutex = this.mutexes.get(context);

        if (mutex == null)
        {
          mutex = createMutex();

          this.mutexes.set(
            context,
            mutex,
          );
        }

        return mutex;
      },
    );

    return withMutexSync(
      mutex,
      this.resolveWithoutMutexSync.bind(
        this,
        context,
      ),
    );
  }

  async resolveWithoutMutex(
    context: ContextAsync,
  ): Promise<Project>
  {
    const projectPlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_PROJECT,
    );

    let currentProject = (
      projectPlugin.contextToCurrentProjectMapping.get(
        context,
      )
      ?? null
    );

    if (currentProject != null)
    {
      return currentProject;
    }

    const workspacePlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_WORKSPACE,
    );

    const rootWorkspace = await workspacePlugin.resolveRootWorkspace(context);

    currentProject = await projectPlugin.resolveProjectByPath(
      context,
      rootWorkspace.path,
    );

    projectPlugin.contextToCurrentProjectMapping.set(
      context,
      currentProject,
    );

    await useExtensionHookAsync(
      projectPlugin,
      PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_ASYNC,
      async (
        hook: ResolveCurrentProjectHookAsync,
      ) =>
      {
        await hook.promise(currentProject);
      },
    );

    return currentProject;
  }

  resolveWithoutMutexSync(
    context: ContextSync,
  ): Project
  {
    const projectPlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_PROJECT,
    );

    let currentProject = projectPlugin.contextToCurrentProjectMapping.get(
      context,
    );

    if (currentProject != null)
    {
      return currentProject;
    }

    const workspacePlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_WORKSPACE,
    );

    const rootWorkspace = workspacePlugin.resolveRootWorkspaceSync(context);

    currentProject = projectPlugin.resolveProjectByPathSync(
      context,
      rootWorkspace.path,
    );

    projectPlugin.contextToCurrentProjectMapping.set(
      context,
      currentProject,
    );

    useExtensionHookSync(
      projectPlugin,
      PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_SYNC,
      (
        hook: ResolveCurrentProjectHookSync,
      ) =>
      {
        hook.call(currentProject);
      },
    );

    return currentProject;
  }
}
