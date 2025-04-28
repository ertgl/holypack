import type { Config } from "../config";

import type { ConfigProviderContext } from "./context";

export type ConfigProviderAsyncFunction<
  C extends Config = Config,
> = (
  context: ConfigProviderContext,
) => Promise<C>;

export type ConfigProviderFunction<
  C extends Config = Config,
> = (
  | ConfigProviderAsyncFunction<C>
  | ConfigProviderSyncFunction<C>
);

export type ConfigProviderSyncFunction<
  C extends Config = Config,
> = (
  context: ConfigProviderContext,
) => C;

export function isConfigProviderFunction(
  value: unknown,
): value is ConfigProviderFunction
{
  return (
    typeof value === "function"
    && value.length <= 1
  );
}
