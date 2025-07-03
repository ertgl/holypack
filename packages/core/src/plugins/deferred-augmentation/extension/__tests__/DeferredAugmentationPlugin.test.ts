import { resolveContextAsync } from "../../../../context/resolver/resolveContextAsync";
import { resolveContextSync } from "../../../../context/resolver/resolveContextSync";
import { bindExtensionAsync } from "../../../../extension/binder/bindExtensionAsync";
import { bindExtensionSync } from "../../../../extension/binder/bindExtensionSync";
import { maybeBindExtensionAsync } from "../../../../extension/binder/maybeBindExtensionAsync";
import { maybeBindExtensionSync } from "../../../../extension/binder/maybeBindExtensionSync";
import type { ExtensionMaybeAsync } from "../../../../extension/ExtensionMaybeAsync";
import type { ExtensionSync } from "../../../../extension/ExtensionSync";
import { createDeferredAugmentationPlugin } from "../createDeferredAugmentationPlugin";

describe(
  "DeferredAugmentationPlugin",
  () =>
  {
    describe(
      "$postBindExtension",
      () =>
      {
        it(
          "should execute deferred context augmentation processes",
          async () =>
          {
            const extension1: ExtensionMaybeAsync = {
              $uid: "test:extension1",
            };

            const extension2: ExtensionMaybeAsync = {
              async $augmentContext(
                context,
              )
              {
                await bindExtensionAsync(
                  context,
                  extension1,
                );
              },
              $uid: "test:extension2",
            };

            const extension3: ExtensionMaybeAsync = {
              async $augmentContext(
                context,
              )
              {
                await bindExtensionAsync(
                  context,
                  extension2,
                );
              },
              $uid: "test:extension3",
            };

            const extension4: ExtensionMaybeAsync = {
              async $augmentContext(
                context,
              )
              {
                await bindExtensionAsync(
                  context,
                  extension3,
                );
              },
              $uid: "test:extension4",
            };

            const context = await resolveContextAsync({
              config: {
                extensions: [
                  extension4,
                ],
              },
              loadConfigFile: false,
            });

            await maybeBindExtensionAsync(
              context,
              createDeferredAugmentationPlugin(),
            );

            expect(context.extensions.has("test:extension1")).toBe(true);
            expect(context.extensions.has("test:extension2")).toBe(true);
            expect(context.extensions.has("test:extension3")).toBe(true);
            expect(context.extensions.has("test:extension4")).toBe(true);
          },
        );
      },
    );

    describe(
      "$postBindExtensionSync",
      () =>
      {
        it(
          "should execute deferred context augmentation processes synchronously",
          () =>
          {
            const extension1: ExtensionSync = {
              $uid: "test:extension1",
            };

            const extension2: ExtensionSync = {
              $augmentContextSync(
                context,
              )
              {
                bindExtensionSync(
                  context,
                  extension1,
                );
              },
              $uid: "test:extension2",
            };

            const extension3: ExtensionSync = {
              $augmentContextSync(
                context,
              )
              {
                bindExtensionSync(
                  context,
                  extension2,
                );
              },
              $uid: "test:extension3",
            };

            const extension4: ExtensionSync = {
              $augmentContextSync(
                context,
              )
              {
                bindExtensionSync(
                  context,
                  extension3,
                );
              },
              $uid: "test:extension4",
            };

            const context = resolveContextSync({
              config: {
                extensions: [
                  extension4,
                ],
              },
              loadConfigFile: false,
            });

            maybeBindExtensionSync(
              context,
              createDeferredAugmentationPlugin(),
            );

            expect(context.extensions.has("test:extension1")).toBe(true);
            expect(context.extensions.has("test:extension2")).toBe(true);
            expect(context.extensions.has("test:extension3")).toBe(true);
            expect(context.extensions.has("test:extension4")).toBe(true);
          },
        );
      },
    );
  },
);
