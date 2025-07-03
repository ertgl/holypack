import type { ExtensionFactoryOptions } from "../../../extension/factory/ExtensionFactoryOptions";
import type { Optional } from "../../../lib/object/Optional";

import { PackagePlugin } from "./PackagePlugin";

export function createPackagePlugin(
  options?: Optional<ExtensionFactoryOptions>,
): PackagePlugin
{
  return new PackagePlugin();
}
