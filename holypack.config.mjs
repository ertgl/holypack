import { access } from "node:fs/promises";
import {
  dirname,
  resolve as resolvePath,
} from "node:path";
import { fileURLToPath } from "node:url";

import babel from "@holypack/integration-babel";
import typescript from "@holypack/integration-typescript";
import { defineConfig } from "holypack/config";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const HOLYPACK_CONFIG = defineConfig(
  async () =>
  {
    const isESLintIntegrationAvailable = await isIntegrationAvailable("eslint");

    const eslint = (
      isESLintIntegrationAvailable
        ? (
            await import(
              "@holypack/integration-eslint",
            ).then(
              (module) => module.default,
            ).catch(
              () => null,
            )
          )
        : null
    );

    const isJestIntegrationAvailable = await isIntegrationAvailable("jest");

    const jest = (
      isJestIntegrationAvailable
        ? (
            await import(
              "@holypack/integration-jest",
            ).then(
              (module) => module.default,
            ).catch(
              () => null,
            )
          )
        : null
    );

    return {
      integrations: [
        typescript(),
        babel(),
        eslint?.({
          ignores: {
            commonDirectoryPatterns: [
              ".bootstrap",
              ".yarn",
              "dist",
              "node_modules",
            ],
          },
        }),
        jest?.(),
      ],
      project: {
        subProjects: [
          {
            path: "./e2e",
          },
        ],
      },
    };
  },
);

/**
 * @param {string} integrationName
 * @returns {Promise<boolean>}
 */
async function isIntegrationAvailable(
  integrationName,
)
{
  return access(
    resolvePath(
      __dirname,
      "integrations",
      integrationName,
      "dist",
      "esm",
    ),
  ).then(
    () => true,
    () => false,
  );
}

export default HOLYPACK_CONFIG;
