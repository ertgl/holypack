import type { ContextSync } from "../../context/ContextSync";
import type { CommandSync } from "../CommandSync";

export function invokeCommandSync(
  context: ContextSync,
  command: CommandSync,
  data: Record<string, unknown>,
): unknown
{
  // TODO(ertgl): Implement `invokeCommandSync` function.
  throw new Error("Not implemented.");
}
