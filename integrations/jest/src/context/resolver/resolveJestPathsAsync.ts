import { promisify } from "node:util";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import { resolveFileSystemFunctionAsync } from "@holypack/core/lib/fs/resolveFileSystemFunctionAsync";
import { resolvePath } from "@holypack/core/lib/path/resolvePath";
import { suppressErrorMaybeAsync } from "@holypack/core/lib/runtime/suppressErrorMaybeAsync";
import type { Workspace } from "@holypack/core/plugins/workspace/models/Workspace";

import type { JestPaths } from "../JestPaths";

export async function resolveJestPathsAsync(
  context: ContextAsync,
  workspace: Workspace,
): Promise<JestPaths>
{
  const lstat = await resolveFileSystemFunctionAsync(
    "lstat",
    context.fs,
  );

  const lstatPromisified = promisify(lstat);

  const srcDirectoryPath = resolvePath(
    workspace.path,
    "src",
  );

  const srcDirectoryStats = await suppressErrorMaybeAsync(
    lstatPromisified,
    srcDirectoryPath,
  );

  const testDirectoryPath = resolvePath(
    workspace.path,
    "test",
  );

  const testDirectoryStats = await suppressErrorMaybeAsync(
    lstatPromisified,
    testDirectoryPath,
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
