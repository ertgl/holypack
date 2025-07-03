import { resolveContextAsync } from "../../../context/resolver/resolveContextAsync";
import type { ExtensionMaybeAsync } from "../../ExtensionMaybeAsync";
import { maybeBindExtensionAsync } from "../maybeBindExtensionAsync";

describe(
  "maybeBindExtensionAsync",
  () =>
  {
    it(
      "should bind the extension if it is not already bound",
      async () =>
      {
        const context = await resolveContextAsync({
          loadConfigFile: false,
        });

        const extensionUID = "test:sample";

        const extension1: ExtensionMaybeAsync = {
          $uid: extensionUID,
          ref: 1,
        };

        const extension2: ExtensionMaybeAsync = {
          $uid: extensionUID,
          ref: 2,
        };

        expect(context.extensions.has(extensionUID)).toBe(false);

        await maybeBindExtensionAsync(
          context,
          extension1,
        );

        expect(context.extensions.has(extensionUID)).toBe(true);

        await maybeBindExtensionAsync(
          context,
          extension2,
        );

        expect(context.extensions.get(extensionUID)).toBe(extension1);
      },
    );
  },
);
