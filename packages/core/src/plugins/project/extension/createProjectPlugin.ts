import type { ExtensionFactoryOptions } from "../../../extension/factory/ExtensionFactoryOptions";
import type { Optional } from "../../../lib/object/Optional";

import { ProjectPlugin } from "./ProjectPlugin";

export function createProjectPlugin(
  options?: Optional<ExtensionFactoryOptions>,
): ProjectPlugin
{
  return new ProjectPlugin();
}
