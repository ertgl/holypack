import type { StrictPartial } from "../../lib/object/StrictPartial";
import type { CommandAsync } from "../CommandAsync";

export type CommandFactoryOptionsAsync = (
  & Pick<
    CommandAsync,
    (
      | "handler"
      | "uid"
    )
  >
  & StrictPartial<
    Omit<
      CommandAsync,
      (
        | "handler"
        | "uid"
      )
    >
  >
);
