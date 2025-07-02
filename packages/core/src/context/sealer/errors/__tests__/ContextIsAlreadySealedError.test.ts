import { resolveContextSync } from "../../../resolver/resolveContextSync";
import { ContextIsAlreadySealedError } from "../ContextIsAlreadySealedError";
import { ERROR_CONTEXT_IS_ALREADY_SEALED } from "../ERROR_CONTEXT_IS_ALREADY_SEALED";

describe(
  "ContextIsAlreadySealedError",
  () =>
  {
    it(
      "should create an error with the correct properties",
      () =>
      {
        const context = resolveContextSync({
          loadConfigFile: false,
        });

        const error = new ContextIsAlreadySealedError(context);

        expect(error.name).toBe(ERROR_CONTEXT_IS_ALREADY_SEALED);
        expect(error.message).toBe("Context is already sealed");

        expect(error.context).toBe(context);
      },
    );
  },
);
