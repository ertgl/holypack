import {
  dirname,
  sep as PATH_SEPARATOR,
} from "node:path";
import { fileURLToPath } from "node:url";

import { jest } from "@jest/globals";

import { ascendPathAsync } from "../ascendPathAsync";
import type { PathAscenderPredicateMaybeAsync } from "../PathAscenderPredicateMaybeAsync";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "ascendPathAsync",
  () =>
  {
    it(
      "should yield paths that match the predicate",
      async () =>
      {
        const predicateMock = jest.fn<
          PathAscenderPredicateMaybeAsync
        >().mockReturnValueOnce(
          true,
        ).mockReturnValueOnce(
          true,
        ).mockReturnValue(
          false,
        );

        const generator = ascendPathAsync(
          __filename,
          predicateMock as PathAscenderPredicateMaybeAsync,
        );

        const collected: string[] = [];

        for await (const path of generator)
        {
          collected.push(path);
        }

        expect(collected).toHaveLength(2);
        expect(collected[0]).toBe(__filename);
        expect(collected[1]).toBe(__dirname);
      },
    );

    it(
      "should stop yielding when the root is reached",
      async () =>
      {
        const predicateMock = jest.fn<PathAscenderPredicateMaybeAsync>().mockReturnValue(true);

        const generator = ascendPathAsync(
          __filename,
          predicateMock as PathAscenderPredicateMaybeAsync,
        );

        const collected: string[] = [];

        for await (const path of generator)
        {
          collected.push(path);
        }

        const segments = __filename.split(PATH_SEPARATOR);

        expect(predicateMock).toHaveBeenCalledTimes(segments.length);
      },
    );
  },
);
