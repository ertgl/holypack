import defineConfig from "export-map-generator/config";
import { joinPaths } from "export-map-generator/path";
import cjs from "export-map-generator/presets/cjs";
import dts from "export-map-generator/presets/dts";
import esm from "export-map-generator/presets/esm";
import json from "export-map-generator/presets/json";
import packageJSON from "export-map-generator/presets/package-json";
import standard from "export-map-generator/presets/standard";

export const configProvider = defineConfig(
  (context) =>
  {
    return {
      presets: [
        standard({
          updater: {
            safe: true,
          },
        }),

        dts({
          src: {
            extension: ".ts",
          },
        }),

        cjs({
          src: {
            extension: ".ts",
          },
        }),

        esm({
          src: {
            extension: ".ts",
          },
        }),

        json({
          conditions: [
            "import",
            "default",
          ],
          dist: {
            path: joinPaths(
              "dist",
              "esm",
            ),
          },
        }),

        json({
          conditions: [
            "require",
            "default",
          ],
          dist: {
            path: joinPaths(
              "dist",
              "cjs",
            ),
          },
        }),

        packageJSON(),
      ],
    };
  },
);
