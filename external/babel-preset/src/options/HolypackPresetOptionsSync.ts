import type { ContextResolutionOptionsStrictSync } from "@holypack/core/context/resolver/ContextResolutionOptionsStrictSync";
import type { Optional } from "@holypack/core/lib/object/Optional";

import type { HolypackPresetOptionsBase } from "./HolypackPresetOptionsBase";

export type HolypackPresetOptionsSync = (
  & HolypackPresetOptionsBase
  & {
    context?: Optional<ContextResolutionOptionsStrictSync>;
  }
);
