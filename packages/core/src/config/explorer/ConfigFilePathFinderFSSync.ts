import type { CustomFileSystem } from "../../lib/fs/CustomFileSystem";
import type { Optional } from "../../lib/object/Optional";

export type ConfigFilePathFinderFSSync = {
  globSync?: Optional<CustomFileSystem["globSync"]>;
  readFileSync?: Optional<CustomFileSystem["readFileSync"]>;
};
