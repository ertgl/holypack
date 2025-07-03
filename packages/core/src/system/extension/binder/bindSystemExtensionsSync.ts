import type { ContextSync } from "../../../context/ContextSync";
import { bindExtensionSync } from "../../../extension/binder/bindExtensionSync";
import type { ExtensionSync } from "../../../extension/ExtensionSync";
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

export function bindSystemExtensionsSync(
  context: ContextSync,
): SystemExtensions
{
  return {
    /* eslint-disable perfectionist/sort-objects */
    [SYSTEM_PLUGIN_UID_DEFERRED_AUGMENTATION]: bindAndReturnExtension(
      context,
      createDeferredAugmentationPlugin(),
    ),
    [SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR]: bindAndReturnExtension(
      context,
      createProcessWarningMonitorPlugin(),
    ),
    [SYSTEM_PLUGIN_UID_PACKAGE]: bindAndReturnExtension(
      context,
      createPackagePlugin(),
    ),
    [SYSTEM_PLUGIN_UID_WORKSPACE]: bindAndReturnExtension(
      context,
      createWorkspacePlugin(),
    ),
    [SYSTEM_PLUGIN_UID_PROJECT]: bindAndReturnExtension(
      context,
      createProjectPlugin(),
    ),
    /* eslint-enable perfectionist/sort-objects */
  };
}

function bindAndReturnExtension<
  T_Extension extends ExtensionSync,
>(
  context: ContextSync,
  extension: T_Extension,
): T_Extension
{
  if (context.extensions.has(extension.$uid))
  {
    return context.extensions.get(extension.$uid) as T_Extension;
  }

  bindExtensionSync(
    context,
    extension,
  );

  return extension;
}
