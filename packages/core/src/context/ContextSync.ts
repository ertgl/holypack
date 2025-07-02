import type { ContextKnownPropertiesSync } from "./property/ContextKnownPropertiesSync";

export type ContextSync = (
  & ContextKnownPropertiesSync
  & {
    [key: string]: unknown;
  }
);
