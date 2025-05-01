import type { Configuration } from "webpack";

import {
  requireIntegration,
  resolveContext,
  type StrictContext,
} from "@holypack/core";
import {
  INTEGRATION_NAME_WEBPACK,
  type WebpackIntegration,
} from "@holypack/integration-webpack";

import type { HolypackPluginOptions } from "../../plugin-options";

import type { ConfigDefinition } from "./definition";

export async function defineConfig(
  config?: ConfigDefinition | null,
  options?: HolypackPluginOptions | null,
): Promise<Configuration>
{
  options ??= {};

  const context = await resolveContext(options.context);

  const integration = requireIntegration<WebpackIntegration>(
    context as unknown as StrictContext,
    INTEGRATION_NAME_WEBPACK,
  );

  return await integration.api.generateWebpackConfig(
    context,
    {
      overrides: config,
    },
  );
}
