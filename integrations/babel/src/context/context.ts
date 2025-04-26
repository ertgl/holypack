export type BabelContext = (
  & BabelContextBaseProperties
  & BabelContextCustomProperties
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type BabelContextBaseProperties = {};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BabelContextCustomProperties
{}

export type BabelResolvedContext = (
  & BabelResolvedContextBaseProperties
  & BabelResolvedContextCustomProperties
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type BabelResolvedContextBaseProperties = {};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BabelResolvedContextCustomProperties
{}
