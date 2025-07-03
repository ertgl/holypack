import type { ConfigSync } from "../../config/ConfigSync";
import { SYSTEM_HOOK_UID_AUGMENT_CONTEXT_SYNC } from "../../hooks/augment-context/SYSTEM_HOOK_UID_AUGMENT_CONTEXT_SYNC";
import { SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_SYNC } from "../../hooks/post-resolve-context/SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_SYNC";
import { SYSTEM_HOOK_UID_RESOLVE_CONTEXT_SYNC } from "../../hooks/resolve-context/SYSTEM_HOOK_UID_RESOLVE_CONTEXT_SYNC";
import { SYSTEM_HOOK_UID_SETUP_SYNC } from "../../hooks/setup/SYSTEM_HOOK_UID_SETUP_SYNC";
import { createMutex } from "../../lib/mutex/createMutex";
import type { Optional } from "../../lib/object/Optional";
import { resolveCWD } from "../../lib/process/cwd/resolveCWD";
import { bindSystemExtensionsSync } from "../../system/extension/binder/bindSystemExtensionsSync";
import { bindSystemHooksSync } from "../../system/hook/binder/bindSystemHooksSync";
import { useSystemHookSync } from "../../system/hook/interop/useSystemHookSync";
import { configureContextByFileSync } from "../configurator/configureContextByFileSync";
import { configureContextSync } from "../configurator/configureContextSync";
import { SYSTEM_HOOK_UID_RESOLVE_CONFIG_SYNC } from "../configurator/hooks/SYSTEM_HOOK_UID_RESOLVE_CONFIG_SYNC";
import type { ContextSync } from "../ContextSync";

import type { ContextResolutionOptionsSync } from "./ContextResolutionOptionsSync";

export function resolveContextSync(
  options?: Optional<ContextResolutionOptionsSync>,
): ContextSync
{
  options ??= {};

  const cwd = resolveCWD(options.cwd);

  const context: ContextSync = {
    cwd,
    extensions: new Map(),
    fs: {},
    hooks: new Map(),
    sealed: false,
    sealerMutex: createMutex(),
    sync: true,
  };

  const bindSystemHooks = (
    options.systemHooksBinder
    ?? bindSystemHooksSync
  );

  bindSystemHooks(context);

  const configs: ConfigSync[] = [];

  if (options.preConfig != null)
  {
    configs.push(
      configureContextSync(
        context,
        options.preConfig,
      ),
    );
  }

  if (options.loadConfigFile ?? true)
  {
    const configByFile = configureContextByFileSync(
      context,
      {
        configDefinitionLoaderOptions: options.configDefinitionLoaderOptions,
        configFilePathFinderOptions: options.configFilePathFinderOptions,
        cwd,
      },
    );

    if (configByFile != null)
    {
      configs.push(configByFile);
    }
  }

  if (options.config != null)
  {
    configs.push(
      configureContextSync(
        context,
        options.config,
      ),
    );
  }

  if (options.postConfig != null)
  {
    configs.push(
      configureContextSync(
        context,
        options.postConfig,
      ),
    );
  }

  if (configs.length === 0)
  {
    configs.push(
      configureContextSync(
        context,
        null,
      ),
    );
  }

  const bindSystemExtensions = (
    options.systemExtensionsBinder
    ?? bindSystemExtensionsSync
  );

  bindSystemExtensions(context);

  for (const config of configs)
  {
    useSystemHookSync(
      context,
      SYSTEM_HOOK_UID_RESOLVE_CONFIG_SYNC,
      (hook) =>
      {
        hook.call(
          context,
          config,
        );
      },
    );
  }

  useSystemHookSync(
    context,
    SYSTEM_HOOK_UID_AUGMENT_CONTEXT_SYNC,
    (hook) =>
    {
      hook.call(context);
    },
  );

  useSystemHookSync(
    context,
    SYSTEM_HOOK_UID_SETUP_SYNC,
    (hook) =>
    {
      hook.call(context);
    },
  );

  useSystemHookSync(
    context,
    SYSTEM_HOOK_UID_RESOLVE_CONTEXT_SYNC,
    (hook) =>
    {
      hook.call(context);
    },
  );

  useSystemHookSync(
    context,
    SYSTEM_HOOK_UID_POST_RESOLVE_CONTEXT_SYNC,
    (hook) =>
    {
      hook.call(context);
    },
  );

  return context;
}
