// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { glob } from "node:fs";

import { jest } from "@jest/globals";

import { resolveFileSystemFunctionAsync } from "../resolveFileSystemFunctionAsync";

describe(
  "resolveFileSystemFunctionAsync",
  () =>
  {
    it(
      "should return the custom function if it is defined",
      async () =>
      {
        const mockFunction = jest.fn();

        const result = await resolveFileSystemFunctionAsync(
          "glob",
          {
            glob: mockFunction,
          },
        );

        expect(result).toBe(mockFunction);
      },
    );

    it(
      "should return the default function from 'node:fs' if the custom function is undefined",
      async () =>
      {
        const result = await resolveFileSystemFunctionAsync(
          "glob",
          undefined,
        );

        expect(result).toBe(glob);
      },
    );
  },
);
