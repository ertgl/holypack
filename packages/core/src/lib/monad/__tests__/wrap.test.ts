import { unwrapSync } from "../unwrapSync";
import { wrap } from "../wrap";

describe(
  "wrap",
  () =>
  {
    it(
      "should return a monad that returns the value when called",
      () =>
      {
        const value = true;
        const monad = wrap(value);
        expect(unwrapSync(monad)).toBe(value);
      },
    );
  },
);
