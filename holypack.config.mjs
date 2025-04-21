import eslint from "@holypack/integration-eslint";
import { defineConfig } from "holypack";

// TODO(ertgl): Determine internal pattern automatically.
const importXInternalPattern = /(?:^@holypack[\\/].+(?:[\\/]+.*)?)|(?:^holypack(?:[\\/]+.*)?)/iu;

// TODO(ertgl): Determine internal pattern automatically.
const perfectionistInternalPattern = [
  /^@holypack[\\/].+$/iu,
  /^holypack$/iu,
];

const HOLYPACK_CONFIG = defineConfig({
  integrations: [
    eslint({
      importX: {
        internalPattern: importXInternalPattern,
      },
      perfectionist: {
        internalPattern: perfectionistInternalPattern,
      },
    }),
  ],
});

export default HOLYPACK_CONFIG;
