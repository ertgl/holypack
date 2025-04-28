import babel from "@holypack/integration-babel";
import eslint from "@holypack/integration-eslint";
import typescript from "@holypack/integration-typescript";
import { defineConfig } from "holypack";

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
