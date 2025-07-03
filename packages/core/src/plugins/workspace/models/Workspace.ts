import type { Path } from "../../../lib/path/Path";
import type { PackageJSON } from "../../package/models/PackageJSON";

export type Workspace = {
  name: string;
  packageJSON: null | PackageJSON;
  path: Path;
};
