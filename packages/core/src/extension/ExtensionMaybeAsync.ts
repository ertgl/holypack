import type { ExtensionKnownPropertiesMaybeAsync } from "./property/ExtensionKnownPropertiesMaybeAsync";

// TODO(ertgl): Rename `ExtensionMaybeAsync` as `ExtensionAsync`.

export type ExtensionMaybeAsync = (
  & ExtensionKnownPropertiesMaybeAsync
  & {
    [key: string]: unknown;
  }
);
