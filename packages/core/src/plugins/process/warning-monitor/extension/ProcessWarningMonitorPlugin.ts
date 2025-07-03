import type { ContextAsync } from "../../../../context/ContextAsync";
import type { ContextSync } from "../../../../context/ContextSync";
import { AbstractExtension } from "../../../../extension/AbstractExtension";
import { bindExtensionHookAsync } from "../../../../extension/hook/binder/bindExtensionHookAsync";
import { bindExtensionHookSync } from "../../../../extension/hook/binder/bindExtensionHookSync";
import { useExtensionHookAsync } from "../../../../extension/hook/interop/useExtensionHookAsync";
import { useExtensionHookSync } from "../../../../extension/hook/interop/useExtensionHookSync";
import { createEmitWarningHookAsync } from "../hooks/emit-warning/createEmitWarningHookAsync";
import { createEmitWarningHookSync } from "../hooks/emit-warning/createEmitWarningHookSync";
import type { EmitWarningHookAsync } from "../hooks/emit-warning/EmitWarningHookAsync";
import type { EmitWarningHookSync } from "../hooks/emit-warning/EmitWarningHookSync";
import { PROCESS_WARNING_MONITOR_HOOK_UID_EMIT_WARNING_ASYNC } from "../hooks/emit-warning/PROCESS_WARNING_MONITOR_HOOK_UID_EMIT_WARNING_ASYNC";
import { PROCESS_WARNING_MONITOR_HOOK_UID_EMIT_WARNING_SYNC } from "../hooks/emit-warning/PROCESS_WARNING_MONITOR_HOOK_UID_EMIT_WARNING_SYNC";

import { SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR } from "./SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR";

export class ProcessWarningMonitorPlugin extends AbstractExtension
{
  readonly $uid = SYSTEM_PLUGIN_UID_PROCESS_WARNING_MONITOR;

  async $setup(
    context: ContextAsync,
  ): Promise<void>
  {
    await bindExtensionHookAsync(
      context,
      this,
      createEmitWarningHookAsync(),
    );
  }

  $setupSync(
    context: ContextSync,
  ): void
  {
    bindExtensionHookSync(
      context,
      this,
      createEmitWarningHookSync(),
    );
  }

  async emitWarning(
    context: ContextAsync,
    err: Error,
  ): Promise<void>
  {
    await useExtensionHookAsync(
      this,
      PROCESS_WARNING_MONITOR_HOOK_UID_EMIT_WARNING_ASYNC,
      async (
        hook: EmitWarningHookAsync,
      ) =>
      {
        await hook.promise(
          context,
          err,
        );
      },
    );
  }

  emitWarningSync(
    context: ContextSync,
    err: Error,
  ): void
  {
    useExtensionHookSync(
      this,
      PROCESS_WARNING_MONITOR_HOOK_UID_EMIT_WARNING_SYNC,
      (
        hook: EmitWarningHookSync,
      ) =>
      {
        hook.call(
          context,
          err,
        );
      },
    );
  }
}
