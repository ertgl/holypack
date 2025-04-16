export type ExampleIntegrationConfig = {
  flag?: boolean | null;
};

export type ExampleIntegrationContext = {
  custom?: null | number;
};

export type ExampleIntegrationResolvedConfig = {
  flag: Exclude<ExampleIntegrationConfig["flag"], null | undefined>;
};

export type ExampleIntegrationResolvedContext = {
  custom: Exclude<ExampleIntegrationContext["custom"], null | undefined>;
};

export declare module "@holypack/core"
{
  export interface ConfigCustomProperties
  {
    example?: ExampleIntegrationConfig | null;
  }

  export interface ContextCustomProperties
  {
    example?: ExampleIntegrationContext | null;
  }

  export interface ResolvedConfigCustomProperties
  {
    example: ExampleIntegrationResolvedConfig;
  }

  export interface ResolvedContextCustomProperties
  {
    example: ExampleIntegrationResolvedContext;
  }
}

export {};
