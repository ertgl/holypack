import type { Command } from "../Command";

export type EncodableCommand = Omit<
  Command,
  "handler"
>;
