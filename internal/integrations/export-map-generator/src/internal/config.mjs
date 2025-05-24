import defineConfig from "export-map-generator/config";
import esm from "export-map-generator/presets/esm";
import json from "export-map-generator/presets/json";
import packageJSON from "export-map-generator/presets/package-json";
import standard from "export-map-generator/presets/standard";

export const internalPackageConfigProvider = defineConfig(
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
