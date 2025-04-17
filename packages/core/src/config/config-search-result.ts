import type { ConfigInput } from "./config-input";

export type ConfigSearchResult = (
  | ConfigSearchResultFound
  | ConfigSearchResultNotFound
);

export type ConfigSearchResultFound = {
  configInput: ConfigInput;
  filePath: string;
  found: true;
};

export type ConfigSearchResultNotFound = {
  configInput: null | undefined;
  filePath: "";
  found: false;
};
