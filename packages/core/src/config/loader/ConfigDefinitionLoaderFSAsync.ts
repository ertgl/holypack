import type { CustomFileSystem } from "../../lib/fs/CustomFileSystem";
import type { StrictPartial } from "../../lib/object/StrictPartial";

export type ConfigDefinitionLoaderFSAsync = StrictPartial<
  Pick<
    CustomFileSystem,
    "readFile"
  >
>;
