import type { ConfigDefinition } from "../definition";

export type ConfigSearchResult = (
  | ConfigSearchResultFound
  | ConfigSearchResultNotFound
);

export type ConfigSearchResultFound = {
  configDefinition: ConfigDefinition;
  filePath: string;
  found: true;
};

export type ConfigSearchResultNotFound = {
  configDefinition: null | undefined;
  filePath: "";
  found: false;
};
