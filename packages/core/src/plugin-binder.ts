import type { Context } from "./context";
import { _maybeAwait } from "./function-tools";
import { generateHookSubscriptionIDForPlugin } from "./hook-subscription-id-generator";
import type { Plugin } from "./plugin";
import { createPluginBinderLooseErrorFactory } from "./plugin-binder-errors";
import type { PluginBinderOptions } from "./plugin-binder-options";
import { getPluginRegistry } from "./plugin-registry-getter";

export function bindPlugin(
  context: Context,
  plugin: Plugin,
  options?: null | PluginBinderOptions,
): void
{
  options ??= {};

  const looseErrorFactory = (
    options.looseErrorFactory
    ?? createPluginBinderLooseErrorFactory()
  );

  if (!plugin.name)
  {
    const err = looseErrorFactory.createNameIsNotDefinedError(plugin);
    throw err;
  }

  options ??= {};

  const registryGetter = options.registryGetter ?? getPluginRegistry;
  const registry = registryGetter(context);

  if (registry.has(plugin.name))
  {
    const err = looseErrorFactory.createAlreadyBoundError(plugin);
    throw err;
  }

  const generateHookSubscriptionID = (
    options.hookSubscriptionIDGenerator
    ?? generateHookSubscriptionIDForPlugin
  );

  if (plugin.resolveConfig != null)
  {
    context.hooks.resolveConfig.tapPromise(
      generateHookSubscriptionID(
        plugin,
        context.hooks.resolveConfig,
      ),
      async (
        context,
        config,
      ) =>
      {
        await _maybeAwait(
          plugin.resolveConfig?.(
            context,
            config,
          ),
        );
      },
    );
  }

  if (plugin.resolveContext != null)
  {
    context.hooks.resolveContext.tapPromise(
      generateHookSubscriptionID(
        plugin,
        context.hooks.resolveContext,
      ),
      async (
        context,
        options,
      ) =>
      {
        await _maybeAwait(
          plugin.resolveContext?.(
            context,
            options,
          ),
        );
      },
    );
  }

  if (plugin.onContextReady != null)
  {
    context.hooks.postResolveContext.tapPromise(
      generateHookSubscriptionID(
        plugin,
        context.hooks.postResolveContext,
      ),
      async (
        context,
      ) =>
      {
        await _maybeAwait(plugin.onContextReady?.(context));
      },
    );
  }

  registry.set(plugin.name, plugin);
}
