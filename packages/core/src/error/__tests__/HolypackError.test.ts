import { ERROR_HOLYPACK } from "../ERROR_HOLYPACK";
import { HolypackError } from "../HolypackError";

describe(
  "HolypackError",
  () =>
  {
    it(
      "should create an error with the correct properties",
      () =>
      {
        const name = "TestError";
        const description = "This is a test error";

        const error = new HolypackError(
          name,
          description,
        );

        expect(error.name).toBe(name);
        expect(error.message).toBe(description);
      },
    );

    it(
      "should default to `ERROR_HOLYPACK` if no name is provided",
      () =>
      {
        const description = "This is a test error without a name";

        const error = new HolypackError(
          undefined,
          description,
        );

        expect(error.name).toBe(ERROR_HOLYPACK);
        expect(error.message).toBe(description);
      },
    );
  },
);
