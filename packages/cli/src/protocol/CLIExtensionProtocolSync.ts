import type { ContextSync } from "@holypack/core/context/ContextSync";

import type { Program } from "../program/Program";

export type CLIExtensionProtocolSync = {
  $setupCLISync?(
    context: ContextSync,
    program: Program,
  ): void;
};
