import type { DeferredAugmentationPlugin } from "../../plugins/deferred-augmentation/extension/DeferredAugmentationPlugin";
import type { SYSTEM_PLUGIN_UID_DEFERRED_AUGMENTATION } from "../../plugins/deferred-augmentation/extension/SYSTEM_PLUGIN_UID_DEFERRED_AUGMENTATION";
import type { PackagePlugin } from "../../plugins/package/extension/PackagePlugin";
import type { SYSTEM_PLUGIN_UID_PACKAGE } from "../../plugins/package/extension/SYSTEM_PLUGIN_UID_PACKAGE";
import type { ProcessWarningMonitorPlugin } from "../../plugins/process/warning-monitor/extension/ProcessWarningMonitorPlugin";
import type { SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR } from "../../plugins/process/warning-monitor/extension/SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR";
import type { ProjectPlugin } from "../../plugins/project/extension/ProjectPlugin";
import type { SYSTEM_PLUGIN_UID_PROJECT } from "../../plugins/project/extension/SYSTEM_PLUGIN_UID_PROJECT";
import type { SYSTEM_PLUGIN_UID_WORKSPACE } from "../../plugins/workspace/extension/SYSTEM_PLUGIN_UID_WORKSPACE";
import type { WorkspacePlugin } from "../../plugins/workspace/extension/WorkspacePlugin";

export type SystemExtensions = {
  [SYSTEM_PLUGIN_UID_DEFERRED_AUGMENTATION]: DeferredAugmentationPlugin;
  [SYSTEM_PLUGIN_UID_PACKAGE]: PackagePlugin;
  [SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR]: ProcessWarningMonitorPlugin;
  [SYSTEM_PLUGIN_UID_PROJECT]: ProjectPlugin;
  [SYSTEM_PLUGIN_UID_WORKSPACE]: WorkspacePlugin;
};
