export type ESLintContext = (
  & ESLintContextBaseProperties
  & ESLintContextCustomProperties
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ESLintContextBaseProperties = {};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintContextCustomProperties
{}

export type ESLintResolvedContext = (
  & ESLintResolvedContextBaseProperties
  & ESLintResolvedContextCustomProperties
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ESLintResolvedContextBaseProperties = {};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintResolvedContextCustomProperties
{}
