import babel from "@holypack/integration-babel";
import eslint from "@holypack/integration-eslint";
import jest from "@holypack/integration-jest";
import typescript from "@holypack/integration-typescript";
import { defineConfig } from "holypack/config";

const HOLYPACK_CONFIG = defineConfig({
  integrations: [
    typescript(),
    babel(),
    eslint({
      ignores: {
        commonDirectoryPatterns: [
          ".yarn",
          "dist",
          "node_modules",
        ],
      },
    }),
    jest(),
  ],
  project: {
    subProjects: [
      {
        path: "./e2e",
      },
    ],
  },
});

export default HOLYPACK_CONFIG;
