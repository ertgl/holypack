import { execSync } from "node:child_process";

import { resolveBuildContext } from "@holypack/internal-dev/build/context/resolver/resolveBuildContext.mjs";

const context = resolveBuildContext();

const jest = String(execSync("yarn workspace @holypack/integration-jest bin jest"));

execSync(
  `node --disable-warning=ExperimentalWarning --experimental-vm-modules ${jest}`,
  {
    cwd: context.workspace.paths.root,
    stdio: "inherit",
  },
);
