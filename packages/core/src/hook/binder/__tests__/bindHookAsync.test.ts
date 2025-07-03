import { SyncBailHook } from "tapable";

import { resolveContextAsync } from "../../../context/resolver/resolveContextAsync";
import { bindHookAsync } from "../bindHookAsync";
import { HookIsAlreadyBoundError } from "../errors/HookIsAlreadyBoundError";

describe(
  "bindHookAsync",
  () =>
  {
    it(
      "should throw an error if the hook is already bound",
      async () =>
      {
        const hook = new SyncBailHook<[], void>([], "test:sample");

        const context = await resolveContextAsync({
          loadConfigFile: false,
        });

        await bindHookAsync(
          context,
          hook,
        );

        await expect(
          bindHookAsync(
            context,
            hook,
          ),
        ).rejects.toThrow(
          HookIsAlreadyBoundError,
        );
      },
    );
  },
);
