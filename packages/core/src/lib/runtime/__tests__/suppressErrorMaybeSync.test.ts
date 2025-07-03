import { jest } from "@jest/globals";

import { suppressErrorSync } from "../suppressErrorSync";

describe(
  "suppressErrorSync",
  () =>
  {
    it(
      "should suppress errors and return undefined if an error is thrown from an sync function",
      () =>
      {
        const err = new Error("Error mock.");

        const fMock = jest.fn<() => void>(
          () =>
          {
            throw err;
          },
        );

        const result = suppressErrorSync(fMock);

        expect(fMock).toHaveBeenCalledTimes(1);

        expect(result).toBeUndefined();
      },
    );
  },
);
