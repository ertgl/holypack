import type {
  BabelContext,
  BabelResolvedContext,
} from "../../context";

declare module "@holypack/core"
{
  interface ContextCustomProperties
  {
    babel?: BabelContext | null;
  }

  interface ResolvedContextCustomProperties
  {
    babel: BabelResolvedContext;
  }
}

export {};
