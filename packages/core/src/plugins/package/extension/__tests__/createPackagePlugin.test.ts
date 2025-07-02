import { resolveContextAsync } from "../../../../context/resolver/resolveContextAsync";
import { resolveContextSync } from "../../../../context/resolver/resolveContextSync";
import { requireExtension } from "../../../../extension/registry/requireExtension";
import { createPackagePlugin } from "../createPackagePlugin";
import { PackagePlugin } from "../PackagePlugin";
import { SYSTEM_PLUGIN_UID_PACKAGE } from "../SYSTEM_PLUGIN_UID_PACKAGE";

describe(
  "createPackagePlugin",
  () =>
  {
    it(
      "can be used to register the `PackagePlugin` to `ContextAsync`",
      async () =>
      {
        const context = await resolveContextAsync({
          config: {
            extensions: [
              createPackagePlugin(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          SYSTEM_PLUGIN_UID_PACKAGE,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(PackagePlugin);
      },
    );

    it(
      "can be used to register the `PackagePlugin` to `ContextSync`",
      () =>
      {
        const context = resolveContextSync({
          config: {
            extensions: [
              createPackagePlugin(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          SYSTEM_PLUGIN_UID_PACKAGE,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(PackagePlugin);
      },
    );
  },
);
