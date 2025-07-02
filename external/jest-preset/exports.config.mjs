import defineConfig from "export-map-generator/config";
import extra from "export-map-generator/extensions/extra";

import ts from "@holypack/internal-integration-export-map-generator/ts";

/**
 * @import { type Config } from "export-map-generator/config";
 */

const EXPORTS_CONFIG = defineConfig(
  (context) =>
  {
    /**
     * @type {Config}
     */
    const config = ts(context);

    config.extensions ??= [];

    config.extensions.push(
      extra({
        produce: (
          context,
          emit,
          createEntry,
        ) =>
        {
          emit(
            createEntry(
              "./jest-preset",
              {
                default: "./jest-preset.mjs",
                import: "./jest-preset.mjs",
                require: "./jest-preset.cjs",
              },
            ),
          );
        },
      }),
    );

    return config;
  },
);

export default EXPORTS_CONFIG;
