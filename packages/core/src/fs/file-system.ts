import type { access } from "node:fs";

export type FileSystem = (
  & FileSystemBaseProperties
  & FileSystemCustomProperties
);

export type FileSystemBaseProperties = {
  access: typeof access;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FileSystemCustomProperties
{}
