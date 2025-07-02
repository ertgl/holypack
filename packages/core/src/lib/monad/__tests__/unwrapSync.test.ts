import { unwrapSync } from "../unwrapSync";

describe(
  "unwrapSync",
  () =>
  {
    it(
      "should return the result of the monad when called",
      () =>
      {
        const monad = () => null;
        expect(unwrapSync(monad)).toBe(null);
      },
    );
  },
);
