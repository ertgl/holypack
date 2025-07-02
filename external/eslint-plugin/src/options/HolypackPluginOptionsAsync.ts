import type { ContextResolutionOptionsAsync } from "@holypack/core/context/resolver/ContextResolutionOptionsAsync";
import type { ContextResolutionOptionsStrictAsync } from "@holypack/core/context/resolver/ContextResolutionOptionsStrictAsync";
import type { Optional } from "@holypack/core/lib/object/Optional";

export type HolypackPluginOptionsAsync = {
  context?: Optional<
    | ContextResolutionOptionsAsync
    | ContextResolutionOptionsStrictAsync
  >;
};
