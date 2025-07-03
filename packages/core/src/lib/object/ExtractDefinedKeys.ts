import type { Nil } from "./Nil";

export type ExtractDefinedKeys<T> = {
  [K in keyof T]: (
    T[K] extends Nil
      ? never
      : K
  );
}[keyof T];
