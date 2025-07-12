/**
 * @import { type BuildTargetFileExtension } from "./BuildTargetFileExtension.mjs";
 * @import { type ModuleFormat } from "../module/format/ModuleFormat.mjs";
 */

/**
 * @constant
 * @satisfies {Record<ModuleFormat, BuildTargetFileExtension>}
 */
export const MODULE_FORMAT_TO_FILE_EXTENSION_MAPPING = {
  cjs: ".cjs",
  esm: ".mjs",
  types: ".d.ts",
};
