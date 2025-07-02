import {
  dirname,
  sep as PATH_SEPARATOR,
} from "node:path";
import { fileURLToPath } from "node:url";

import { jest } from "@jest/globals";

import { ascendPathSync } from "../ascendPathSync";
import type { PathAscenderPredicateSync } from "../PathAscenderPredicateSync";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "ascendPathSync",
  () =>
  {
    it(
      "should yield paths that match the predicate",
      () =>
      {
        const predicateMock = jest.fn<
          PathAscenderPredicateSync
        >().mockReturnValueOnce(
          true,
        ).mockReturnValueOnce(
          true,
        ).mockReturnValue(
          false,
        );

        const generator = ascendPathSync(
          __filename,
          predicateMock as PathAscenderPredicateSync,
        );

        const collected: string[] = [];

        for (const path of generator)
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
      () =>
      {
        const predicateMock = jest.fn<PathAscenderPredicateSync>().mockReturnValue(true);

        const generator = ascendPathSync(
          __filename,
          predicateMock as PathAscenderPredicateSync,
        );

        const collected: string[] = [];

        for (const path of generator)
        {
          collected.push(path);
        }

        const segments = __filename.split(PATH_SEPARATOR);

        expect(predicateMock).toHaveBeenCalledTimes(segments.length);
      },
    );
  },
);
