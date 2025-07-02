import type { Falsy } from "../boolean/Falsy";

export type Compactible<T> = Array<Falsy | T> | null | undefined;
