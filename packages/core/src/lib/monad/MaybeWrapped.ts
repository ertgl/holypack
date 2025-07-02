import type { Monad } from "./Monad";

export type MaybeWrapped<T> = Monad<T> | T;
