import type { Extension } from "../../../Extension";
import { ERROR_EXTENSION_UID_IS_NOT_DEFINED } from "../ERROR_EXTENSION_UID_IS_NOT_DEFINED";
import { ExtensionUIDIsNotDefinedError } from "../ExtensionUIDIsNotDefinedError";

describe(
  "ExtensionUIDIsNotDefinedError",
  () =>
  {
    it(
      "should create an error with the correct properties",
      () =>
      {
        const extension: Extension = {
          $uid: "test:sample",
        };

        const err = new ExtensionUIDIsNotDefinedError(extension);

        expect(err.name).toBe(ERROR_EXTENSION_UID_IS_NOT_DEFINED);
        expect(err.message).toBe("Extension UID is not defined");

        expect(err.extension).toBe(extension);
      },
    );
  },
);
