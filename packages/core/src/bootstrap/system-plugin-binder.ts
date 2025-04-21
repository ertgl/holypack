import type { Context } from "../context";
import { bindPlugin } from "../extension";
import fs from "../plugins/fs";
import package_ from "../plugins/package";
import processCWD from "../plugins/process/cwd";
import project from "../plugins/project";
import repository from "../plugins/repository";

export type SystemPluginBinder = (
  context: Context,
) => void;

export function bindDefaultSystemPlugins(
  context: Context,
): void
{
  bindPlugin(context, processCWD());
  bindPlugin(context, fs());
  bindPlugin(context, package_());
  bindPlugin(context, repository());
  bindPlugin(context, project());
}
