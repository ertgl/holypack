import type { PackageJSON } from "../package";

export type Project = (
  & ProjectBaseProperties
  & ProjectCustomProperties
);

export type ProjectBaseProperties = {
  packageJSON?: null | PackageJSON;
  path?: null | string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProjectCustomProperties
{}

export type ResolvedProject = (
  & ResolvedProjectBaseProperties
  & ResolvedProjectCustomProperties
);

export type ResolvedProjectBaseProperties = {
  packageJSON: PackageJSON;
  path: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ResolvedProjectCustomProperties
{}
