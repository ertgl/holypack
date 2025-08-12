import type { ModuleWithDefaultExport } from "./ModuleWithDefaultExport";

export type ImportFunction<
  T,
> = (
  path: string,
) => Promise<
  | ModuleWithDefaultExport<T>
  | T
>;
