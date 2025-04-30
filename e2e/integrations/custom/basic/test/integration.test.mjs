import { resolveContext } from "@holypack/core";
import { defineConfig } from "@holypack/core/config/definition";

import { EXAMPLE_INTEGRATION } from "../src/integration.mjs";

test(
  "default configuration is passed to the context",
  async () =>
  {
    const context = await resolveContext({
      config: defineConfig({
        integrations: [
          EXAMPLE_INTEGRATION,
        ],
      }),
      loadConfigFile: false,
    });

    expect(context.config.example.flag).toBe(false);
  },
);

test(
  "configuration is passed to the integration",
  async () =>
  {
    const context = await resolveContext();

    expect(context.config.example.flag).toBe(true);
  },
);

test(
  "integration modifies the context",
  async () =>
  {
    const context = await resolveContext();

    expect(context.example.custom).toBe(1);
  },
);
