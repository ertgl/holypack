import type { CustomFileSystem } from "../../fs/CustomFileSystem";
import type { Optional } from "../../object/Optional";

export type UpwardGlobPathFinderFSAsync = {
  glob?: Optional<CustomFileSystem["glob"]>;
};
