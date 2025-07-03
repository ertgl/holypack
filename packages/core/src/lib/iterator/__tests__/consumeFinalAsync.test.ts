import { consumeFinalAsync } from "../consumeFinalAsync";

describe(
  "consumeFinalAsync",
  () =>
  {
    it(
      "should return undefined for an empty iterable",
      async () =>
      {
        const array: number[] = [];
        const result = await consumeFinalAsync(array);

        expect(result).toBeUndefined();
      },
    );

    it(
      "should return the last element of an iterable",
      async () =>
      {
        const array = [1, 2, 3, 4];
        const result = await consumeFinalAsync(array);

        expect(result).toBe(array[array.length - 1]);
      },
    );

    it(
      "should handle single-element iterables",
      async () =>
      {
        const array = [1];
        const result = await consumeFinalAsync(array);

        expect(result).toBe(array[array.length - 1]);
      },
    );

    it(
      "should handle sync generators that yield multiple times",
      async () =>
      {
        const array = [1, 2, 3, 4];

        const generatorFunction = function* ()
        {
          yield* array;
        };

        const generator = generatorFunction();

        const result = await consumeFinalAsync(generator);

        expect(result).toBe(array[array.length - 1]);
      },
    );

    it(
      "should handle async generators that yield multiple times",
      async () =>
      {
        const array = [1, 2, 3, 4];

        // eslint-disable-next-line @typescript-eslint/require-await
        const generatorFunction = async function* ()
        {
          yield* array;
        };

        const generator = generatorFunction();

        const result = await consumeFinalAsync(generator);

        expect(result).toBe(array[array.length - 1]);
      },
    );
  },
);
