import type { ConfigDefinitionSync } from "../../../config/definition/ConfigDefinitionSync";
import { resolveContext } from "../../resolver/resolveContext";
import { configureContextSync } from "../configureContextSync";

describe(
  "configureContextSync",
  () =>
  {
    it(
      "should do nothing if no config definition is provided",
      () =>
      {
        const context = resolveContext({
          loadConfigFile: false,
          sync: true,
        });

        const extensionsCount = context.extensions.size;

        configureContextSync(
          context,
          undefined,
        );

        expect(context.extensions.size).toBe(extensionsCount);
      },
    );

    it(
      "should bind extensions in the config definition to the context",
      () =>
      {
        const extension = {
          $uid: "test:sample",
        };

        const config: ConfigDefinitionSync = {
          extensions: [extension],
        };

        const context = resolveContext({
          loadConfigFile: false,
          sync: true,
        });

        configureContextSync(
          context,
          config,
        );

        expect(context.extensions.has(extension.$uid)).toBe(true);
      },
    );
  },
);
