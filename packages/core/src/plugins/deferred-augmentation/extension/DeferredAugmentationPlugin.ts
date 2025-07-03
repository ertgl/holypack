import type { ContextAsync } from "../../../context/ContextAsync";
import type { ContextSync } from "../../../context/ContextSync";
import { AbstractExtension } from "../../../extension/AbstractExtension";
import type { ExtensionMaybeAsync } from "../../../extension/ExtensionMaybeAsync";
import type { ExtensionSync } from "../../../extension/ExtensionSync";
import { maybeAwait } from "../../../lib/promise/maybeAwait";

import { SYSTEM_PLUGIN_UID_DEFERRED_AUGMENTATION } from "./SYSTEM_PLUGIN_UID_DEFERRED_AUGMENTATION";

export class DeferredAugmentationPlugin extends AbstractExtension
{
  readonly $uid = SYSTEM_PLUGIN_UID_DEFERRED_AUGMENTATION;

  async $postBindExtension(
    context: ContextAsync,
    extension: ExtensionMaybeAsync,
  ): Promise<void>
  {
    if (extension.$augmentContext != null)
    {
      await maybeAwait(
        extension.$augmentContext(
          context,
        ),
      );
    }
  }

  $postBindExtensionSync(
    context: ContextSync,
    extension: ExtensionSync,
  ): void
  {
    if (extension.$augmentContextSync != null)
    {
      extension.$augmentContextSync(context);
    }
  }
}
