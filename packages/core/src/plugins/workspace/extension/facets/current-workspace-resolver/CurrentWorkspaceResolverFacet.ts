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
import { CurrentWorkspaceRootPathIsNotFoundError } from "../../../errors/CurrentWorkspaceRootPathIsNotFoundError";
import type { ResolveCurrentWorkspaceHookAsync } from "../../../hooks/resolve-current-workspace/ResolveCurrentWorkspaceHookAsync";
import type { ResolveCurrentWorkspaceHookSync } from "../../../hooks/resolve-current-workspace/ResolveCurrentWorkspaceHookSync";
import { WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_ASYNC } from "../../../hooks/resolve-current-workspace/WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_ASYNC";
import { WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_SYNC } from "../../../hooks/resolve-current-workspace/WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_SYNC";
import type { Workspace } from "../../../models/Workspace";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "../../SYSTEM_PLUGIN_UID_WORKSPACE";

export class CurrentWorkspaceResolverFacet
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

    let currentWorkspace = workspacePlugin.contextToCurrentWorkspaceMapping.get(
      context,
    );

    if (currentWorkspace != null)
    {
      return currentWorkspace;
    }

    const workspaceRootPath = await workspacePlugin.api.findWorkspaceRootPath({
      cwd: context.cwd,
      fs: context.fs,
    });

    if (workspaceRootPath == null)
    {
      throw new CurrentWorkspaceRootPathIsNotFoundError();
    }

    currentWorkspace = await workspacePlugin.resolveWorkspaceByPath(
      context,
      workspaceRootPath,
    );

    workspacePlugin.contextToCurrentWorkspaceMapping.set(
      context,
      currentWorkspace,
    );

    await useExtensionHookAsync(
      workspacePlugin,
      WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_ASYNC,
      async (
        hook: ResolveCurrentWorkspaceHookAsync,
      ) =>
      {
        await hook.promise(currentWorkspace);
      },
    );

    return currentWorkspace;
  }

  resolveWithoutMutexSync(
    context: ContextSync,
  ): Workspace
  {
    const workspacePlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_WORKSPACE,
    );

    let currentWorkspace = workspacePlugin.contextToCurrentWorkspaceMapping.get(
      context,
    );

    if (currentWorkspace != null)
    {
      return currentWorkspace;
    }

    const workspaceRootPath = workspacePlugin.api.findWorkspaceRootPathSync({
      cwd: context.cwd,
      fs: context.fs,
    });

    if (workspaceRootPath == null)
    {
      throw new CurrentWorkspaceRootPathIsNotFoundError();
    }

    currentWorkspace = workspacePlugin.resolveWorkspaceByPathSync(
      context,
      workspaceRootPath,
    );

    workspacePlugin.contextToCurrentWorkspaceMapping.set(
      context,
      currentWorkspace,
    );

    useExtensionHookSync(
      workspacePlugin,
      WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_SYNC,
      (
        hook: ResolveCurrentWorkspaceHookSync,
      ) =>
      {
        hook.call(currentWorkspace);
      },
    );

    return currentWorkspace;
  }
}
