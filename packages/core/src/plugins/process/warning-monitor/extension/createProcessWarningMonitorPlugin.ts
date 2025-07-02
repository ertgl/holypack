import type { ExtensionFactoryOptions } from "../../../../extension/factory/ExtensionFactoryOptions";
import type { Optional } from "../../../../lib/object/Optional";

import { ProcessWarningMonitorPlugin } from "./ProcessWarningMonitorPlugin";

export function createProcessWarningMonitorPlugin(
  options?: Optional<ExtensionFactoryOptions>,
): ProcessWarningMonitorPlugin
{
  return new ProcessWarningMonitorPlugin();
}
