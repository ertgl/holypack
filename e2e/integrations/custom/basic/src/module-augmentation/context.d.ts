import type { ExampleContext } from "../example";

declare module "@holypack/core"
{
  interface ContextCustomProperties
  {
    example: ExampleContext;
  }

  interface StrictContextCustomProperties
  {
    example?: null | Partial<ExampleContext>;
  }
}

export {};
