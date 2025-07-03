import {
  fileURLToPath,
  pathToFileURL,
} from "node:url";

import { isAbsolutePath } from "../isAbsolutePath";

const __filename = fileURLToPath(import.meta.url);

describe(
  "isAbsolutePath",
  () =>
  {
    it(
      "should accept `string` paths",
      () =>
      {
        const result = isAbsolutePath(__filename);

        expect(result).toBe(true);
      },
    );

    it(
      "should accept `URL` paths",
      () =>
      {
        const input = pathToFileURL(__filename);
        const result = isAbsolutePath(input);

        expect(result).toBe(true);
      },
    );

    it(
      "should accept `Buffer` paths",
      () =>
      {
        const input = Buffer.from(__filename);
        const result = isAbsolutePath(input);

        expect(result).toBe(true);
      },
    );
  },
);
