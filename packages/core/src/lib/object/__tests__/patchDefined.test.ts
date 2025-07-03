import { patchDefined } from "../patchDefined";

describe(
  "patchDefined",
  () =>
  {
    it(
      "should override existing properties with defined values",
      () =>
      {
        const result = patchDefined(
          {
            a: 1,
            b: 2,
            c: 3,
          },
          {
            a: undefined,
            b: null,
            d: 4,
          },
        );

        expect(result).toBeDefined();

        expect(result).toEqual({
          a: 1,
          b: 2,
          c: 3,
          d: 4,
        });
      },
    );

    it(
      "should return new object equal to initials when patches are empty",
      () =>
      {
        const initials = {
          a: 1,
          b: 2,
          c: 3,
        };

        const result = patchDefined(
          initials,
          {},
        );

        expect(result).toBeDefined();
        expect(result).not.toBe(initials);
        expect(result).toEqual(initials);
      },
    );
  },

);
