import { resolveContextSync } from "@holypack/core/context/resolver/resolveContextSync";
import { sealContextSync } from "@holypack/core/context/sealer/sealContextSync";
import { requireExtension } from "@holypack/core/extension/registry/requireExtension";
import type { Optional } from "@holypack/core/lib/object/Optional";
import HOLYPACK_ESLINT_PLUGIN_PACKAGE from "@holypack/eslint-plugin/package.json" with { type: "json" };
import type { ESLintIntegration } from "@holypack/integration-eslint/extension/ESLintIntegration";
import { INTEGRATION_UID_ESLINT } from "@holypack/integration-eslint/extension/INTEGRATION_UID_ESLINT";

import type { HolypackPluginOptionsSync } from "../options/HolypackPluginOptionsSync";

import type { HolypackPlugin } from "./HolypackPlugin";

export function createHolypackPluginSync(
  options?: Optional<HolypackPluginOptionsSync>,
): HolypackPlugin
{
  options ??= {};

  const context = resolveContextSync(options.context);

  return sealContextSync(
    context,
    () =>
    {
      const integration = requireExtension<ESLintIntegration>(
        context,
        INTEGRATION_UID_ESLINT,
      );

      const linterConfigArray = integration.generateLinterConfigArraySync(context);

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
