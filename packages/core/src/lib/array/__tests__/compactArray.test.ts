import { compactArray } from "../compactArray";

describe(
  "compactArray",
  () =>
  {
    it(
      "should return an empty array when input is undefined",
      () =>
      {
        const result = compactArray(undefined);

        expect(result).toBeDefined();
        expect(result).toEqual([]);
      },
    );

    it(
      "should return an empty array when input is null",
      () =>
      {
        const result = compactArray(null);

        expect(result).toBeDefined();
        expect(result).toEqual([]);
      },
    );

    it(
      "should return an array with only truthy values",
      () =>
      {
        const input = [1, 0, "1", "", null, undefined, false, true];
        const result = compactArray(input);

        expect(result).toBeDefined();
        expect(result).toEqual([1, "1", true]);
      },
    );
  },
);
