import defineConfig from "export-map-generator/config";
import cjs from "export-map-generator/presets/cjs";
import esm from "export-map-generator/presets/esm";
import json from "export-map-generator/presets/json";
import packageJSON from "export-map-generator/presets/package-json";
import standard from "export-map-generator/presets/standard";

export const jsPackageConfigProvider = defineConfig(
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
          ],
          dist: {
            path: "src",
          },
          src: {
            extension: ".cjs",
          },
          virtual: {
            extensions: [
              "",
              ".cjs",
            ],
          },
        }),

        esm({
          conditions: [
            "default",
          ],
          dist: {
            path: "src",
          },
          src: {
            extension: ".mjs",
          },
          virtual: {
            extensions: [
              "",
              ".mjs",
            ],
          },
        }),

        json({
          conditions: [
            "default",
          ],
          dist: {
            path: "src",
          },
        }),

        packageJSON(),
      ],
    };
  },
);
