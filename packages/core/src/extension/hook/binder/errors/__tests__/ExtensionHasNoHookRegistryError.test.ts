import type { Extension } from "../../../../Extension";
import { ERROR_EXTENSION_HAS_NO_HOOK_REGISTRY } from "../ERROR_EXTENSION_HAS_NO_HOOK_REGISTRY";
import { ExtensionHasNoHookRegistryError } from "../ExtensionHasNoHookRegistryError";

describe(
  "ExtensionHasNoHookRegistryError",
  () =>
  {
    it(
      "should create an error with the correct properties",
      () =>
      {
        const extension: Extension = {
          $uid: "test:sample",
        };

        const error = new ExtensionHasNoHookRegistryError(extension);

        expect(error.name).toBe(ERROR_EXTENSION_HAS_NO_HOOK_REGISTRY);
        expect(error.message).toBe("Extension has no hook registry");

        expect(error.extension).toBe(extension);
      },
    );
  },
);
