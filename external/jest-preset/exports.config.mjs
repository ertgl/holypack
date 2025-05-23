import defineConfig from "export-map-generator/config";
import extra from "export-map-generator/extensions/extra";

import { configProvider as provideBaseConfig } from "@holypack/internal-integration-export-map-generator/config";

/**
 * @import { type Config } from "export-map-generator/config";
 */

const EXPORTS_CONFIG = defineConfig(
  (context) =>
  {
    /**
     * @type {Config}
     */
    const config = provideBaseConfig(context);

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
