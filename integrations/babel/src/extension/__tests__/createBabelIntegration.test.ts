import { resolveContextAsync } from "@holypack/core/context/resolver/resolveContextAsync";
import { resolveContextSync } from "@holypack/core/context/resolver/resolveContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import { BabelIntegration } from "../BabelIntegration";
import { createBabelIntegration } from "../createBabelIntegration";
import { INTEGRATION_UID_BABEL } from "../INTEGRATION_UID_BABEL";

describe(
  "createBabelIntegration",
  () =>
  {
    it(
      "can be used to register the `BabelIntegration` to `ContextAsync`",
      async () =>
      {
        const context = await resolveContextAsync({
          config: {
            extensions: [
              createBabelIntegration(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          INTEGRATION_UID_BABEL,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(BabelIntegration);
      },
    );

    it(
      "can be used to register the `BabelIntegration` to `ContextSync`",
      () =>
      {
        const context = resolveContextSync({
          config: {
            extensions: [
              createBabelIntegration(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          INTEGRATION_UID_BABEL,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(BabelIntegration);
      },
    );
  },
);
