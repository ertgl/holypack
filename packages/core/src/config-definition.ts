import type { Config } from "./config";
import type { ConfigFunction } from "./config-function";

export function defineConfig<
  I extends null = null,
>(
  config?: I,
): I;

export function defineConfig<
  C extends Config = Config,
  I extends C = C,
>(
  config: I,
): I;

export function defineConfig<
  C extends Config = Config,
  F extends ConfigFunction<C> = ConfigFunction<C>,
  I extends F = F,
>(
  config: I,
): I;

export function defineConfig<
  C extends Config = Config,
  F extends ConfigFunction<C> = ConfigFunction<C>,
  I extends C | F | null = C | F | null,
>(
  config?: I,
): I
{
  return config ?? {} as I;
}
