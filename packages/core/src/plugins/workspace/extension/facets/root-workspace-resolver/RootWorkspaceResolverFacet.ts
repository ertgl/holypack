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
import type { ResolveRootWorkspaceHookAsync } from "../../../hooks/resolve-root-workspace/ResolveRootWorkspaceHookAsync";
import type { ResolveRootWorkspaceHookSync } from "../../../hooks/resolve-root-workspace/ResolveRootWorkspaceHookSync";
import { WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_ASYNC } from "../../../hooks/resolve-root-workspace/WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_ASYNC";
import { WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_SYNC } from "../../../hooks/resolve-root-workspace/WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_SYNC";
import type { Workspace } from "../../../models/Workspace";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "../../SYSTEM_PLUGIN_UID_WORKSPACE";

export class RootWorkspaceResolverFacet
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
  ): Promise<Workspace>
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
  ): Workspace
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
  ): Promise<Workspace>
  {
    const workspacePlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_WORKSPACE,
    );

    let rootWorkspace = workspacePlugin.contextToRootWorkspaceMapping.get(
      context,
    );

    if (rootWorkspace != null)
    {
      return rootWorkspace;
    }

    const currentWorkspace = await workspacePlugin.resolveCurrentWorkspace(
      context,
    );

    let currentPath = currentWorkspace.path;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true)
    {
      const parentWorkspace = await workspacePlugin.resolveParentWorkspaceByPath(
        context,
        currentPath,
      );

      if (parentWorkspace != null)
      {
        currentPath = parentWorkspace.path;
      }
      else
      {
        break;
      }
    }

    rootWorkspace = await workspacePlugin.resolveWorkspaceByPath(
      context,
      currentPath,
    );

    workspacePlugin.contextToRootWorkspaceMapping.set(
      context,
      rootWorkspace,
    );

    await useExtensionHookAsync(
      workspacePlugin,
      WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_ASYNC,
      async (
        hook: ResolveRootWorkspaceHookAsync,
      ) =>
      {
        await hook.promise(rootWorkspace);
      },
    );

    return rootWorkspace;
  }

  resolveWithoutMutexSync(
    context: ContextSync,
  ): Workspace
  {
    const workspacePlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_WORKSPACE,
    );

    let rootWorkspace = workspacePlugin.contextToRootWorkspaceMapping.get(
      context,
    );

    if (rootWorkspace != null)
    {
      return rootWorkspace;
    }

    const currentWorkspace = workspacePlugin.resolveCurrentWorkspaceSync(
      context,
    );

    let currentPath = currentWorkspace.path;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true)
    {
      const parentWorkspace = workspacePlugin.resolveParentWorkspaceByPathSync(
        context,
        currentPath,
      );

      if (parentWorkspace != null)
      {
        currentPath = parentWorkspace.path;
      }
      else
      {
        break;
      }
    }

    rootWorkspace = workspacePlugin.resolveWorkspaceByPathSync(
      context,
      currentPath,
    );

    workspacePlugin.contextToRootWorkspaceMapping.set(
      context,
      rootWorkspace,
    );

    useExtensionHookSync(
      workspacePlugin,
      WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_SYNC,
      (
        hook: ResolveRootWorkspaceHookSync,
      ) =>
      {
        hook.call(rootWorkspace);
      },
    );

    return rootWorkspace;
  }
}
