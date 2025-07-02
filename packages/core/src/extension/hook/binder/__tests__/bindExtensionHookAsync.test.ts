import { SyncBailHook } from "tapable";

import { resolveContextAsync } from "../../../../context/resolver/resolveContextAsync";
import type { Extension } from "../../../Extension";
import { bindExtensionHookAsync } from "../bindExtensionHookAsync";
import { ExtensionHasNoHookRegistryError } from "../errors/ExtensionHasNoHookRegistryError";
import { ExtensionHookIsAlreadyBoundError } from "../errors/ExtensionHookIsAlreadyBoundError";

describe(
  "bindExtensionHookAsync",
  () =>
  {
    it(
      "should throw `ExtensionHasNoHookRegistryError` if the extension has no hook registry",
      async () =>
      {
        const context = await resolveContextAsync({
          loadConfigFile: false,
        });

        const extension: Extension = {
          $uid: "test:sample",
        };

        const hook = new SyncBailHook<[], void>([], "test:sample");

        await expect(
          async () =>
          {
            await bindExtensionHookAsync(
              context,
              extension,
              hook,
            );
          },
        ).rejects.toThrow(
          ExtensionHasNoHookRegistryError,
        );
      },
    );

    it(
      "should throw `ExtensionHookIsAlreadyBoundError` if the hook is already bound",
      async () =>
      {
        const context = await resolveContextAsync({
          loadConfigFile: false,
        });

        const extension: Extension = {
          $hooks: new Map(),
          $uid: "test:sample",
        };

        const hook = new SyncBailHook<[], void>([], "test:sample");

        await bindExtensionHookAsync(
          context,
          extension,
          hook,
        );

        await expect(
          async () =>
          {
            await bindExtensionHookAsync(
              context,
              extension,
              hook,
            );
          },
        ).rejects.toThrow(
          ExtensionHookIsAlreadyBoundError,
        );
      },
    );
  },
);
