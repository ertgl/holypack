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
      integrationSpecificContextData: string;
    };
  }

  export interface ResolvedConfigCustomProperties
  {
    example: {
      integrationSpecificConfig: boolean;
    };
  }
}

export {};
