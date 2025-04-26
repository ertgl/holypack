import type { Plugin } from "../../extension";

export const PLUGIN_NAME_FILE_SYSTEM = "@holypack/core:FileSystem";

// TODO(ertgl): Enable use of custom file system implementations more easily.
export class FileSystemPlugin implements Plugin
{
  name = PLUGIN_NAME_FILE_SYSTEM;
}

export function createFileSystemPlugin(): FileSystemPlugin
{
  return new FileSystemPlugin();
}
