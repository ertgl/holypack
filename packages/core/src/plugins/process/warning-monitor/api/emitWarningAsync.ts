import type { ContextAsync } from "../../../../context/ContextAsync";
import { useSystemExtensionAsync } from "../../../../system/extension/interop/useSystemExtensionAsync";
import { SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR } from "../extension/SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR";

export async function emitWarningAsync(
  context: ContextAsync,
  err: Error,
): Promise<void>
{
  await useSystemExtensionAsync(
    context,
    SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR,
    async (extension) =>
    {
      await extension.emitWarning(
        context,
        err,
      );
    },
  );
}
