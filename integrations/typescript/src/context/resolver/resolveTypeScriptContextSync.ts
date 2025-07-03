import type { ContextSync } from "@holypack/core/context/ContextSync";
import { useExtensionSync } from "@holypack/core/extension/interop/useExtensionSync";

import { INTEGRATION_UID_TYPESCRIPT } from "../../extension/INTEGRATION_UID_TYPESCRIPT";
import type { TypeScriptIntegration } from "../../extension/TypeScriptIntegration";
import type { TypeScriptContext } from "../TypeScriptContext";

export function resolveTypeScriptContextSync(
  context: ContextSync,
): TypeScriptContext
{
  return useExtensionSync(
    context,
    INTEGRATION_UID_TYPESCRIPT,
    (
      integration: TypeScriptIntegration,
    ) =>
    {
      const tsconfigRootDirectoryPath = integration.findTSConfigRootDirectoryPathSync(context);

      return {
        tsconfigRootDirectoryPath,
      };
    },
  );
}
