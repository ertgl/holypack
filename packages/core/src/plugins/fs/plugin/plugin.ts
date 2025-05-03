import type { Plugin } from "../../../extension";
import { PLUGIN_NAME_FILE_SYSTEM } from "../plugin-metadata";

// TODO(ertgl): Enable use of custom file systems.
export class FileSystemPlugin implements Plugin
{
  name = PLUGIN_NAME_FILE_SYSTEM;
}

export function createFileSystemPlugin(): FileSystemPlugin
{
  return new FileSystemPlugin();
}
