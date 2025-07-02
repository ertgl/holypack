import type { Optional } from "../../lib/object/Optional";
import type { ConfigDefinitionContext } from "../context/ConfigDefinitionContext";
import type { ConfigDefinitionSync } from "../definition/ConfigDefinitionSync";

export type ConfigDefinitionProviderSync<
  C extends Optional<ConfigDefinitionSync> = Optional<ConfigDefinitionSync>,
> = (
  context: ConfigDefinitionContext,
) => C;
