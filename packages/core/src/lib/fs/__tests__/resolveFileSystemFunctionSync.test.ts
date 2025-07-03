// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { globSync } from "node:fs";

import { jest } from "@jest/globals";

import { resolveFileSystemFunctionSync } from "../resolveFileSystemFunctionSync";

describe(
  "resolveFileSystemFunctionSync",
  () =>
  {
    it(
      "should return the custom function if it is defined",
      () =>
      {
        const mockFunction = jest.fn();

        const result = resolveFileSystemFunctionSync(
          "globSync",
          {
            globSync: mockFunction as unknown as typeof globSync,
          },
        );

        expect(result).toBe(mockFunction);
      },
    );

    it(
      "should return the default function from 'node:fs' if the custom function is undefined",
      () =>
      {
        const result = resolveFileSystemFunctionSync(
          "globSync",
          undefined,
        );

        expect(result).toBe(globSync);
      },
    );
  },
);
