import type { PathExistenceCheckerFS } from "./fs";

export type PathExistenceCheckerOptions = {
  accessMode?: null | number;
  fs?: null | PathExistenceCheckerFS;
};
