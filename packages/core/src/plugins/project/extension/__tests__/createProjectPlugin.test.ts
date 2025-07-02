import { resolveContextAsync } from "../../../../context/resolver/resolveContextAsync";
import { resolveContextSync } from "../../../../context/resolver/resolveContextSync";
import { requireExtension } from "../../../../extension/registry/requireExtension";
import { createProjectPlugin } from "../createProjectPlugin";
import { ProjectPlugin } from "../ProjectPlugin";
import { SYSTEM_PLUGIN_UID_PROJECT } from "../SYSTEM_PLUGIN_UID_PROJECT";

describe(
  "createProjectPlugin",
  () =>
  {
    it(
      "can be used to register the `ProjectPlugin` to `ContextAsync`",
      async () =>
      {
        const context = await resolveContextAsync({
          config: {
            extensions: [
              createProjectPlugin(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          SYSTEM_PLUGIN_UID_PROJECT,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(ProjectPlugin);
      },
    );

    it(
      "can be used to register the `ProjectPlugin` to `ContextSync`",
      () =>
      {
        const context = resolveContextSync({
          config: {
            extensions: [
              createProjectPlugin(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          SYSTEM_PLUGIN_UID_PROJECT,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(ProjectPlugin);
      },
    );
  },
);
