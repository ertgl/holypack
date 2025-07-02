import type { CustomFileSystem } from "../../../../lib/fs/CustomFileSystem";
import type { StrictPartial } from "../../../../lib/object/StrictPartial";
import type { PackageJSONByFilePathLoaderFSSync } from "../../../package/utils/package-json-loader/PackageJSONByFilePathLoaderFSSync";

export type SubWorkspaceRootPathFinderFSSync = (
  & PackageJSONByFilePathLoaderFSSync
  & StrictPartial<
    Pick<
      CustomFileSystem,
      "globSync"
    >
  >
);
