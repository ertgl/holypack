import type { FileSystem } from "../../../fs";

export type PathExistenceCheckerFS = {
  access?: FileSystem["access"] | null;
};
