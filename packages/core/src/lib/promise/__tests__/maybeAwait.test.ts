import { maybeAwait } from "../maybeAwait";

describe(
  "maybeAwait",
  () =>
  {
    it(
      "should return the value directly if it is not a promise",
      async () =>
      {
        const value = true;
        const result = await maybeAwait(value);

        expect(result).toBe(value);
      },
    );

    it(
      "should return the resolved value of a promise",
      async () =>
      {
        const value = true;

        // eslint-disable-next-line @typescript-eslint/require-await
        const fn = async () => value;

        const result = await maybeAwait(fn());

        expect(result).toBe(value);
      },
    );
  },
);
