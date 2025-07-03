import { consumeFinalSync } from "../consumeFinalSync";

describe(
  "consumeFinalSync",
  () =>
  {
    it(
      "should return undefined for an empty iterable",
      () =>
      {
        const array: number[] = [];
        const result = consumeFinalSync(array);

        expect(result).toBeUndefined();
      },
    );

    it(
      "should return the last element of an iterable",
      () =>
      {
        const array = [1, 2, 3, 4];
        const result = consumeFinalSync(array);

        expect(result).toBe(array[array.length - 1]);
      },
    );

    it(
      "should handle single-element iterables",
      () =>
      {
        const array = [1];
        const result = consumeFinalSync(array);

        expect(result).toBe(array[array.length - 1]);
      },
    );

    it(
      "should handle generators that yield multiple times",
      () =>
      {
        const array = [1, 2, 3, 4];

        const generatorFunction = function* ()
        {
          yield* array;
        };

        const generator = generatorFunction();

        const result = consumeFinalSync(generator);

        expect(result).toBe(array[array.length - 1]);
      },
    );
  },
);
