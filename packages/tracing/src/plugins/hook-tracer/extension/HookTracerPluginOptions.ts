import type { TracerOptions } from "tapable-tracer";

import type { ExtensionFactoryOptions } from "@holypack/core/extension/factory/ExtensionFactoryOptions";
import type { Optional } from "@holypack/core/lib/object/Optional";

export type HookTracerPluginOptions = (
  & ExtensionFactoryOptions
  & {
    tracer?: Optional<TracerOptions>;
  }
);
