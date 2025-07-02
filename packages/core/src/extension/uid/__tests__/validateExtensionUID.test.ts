import type { Extension } from "../../Extension";
import { ExtensionUIDIsNotDefinedError } from "../errors/ExtensionUIDIsNotDefinedError";
import { validateExtensionUID } from "../validateExtensionUID";

describe(
  "validateExtensionUID",
  () =>
  {
    it(
      "should throw an error if the extension UID is not defined",
      () =>
      {
        const extension: Extension = {
          $uid: "",
        };

        expect(
          () =>
          {
            validateExtensionUID(
              extension.$uid,
              extension,
            );
          },
        ).toThrow(
          ExtensionUIDIsNotDefinedError,
        );
      },
    );

    it(
      "should not throw any error if the extension UID is valid",
      () =>
      {
        const extension: Extension = {
          $uid: "test:sample",
        };

        expect(
          () =>
          {
            validateExtensionUID(
              extension.$uid,
              extension,
            );
          },
        ).not.toThrow();
      },
    );
  },
);
