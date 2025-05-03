import type { JestContext } from "../integration/context";

declare module "@holypack/core"
{
  interface ContextCustomProperties
  {
    jest: JestContext;
  }

  interface StrictContextCustomProperties
  {
    jest?: null | Partial<JestContext>;
  }
}

export {};
