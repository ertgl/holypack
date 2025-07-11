import { styleText } from "node:util";

import type { Command } from "commander";

export function configureCommandHelp(
  command: Command,
): void
{
  command.configureHelp({
    sortOptions: true,
    sortSubcommands: true,
    styleArgumentText: (str) => styleText(["reset", "dim", "cyanBright"], str),
    styleOptionTerm: (str) => styleText(["bold", "cyanBright"], str),
    styleOptionText: (str) => styleText(["reset", "dim", "cyanBright"], str),
    styleSubcommandText: (str) => styleText(["bold", "cyan"], str),
    styleTitle: (str) => styleText(["bold", "green"], str),
    styleUsage: (str) => styleText(["bold", "cyan"], str),
  });
}
