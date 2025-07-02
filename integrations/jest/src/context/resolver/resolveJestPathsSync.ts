import type { ContextSync } from "@holypack/core/context/ContextSync";
import { resolveFileSystemFunctionSync } from "@holypack/core/lib/fs/resolveFileSystemFunctionSync";
import { resolvePath } from "@holypack/core/lib/path/resolvePath";
import type { Workspace } from "@holypack/core/plugins/workspace/models/Workspace";

import type { JestPaths } from "../JestPaths";

export function resolveJestPathsSync(
  context: ContextSync,
  workspace: Workspace,
): JestPaths
{
  const lstatSync = resolveFileSystemFunctionSync(
    "lstatSync",
    context.fs,
  );

  const srcDirectoryPath = resolvePath(
    workspace.path,
    "src",
  );

  const srcDirectoryStats = lstatSync(
    srcDirectoryPath,
    {
      throwIfNoEntry: false,
    },
  );

  const testDirectoryPath = resolvePath(
    workspace.path,
    "test",
  );

  const testDirectoryStats = lstatSync(
    testDirectoryPath,
    {
      throwIfNoEntry: false,
    },
  );

  return {
    src: (
      srcDirectoryStats != null
        ? srcDirectoryPath
        : null
    ),
    test: (
      testDirectoryStats != null
        ? testDirectoryPath
        : null
    ),
  };
}
