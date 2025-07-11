import type { Extension } from "@holypack/core/extension/Extension";

import type { CLIExtensionProtocol } from "./CLIExtensionProtocol";

export function doesExtensionImplementCLIProtocol<
  E extends Extension,
>(
  extension: E,
): extension is (CLIExtensionProtocol & E)
{
  if (typeof extension.$setupCLI === "function")
  {
    return true;
  }

  if (typeof extension.$setupCLISync === "function")
  {
    return true;
  }

  return false;
}
