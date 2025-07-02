import { resolveContextSync } from "../../../context/resolver/resolveContextSync";
import type { ExtensionSync } from "../../ExtensionSync";
import { maybeBindExtensionSync } from "../maybeBindExtensionSync";

describe(
  "maybeBindExtensionSync",
  () =>
  {
    it(
      "should bind the extension if it is not already bound",
      () =>
      {
        const context = resolveContextSync({
          loadConfigFile: false,
        });

        const extensionUID = "test:sample";

        const extension1: ExtensionSync = {
          $uid: extensionUID,
          ref: 1,
        };

        const extension2: ExtensionSync = {
          $uid: extensionUID,
          ref: 2,
        };

        expect(context.extensions.has(extensionUID)).toBe(false);

        maybeBindExtensionSync(
          context,
          extension1,
        );

        expect(context.extensions.has(extensionUID)).toBe(true);

        maybeBindExtensionSync(
          context,
          extension2,
        );

        expect(context.extensions.get(extensionUID)).toBe(extension1);
      },
    );
  },
);
