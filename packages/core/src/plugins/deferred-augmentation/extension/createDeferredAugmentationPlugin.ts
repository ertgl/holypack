import type { ExtensionFactoryOptions } from "../../../extension/factory/ExtensionFactoryOptions";
import type { Optional } from "../../../lib/object/Optional";

import { DeferredAugmentationPlugin } from "./DeferredAugmentationPlugin";

export function createDeferredAugmentationPlugin(
  options?: Optional<ExtensionFactoryOptions>,
): DeferredAugmentationPlugin
{
  return new DeferredAugmentationPlugin();
}
