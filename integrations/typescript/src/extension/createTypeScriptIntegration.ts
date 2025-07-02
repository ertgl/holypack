import type { ExtensionFactoryOptions } from "@holypack/core/extension/factory/ExtensionFactoryOptions";
import type { Optional } from "@holypack/core/lib/object/Optional";

import { TypeScriptIntegration } from "./TypeScriptIntegration";

export function createTypeScriptIntegration(
  options?: Optional<ExtensionFactoryOptions>,
): TypeScriptIntegration
{
  return new TypeScriptIntegration();
}
