import { basename } from "node:path";

import type { Context } from "../../../../../context/Context";
import type { ContextAsync } from "../../../../../context/ContextAsync";
import type { ContextSync } from "../../../../../context/ContextSync";
import { useExtensionHookAsync } from "../../../../../extension/hook/interop/useExtensionHookAsync";
import { useExtensionHookSync } from "../../../../../extension/hook/interop/useExtensionHookSync";
import { useExtensionAsync } from "../../../../../extension/interop/useExtensionAsync";
import { useExtensionSync } from "../../../../../extension/interop/useExtensionSync";
import { createMutex } from "../../../../../lib/mutex/createMutex";
import type { Mutex } from "../../../../../lib/mutex/Mutex";
import { withMutexAsync } from "../../../../../lib/mutex/withMutexAsync";
import { withMutexSync } from "../../../../../lib/mutex/withMutexSync";
import { absolutifyPath } from "../../../../../lib/path/absolutifyPath";
import { joinPaths } from "../../../../../lib/path/joinPaths";
import type { Path } from "../../../../../lib/path/Path";
import type { PathLike } from "../../../../../lib/path/PathLike";
import { requireSystemExtension } from "../../../../../system/extension/registry/requireSystemExtension";
import type { PackagePlugin } from "../../../../package/extension/PackagePlugin";
import { SYSTEM_PLUGIN_UID_PACKAGE } from "../../../../package/extension/SYSTEM_PLUGIN_UID_PACKAGE";
import type { PackageJSON } from "../../../../package/models/PackageJSON";
import type { ResolveWorkspaceHookAsync } from "../../../hooks/resolve-workspace/ResolveWorkspaceHookAsync";
import type { ResolveWorkspaceHookSync } from "../../../hooks/resolve-workspace/ResolveWorkspaceHookSync";
import { WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_ASYNC } from "../../../hooks/resolve-workspace/WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_ASYNC";
import { WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_SYNC } from "../../../hooks/resolve-workspace/WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_SYNC";
import type { Workspace } from "../../../models/Workspace";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "../../SYSTEM_PLUGIN_UID_WORKSPACE";

export class WorkspaceResolverFacet
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
  ): Promise<Workspace>
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
  ): Workspace
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
  ): Promise<Workspace>
  {
    const workspacePlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_WORKSPACE,
    );

    const workspacePath = this.#resolveWorkspacePath(
      context,
      workspacePathLike,
    );

    const cacheKey = [context, workspacePath] as const;

    let workspace = workspacePlugin.contextAndPathToWorkspaceMapping.get(
      cacheKey,
    );

    if (workspace != null)
    {
      return workspace;
    }

    const packageJSONFilePath = joinPaths(
      workspacePath,
      "package.json",
    );

    const packageJSON = await useExtensionAsync(
      context,
      SYSTEM_PLUGIN_UID_PACKAGE,
      async (
        packagePlugin: PackagePlugin,
      ): Promise<null | PackageJSON> =>
      {
        return await packagePlugin.api.loadPackageJSONByFilePath(
          packageJSONFilePath,
          {
            fs: context.fs,
          },
        );
      },
    );

    const workspaceName = (
      (packageJSON?.name as null | string | undefined)
      ?? basename(workspacePath)
    );

    workspace = {
      name: workspaceName,
      packageJSON,
      path: workspacePath,
    };

    workspacePlugin.contextAndPathToWorkspaceMapping.set(
      cacheKey,
      workspace,
    );

    await useExtensionHookAsync(
      workspacePlugin,
      WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_ASYNC,
      async (
        hook: ResolveWorkspaceHookAsync,
      ) =>
      {
        await hook.promise(workspace);
      },
    );

    return workspace;
  }

  resolveByPathWithoutMutexSync(
    context: ContextSync,
    workspacePathLike: PathLike,
  ): Workspace
  {
    const workspacePlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_WORKSPACE,
    );

    const workspacePath = this.#resolveWorkspacePath(
      context,
      workspacePathLike,
    );

    const cacheKey = [context, workspacePath] as const;

    let workspace = workspacePlugin.contextAndPathToWorkspaceMapping.get(
      cacheKey,
    );

    if (workspace != null)
    {
      return workspace;
    }

    const packageJSONFilePath = joinPaths(
      workspacePath,
      "package.json",
    );

    const packageJSON = useExtensionSync(
      context,
      SYSTEM_PLUGIN_UID_PACKAGE,
      (
        packagePlugin: PackagePlugin,
      ): null | PackageJSON =>
      {
        return packagePlugin.api.loadPackageJSONByFilePathSync(
          packageJSONFilePath,
          {
            fs: context.fs,
          },
        );
      },
    );

    const workspaceName = (
      (packageJSON?.name as null | string | undefined)
      ?? basename(workspacePath)
    );

    workspace = {
      name: workspaceName,
      packageJSON,
      path: workspacePath,
    };

    workspacePlugin.contextAndPathToWorkspaceMapping.set(
      cacheKey,
      workspace,
    );

    useExtensionHookSync(
      workspacePlugin,
      WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_SYNC,
      (
        hook: ResolveWorkspaceHookSync,
      ) =>
      {
        hook.call(workspace);
      },
    );

    return workspace;
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
