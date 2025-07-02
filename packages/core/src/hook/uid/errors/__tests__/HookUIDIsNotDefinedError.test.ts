import { SyncBailHook } from "tapable";

import { ERROR_HOOK_UID_IS_NOT_DEFINED } from "../ERROR_HOOK_UID_IS_NOT_DEFINED";
import { HookUIDIsNotDefinedError } from "../HookUIDIsNotDefinedError";

describe(
  "HookUIDIsNotDefinedError",
  () =>
  {
    it(
      "should create an error with the correct properties",
      () =>
      {
        const hook = new SyncBailHook<[], void>([], "test:sample");

        const error = new HookUIDIsNotDefinedError(hook);

        expect(error.name).toBe(ERROR_HOOK_UID_IS_NOT_DEFINED);
        expect(error.message).toBe("Hook UID is not defined");

        expect(error.hook).toBe(hook);
      },
    );
  },
);
