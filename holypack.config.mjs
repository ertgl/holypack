// When building holypack, it uses itself during the process.
// As a result, some extensions might not be available during the bootstrap phase.
// For this reason, avoid importing extensions directly.
// Use `suppressErrorSync` to safely fall back to `undefined`.
//
// Holypack supports both synchronous and asynchronous execution modes.
// When running, if at least one integration using this config file does not
// support asynchronous execution, ensure that only synchronous operations are
// performed here. Thus both synchronous and asynchronous contexts can safely
// make use of this config file.

import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import { requireDefaultExport } from "@holypack/core/lib/module/requireDefaultExport";
import { suppressErrorSync } from "@holypack/core/lib/runtime/suppressErrorSync";
import { defineConfig } from "holypack/config";

const __filename = fileURLToPath(import.meta.url);

const require = createRequire(__filename);

/**
 * @import {
 *   type ESLintIntegration,
 *   type ESLintIntegrationOptions,
 * } from "@holypack/integration-eslint";
 * @import {
 *   type MarkdownFlavor,
 * } from "@holypack/integration-eslint/plugins/eslint/markdown/flavor/MarkdownFlavor";
 */

const CI = process.env.CI === "true" || process.env.CI === "1";

const DEBUG = process.env.DEBUG === "true" || process.env.DEBUG === "1";

/**
 * @template T
 * @param {T} value
 * @returns {T | undefined}
 */
const disableOnCI = (value) =>
{
  return CI ? undefined : value;
};

/**
 * @template T
 * @param {T} value
 * @returns {T | undefined}
 */
const enableOnlyForDebugging = (value) =>
{
  return DEBUG ? value : undefined;
};

export default defineConfig(
  (context) =>
  {
    return {
      extensions: [
        disableOnCI(
          enableOnlyForDebugging(
            suppressErrorSync(
              requireDefaultExport,
              require,
              "@holypack/tracing/plugins/hook-tracer",
            ),
          ),
        ),

        suppressErrorSync(
          requireDefaultExport,
          require,
          "@holypack/integration-typescript",
        ),

        suppressErrorSync(
          requireDefaultExport,
          require,
          "@holypack/integration-jest",
        ),

        suppressErrorSync(
          () =>
          {
            /**
             * @type {ESLintIntegration}
             */
            const eslint = requireDefaultExport(
              require,
              "@holypack/integration-eslint",
            );

            /**
             * @type {MarkdownFlavor}
             */
            const MARKDOWN_FLAVOR_GFM = requireDefaultExport(
              require,
              "@holypack/integration-eslint/plugins/eslint/markdown/flavor/MARKDOWN_FLAVOR_GFM",
            );

            /**
             * @satisfies {ESLintIntegrationOptions}
             */
            const options = {
              plugins: {
                ignores: {
                  extra: [
                    "**/.build/",
                    "e2e/",
                  ],
                },
                markdown: {
                  flavor: MARKDOWN_FLAVOR_GFM,
                },
              },
            };

            return [
              eslint,
              options,
            ];
          },
        ),
      ],
    };
  },
);
