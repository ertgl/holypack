import { jest } from "@jest/globals";

import { callOrReturn } from "../callOrReturn";

describe(
  "callOrReturn",
  () =>
  {
    it(
      "should return the value if it is not a function",
      () =>
      {
        const value = true;
        const result = callOrReturn(value);

        expect(result).toBe(value);
      },
    );

    it(
      "should call the function with the provided arguments if the value is a function",
      () =>
      {
        const fMock = jest.fn(
          (
            a: number,
            b: number,
          ) => a + b,
        );

        const result = callOrReturn(fMock, 0, 1);

        expect(fMock).toHaveBeenCalledWith(0, 1);
        expect(result).toBe(1);
      },
    );
  },
);
