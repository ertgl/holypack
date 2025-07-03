import type { IO } from "./io/IO";

export type Monad<T> = IO<void, T>;
