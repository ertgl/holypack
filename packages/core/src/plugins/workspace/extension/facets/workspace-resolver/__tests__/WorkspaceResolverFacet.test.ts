import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { jest } from "@jest/globals";

import CORE_PACKAGE from "../../../../../../../package.json" with { type: "json" };
import { resolveContextAsync } from "../../../../../../context/resolver/resolveContextAsync";
import { resolveContextSync } from "../../../../../../context/resolver/resolveContextSync";
import type { ExtensionMaybeAsync } from "../../../../../../extension/ExtensionMaybeAsync";
import type { ExtensionSync } from "../../../../../../extension/ExtensionSync";
import { useExtensionHookAsync } from "../../../../../../extension/hook/interop/useExtensionHookAsync";
import { useExtensionHookSync } from "../../../../../../extension/hook/interop/useExtensionHookSync";
import { useExtensionAsync } from "../../../../../../extension/interop/useExtensionAsync";
import { useExtensionSync } from "../../../../../../extension/interop/useExtensionSync";
import { requireExtension } from "../../../../../../extension/registry/requireExtension";
import type { HookCallbackAsync } from "../../../../../../hook/callback/HookCallbackAsync";
import type { HookCallbackSync } from "../../../../../../hook/callback/HookCallbackSync";
import { requireSystemExtension } from "../../../../../../system/extension/registry/requireSystemExtension";
import type { ResolveWorkspaceHookAsync } from "../../../../hooks/resolve-workspace/ResolveWorkspaceHookAsync";
import type { ResolveWorkspaceHookSync } from "../../../../hooks/resolve-workspace/ResolveWorkspaceHookSync";
import { WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_ASYNC } from "../../../../hooks/resolve-workspace/WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_ASYNC";
import { WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_SYNC } from "../../../../hooks/resolve-workspace/WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_SYNC";
import { createWorkspacePlugin } from "../../../createWorkspacePlugin";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "../../../SYSTEM_PLUGIN_UID_WORKSPACE";
import { WorkspacePlugin } from "../../../WorkspacePlugin";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "WorkspaceResolverFacet",
  () =>
  {
    describe(
      "resolve",
      () =>
      {
        it(
          "should resolve workspace by path",
          async () =>
          {
            const workspaceHandlerMock = jest.fn<
              HookCallbackAsync<ResolveWorkspaceHookAsync>
            >().mockResolvedValue(undefined);

            const sampleExtension: ExtensionMaybeAsync = {
              async $setup(
                context,
              )
              {
                const workspacePlugin = requireSystemExtension(
                  context,
                  SYSTEM_PLUGIN_UID_WORKSPACE,
                );

                await useExtensionHookAsync(
                  workspacePlugin,
                  WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_ASYNC,
                  (
                    hook: ResolveWorkspaceHookAsync,
                  ) =>
                  {
                    hook.tapPromise(
                      {
                        name: "test:sample",
                      },
                      workspaceHandlerMock,
                    );
                  },
                );
              },
              $uid: "test:sample",
            };

            const context = await resolveContextAsync({
              config: {
                extensions: [
                  createWorkspacePlugin(),
                  sampleExtension,
                ],
              },
              cwd: __dirname,
              loadConfigFile: false,
            });

            const workspace = await useExtensionAsync(
              context,
              SYSTEM_PLUGIN_UID_WORKSPACE,
              async (
                workspacePlugin: WorkspacePlugin,
              ) =>
              {
                return await workspacePlugin.resolveCurrentWorkspace(context);
              },
            );

            expect(workspace).toMatchObject(
              expect.objectContaining({
                name: CORE_PACKAGE.name,
                packageJSON: expect.objectContaining({
                  name: CORE_PACKAGE.name,
                }) as unknown,
              }),
            );

            expect(workspaceHandlerMock).toHaveBeenCalledTimes(1);
            expect(workspaceHandlerMock).toHaveBeenCalledWith(workspace);
          },
        );
      },
    );

    describe(
      "resolveSync",
      () =>
      {
        it(
          "should resolve workspace by path synchronously",
          () =>
          {
            const workspaceHandlerMock = jest.fn<
              HookCallbackSync<ResolveWorkspaceHookSync>
            >();

            const sampleExtension: ExtensionSync = {
              $setupSync(
                context,
              )
              {
                const workspacePlugin = requireExtension<WorkspacePlugin>(
                  context,
                  SYSTEM_PLUGIN_UID_WORKSPACE,
                );

                useExtensionHookSync(
                  workspacePlugin,
                  WORKSPACE_HOOK_UID_RESOLVE_WORKSPACE_SYNC,
                  (
                    hook: ResolveWorkspaceHookSync,
                  ) =>
                  {
                    hook.tap(
                      {
                        name: "test:sample",
                      },
                      workspaceHandlerMock,
                    );
                  },
                );
              },
              $uid: "test:sample",
            };

            const context = resolveContextSync({
              config: {
                extensions: [
                  createWorkspacePlugin(),
                  sampleExtension,
                ],
              },
              cwd: __dirname,
              loadConfigFile: false,
            });

            const workspace = useExtensionSync(
              context,
              SYSTEM_PLUGIN_UID_WORKSPACE,
              (
                workspacePlugin: WorkspacePlugin,
              ) =>
              {
                return workspacePlugin.resolveCurrentWorkspaceSync(context);
              },
            );

            expect(workspace).toMatchObject(
              expect.objectContaining({
                name: CORE_PACKAGE.name,
                packageJSON: expect.objectContaining({
                  name: CORE_PACKAGE.name,
                }) as unknown,
              }),
            );

            expect(workspaceHandlerMock).toHaveBeenCalledTimes(1);
            expect(workspaceHandlerMock).toHaveBeenCalledWith(workspace);
          },
        );
      },
    );
  },
);
