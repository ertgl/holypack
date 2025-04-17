import type {
  Options,
  ResolvedOptions,
} from "./integration-options";

export function resolveOptions(
  options?: null | Options,
): ResolvedOptions
{
  return {
    ...options,
  };
}
