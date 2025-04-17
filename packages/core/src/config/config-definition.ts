import type { Config } from "./config";
import type { ConfigDefinitionFunction } from "./config-definition-function";
import type { ConfigInput } from "./config-input";

export function defineConfig<
  C extends Config = Config,
  F extends ConfigDefinitionFunction<C> = ConfigDefinitionFunction<C>,
>(
  config: F,
): F;

export function defineConfig<
  C extends Config = Config,
>(
  config: C,
): C;

export function defineConfig<
  C extends Config = Config,
  F extends ConfigDefinitionFunction<C> = ConfigDefinitionFunction<C>,
  I extends ConfigInput<C> = C | F,
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
