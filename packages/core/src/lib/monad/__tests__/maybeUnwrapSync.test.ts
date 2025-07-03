import { maybeUnwrapSync } from "../maybeUnwrapSync";

describe(
  "maybeUnwrapSync",
  () =>
  {
    it(
      "should return the result of the monad when called",
      () =>
      {
        const monad = () => null;
        expect(maybeUnwrapSync(monad)).toBe(null);
      },
    );

    it(
      "should return the value directly if not a monad",
      () =>
      {
        expect(maybeUnwrapSync(true)).toBe(true);
      },
    );
  },
);
