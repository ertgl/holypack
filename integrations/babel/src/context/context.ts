import type { ConfigFunction } from "@babel/core";

export type BabelContext = (
  & BabelContextBaseProperties
  & BabelContextCustomProperties
);

export type BabelContextBaseProperties = {
  configFunction?: ConfigFunction | null;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BabelContextCustomProperties
{}

export type BabelResolvedContext = (
  & BabelResolvedContextBaseProperties
  & BabelResolvedContextCustomProperties
);

export type BabelResolvedContextBaseProperties = {
  configFunction: ConfigFunction;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BabelResolvedContextCustomProperties
{}
