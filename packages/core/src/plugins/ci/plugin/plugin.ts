import type { StrictConfig } from "../../../config";
import type { StrictContext } from "../../../context";
import type { Plugin } from "../../../extension";
import { PLUGIN_NAME_CI } from "../plugin-metadata";

import { resolveCIContext } from "./context";

export class ContinuousIntegrationPlugin implements Plugin
{
  name = PLUGIN_NAME_CI;

  resolveConfig(
    context: StrictContext,
    config: StrictConfig,
  ): void
  {
    context.ci ??= resolveCIContext({
      config,
    });
  }
}

export function createContinuousIntegrationPlugin(): ContinuousIntegrationPlugin
{
  return new ContinuousIntegrationPlugin();
}
