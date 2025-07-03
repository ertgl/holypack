import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import { maybeUseExtensionAsync } from "@holypack/core/extension/interop/maybeUseExtensionAsync";
import { suppressErrorMaybeAsync } from "@holypack/core/lib/runtime/suppressErrorMaybeAsync";
import type { TypeScriptContext } from "@holypack/integration-typescript/context/TypeScriptContext";
import type { TypeScriptIntegration } from "@holypack/integration-typescript/extension/TypeScriptIntegration";

export async function resolveTypeScriptContextAsync(
  context: ContextAsync,
): Promise<null | TypeScriptContext>
{
  const typescriptIntegrationUID = await suppressErrorMaybeAsync(
    async () =>
    {
      const {
        INTEGRATION_UID_TYPESCRIPT,
      } = await import(
        "@holypack/integration-typescript/extension/INTEGRATION_UID_TYPESCRIPT",
      );

      return INTEGRATION_UID_TYPESCRIPT;
    },
  );

  if (typescriptIntegrationUID == null)
  {
    return null;
  }

  const typescriptContext = await maybeUseExtensionAsync(
    context,
    typescriptIntegrationUID,
    async (
      typescriptIntegration: TypeScriptIntegration,
    ) =>
    {
      return await typescriptIntegration.resolveContext(context);
    },
  );

  return typescriptContext ?? null;
}
