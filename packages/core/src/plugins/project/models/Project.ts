import type { Path } from "../../../lib/path/Path";
import type { Workspace } from "../../workspace/models/Workspace";

export type Project = {
  name: string;
  path: Path;
  workspace: Workspace;
};
