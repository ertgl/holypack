import type { ModuleFormat } from "./ModuleFormat";
import type { ModuleFormatString } from "./ModuleFormatString";

export function castModuleFormat(
  format: "cjs",
): ModuleFormat.CJS;
export function castModuleFormat(
  format: "esm",
): ModuleFormat.ESM;
export function castModuleFormat(
  format: ModuleFormatString,
): ModuleFormat;
export function castModuleFormat(
  format: string,
): ModuleFormat;
export function castModuleFormat(
  format: string,
): ModuleFormat
{
  return format as ModuleFormat;
}
