import type { ExtensionKnownPropertiesMaybeAsync } from "./property/ExtensionKnownPropertiesMaybeAsync";

export type ExtensionMaybeAsync = (
  & ExtensionKnownPropertiesMaybeAsync
  & {
    [key: string]: unknown;
  }
);
