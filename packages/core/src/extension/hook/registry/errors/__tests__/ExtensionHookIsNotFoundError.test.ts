import type { Extension } from "../../../../Extension";
import { ERROR_EXTENSION_HOOK_IS_NOT_FOUND } from "../ERROR_EXTENSION_HOOK_IS_NOT_FOUND";
import { ExtensionHookIsNotFoundError } from "../ExtensionHookIsNotFoundError";

describe(
  "ExtensionHookIsNotFoundError",
  () =>
  {
    it(
      "should create an error with the correct properties",
      () =>
      {
        const extension: Extension = {
          $uid: "test:sample",
        };

        const hookUID = "test:sample";

        const error = new ExtensionHookIsNotFoundError(
          extension,
          hookUID,
        );

        expect(error.name).toBe(ERROR_EXTENSION_HOOK_IS_NOT_FOUND);
        expect(error.message).toBe("Extension hook is not found");

        expect(error.extension).toBe(extension);
        expect(error.hookUID).toBe(hookUID);
      },
    );
  },
);
