import type { Config } from "./config";
import type { ConfigDefinitionFunction } from "./config-definition-function";

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
  I extends C | F = C | F,
>(
  config?: I,
): I
{
  return config ?? {} as I;
}
