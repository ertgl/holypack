import type { ContextResolutionOptionsAsync } from "@holypack/core/context/resolver/ContextResolutionOptionsAsync";
import type { Optional } from "@holypack/core/lib/object/Optional";
import type { ExecutionModeTraitOptionalAsync } from "@holypack/core/lib/runtime/ExecutionModeTraitOptionalAsync";

import type { ConfigDefinitionBase } from "./ConfigDefinitionBase";

export type ConfigDefinitionAsync = (
  & ConfigDefinitionBase
  & ExecutionModeTraitOptionalAsync
  & {
    context?: Optional<ContextResolutionOptionsAsync>;
  }
);
