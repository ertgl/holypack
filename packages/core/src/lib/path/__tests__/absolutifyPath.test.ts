import {
  basename,
  dirname,
} from "node:path";
import { fileURLToPath } from "node:url";

import { jest } from "@jest/globals";

import { wrap } from "../../monad/wrap";
import { absolutifyPath } from "../absolutifyPath";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "absolutifyPath",
  () =>
  {
    it(
      "should return the path as is if it is already absolute",
      () =>
      {
        const result = absolutifyPath(
          __dirname,
          __filename,
        );

        expect(result).toBeDefined();
        expect(result).toBe(__filename);
      },
    );

    it(
      "should convert a relative path to an absolute path",
      () =>
      {
        const relativePath = basename(__filename);

        const result = absolutifyPath(
          __dirname,
          relativePath,
        );

        expect(result).toBeDefined();
        expect(result).toBe(__filename);
      },
    );

    it(
      "should convert a relative path to an absolute path using a wrapped cwd",
      () =>
      {
        const relativePath = basename(__filename);

        const cwdMock = jest.fn(wrap(__dirname));

        const result = absolutifyPath(
          cwdMock,
          relativePath,
        );

        expect(cwdMock).toHaveBeenCalledTimes(1);

        expect(result).toBeDefined();
        expect(result).toBe(__filename);
      },
    );

    it(
      "should return the absolute path without calling cwd if the path is already absolute",
      () =>
      {
        const cwdMock = jest.fn(wrap(__dirname));

        const result = absolutifyPath(
          cwdMock,
          __filename,
        );

        expect(cwdMock).not.toHaveBeenCalled();

        expect(result).toBeDefined();
        expect(result).toBe(__filename);
      },
    );
  },
);
