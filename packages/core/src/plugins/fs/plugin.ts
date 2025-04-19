import type { Plugin } from "../../extension";

import { FileSystemPluginAPI } from "./plugin-api";

export const PLUGIN_NAME_FILE_SYSTEM = "@holypack/core:FileSystem";

export class FileSystemPlugin implements Plugin
{
  api: FileSystemPluginAPI;

  name = PLUGIN_NAME_FILE_SYSTEM;

  constructor()
  {
    this.api = new FileSystemPluginAPI(this);
  }
}

export function createFileSystemPlugin(): FileSystemPlugin
{
  return new FileSystemPlugin();
}
