import { isMonad } from "../isMonad";

describe(
  "isMonad",
  () =>
  {
    it(
      "should return true for functions that accept no arguments",
      () =>
      {
        const io = () => null;
        expect(isMonad(io)).toBe(true);
      },
    );

    it(
      "should return false for functions that accept arguments",
      () =>
      {
        const io = (arg: unknown) => arg;
        expect(isMonad(io)).toBe(false);
      },
    );

    it(
      "should return false for non-function values",
      () =>
      {
        expect(isMonad(true)).toBe(false);
      },
    );
  },
);
