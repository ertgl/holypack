import type { PackageJSON } from "../package";

export type Repository = (
  & RepositoryBaseProperties
  & RepositoryCustomProperties
);

export type RepositoryBaseProperties = {
  packageJSON?: null | PackageJSON;
  path?: null | string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RepositoryCustomProperties
{}

export type ResolvedRepository = (
  & ResolvedRepositoryBaseProperties
  & ResolvedRepositoryCustomProperties
);

export type ResolvedRepositoryBaseProperties = {
  packageJSON: PackageJSON;
  path: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ResolvedRepositoryCustomProperties
{}
