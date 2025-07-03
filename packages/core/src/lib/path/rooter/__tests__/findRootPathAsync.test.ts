import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { findRootPathAsync } from "../findRootPathAsync";
import { ROOT_PATH_FINDER_STRATEGY_INNERMOST } from "../ROOT_PATH_FINDER_STRATEGY_INNERMOST";
import { ROOT_PATH_FINDER_STRATEGY_OUTERMOST } from "../ROOT_PATH_FINDER_STRATEGY_OUTERMOST";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "findRootPathAsync",
  () =>
  {
    it(
      "should return null when no root path is found",
      async () =>
      {
        const result = await findRootPathAsync(
          __filename,
          (path) => false,
        );

        expect(result).toBeNull();
      },
    );

    it(
      "should return the root path when found",
      async () =>
      {
        const rootPath = dirname(__dirname);

        const result = await findRootPathAsync(
          __filename,
          (path) => path === rootPath,
        );

        expect(result).toBeDefined();
        expect(result).toBe(rootPath);
      },
    );

    it(
      "should return the innermost root path when found",
      async () =>
      {
        const rootPath = dirname(__dirname);

        const result = await findRootPathAsync(
          __filename,
          (path) => path === rootPath,
          {
            strategy: ROOT_PATH_FINDER_STRATEGY_INNERMOST,
          },
        );

        expect(result).toBeDefined();
        expect(result).toBe(rootPath);
      },
    );

    it(
      "should return the outermost root path when found",
      async () =>
      {
        const rootPath = dirname(__dirname);

        const result = await findRootPathAsync(
          __filename,
          (path) => path === rootPath,
          {
            strategy: ROOT_PATH_FINDER_STRATEGY_OUTERMOST,
          },
        );

        expect(result).toBeDefined();
        expect(result).toBe(rootPath);
      },
    );
  },
);
