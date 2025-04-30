import type { StrictConfig } from "../../config";
import type { StrictContext } from "../../context";
import type { Plugin } from "../../extension";

import { resolveCI } from "./resolution";

export const PLUGIN_NAME_CI = "@holypack/core:CI";

export class ContinuousIntegrationPlugin implements Plugin
{
  name = PLUGIN_NAME_CI;

  resolveConfig(
    context: StrictContext,
    config: StrictConfig,
  ): void
  {
    context.ci ??= resolveCI(config.ci);
  }
}

export function createContinuousIntegrationPlugin(): ContinuousIntegrationPlugin
{
  return new ContinuousIntegrationPlugin();
}
