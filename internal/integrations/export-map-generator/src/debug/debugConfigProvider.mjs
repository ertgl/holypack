import { join as joinPaths } from "node:path";

import defineConfig from "export-map-generator/config";
import esm from "export-map-generator/presets/esm";
import json from "export-map-generator/presets/json";
import packageJSON from "export-map-generator/presets/package-json";
import standard from "export-map-generator/presets/standard";

const BUILD_DEBUG_DIRECTORY_PATH = joinPaths(
  ".build",
  "debug",
);

export const debugConfigProvider = defineConfig(
  (context) =>
  {
    return {
      presets: [
        standard({
          updater: {
            safe: true,
          },
        }),

        esm({
          conditions: [
            "default",
            "import",
            "require",
          ],
          dist: {
            path: BUILD_DEBUG_DIRECTORY_PATH,
          },
          src: {
            extension: ".ts",
          },
        }),

        json({
          dist: {
            path: BUILD_DEBUG_DIRECTORY_PATH,
          },
        }),

        packageJSON(),
      ],
    };
  },
);
