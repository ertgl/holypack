import type { CustomFileSystem } from "@holypack/core/lib/fs/CustomFileSystem";
import type { StrictPartial } from "@holypack/core/lib/object/StrictPartial";

export type TSConfigRootPathFinderFSAsync = StrictPartial<
  Pick<
    CustomFileSystem,
    "lstat"
  >
>;
