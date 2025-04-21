import type {
  ExampleConfig,
  ExampleResolvedConfig,
} from "../example";

declare module "@holypack/core"
{
  interface ConfigCustomProperties
  {
    example?: ExampleConfig | null;
  }

  interface ResolvedConfigCustomProperties
  {
    example: ExampleResolvedConfig;
  }

}

export {};
