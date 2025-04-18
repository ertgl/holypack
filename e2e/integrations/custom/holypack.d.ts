import type {
  ExampleConfig,
  ExampleContext,
  ExampleResolvedConfig,
  ExampleResolvedContext,
} from "./src/example";

declare module "@holypack/core"
{
  interface ConfigCustomProperties
  {
    example?: ExampleConfig | null;
  }

  interface ContextCustomProperties
  {
    example?: ExampleContext | null;
  }

  interface ResolvedConfigCustomProperties
  {
    example: ExampleResolvedConfig;
  }

  interface ResolvedContextCustomProperties
  {
    example: ExampleResolvedContext;
  }
}

export {};
