export type TypeScriptIntegrationOptions = (
  & TypeScriptIntegrationOptionsBaseProperties
  & TypeScriptIntegrationOptionsCustomProperties
);

export type TypeScriptIntegrationOptionsBaseProperties = {
  tsconfigRootDirectoryPath?: null | string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TypeScriptIntegrationOptionsCustomProperties
{}
