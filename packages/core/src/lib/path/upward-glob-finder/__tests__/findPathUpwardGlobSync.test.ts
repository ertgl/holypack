import {
  basename, dirname,
} from "node:path";
import { fileURLToPath } from "node:url";

import { findPathUpwardGlobSync } from "../findPathUpwardGlobSync";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "findPathUpwardGlobSync",
  () =>
  {
    it(
      "should return null when no path is found synchronously",
      () =>
      {
        const result = findPathUpwardGlobSync(
          ".non-existent",
          {
            cwd: __dirname,
          },
        );

        expect(result.path).toBeNull();
      },
    );

    it(
      "should return the path when found synchronously",
      () =>
      {
        const result = findPathUpwardGlobSync(
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
