import type { WebpackContext } from "../../context";

declare module "@holypack/core"
{
  interface ContextCustomProperties
  {
    webpack: WebpackContext;
  }

  interface StrictContextCustomProperties
  {
    webpack?: null | Partial<WebpackContext>;
  }
}

export {};
