import type { Linter } from "eslint";

export type ESLintContext = (
  & ESLintContextBaseProperties
  & ESLintContextCustomProperties
);

export type ESLintContextBaseProperties = {
  config?: Linter.Config[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintContextCustomProperties
{}

export type ESLintResolvedContext = (
  & ESLintResolvedContextBaseProperties
  & ESLintResolvedContextCustomProperties
);

export type ESLintResolvedContextBaseProperties = {
  config: Linter.Config[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ESLintResolvedContextCustomProperties
{}
