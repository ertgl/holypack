// #[cjs(remove)]
import { createRequire } from "node:module";
// #[cjs(remove)]
import { fileURLToPath } from "node:url";

import type { ContextSync } from "@holypack/core/context/ContextSync";
import { maybeUseExtensionSync } from "@holypack/core/extension/interop/maybeUseExtensionSync";
import { suppressErrorSync } from "@holypack/core/lib/runtime/suppressErrorSync";
import type { TypeScriptContext } from "@holypack/integration-typescript/context/TypeScriptContext";
import type IntegrationUIDTypeScriptModule from "@holypack/integration-typescript/extension/INTEGRATION_UID_TYPESCRIPT";
import type { TypeScriptIntegration } from "@holypack/integration-typescript/extension/TypeScriptIntegration";

// #[cjs(remove)]
const __filename = fileURLToPath(import.meta.url);

// #[cjs(remove)]
const require = createRequire(__filename);

export function resolveTypeScriptContextSync(
  context: ContextSync,
): null | TypeScriptContext
{
  const typescriptIntegrationUID = suppressErrorSync(
    () =>
    {
      const {
        INTEGRATION_UID_TYPESCRIPT,
      } = require(
        "@holypack/integration-typescript/extension/INTEGRATION_UID_TYPESCRIPT",
      ) as typeof IntegrationUIDTypeScriptModule;

      return INTEGRATION_UID_TYPESCRIPT;
    },
  );

  if (typescriptIntegrationUID == null)
  {
    return null;
  }

  return maybeUseExtensionSync(
    context,
    typescriptIntegrationUID,
    (
      typescriptIntegration: TypeScriptIntegration,
    ) =>
    {
      return typescriptIntegration.resolveContextSync(context);
    },
  ) ?? null;
}
