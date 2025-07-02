import {
  type ConfigAPI,
  type ConfigFunction,
  createConfigItem,
  type TransformOptions,
} from "@babel/core";

import { resolveContextSync } from "@holypack/core/context/resolver/resolveContextSync";
import { sealContextSync } from "@holypack/core/context/sealer/sealContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";
import type { Optional } from "@holypack/core/lib/object/Optional";
import type { BabelIntegration } from "@holypack/integration-babel/extension/BabelIntegration";
import { INTEGRATION_UID_BABEL } from "@holypack/integration-babel/extension/INTEGRATION_UID_BABEL";

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
      const integration = requireExtension<BabelIntegration>(
        context,
        INTEGRATION_UID_BABEL,
      );

      if (options.format != null)
      {
        integration.options.format = options.format;
      }

      const transformOptions = integration.generateTransformOptionsSync(context);

      const configFunction: ConfigFunction = (
        api: ConfigAPI,
      ): TransformOptions =>
      {
        api.cache.invalidate(
          () => process.env.NODE_ENV,
        );

        return transformOptions;
      };

      return createConfigItem(
        configFunction,
        {
          dirname: context.cwd,
          type: "preset",
        },
      );
    },
  );
}
