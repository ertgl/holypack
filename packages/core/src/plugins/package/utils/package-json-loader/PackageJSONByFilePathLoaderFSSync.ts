import type { CustomFileSystem } from "../../../../lib/fs/CustomFileSystem";
import type { Optional } from "../../../../lib/object/Optional";

export type PackageJSONByFilePathLoaderFSSync = {
  readFileSync?: Optional<CustomFileSystem["readFileSync"]>;
};
