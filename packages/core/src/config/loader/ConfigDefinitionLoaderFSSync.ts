import type { CustomFileSystem } from "../../lib/fs/CustomFileSystem";
import type { Optional } from "../../lib/object/Optional";

export type ConfigDefinitionLoaderFSSync = {
  readFileSync?: Optional<CustomFileSystem["readFileSync"]>;
};
