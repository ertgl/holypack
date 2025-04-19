import type { PathLike } from "../../fs";

import {
  getProcessCWD,
  resolveCWD,
} from "./api";
import type { CWDPlugin } from "./plugin";

export class CWDPluginAPI
{
  plugin: CWDPlugin;

  constructor(
    plugin: CWDPlugin,
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
