import defineConfig from "export-map-generator/config";
import json from "export-map-generator/presets/json";
import packageJSON from "export-map-generator/presets/package-json";
import standard from "export-map-generator/presets/standard";

export const jsonPackageConfigProvider = defineConfig(
  (context) =>
  {
    return {
      presets: [
        standard({
          updater: {
            safe: true,
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
