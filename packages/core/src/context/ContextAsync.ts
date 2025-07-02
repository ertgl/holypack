import type { ContextKnownPropertiesAsync } from "./property/ContextKnownPropertiesAsync";

export type ContextAsync = (
  & ContextKnownPropertiesAsync
  & {
    [key: string]: unknown;
  }
);
