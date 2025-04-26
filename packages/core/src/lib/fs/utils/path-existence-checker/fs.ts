import type { FileSystem } from "../..";

export type PathExistenceCheckerFS = {
  access?: FileSystem["access"] | null;
};
