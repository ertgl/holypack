import type { ConfigDefinitionProvider } from "../provider/ConfigDefinitionProvider";
import type { ConfigDefinitionProviderMaybeAsync } from "../provider/ConfigDefinitionProviderMaybeAsync";
import type { ConfigDefinitionProviderSync } from "../provider/ConfigDefinitionProviderSync";

import type { ConfigDefinition } from "./ConfigDefinition";
import type { ConfigDefinitionAsync } from "./ConfigDefinitionAsync";
import type { ConfigDefinitionSync } from "./ConfigDefinitionSync";

export function defineConfig<
  C extends ConfigDefinitionAsync = ConfigDefinitionAsync,
  F extends ConfigDefinitionProviderMaybeAsync<C> = ConfigDefinitionProviderMaybeAsync<C>,
>(
  config: F,
): F;
export function defineConfig<
  C extends ConfigDefinitionSync = ConfigDefinitionSync,
  F extends ConfigDefinitionProviderSync<C> = ConfigDefinitionProviderSync<C>,
>(
  config: F,
): F;
export function defineConfig<
  C extends ConfigDefinition = ConfigDefinition,
>(
  config: C,
): C;
export function defineConfig<
  C extends ConfigDefinition,
  F extends ConfigDefinitionProvider,
  I extends C | F = C | F,
  O extends C | F = (
    I extends F
      ? F
      : I extends C
        ? C
        : never
  ),
>(
  config?: I,
): O
{
  return (config ?? {}) as O;
}
