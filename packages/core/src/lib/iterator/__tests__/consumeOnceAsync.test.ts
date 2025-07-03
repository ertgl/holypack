import { consumeOnceAsync } from "../consumeOnceAsync";

describe(
  "consumeOnceAsync",
  () =>
  {
    it(
      "should return undefined for an empty iterable",
      async () =>
      {
        const array: number[] = [];
        const result = await consumeOnceAsync(array);

        expect(result).toBeUndefined();
      },
    );

    it(
      "should return the last element of an iterable",
      async () =>
      {
        const array = [1, 2, 3, 4];
        const result = await consumeOnceAsync(array);

        expect(result).toBe(array[0]);
      },
    );

    it(
      "should handle single-element iterables",
      async () =>
      {
        const array = [1];
        const result = await consumeOnceAsync(array);

        expect(result).toBe(array[0]);
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

        const result = await consumeOnceAsync(generator);

        expect(result).toBe(array[0]);
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

        const result = await consumeOnceAsync(generator);

        expect(result).toBe(array[0]);
      },
    );
  },
);
