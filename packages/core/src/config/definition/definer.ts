import type { Config } from "../config";
import type { ConfigProviderFunction } from "../provider";

import type { ConfigDefinition } from "./definition";

export function defineConfig<
  C extends Config = Config,
  F extends ConfigProviderFunction<C> = ConfigProviderFunction<C>,
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
  F extends ConfigProviderFunction<C> = ConfigProviderFunction<C>,
  I extends ConfigDefinition<C> = C | F,
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
