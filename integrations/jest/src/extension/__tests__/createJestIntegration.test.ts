import { resolveContextAsync } from "@holypack/core/context/resolver/resolveContextAsync";
import { resolveContextSync } from "@holypack/core/context/resolver/resolveContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import { createJestIntegration } from "../createJestIntegration";
import { INTEGRATION_UID_JEST } from "../INTEGRATION_UID_JEST";
import { JestIntegration } from "../JestIntegration";

describe(
  "createJestIntegration",
  () =>
  {
    it(
      "can be used to register the `JestIntegration` to `ContextAsync`",
      async () =>
      {
        const context = await resolveContextAsync({
          config: {
            extensions: [
              createJestIntegration(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          INTEGRATION_UID_JEST,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(JestIntegration);
      },
    );

    it(
      "can be used to register the `JestIntegration` to `ContextSync`",
      () =>
      {
        const context = resolveContextSync({
          config: {
            extensions: [
              createJestIntegration(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          INTEGRATION_UID_JEST,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(JestIntegration);
      },
    );
  },
);
