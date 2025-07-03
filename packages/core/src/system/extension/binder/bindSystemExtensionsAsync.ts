import type { ContextAsync } from "../../../context/ContextAsync";
import { bindExtensionAsync } from "../../../extension/binder/bindExtensionAsync";
import type { ExtensionMaybeAsync } from "../../../extension/ExtensionMaybeAsync";
import { createDeferredAugmentationPlugin } from "../../../plugins/deferred-augmentation/extension/createDeferredAugmentationPlugin";
import { SYSTEM_PLUGIN_UID_DEFERRED_AUGMENTATION } from "../../../plugins/deferred-augmentation/extension/SYSTEM_PLUGIN_UID_DEFERRED_AUGMENTATION";
import { createPackagePlugin } from "../../../plugins/package/extension/createPackagePlugin";
import { SYSTEM_PLUGIN_UID_PACKAGE } from "../../../plugins/package/extension/SYSTEM_PLUGIN_UID_PACKAGE";
import { createProcessWarningMonitorPlugin } from "../../../plugins/process/warning-monitor/extension/createProcessWarningMonitorPlugin";
import { SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR } from "../../../plugins/process/warning-monitor/extension/SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR";
import { createProjectPlugin } from "../../../plugins/project/extension/createProjectPlugin";
import { SYSTEM_PLUGIN_UID_PROJECT } from "../../../plugins/project/extension/SYSTEM_PLUGIN_UID_PROJECT";
import { createWorkspacePlugin } from "../../../plugins/workspace/extension/createWorkspacePlugin";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "../../../plugins/workspace/extension/SYSTEM_PLUGIN_UID_WORKSPACE";
import type { SystemExtensions } from "../SystemExtensions";

export async function bindSystemExtensionsAsync(
  context: ContextAsync,
): Promise<SystemExtensions>
{
  return {
    /* eslint-disable perfectionist/sort-objects */
    [SYSTEM_PLUGIN_UID_DEFERRED_AUGMENTATION]: await bindAndReturnExtension(
      context,
      createDeferredAugmentationPlugin(),
    ),
    [SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR]: await bindAndReturnExtension(
      context,
      createProcessWarningMonitorPlugin(),
    ),
    [SYSTEM_PLUGIN_UID_PACKAGE]: await bindAndReturnExtension(
      context,
      createPackagePlugin(),
    ),
    [SYSTEM_PLUGIN_UID_WORKSPACE]: await bindAndReturnExtension(
      context,
      createWorkspacePlugin(),
    ),
    [SYSTEM_PLUGIN_UID_PROJECT]: await bindAndReturnExtension(
      context,
      createProjectPlugin(),
    ),
    /* eslint-enable perfectionist/sort-objects */
  };
}

async function bindAndReturnExtension<
  T_Extension extends ExtensionMaybeAsync,
>(
  context: ContextAsync,
  extension: T_Extension,
): Promise<T_Extension>
{
  if (context.extensions.has(extension.$uid))
  {
    return context.extensions.get(extension.$uid) as T_Extension;
  }

  await bindExtensionAsync(
    context,
    extension,
  );

  return extension;
}
