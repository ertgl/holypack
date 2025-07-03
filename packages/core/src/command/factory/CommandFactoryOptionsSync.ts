import type { StrictPartial } from "../../lib/object/StrictPartial";
import type { CommandSync } from "../CommandSync";

export type CommandFactoryOptionsSync = (
  & Pick<
    CommandSync,
    (
      | "handler"
      | "uid"
    )
  >
  & StrictPartial<
    Omit<
      CommandSync,
      (
        | "handler"
        | "uid"
      )
    >
  >
);
