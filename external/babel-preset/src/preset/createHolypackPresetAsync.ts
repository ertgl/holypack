import {
  type ConfigAPI,
  type ConfigFunction,
  createConfigItem,
  type TransformOptions,
} from "@babel/core";

import type { ContextResolutionOptionsAsync } from "@holypack/core/context/resolver/ContextResolutionOptionsAsync";
import { resolveContextAsync } from "@holypack/core/context/resolver/resolveContextAsync";
import { sealContextAsync } from "@holypack/core/context/sealer/sealContextAsync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";
import type { Optional } from "@holypack/core/lib/object/Optional";
import type { BabelIntegration } from "@holypack/integration-babel/extension/BabelIntegration";
import { INTEGRATION_UID_BABEL } from "@holypack/integration-babel/extension/INTEGRATION_UID_BABEL";

import { createBabelPreset } from "../extension/createBabelPreset";
import type { HolypackPresetOptionsAsync } from "../options/HolypackPresetOptionsAsync";

import type { HolypackPreset } from "./HolypackPreset";

export async function createHolypackPresetAsync(
  options?: Optional<HolypackPresetOptionsAsync>,
): Promise<HolypackPreset>
{
  options ??= {};

  // TODO(ertgl): Fix `maybePatchDefined` function.

  const contextResolutionOptions = {
    ...options.context,
    postConfig: options.context?.postConfig ?? [],
  } satisfies ContextResolutionOptionsAsync;

  contextResolutionOptions.postConfig.push({
    extensions: [
      createBabelPreset(),
    ],
  });

  const context = await resolveContextAsync(contextResolutionOptions);

  return await sealContextAsync(
    context,
    async () =>
    {
      const integration = requireExtension<BabelIntegration>(
        context,
        INTEGRATION_UID_BABEL,
      );

      const transformOptions = await integration.generateTransformOptions(
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
