import type { Optional } from "@holypack/core/lib/object/Optional";

import { HookTracerPlugin } from "./HookTracerPlugin";
import type { HookTracerPluginOptions } from "./HookTracerPluginOptions";

export function createHookTracerPlugin(
  options?: Optional<HookTracerPluginOptions>,
): HookTracerPlugin
{
  return new HookTracerPlugin(options);
}
