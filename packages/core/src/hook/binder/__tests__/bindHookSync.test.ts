import { SyncBailHook } from "tapable";

import { resolveContextSync } from "../../../context/resolver/resolveContextSync";
import { bindHookSync } from "../bindHookSync";
import { HookIsAlreadyBoundError } from "../errors/HookIsAlreadyBoundError";

describe(
  "bindHookSync",
  () =>
  {
    it(
      "should throw an error if the hook is already bound",
      () =>
      {
        const hook = new SyncBailHook<[], void>([], "test:sample");

        const context = resolveContextSync({
          loadConfigFile: false,
        });

        bindHookSync(
          context,
          hook,
        );

        expect(
          () =>
          {
            bindHookSync(
              context,
              hook,
            );
          },
        ).toThrow(
          HookIsAlreadyBoundError,
        );
      },
    );
  },
);
