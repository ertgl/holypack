import { resolveContextAsync } from "../../../../context/resolver/resolveContextAsync";
import { resolveContextSync } from "../../../../context/resolver/resolveContextSync";
import { requireExtension } from "../../../../extension/registry/requireExtension";
import { createDeferredAugmentationPlugin } from "../createDeferredAugmentationPlugin";
import { DeferredAugmentationPlugin } from "../DeferredAugmentationPlugin";
import { SYSTEM_PLUGIN_UID_DEFERRED_AUGMENTATION } from "../SYSTEM_PLUGIN_UID_DEFERRED_AUGMENTATION";

describe(
  "createDeferredAugmentationPlugin",
  () =>
  {
    it(
      "can be used to register the `DeferredAugmentationPlugin` to `ContextAsync`",
      async () =>
      {
        const context = await resolveContextAsync({
          config: {
            extensions: [
              createDeferredAugmentationPlugin(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          SYSTEM_PLUGIN_UID_DEFERRED_AUGMENTATION,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(DeferredAugmentationPlugin);
      },
    );

    it(
      "can be used to register the `DeferredAugmentationPlugin` to `ContextSync`",
      () =>
      {
        const context = resolveContextSync({
          config: {
            extensions: [
              createDeferredAugmentationPlugin(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          SYSTEM_PLUGIN_UID_DEFERRED_AUGMENTATION,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(DeferredAugmentationPlugin);
      },
    );
  },
);
