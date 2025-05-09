import type { CIContext } from "../plugin";

declare module "../../../context/context"
{
  interface ContextCustomProperties
  {
    ci: CIContext;
  }
}

export {};
