import { resolveContextAsync } from "@holypack/core/context/resolver/resolveContextAsync";
import { resolveContextSync } from "@holypack/core/context/resolver/resolveContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import { createESLintIntegration } from "../createESLintIntegration";
import { ESLintIntegration } from "../ESLintIntegration";
import { INTEGRATION_UID_ESLINT } from "../INTEGRATION_UID_ESLINT";

describe(
  "createESLintIntegration",
  () =>
  {
    it(
      "can be used to register the `ESLintIntegration` to `ContextAsync`",
      async () =>
      {
        const context = await resolveContextAsync({
          config: {
            extensions: [
              createESLintIntegration(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          INTEGRATION_UID_ESLINT,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(ESLintIntegration);
      },
    );

    it(
      "can be used to register the `ESLintIntegration` to `ContextSync`",
      () =>
      {
        const context = resolveContextSync({
          config: {
            extensions: [
              createESLintIntegration(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          INTEGRATION_UID_ESLINT,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(ESLintIntegration);
      },
    );
  },
);
