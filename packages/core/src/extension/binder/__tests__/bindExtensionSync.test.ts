import { resolveContextSync } from "../../../context/resolver/resolveContextSync";
import type { Extension } from "../../Extension";
import { bindExtensionSync } from "../bindExtensionSync";
import { ExtensionIsAlreadyBoundError } from "../errors/ExtensionIsAlreadyBoundError";

describe(
  "bindExtensionSync",
  () =>
  {
    it(
      "should throw an error if the extension is already bound",
      () =>
      {
        const extension: Extension = {
          $uid: "test:sample",
        };

        const context = resolveContextSync({
          config: {
            extensions: [extension],
          },
          loadConfigFile: false,
        });

        expect(
          () =>
          {
            bindExtensionSync(
              context,
              extension,
            );
          },
        ).toThrow(
          ExtensionIsAlreadyBoundError,
        );
      },
    );
  },
);
