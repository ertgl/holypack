import { resolveContextAsync } from "@holypack/core/context/resolver/resolveContextAsync";
import { sealContextAsync } from "@holypack/core/context/sealer/sealContextAsync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";
import type { Optional } from "@holypack/core/lib/object/Optional";
import { INTEGRATION_UID_JEST } from "@holypack/integration-jest/extension/INTEGRATION_UID_JEST.cjs";
import type { JestIntegration } from "@holypack/integration-jest/extension/JestIntegration.cjs";

import type { HolypackPresetOptionsAsync } from "../options/HolypackPresetOptionsAsync";

import type { HolypackPreset } from "./HolypackPreset";

export async function createHolypackPresetAsync(
  options?: Optional<HolypackPresetOptionsAsync>,
): Promise<HolypackPreset>
{
  options ??= {};

  const context = await resolveContextAsync(options.context);

  return await sealContextAsync(
    context,
    async () =>
    {
      const integration = requireExtension<JestIntegration>(
        context,
        INTEGRATION_UID_JEST,
      );

      return await integration.generateConfig(context);
    },
  );
}
