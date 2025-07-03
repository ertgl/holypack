import type { Optional } from "@holypack/core/lib/object/Optional";

import type { ConfigDefinitionContext } from "../context/ConfigDefinitionContext";
import type { ConfigDefinition } from "../definition/ConfigDefinition";

export type ConfigDefinitionProviderAsync = (
  context: ConfigDefinitionContext,
) => Promise<Optional<ConfigDefinition>>;
