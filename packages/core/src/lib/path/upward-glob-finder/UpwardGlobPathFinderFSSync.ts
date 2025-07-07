import type { CustomFileSystem } from "../../fs/CustomFileSystem";
import type { Optional } from "../../object/Optional";

export type UpwardGlobPathFinderFSSync = {
  globSync?: Optional<CustomFileSystem["globSync"]>;
};
