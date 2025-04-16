import type { Plugin } from "./plugin";
import {
  PluginIsAlreadyBoundError,
  PluginNameIsNotDefinedError,
} from "./plugin-errors";

export type PluginBinderLooseErrorFactory = {
  createAlreadyBoundError: (
    plugin: Plugin,
  ) => Error;

  createNameIsNotDefinedError: (
    plugin: Plugin,
  ) => Error;
};

export function createPluginBinderLooseErrorFactory(): PluginBinderLooseErrorFactory
{
  return {
    createAlreadyBoundError: (
      plugin,
    ) =>
    {
      return new PluginIsAlreadyBoundError(plugin);
    },
    createNameIsNotDefinedError: (
      plugin,
    ) =>
    {
      return new PluginNameIsNotDefinedError(plugin);
    },
  };
}
