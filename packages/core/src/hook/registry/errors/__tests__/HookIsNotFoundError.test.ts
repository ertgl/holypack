import { ERROR_HOOK_IS_NOT_FOUND } from "../ERROR_HOOK_IS_NOT_FOUND";
import { HookIsNotFoundError } from "../HookIsNotFoundError";

describe(
  "HookIsNotFoundError",
  () =>
  {
    it(
      "should create an error with the correct properties",
      () =>
      {
        const hookUID = "test:sample";

        const error = new HookIsNotFoundError(hookUID);

        expect(error.name).toBe(ERROR_HOOK_IS_NOT_FOUND);
        expect(error.message).toBe("Hook is not found");

        expect(error.hookUID).toBe(hookUID);
      },
    );
  },
);
