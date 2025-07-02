import type { ExtensionKnownPropertiesSync } from "./property/ExtensionKnownPropertiesSync";

export type ExtensionSync = (
  & ExtensionKnownPropertiesSync
  & {
    [key: string]: unknown;
  }
);
