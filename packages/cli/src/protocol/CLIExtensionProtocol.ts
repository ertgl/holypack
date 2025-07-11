import type { CLIExtensionProtocolAsync } from "./CLIExtensionProtocolAsync";
import type { CLIExtensionProtocolSync } from "./CLIExtensionProtocolSync";

export type CLIExtensionProtocol = (
  & CLIExtensionProtocolAsync
  & CLIExtensionProtocolSync
);
