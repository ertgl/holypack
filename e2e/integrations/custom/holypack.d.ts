export declare module "@holypack/core"
{
  export interface ConfigCustomProperties
  {
    example: {
      integrationSpecificConfig?: boolean;
    };
  }

  export interface ContextCustomProperties
  {
    example: {
      integrationSpecificContextData: Record<string, unknown>;
    };
  }

  export interface ResolvedConfigCustomProperties
  {
    example: {
      integrationSpecificResolvedConfig: boolean;
    };
  }
}

export {};
