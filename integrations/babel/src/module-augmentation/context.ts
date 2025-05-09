import type {
  BabelContext,
  BabelResolvedContext,
} from "../integration/context";

declare module "@holypack/core"
{
  interface ContextCustomProperties
  {
    babel: BabelResolvedContext;
  }

  interface StrictContextCustomProperties
  {
    babel?: BabelContext | null;
  }
}

export {};
