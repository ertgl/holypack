import type { Context } from "../../../../../context/Context";
import type { ContextAsync } from "../../../../../context/ContextAsync";
import type { ContextSync } from "../../../../../context/ContextSync";
import { createMutex } from "../../../../../lib/mutex/createMutex";
import type { Mutex } from "../../../../../lib/mutex/Mutex";
import { withMutexAsync } from "../../../../../lib/mutex/withMutexAsync";
import { withMutexSync } from "../../../../../lib/mutex/withMutexSync";
import { requireSystemExtension } from "../../../../../system/extension/registry/requireSystemExtension";
import type { RecursiveSubWorkspaceResolverCallbackMaybeAsync } from "../../../../workspace/extension/facets/recursive-sub-workspace-resolver/callbacks/RecursiveSubWorkspaceResolverCallbackMaybeAsync";
import type { RecursiveSubWorkspaceResolverCallbackSync } from "../../../../workspace/extension/facets/recursive-sub-workspace-resolver/callbacks/RecursiveSubWorkspaceResolverCallbackSync";
import { SYSTEM_PLUGIN_UID_PROJECT } from "../../SYSTEM_PLUGIN_UID_PROJECT";

export class CurrentProjectRecursiveWorkspaceResolverFacet
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
    callback: RecursiveSubWorkspaceResolverCallbackMaybeAsync,
  ): Promise<void>
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

    await withMutexAsync(
      mutex,
      this.resolveWithoutMutex.bind(
        this,
        context,
        callback,
      ),
    );
  }

  resolveSync(
    context: ContextSync,
    callback: RecursiveSubWorkspaceResolverCallbackSync,
  ): void
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

    withMutexSync(
      mutex,
      this.resolveWithoutMutexSync.bind(
        this,
        context,
        callback,
      ),
    );
  }

  async resolveWithoutMutex(
    context: ContextAsync,
    callback: RecursiveSubWorkspaceResolverCallbackMaybeAsync,
  ): Promise<void>
  {
    const projectPlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_PROJECT,
    );

    const currentProject = await projectPlugin.resolveCurrentProject(context);

    await projectPlugin.resolveWorkspacesByPathRecursively(
      context,
      currentProject.path,
      callback,
    );
  }

  resolveWithoutMutexSync(
    context: ContextSync,
    callback: RecursiveSubWorkspaceResolverCallbackSync,
  ): void
  {
    const projectPlugin = requireSystemExtension(
      context,
      SYSTEM_PLUGIN_UID_PROJECT,
    );

    const currentProject = projectPlugin.resolveCurrentProjectSync(context);

    projectPlugin.resolveWorkspacesByPathRecursivelySync(
      context,
      currentProject.path,
      callback,
    );
  }
}
