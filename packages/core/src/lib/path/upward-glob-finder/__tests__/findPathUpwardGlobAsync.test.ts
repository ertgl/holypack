import {
  basename, dirname,
} from "node:path";
import { fileURLToPath } from "node:url";

import { findPathUpwardGlobAsync } from "../findPathUpwardGlobAsync";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "findPathUpwardGlobAsync",
  () =>
  {
    it(
      "should return null when no path is found",
      async () =>
      {
        const result = await findPathUpwardGlobAsync(
          ".non-existent",
          {
            cwd: __dirname,
          },
        );

        expect(result.path).toBeNull();
      },
    );

    it(
      "should return the path when found",
      async () =>
      {
        const result = await findPathUpwardGlobAsync(
          basename(__filename),
          {
            cwd: __dirname,
          },
        );

        expect(result).toBeDefined();
        expect(result.path).toBe(__filename);
      },
    );
  },
);
