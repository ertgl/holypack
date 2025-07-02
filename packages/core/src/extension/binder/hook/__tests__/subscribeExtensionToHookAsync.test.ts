import { AsyncParallelHook } from "tapable";

import type { ExtensionMaybeAsync } from "../../../ExtensionMaybeAsync";
import { subscribeExtensionToHookAsync } from "../subscribeExtensionToHookAsync";

describe(
  "subscribeExtensionToHookAsync",
  () =>
  {
    it(
      "should subscribe an extension to a hook, ignoring duplicates",
      () =>
      {
        const extensionUID = "test:sample";

        const extension: ExtensionMaybeAsync = {
          $uid: extensionUID,
          customMethod()
          {
            return true;
          },
        };

        const hook = new AsyncParallelHook();

        expect(hook.taps.length).toBe(0);

        subscribeExtensionToHookAsync(
          hook,
          extension,
          "customMethod",
        );

        expect(hook.taps.length).toBe(1);

        subscribeExtensionToHookAsync(
          hook,
          extension,
          "customMethod",
        );

        expect(hook.taps.length).toBe(1);
      },
    );
  },
);
