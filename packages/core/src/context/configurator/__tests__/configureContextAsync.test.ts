import type { ConfigDefinitionAsync } from "../../../config/definition/ConfigDefinitionAsync";
import { resolveContext } from "../../resolver/resolveContext";
import { configureContextAsync } from "../configureContextAsync";

describe(
  "configureContextAsync",
  () =>
  {
    it(
      "should do nothing when config definition is empty",
      async () =>
      {
        const context = await resolveContext({
          loadConfigFile: false,
        });

        const extensionsCount = context.extensions.size;

        await configureContextAsync(
          context,
          undefined,
        );

        expect(context.extensions.size).toBe(extensionsCount);
      },
    );

    it(
      "should bind extensions in the config definition to the context",
      async () =>
      {
        const extension = {
          $uid: "test:sample",
        };

        const config: ConfigDefinitionAsync = {
          extensions: [extension],
        };

        const context = await resolveContext({
          loadConfigFile: false,
        });

        await configureContextAsync(
          context,
          config,
        );

        expect(context.extensions.has(extension.$uid)).toBe(true);
      },
    );
  },
);
