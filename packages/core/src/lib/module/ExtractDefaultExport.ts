import type { ModuleWithDefaultExport } from "./ModuleWithDefaultExport";

export type ExtractDefaultExport<T> = (
  T extends ModuleWithDefaultExport<infer U>
    ? U
    : T
);
