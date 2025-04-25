import typescript from "@holypack/integration-typescript";
import { defineConfig } from "holypack";

const HOLYPACK_CONFIG = defineConfig({
  integrations: [
    typescript(),
  ],
  plugins: [
    {
      name: "test",
      onContextReady: (ctx) =>
      {
        // TODO(ertgl): Write a test for the TypeScript E2E example, instead of logging it for visual inspection.
        console.log(ctx.typescript);
      },
    },
  ],
});

export default HOLYPACK_CONFIG;
