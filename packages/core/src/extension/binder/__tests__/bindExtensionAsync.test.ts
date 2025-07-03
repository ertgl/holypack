import { resolveContextAsync } from "../../../context/resolver/resolveContextAsync";
import type { Extension } from "../../Extension";
import { bindExtensionAsync } from "../bindExtensionAsync";
import { ExtensionIsAlreadyBoundError } from "../errors/ExtensionIsAlreadyBoundError";

describe(
  "bindExtensionAsync",
  () =>
  {
    it(
      "should throw an error if the extension is already bound",
      async () =>
      {
        const extension: Extension = {
          $uid: "test:sample",
        };

        const context = await resolveContextAsync({
          config: {
            extensions: [extension],
          },
          loadConfigFile: false,
        });

        await expect(
          bindExtensionAsync(
            context,
            extension,
          ),
        ).rejects.toThrow(
          ExtensionIsAlreadyBoundError,
        );
      },
    );
  },
);
