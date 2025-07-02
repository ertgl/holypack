import {
  basename,
  dirname,
} from "node:path";
import {
  fileURLToPath,
  pathToFileURL,
} from "node:url";

import { resolvePath } from "../resolvePath";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "resolvePath",
  () =>
  {
    it(
      "should resolve `string` paths",
      () =>
      {
        const result = resolvePath(
          __dirname,
          basename(__filename),
        );

        expect(result).toBeDefined();
        expect(result).toBe(__filename);
      },
    );

    it(
      "should resolve `URL` paths",
      () =>
      {
        const result = resolvePath(
          pathToFileURL(__dirname),
          basename(__filename),
        );

        expect(result).toBeDefined();
        expect(result).toBe(__filename);
      },
    );

    it(
      "should resolve `Buffer` paths",
      () =>
      {
        const result = resolvePath(
          Buffer.from(__dirname),
          basename(__filename),
        );

        expect(result).toBeDefined();
        expect(result).toBe(__filename);
      },
    );
  },
);
