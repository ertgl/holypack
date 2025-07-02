import {
  fileURLToPath,
  pathToFileURL,
} from "node:url";

import { pathLikeToPath } from "../pathLikeToPath";

const __filename = fileURLToPath(import.meta.url);

describe(
  "pathLikeToPath",
  () =>
  {
    it(
      "should return strings as is",
      () =>
      {
        const result = pathLikeToPath(__filename);

        expect(result).toBeDefined();
        expect(result).toEqual(__filename);
      },
    );

    it(
      "should convert `URL` objects to strings",
      () =>
      {
        const input = pathToFileURL(__filename);
        const result = pathLikeToPath(input);

        expect(result).toBeDefined();
        expect(result).toEqual(__filename);
      },
    );

    it(
      "should convert `Buffer` objects to strings",
      () =>
      {
        const input = Buffer.from(__filename);
        const result = pathLikeToPath(input);

        expect(result).toBeDefined();
        expect(result).toEqual(__filename);
      },
    );
  },
);
