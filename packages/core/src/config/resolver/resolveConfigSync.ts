import { compactArray } from "../../lib/array/compactArray";
import type { Optional } from "../../lib/object/Optional";
import type { ConfigSync } from "../ConfigSync";
import type { ConfigDefinitionContext } from "../context/ConfigDefinitionContext";
import type { ConfigDefinitionSync } from "../definition/ConfigDefinitionSync";
import type { ConfigDefinitionProviderSync } from "../provider/ConfigDefinitionProviderSync";

export function resolveConfigSync(
  configDefinitionContext: ConfigDefinitionContext,
  configDefinition: Optional<ConfigDefinitionProviderSync | ConfigDefinitionSync>,
): ConfigSync
{
  if (typeof configDefinition === "function")
  {
    configDefinition = configDefinition(configDefinitionContext);
  }

  configDefinition ??= {};

  return {
    ...configDefinition,
    extensions: compactArray(configDefinition.extensions),
    fs: configDefinition.fs ?? {},
  };
}
