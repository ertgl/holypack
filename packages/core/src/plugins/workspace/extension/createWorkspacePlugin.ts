import type { ExtensionFactoryOptions } from "../../../extension/factory/ExtensionFactoryOptions";
import type { Optional } from "../../../lib/object/Optional";

import { WorkspacePlugin } from "./WorkspacePlugin";

export function createWorkspacePlugin(
  options?: Optional<ExtensionFactoryOptions>,
): WorkspacePlugin
{
  return new WorkspacePlugin();
}
