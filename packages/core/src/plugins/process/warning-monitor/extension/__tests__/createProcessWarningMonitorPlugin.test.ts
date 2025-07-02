import { resolveContextAsync } from "../../../../../context/resolver/resolveContextAsync";
import { resolveContextSync } from "../../../../../context/resolver/resolveContextSync";
import { requireExtension } from "../../../../../extension/registry/requireExtension";
import { createProcessWarningMonitorPlugin } from "../createProcessWarningMonitorPlugin";
import { ProcessWarningMonitorPlugin } from "../ProcessWarningMonitorPlugin";
import { SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR } from "../SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR";

describe(
  "createProcessWarningMonitorPlugin",
  () =>
  {
    it(
      "can be used to register the `ProcessWarningMonitorPlugin` to `ContextAsync`",
      async () =>
      {
        const context = await resolveContextAsync({
          config: {
            extensions: [
              createProcessWarningMonitorPlugin(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(ProcessWarningMonitorPlugin);
      },
    );

    it(
      "can be used to register the `ProcessWarningMonitorPlugin` to `ContextSync`",
      () =>
      {
        const context = resolveContextSync({
          config: {
            extensions: [
              createProcessWarningMonitorPlugin(),
            ],
          },
          loadConfigFile: false,
        });

        const extension = requireExtension(
          context,
          SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR,
        );

        expect(extension).toBeDefined();
        expect(extension).toBeInstanceOf(ProcessWarningMonitorPlugin);
      },
    );
  },
);
