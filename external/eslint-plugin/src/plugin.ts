import type {
  ESLint,
  Linter,
} from "eslint";

import {
  requireIntegration,
  resolveContext,
} from "@holypack/core";
import {
  ESLintIntegration,
  INTEGRATION_NAME_ESLINT,
} from "@holypack/integration-eslint";

import type { HolypackPluginOptions } from "./plugin-options";

export type HolypackPlugin = (
  & Omit<ESLint.Plugin, "configs">
  & {
    configs: {
      recommended: Linter.Config[];
    };
  }
);

export async function createHolypackPlugin(
  options?: HolypackPluginOptions | null,
): Promise<HolypackPlugin>
{
  options ??= {};

  const context = await resolveContext(options.context);

  const integration = requireIntegration<ESLintIntegration>(
    context,
    INTEGRATION_NAME_ESLINT,
  );

  const configs = await integration.api.generateConfigs(context);

  return {
    configs: {
      recommended: configs,
    },
    meta: {
      name: "@holypack/eslint-plugin",
    },
  };
}
