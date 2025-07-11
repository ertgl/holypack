import type { ContextAsync } from "@holypack/core/context/ContextAsync";

import type { Program } from "../program/Program";

export type CLIExtensionProtocolAsync = {
  $setupCLI?(
    context: ContextAsync,
    program: Program,
  ): Promise<void> | void;
};
