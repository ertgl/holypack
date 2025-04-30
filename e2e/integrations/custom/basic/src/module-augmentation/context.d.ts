import type {
  ExampleContext,
  ExampleResolvedContext,
} from "../example";

declare module "@holypack/core"
{
  interface ContextCustomProperties
  {
    example?: ExampleContext | null;
  }

  interface ResolvedContextCustomProperties
  {
    example: ExampleResolvedContext;
  }
}

export {};
