import type { ContextAsync } from "../../context/ContextAsync";
import type { CommandAsync } from "../CommandAsync";

// eslint-disable-next-line @typescript-eslint/require-await
export async function invokeCommandAsync(
  context: ContextAsync,
  command: CommandAsync,
  data: Record<string, unknown>,
): Promise<unknown>
{
  // TODO(ertgl): Implement `invokeCommandAsync` function.
  throw new Error("Not implemented.");
}
