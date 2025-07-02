import type { Optional } from "./Optional";

export type StrictPartial<T> = {
  [P in keyof T]?: Optional<T[P]>;
};
