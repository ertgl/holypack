import { requireIntegration } from "@holypack/core";
import {
  default as eslint,
  INTEGRATION_NAME_ESLINT,
} from "@holypack/integration-eslint";
import { defineConfig } from "holypack";

/**
 * @import { type ESLintIntegration } from "@holypack/integration-eslint";
 */

const HOLYPACK_CONFIG = defineConfig({
  integrations: [
    eslint({
      cspell: true, // false disables cspell, default is true if cspell plugin is installed.
    }),
  ],
  plugins: [
    {
      name: "test",
      onContextReady: (ctx) =>
      {
        /**
         * @type {ESLintIntegration}
         */
        const eslintIntegration = requireIntegration(ctx, INTEGRATION_NAME_ESLINT);
        eslintIntegration.hooks.postConfigGeneration.tap(
          "test",
          (config) =>
          {
            // TODO(ertgl): Write a test for the ESLint config, instead of logging it for visual inspection.
            console.log(config);
          },
        );
      },
    },
  ],
});

export default HOLYPACK_CONFIG;
