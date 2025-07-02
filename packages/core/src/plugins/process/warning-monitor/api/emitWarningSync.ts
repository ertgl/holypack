import type { ContextSync } from "../../../../context/ContextSync";
import { useSystemExtensionSync } from "../../../../system/extension/interop/useSystemExtensionSync";
import { SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR } from "../extension/SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR";

export function emitWarningSync(
  context: ContextSync,
  err: Error,
): void
{
  useSystemExtensionSync(
    context,
    SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR,
    (extension) =>
    {
      extension.emitWarningSync(
        context,
        err,
      );
    },
  );
}
