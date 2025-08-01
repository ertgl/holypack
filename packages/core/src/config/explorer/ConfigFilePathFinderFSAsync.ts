import type { CustomFileSystem } from "../../lib/fs/CustomFileSystem";
import type { Optional } from "../../lib/object/Optional";

export type ConfigFilePathFinderFSAsync = {
  glob?: Optional<CustomFileSystem["glob"]>;
  readFile?: Optional<CustomFileSystem["readFile"]>;
};
