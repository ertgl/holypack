import type { PackageJSON } from "../../package";

import type { ProjectPath } from "./project-path";

export type Project = (
  & ProjectBaseProperties
  & ProjectCustomProperties
);

export type ProjectBaseProperties = {
  name?: null | string;
  packageJSON?: null | PackageJSON;
  path?: null | ProjectPath;
  subProjects?: null | Project[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProjectCustomProperties
{}

export type ResolvedProject = (
  & ResolvedProjectBaseProperties
  & ResolvedProjectCustomProperties
);

export type ResolvedProjectBaseProperties = {
  name: string;
  packageJSON: PackageJSON;
  path: ProjectPath;
  subProjects: ResolvedProject[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ResolvedProjectCustomProperties
{}
