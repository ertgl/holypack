import { compactArray } from "../../lib/array/compactArray";
import type { Optional } from "../../lib/object/Optional";
import { maybeAwait } from "../../lib/promise/maybeAwait";
import type { ConfigAsync } from "../ConfigAsync";
import type { ConfigDefinitionContext } from "../context/ConfigDefinitionContext";
import type { ConfigDefinitionAsync } from "../definition/ConfigDefinitionAsync";
import type { ConfigDefinitionProviderMaybeAsync } from "../provider/ConfigDefinitionProviderMaybeAsync";

export async function resolveConfigAsync(
  configDefinitionContext: ConfigDefinitionContext,
  configDefinition: Optional<ConfigDefinitionAsync | ConfigDefinitionProviderMaybeAsync>,
): Promise<ConfigAsync>
{
  if (typeof configDefinition === "function")
  {
    configDefinition = await maybeAwait(
      configDefinition(
        configDefinitionContext,
      ),
    );
  }

  configDefinition ??= {};

  return {
    ...configDefinition,
    extensions: compactArray(configDefinition.extensions),
    fs: configDefinition.fs ?? {},
  };
}
