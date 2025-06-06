import type { PathLike } from "../../../../../lib/fs";
import {
  getProcessCWD,
  resolveCWD,
} from "../../../../../lib/process/cwd";

import type { ProcessCWDPlugin } from "./plugin";

export class ProcessCWDPluginAPI
{
  plugin: ProcessCWDPlugin;

  constructor(
    plugin: ProcessCWDPlugin,
  )
  {
    this.plugin = plugin;
  }

  getProcessCWD(): string
  {
    return getProcessCWD();
  }

  resolveCWD(
    cwd?: null | PathLike,
  ): string
  {
    return resolveCWD(cwd);
  }
}
