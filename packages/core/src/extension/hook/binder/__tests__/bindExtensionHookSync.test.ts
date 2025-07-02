import { SyncBailHook } from "tapable";

import { resolveContextSync } from "../../../../context/resolver/resolveContextSync";
import type { Extension } from "../../../Extension";
import { bindExtensionHookSync } from "../bindExtensionHookSync";
import { ExtensionHasNoHookRegistryError } from "../errors/ExtensionHasNoHookRegistryError";
import { ExtensionHookIsAlreadyBoundError } from "../errors/ExtensionHookIsAlreadyBoundError";

describe(
  "bindExtensionHookSync",
  () =>
  {
    it(
      "should throw `ExtensionHasNoHookRegistryError` if the extension has no hook registry",
      () =>
      {
        const extension: Extension = {
          $uid: "test:sample",
        };

        const context = resolveContextSync({
          config: {
            extensions: [
              extension,
            ],
          },
          loadConfigFile: false,
        });

        const hook = new SyncBailHook<[], void>([], "test:sample");

        expect(
          () =>
          {
            bindExtensionHookSync(
              context,
              extension,
              hook,
            );
          },
        ).toThrow(
          ExtensionHasNoHookRegistryError,
        );
      },
    );

    it(
      "should throw `ExtensionHookIsAlreadyBoundError` if the hook is already bound",
      () =>
      {
        const extension: Extension = {
          $hooks: new Map(),
          $uid: "test:sample",
        };

        const context = resolveContextSync({
          config: {
            extensions: [
              extension,
            ],
          },
          loadConfigFile: false,
        });

        const hook = new SyncBailHook<[], void>([], "test:sample");

        bindExtensionHookSync(
          context,
          extension,
          hook,
        );

        expect(
          () =>
          {
            bindExtensionHookSync(
              context,
              extension,
              hook,
            );
          },
        ).toThrow(
          ExtensionHookIsAlreadyBoundError,
        );
      },
    );
  },
);
