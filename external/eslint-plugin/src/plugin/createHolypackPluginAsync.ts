import { resolveContextAsync } from "@holypack/core/context/resolver/resolveContextAsync";
import { sealContextAsync } from "@holypack/core/context/sealer/sealContextAsync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";
import type { Optional } from "@holypack/core/lib/object/Optional";
import HOLYPACK_ESLINT_PLUGIN_PACKAGE from "@holypack/eslint-plugin/package.json" with { type: "json" };
import type { ESLintIntegration } from "@holypack/integration-eslint/extension/ESLintIntegration";
import { INTEGRATION_UID_ESLINT } from "@holypack/integration-eslint/extension/INTEGRATION_UID_ESLINT";

import type { HolypackPluginOptionsAsync } from "../options/HolypackPluginOptionsAsync";

import type { HolypackPlugin } from "./HolypackPlugin";

export async function createHolypackPluginAsync(
  options?: Optional<HolypackPluginOptionsAsync>,
): Promise<HolypackPlugin>
{
  options ??= {};

  const context = await resolveContextAsync(options.context);

  return await sealContextAsync(
    context,
    async () =>
    {
      const integration = requireExtension<ESLintIntegration>(
        context,
        INTEGRATION_UID_ESLINT,
      );

      const linterConfigArray = await integration.generateLinterConfigArray(context);

      return {
        configs: {
          recommended: linterConfigArray,
        },
        meta: {
          name: HOLYPACK_ESLINT_PLUGIN_PACKAGE.name,
        },
      };
    },
  );
}
