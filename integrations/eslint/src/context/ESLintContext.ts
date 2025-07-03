import type { Path } from "@holypack/core/lib/path/Path";
import type { Project } from "@holypack/core/plugins/project/models/Project";
import type { Workspace } from "@holypack/core/plugins/workspace/models/Workspace";
import type { TypeScriptContext } from "@holypack/integration-typescript/context/TypeScriptContext.cjs";

export type ESLintContext = {
  cwd: Path;
  project: Readonly<Project>;
  subWorkspaces: readonly Readonly<Workspace>[];
  typescript: null | TypeScriptContext;
  workspace: Readonly<Workspace>;
  workspaces: readonly Readonly<Workspace>[];
};
