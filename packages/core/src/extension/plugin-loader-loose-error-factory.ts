import { PluginNotFoundError } from "./errors";

export type PluginLoaderLooseErrorFactory = {
  createNotFoundError: (
    pluginName: string,
  ) => Error;
};

export function createPluginLoaderLooseErrorFactory(): PluginLoaderLooseErrorFactory
{
  return {
    createNotFoundError: (
      pluginName,
    ) =>
    {
      return new PluginNotFoundError(pluginName);
    },
  };
}
