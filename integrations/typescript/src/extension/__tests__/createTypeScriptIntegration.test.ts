import { resolveContextAsync } from "@holypack/core/context/resolver/resolveContextAsync";
import { resolveContextSync } from "@holypack/core/context/resolver/resolveContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";

import { createTypeScriptIntegration } from "../createTypeScriptIntegration";
import { INTEGRATION_UID_TYPESCRIPT } from "../INTEGRATION_UID_TYPESCRIPT";
import { TypeScriptIntegration } from "../TypeScriptIntegration";

describe(
  "createTypeScriptIntegration",
  () =>
  {
    it(
      "can be used to register the `TypeScriptIntegration` to `ContextAsync`",
      async () =>
      {
        const context = await resolveContextAsync({
          config: {
            extensions: [
              createTypeScriptIntegration(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          INTEGRATION_UID_TYPESCRIPT,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(TypeScriptIntegration);
      },
    );

    it(
      "can be used to register the `TypeScriptIntegration` to `ContextSync`",
      () =>
      {
        const context = resolveContextSync({
          config: {
            extensions: [
              createTypeScriptIntegration(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          INTEGRATION_UID_TYPESCRIPT,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(TypeScriptIntegration);
      },
    );
  },
);
