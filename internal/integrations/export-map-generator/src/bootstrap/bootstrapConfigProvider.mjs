import { join as joinPaths } from "node:path";

import defineConfig from "export-map-generator/config";
import cjs from "export-map-generator/presets/cjs";
import json from "export-map-generator/presets/json";
import packageJSON from "export-map-generator/presets/package-json";
import standard from "export-map-generator/presets/standard";

const BUILD_BOOTSTRAP_DIRECTORY_PATH = joinPaths(
  ".build",
  "bootstrap",
);

export const bootstrapConfigProvider = defineConfig(
  (context) =>
  {
    return {
      presets: [
        standard({
          updater: {
            safe: true,
          },
        }),

        cjs({
          conditions: [
            "default",
            "import",
            "require",
          ],
          dist: {
            path: BUILD_BOOTSTRAP_DIRECTORY_PATH,
          },
          src: {
            extension: ".ts",
          },
        }),

        json({
          dist: {
            path: BUILD_BOOTSTRAP_DIRECTORY_PATH,
          },
        }),

        packageJSON(),
      ],
    };
  },
);
