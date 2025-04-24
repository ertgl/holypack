export type TypeScriptContext = (
  & TypeScriptContextBaseProperties
  & TypeScriptContextCustomProperties
);

export type TypeScriptContextBaseProperties = {
  tsconfigDirectoryPaths?: string[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TypeScriptContextCustomProperties
{}

export type TypeScriptResolvedContext = (
  & TypeScriptResolvedContextBaseProperties
  & TypeScriptResolvedContextCustomProperties
);

export type TypeScriptResolvedContextBaseProperties = {
  tsconfigDirectoryPaths: string[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TypeScriptResolvedContextCustomProperties
{}
