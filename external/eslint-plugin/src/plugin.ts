import type {
  ESLint,
  Linter,
} from "eslint";

import { resolveContext } from "@holypack/core";
import {
  type ESLintIntegration,
  type ESLintIntegrationAPI,
  INTEGRATION_NAME_ESLINT,
} from "@holypack/integration-eslint";

import type { HolypackPluginOptions } from "./plugin-options";

export type HolypackPlugin = (
  & Omit<ESLint.Plugin, "configs">
  & {
    configs: {
      recommended: (
        ReturnType<ESLintIntegrationAPI["generateConfig"]> extends infer T
          ? T extends Promise<infer U>
            ? U extends Linter.Config[]
              ? U
              : never
            : T extends Linter.Config[]
              ? T
              : never
          : never
      );
    };
  }
);

export async function createHolypackPlugin(
  options: HolypackPluginOptions | null,
): Promise<HolypackPlugin>
{
  options ??= {};

  const context = await resolveContext(options.context);

  const integration = context.integrations.get(
    INTEGRATION_NAME_ESLINT,
  ) as ESLintIntegration | undefined;

  if (integration == null)
  {
    const err = new Error(
      "The ESLint integration is not available in the current context. Forgot to install the integration?",
    );
    err.cause = {
      context,
      options,
    };
    throw err;
  }

  return {
    configs: {
      recommended: await integration.api.generateConfig(context),
    },
    meta: {
      name: "@holypack/eslint-plugin",
    },
  };
}
