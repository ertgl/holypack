import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import { useExtensionAsync } from "@holypack/core/extension/interop/useExtensionAsync";

import { INTEGRATION_UID_TYPESCRIPT } from "../../extension/INTEGRATION_UID_TYPESCRIPT";
import type { TypeScriptIntegration } from "../../extension/TypeScriptIntegration";
import type { TypeScriptContext } from "../TypeScriptContext";

export async function resolveTypeScriptContextAsync(
  context: ContextAsync,
): Promise<TypeScriptContext>
{
  return await useExtensionAsync(
    context,
    INTEGRATION_UID_TYPESCRIPT,
    async (
      integration: TypeScriptIntegration,
    ) =>
    {
      const tsconfigRootDirectoryPath = await integration.findTSConfigRootDirectoryPath(context);

      return {
        tsconfigRootDirectoryPath,
      };
    },
  );
}
