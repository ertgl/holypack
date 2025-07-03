import type { CommandAsync } from "./CommandAsync";
import type { CommandSync } from "./CommandSync";

export type Command = (
  | CommandAsync
  | CommandSync
);
