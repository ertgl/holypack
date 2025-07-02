import type { ContextResolutionOptionsStrictSync } from "@holypack/core/context/resolver/ContextResolutionOptionsStrictSync";
import type { Optional } from "@holypack/core/lib/object/Optional";

export type HolypackPresetOptionsSync = {
  context?: Optional<ContextResolutionOptionsStrictSync>;
};
