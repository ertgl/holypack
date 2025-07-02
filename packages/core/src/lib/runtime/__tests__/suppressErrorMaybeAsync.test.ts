import { jest } from "@jest/globals";

import { suppressErrorMaybeAsync } from "../suppressErrorMaybeAsync";

describe(
  "suppressErrorMaybeAsync",
  () =>
  {
    it(
      "should suppress errors and return undefined if an error is thrown from an async function",
      async () =>
      {
        const err = new Error("Error mock.");

        const fMock = jest.fn<() => Promise<void>>().mockRejectedValue(err);

        const result = await suppressErrorMaybeAsync(fMock);

        expect(fMock).toHaveBeenCalledTimes(1);

        expect(result).toBeUndefined();
      },
    );

    it(
      "should suppress errors and return undefined if an error is thrown from an sync function",
      async () =>
      {
        const err = new Error("Error mock.");

        const fMock = jest.fn<() => void>(
          () =>
          {
            throw err;
          },
        );

        const result = await suppressErrorMaybeAsync(fMock);

        expect(fMock).toHaveBeenCalledTimes(1);

        expect(result).toBeUndefined();
      },
    );
  },
);
