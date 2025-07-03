import type { Extension } from "../../../Extension";
import { ERROR_EXTENSION_IS_ALREADY_BOUND } from "../ERROR_EXTENSION_IS_ALREADY_BOUND";
import { ExtensionIsAlreadyBoundError } from "../ExtensionIsAlreadyBoundError";

describe(
  "ExtensionIsAlreadyBoundError",
  () =>
  {
    it(
      "should create an error with the correct properties",
      () =>
      {
        const extension: Extension = {
          $uid: "test:sample",
        };

        const error = new ExtensionIsAlreadyBoundError(extension);

        expect(error.name).toBe(ERROR_EXTENSION_IS_ALREADY_BOUND);
        expect(error.message).toBe("Extension is already bound");

        expect(error.extension).toBe(extension);
      },
    );
  },
);
