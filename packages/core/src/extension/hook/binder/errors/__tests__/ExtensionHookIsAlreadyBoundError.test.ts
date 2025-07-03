import { SyncBailHook } from "tapable";

import type { Extension } from "../../../../Extension";
import { ERROR_EXTENSION_HOOK_IS_ALREADY_BOUND } from "../ERROR_EXTENSION_HOOK_IS_ALREADY_BOUND";
import { ExtensionHookIsAlreadyBoundError } from "../ExtensionHookIsAlreadyBoundError";

describe(
  "ExtensionHookIsAlreadyBoundError",
  () =>
  {
    it(
      "should create an error with the correct properties",
      () =>
      {
        const extension: Extension = {
          $uid: "test:sample",
        };

        const hook = new SyncBailHook<[], void>([], "test:sample");

        const error = new ExtensionHookIsAlreadyBoundError(
          extension,
          hook,
        );

        expect(error.name).toBe(ERROR_EXTENSION_HOOK_IS_ALREADY_BOUND);
        expect(error.message).toBe("Extension hook is already bound");

        expect(error.extension).toBe(extension);
        expect(error.hook).toBe(hook);
      },
    );
  },
);
