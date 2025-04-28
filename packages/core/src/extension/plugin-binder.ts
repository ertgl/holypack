import { HOOK_NAME_RESOLVE_CONFIG } from "../config/hooks";
import type { TypeSafeContext } from "../context";
import {
  HOOK_NAME_POST_RESOLVE_CONTEXT,
  HOOK_NAME_RESOLVE_CONTEXT,
  HOOK_NAME_SETUP,
} from "../context/hooks";
import { generateHookSubscriptionIDForPlugin } from "../eventing";
import { maybeAwait } from "../lib/promise";

import type { Plugin } from "./plugin";
import { createPluginBinderLooseErrorFactory } from "./plugin-binder-loose-error-factory";
import type { PluginBinderOptions } from "./plugin-binder-options";
import { getPluginRegistry } from "./plugin-registry-getter";

export function bindPlugin(
  context: TypeSafeContext,
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

  if (plugin.onContextReady != null)
  {
    context.hooks[HOOK_NAME_POST_RESOLVE_CONTEXT].tapPromise(
      generateHookSubscriptionID(
        plugin,
        context.hooks[HOOK_NAME_POST_RESOLVE_CONTEXT],
      ),
      async (
        context,
      ) =>
      {
        await maybeAwait(plugin.onContextReady?.(context));
      },
    );
  }

  if (plugin.resolveConfig != null)
  {
    context.hooks[HOOK_NAME_RESOLVE_CONFIG].tapPromise(
      generateHookSubscriptionID(
        plugin,
        context.hooks[HOOK_NAME_RESOLVE_CONFIG],
      ),
      async (
        context,
        config,
      ) =>
      {
        await maybeAwait(
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
    context.hooks[HOOK_NAME_RESOLVE_CONTEXT].tapPromise(
      generateHookSubscriptionID(
        plugin,
        context.hooks[HOOK_NAME_RESOLVE_CONTEXT],
      ),
      async (
        context,
        options,
      ) =>
      {
        await maybeAwait(
          plugin.resolveContext?.(
            context,
            options,
          ),
        );
      },
    );
  }

  if (plugin.setup != null)
  {
    context.hooks[HOOK_NAME_SETUP].tapPromise(
      generateHookSubscriptionID(
        plugin,
        context.hooks[HOOK_NAME_SETUP],
      ),
      async (
        context,
        config,
      ) =>
      {
        await maybeAwait(
          plugin.setup?.(
            context,
            config,
          ),
        );
      },
    );
  }

  registry.set(plugin.name, plugin);
}
