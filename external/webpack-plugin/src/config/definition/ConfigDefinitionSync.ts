import type { ContextResolutionOptionsSync } from "@holypack/core/context/resolver/ContextResolutionOptionsSync";
import type { Optional } from "@holypack/core/lib/object/Optional";
import type { ExecutionModeTraitOptionalSync } from "@holypack/core/lib/runtime/ExecutionModeTraitOptionalSync";

import type { ConfigDefinitionBase } from "./ConfigDefinitionBase";

export type ConfigDefinitionSync = (
  & ConfigDefinitionBase
  & ExecutionModeTraitOptionalSync
  & {
    context?: Optional<ContextResolutionOptionsSync>;
  }
);
