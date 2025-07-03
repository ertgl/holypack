import type { ContextResolutionOptionsStrictSync } from "@holypack/core/context/resolver/ContextResolutionOptionsStrictSync";
import type { ContextResolutionOptionsSync } from "@holypack/core/context/resolver/ContextResolutionOptionsSync";
import type { Optional } from "@holypack/core/lib/object/Optional";

export type HolypackPluginOptionsSync = {
  context?: Optional<
    | ContextResolutionOptionsStrictSync
    | ContextResolutionOptionsSync
  >;
};
