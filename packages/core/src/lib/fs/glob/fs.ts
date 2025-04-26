import type { FileSystem } from "../file-system";

export type GlobFS = {
  readdir?: FileSystem["readdir"] | null;
};
