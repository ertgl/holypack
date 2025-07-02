import { resolveContextAsync } from "@holypack/core/context/resolver/resolveContextAsync";
import { resolveContextSync } from "@holypack/core/context/resolver/resolveContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import { createWebpackIntegration } from "../createWebpackIntegration";
import { INTEGRATION_UID_WEBPACK } from "../INTEGRATION_UID_WEBPACK";
import { WebpackIntegration } from "../WebpackIntegration";

describe(
  "createWebpackIntegration",
  () =>
  {
    it(
      "can be used to register the `WebpackIntegration` to `ContextAsync`",
      async () =>
      {
        const context = await resolveContextAsync({
          config: {
            extensions: [
              createWebpackIntegration(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          INTEGRATION_UID_WEBPACK,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(WebpackIntegration);
      },
    );

    it(
      "can be used to register the `WebpackIntegration` to `ContextSync`",
      () =>
      {
        const context = resolveContextSync({
          config: {
            extensions: [
              createWebpackIntegration(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          INTEGRATION_UID_WEBPACK,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(WebpackIntegration);
      },
    );
  },
);
