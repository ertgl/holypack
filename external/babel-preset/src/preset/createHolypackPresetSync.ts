import {
  type ConfigAPI,
  type ConfigFunction,
  createConfigItem,
  type TransformOptions,
} from "@babel/core";

import type { ContextResolutionOptionsSync } from "@holypack/core/context/resolver/ContextResolutionOptionsSync";
import { resolveContextSync } from "@holypack/core/context/resolver/resolveContextSync";
import { sealContextSync } from "@holypack/core/context/sealer/sealContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";
import type { Optional } from "@holypack/core/lib/object/Optional";
import type { BabelIntegration } from "@holypack/integration-babel/extension/BabelIntegration";
import { INTEGRATION_UID_BABEL } from "@holypack/integration-babel/extension/INTEGRATION_UID_BABEL";

import { createBabelPreset } from "../extension/createBabelPreset";
import type { HolypackPresetOptionsSync } from "../options/HolypackPresetOptionsSync";

import type { HolypackPreset } from "./HolypackPreset";

export function createHolypackPresetSync(
  options?: Optional<HolypackPresetOptionsSync>,
): HolypackPreset
{
  options ??= {};

  // TODO(ertgl): Fix `maybePatchDefined` function.

  const contextResolutionOptions = {
    ...options.context,
    postConfig: options.context?.postConfig ?? [],
  } satisfies ContextResolutionOptionsSync;

  contextResolutionOptions.postConfig.push({
    extensions: [
      createBabelPreset(),
    ],
  });

  const context = resolveContextSync(contextResolutionOptions);

  return sealContextSync(
    context,
    () =>
    {
      const integration = requireExtension<BabelIntegration>(
        context,
        INTEGRATION_UID_BABEL,
      );

      const transformOptions = integration.generateTransformOptionsSync(
        context,
        {
          format: options.format,
          overrides: options.overrides,
        },
      );

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
