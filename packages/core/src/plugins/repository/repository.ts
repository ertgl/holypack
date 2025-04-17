export type Repository = (
  & RepositoryBaseProperties
  & RepositoryCustomProperties
);

export type RepositoryBaseProperties = {
  path: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RepositoryCustomProperties
{}

export type ResolvedRepository = (
  & ResolvedRepositoryBaseProperties
  & ResolvedRepositoryCustomProperties
);

export type ResolvedRepositoryBaseProperties = {
  path: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ResolvedRepositoryCustomProperties
{}
