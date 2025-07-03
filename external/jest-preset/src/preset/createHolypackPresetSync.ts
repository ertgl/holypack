import { resolveContextSync } from "@holypack/core/context/resolver/resolveContextSync";
import { sealContextSync } from "@holypack/core/context/sealer/sealContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";
import type { Optional } from "@holypack/core/lib/object/Optional";
import { INTEGRATION_UID_JEST } from "@holypack/integration-jest/extension/INTEGRATION_UID_JEST.cjs";
import type { JestIntegration } from "@holypack/integration-jest/extension/JestIntegration.cjs";

import type { HolypackPresetOptionsSync } from "../options/HolypackPresetOptionsSync";

import type { HolypackPreset } from "./HolypackPreset";

export function createHolypackPresetSync(
  options?: Optional<HolypackPresetOptionsSync>,
): HolypackPreset
{
  options ??= {};

  const context = resolveContextSync(options.context);

  return sealContextSync(
    context,
    () =>
    {
      const integration = requireExtension<JestIntegration>(
        context,
        INTEGRATION_UID_JEST,
      );

      return integration.generateConfigSync(context);
    },
  );
}
