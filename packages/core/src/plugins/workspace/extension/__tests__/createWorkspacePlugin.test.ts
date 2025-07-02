import { resolveContextAsync } from "../../../../context/resolver/resolveContextAsync";
import { resolveContextSync } from "../../../../context/resolver/resolveContextSync";
import { requireExtension } from "../../../../extension/registry/requireExtension";
import { createWorkspacePlugin } from "../createWorkspacePlugin";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "../SYSTEM_PLUGIN_UID_WORKSPACE";
import { WorkspacePlugin } from "../WorkspacePlugin";

describe(
  "createWorkspacePlugin",
  () =>
  {
    it(
      "can be used to register the `WorkspacePlugin` to `ContextAsync`",
      async () =>
      {
        const context = await resolveContextAsync({
          config: {
            extensions: [
              createWorkspacePlugin(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          SYSTEM_PLUGIN_UID_WORKSPACE,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(WorkspacePlugin);
      },
    );

    it(
      "can be used to register the `WorkspacePlugin` to `ContextSync`",
      () =>
      {
        const context = resolveContextSync({
          config: {
            extensions: [
              createWorkspacePlugin(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          SYSTEM_PLUGIN_UID_WORKSPACE,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(WorkspacePlugin);
      },
    );
  },
);
