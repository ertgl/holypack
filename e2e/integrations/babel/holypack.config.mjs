import babel from "@holypack/integration-babel";
import { defineConfig } from "holypack";

const HOLYPACK_CONFIG = defineConfig({
  integrations: [
    babel(),
  ],
  plugins: [
    {
      name: "test",
      onContextReady: (ctx) =>
      {
        // TODO(ertgl): Write a test for the Babel E2E example, instead of logging it for visual inspection.
        console.log(ctx.babel);
      },
    },
  ],
});

export default HOLYPACK_CONFIG;
