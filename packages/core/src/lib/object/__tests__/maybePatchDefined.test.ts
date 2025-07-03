import { maybePatchDefined } from "../maybePatchDefined";

describe(
  "maybePatchDefined",
  () =>
  {
    it(
      "should override existing properties with defined values",
      () =>
      {
        const result = maybePatchDefined(
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

        const result = maybePatchDefined(
          initials,
          {},
        );

        expect(result).toBeDefined();
        expect(result).not.toBe(initials);
        expect(result).toEqual(initials);
      },
    );

    it(
      "should return the initials when patches are undefined",
      () =>
      {
        const initials = {
          a: 1,
          b: 2,
          c: 3,
        };

        const result = maybePatchDefined(
          initials,
          undefined,
        );

        expect(result).toBeDefined();
        expect(result).toBe(initials);
        expect(result).toEqual(initials);
      },
    );
  },

);
