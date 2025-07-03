import type { Falsy } from "../boolean/Falsy";

export type Compact<T> = (
  T extends Array<infer U>
    ? (Exclude<U, Falsy>)[]
    : never
);
