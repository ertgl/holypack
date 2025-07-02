import {
  basename,
  dirname,
} from "node:path";
import {
  fileURLToPath,
  pathToFileURL,
} from "node:url";

import { joinPaths } from "../joinPaths";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "joinPaths",
  () =>
  {
    it(
      "should join `string` paths",
      () =>
      {
        const result = joinPaths(
          __dirname,
          basename(__filename),
        );

        expect(result).toBeDefined();
        expect(result).toBe(__filename);
      },
    );

    it(
      "should join `URL` paths",
      () =>
      {
        const result = joinPaths(
          pathToFileURL(__dirname),
          basename(__filename),
        );

        expect(result).toBeDefined();
        expect(result).toBe(__filename);
      },
    );

    it(
      "should join `Buffer` paths",
      () =>
      {
        const result = joinPaths(
          Buffer.from(__dirname),
          Buffer.from(basename(__filename)),
        );

        expect(result).toBeDefined();
        expect(result).toBe(__filename);
      },
    );
  },
);
