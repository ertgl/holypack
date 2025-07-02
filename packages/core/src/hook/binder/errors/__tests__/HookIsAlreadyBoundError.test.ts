import { SyncBailHook } from "tapable";

import { ERROR_HOOK_IS_ALREADY_BOUND } from "../ERROR_HOOK_IS_ALREADY_BOUND";
import { HookIsAlreadyBoundError } from "../HookIsAlreadyBoundError";

describe(
  "HookIsAlreadyBoundError",
  () =>
  {
    it(
      "should create an error with the correct properties",
      () =>
      {
        const hook = new SyncBailHook<[], void>([], "test:sample");

        const error = new HookIsAlreadyBoundError(hook);

        expect(error.name).toBe(ERROR_HOOK_IS_ALREADY_BOUND);
        expect(error.message).toBe("Hook is already bound");

        expect(error.hook).toBe(hook);
      },
    );
  },
);
