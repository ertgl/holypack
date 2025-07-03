import type { CustomFileSystem } from "../../../../lib/fs/CustomFileSystem";
import type { StrictPartial } from "../../../../lib/object/StrictPartial";
import type { PackageJSONByFilePathLoaderFSAsync } from "../../../package/utils/package-json-loader/PackageJSONByFilePathLoaderFSAsync";

export type SubWorkspaceRootPathFinderFSAsync = (
  & PackageJSONByFilePathLoaderFSAsync
  & StrictPartial<
    Pick<
      CustomFileSystem,
      "glob"
    >
  >
);
