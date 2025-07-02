import { promisify } from "node:util";

import {
  createTracer,
  dumpStackTrace,
  type EncodableStackFrame,
  traceHook,
  type Tracer,
} from "tapable-tracer";
import { generateMermaidUML } from "tapable-tracer/extensions/mermaid";

import type { ContextAsync } from "@holypack/core/context/ContextAsync";
import type { ContextSync } from "@holypack/core/context/ContextSync";
import { AbstractExtension } from "@holypack/core/extension/AbstractExtension";
import type { Extension } from "@holypack/core/extension/Extension";
import type { AnyHook } from "@holypack/core/hook/AnyHook";
import type { AnyHookSync } from "@holypack/core/hook/AnyHookSync";
import { resolveFileSystemFunctionAsync } from "@holypack/core/lib/fs/resolveFileSystemFunctionAsync";
import { resolveFileSystemFunctionSync } from "@holypack/core/lib/fs/resolveFileSystemFunctionSync.cjs";
import type { Optional } from "@holypack/core/lib/object/Optional";
import { resolvePath } from "@holypack/core/lib/path/resolvePath";

import type { HookTracerPluginOptions } from "./HookTracerPluginOptions";
import { PLUGIN_UID_HOOK_TRACER } from "./PLUGIN_UID_HOOK_TRACER";

export class HookTracerPlugin extends AbstractExtension
{
  readonly $uid = PLUGIN_UID_HOOK_TRACER;

  readonly options: HookTracerPluginOptions;

  readonly tracer: Tracer;

  constructor(
    options?: Optional<HookTracerPluginOptions>,
  )
  {
    super();

    this.options = options ?? {};
    this.tracer = createTracer(this.options.tracer);
  }

  $initialize(
    context: ContextAsync,
  ): void
  {
    this.initialize(context);
  }

  $initializeSync(
    context: ContextSync,
  ): void
  {
    this.initialize(context);
  }

  $postBindContextHook(
    context: ContextAsync,
    hook: AnyHook,
  ): void
  {
    this.traceHook(hook);
  }

  $postBindContextHookSync(
    context: ContextSync,
    hook: AnyHookSync,
  ): void
  {
    this.traceHook(hook);
  }

  $postBindExtensionHook(
    context: ContextAsync,
    extension: Extension,
    hook: AnyHook,
  ): void
  {
    this.traceHook(hook);
  }

  $postBindExtensionHookSync(
    context: ContextSync,
    extension: Extension,
    hook: AnyHookSync,
  ): void
  {
    this.traceHook(hook);
  }

  async $postSealContext(
    context: ContextAsync,
  ): Promise<void>
  {
    const mkdir = await resolveFileSystemFunctionAsync(
      "mkdir",
      context.fs,
    );

    const mkdirPromisified = promisify(mkdir);

    const writeFile = await resolveFileSystemFunctionAsync(
      "writeFile",
      context.fs,
    );

    const writeFilePromisified = promisify(writeFile);

    const frames = this.dump();

    const tracingOutputDirectoryPath = resolvePath(
      context.cwd,
      ".holypack",
      ".tracing",
      "hooks",
    );

    await mkdirPromisified(
      tracingOutputDirectoryPath,
      {
        recursive: true,
      },
    );

    const tracingOutputJSONFilePath = resolvePath(
      tracingOutputDirectoryPath,
      "stack.json",
    );

    await writeFilePromisified(
      tracingOutputJSONFilePath,
      JSON.stringify(
        frames,
        null,
        2,
      ),
      {
        encoding: "utf8",
        flush: true,
      },
    );

    const tracingOutputMermaidFilePath = resolvePath(
      tracingOutputDirectoryPath,
      "graph.mmd",
    );

    await writeFilePromisified(
      tracingOutputMermaidFilePath,
      this.generateMermaidUML(frames),
      {
        encoding: "utf8",
        flush: true,
      },
    );
  }

  $postSealContextSync(
    context: ContextSync,
  ): void
  {
    const mkdirSync = resolveFileSystemFunctionSync(
      "mkdirSync",
      context.fs,
    );

    const writeFileSync = resolveFileSystemFunctionSync(
      "writeFileSync",
      context.fs,
    );

    const frames = this.dump();

    const tracingOutputDirectoryPath = resolvePath(
      context.cwd,
      ".holypack",
      ".tracing",
      "hooks",
    );

    mkdirSync(
      tracingOutputDirectoryPath,
      {
        recursive: true,
      },
    );

    const tracingOutputJSONFilePath = resolvePath(
      tracingOutputDirectoryPath,
      "stack.json",
    );

    writeFileSync(
      tracingOutputJSONFilePath,
      JSON.stringify(
        frames,
        null,
        2,
      ),
      {
        encoding: "utf8",
        flush: true,
      },
    );

    const tracingOutputMermaidFilePath = resolvePath(
      tracingOutputDirectoryPath,
      "graph.mmd",
    );

    writeFileSync(
      tracingOutputMermaidFilePath,
      this.generateMermaidUML(frames),
      {
        encoding: "utf8",
        flush: true,
      },
    );
  }

  dump(): EncodableStackFrame[]
  {
    return dumpStackTrace(this.tracer.trace);
  }

  generateMermaidUML(
    frames?: EncodableStackFrame[] | null,
  ): string
  {
    return generateMermaidUML(
      frames
      ?? this.dump(),
    );
  }

  initialize(
    context: ContextAsync | ContextSync,
  ): void
  {
    for (const hook of context.hooks.values())
    {
      this.traceHook(hook);
    }

    for (const extension of context.extensions.values())
    {
      if (extension.$hooks != null)
      {
        for (const hook of extension.$hooks.values())
        {
          this.traceHook(hook);
        }
      }
    }
  }

  traceHook(
    hook: AnyHook,
  ): void
  {
    traceHook(
      this.tracer,
      hook,
      {
        includeTrigger: true,
        key: hook.name,
      },
    );
  }
}
