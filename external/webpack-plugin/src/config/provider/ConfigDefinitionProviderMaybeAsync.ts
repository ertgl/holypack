import type { Optional } from "@holypack/core/lib/object/Optional";
import type { MaybePromise } from "@holypack/core/lib/promise/MaybePromise";

import type { ConfigDefinitionContext } from "../context/ConfigDefinitionContext";
import type { ConfigDefinitionAsync } from "../definition/ConfigDefinitionAsync";

export type ConfigDefinitionProviderMaybeAsync<
  C extends Optional<ConfigDefinitionAsync> = Optional<ConfigDefinitionAsync>,
> = (
  context: ConfigDefinitionContext,
) => MaybePromise<C>;
