import { SyncHook } from "tapable";

import type { ExtensionMaybeAsync } from "../../../ExtensionMaybeAsync";
import { subscribeExtensionToHookSync } from "../subscribeExtensionToHookSync";

describe(
  "subscribeExtensionToHookSync",
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

        const hook = new SyncHook();

        expect(hook.taps.length).toBe(0);

        subscribeExtensionToHookSync(
          hook,
          extension,
          "customMethod",
        );

        expect(hook.taps.length).toBe(1);

        subscribeExtensionToHookSync(
          hook,
          extension,
          "customMethod",
        );

        expect(hook.taps.length).toBe(1);
      },
    );
  },
);
