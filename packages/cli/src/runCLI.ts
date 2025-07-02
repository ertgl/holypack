import type { CLI } from "./CLI";
import { createCLI } from "./createCLI";

export async function runCLI(
  cli?: CLI | null,
  argv?: null | readonly string[],
): Promise<void>
{
  cli ??= createCLI();
  process.title = cli.program.name();

  argv ??= process.argv;

  await cli.program.parseAsync(argv);
}
