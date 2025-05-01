import type {
  BabelContext,
  BabelResolvedContext,
} from "../../context";

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
