import type { CustomFileSystem } from "../../../../lib/fs/CustomFileSystem";
import type { StrictPartial } from "../../../../lib/object/StrictPartial";

export type WorkspaceRootPathFinderFSAsync = StrictPartial<
  Pick<
    CustomFileSystem,
    "lstat"
  >
>;
