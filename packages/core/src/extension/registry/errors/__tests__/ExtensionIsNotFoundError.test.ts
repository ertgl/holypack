import { ERROR_EXTENSION_IS_NOT_FOUND } from "../ERROR_EXTENSION_IS_NOT_FOUND";
import { ExtensionIsNotFoundError } from "../ExtensionIsNotFoundError";

describe(
  "ExtensionIsNotFoundError",
  () =>
  {
    it(
      "should create an error with the correct properties",
      () =>
      {
        const extensionUID = "test:sample";

        const error = new ExtensionIsNotFoundError(extensionUID);

        expect(error.name).toBe(ERROR_EXTENSION_IS_NOT_FOUND);
        expect(error.message).toBe("Extension is not found");

        expect(error.extensionUID).toBe(extensionUID);
      },
    );
  },
);
