import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { jest } from "@jest/globals";

import CORE_PACKAGE from "../../../../../../../package.json" with { type: "json" };
import { resolveContextAsync } from "../../../../../../context/resolver/resolveContextAsync";
import { resolveContextSync } from "../../../../../../context/resolver/resolveContextSync";
import type { ExtensionMaybeAsync } from "../../../../../../extension/ExtensionMaybeAsync";
import type { ExtensionSync } from "../../../../../../extension/ExtensionSync";
import { useExtensionAsync } from "../../../../../../extension/interop/useExtensionAsync";
import { useExtensionSync } from "../../../../../../extension/interop/useExtensionSync";
import type { HookCallbackAsync } from "../../../../../../hook/callback/HookCallbackAsync";
import type { HookCallbackSync } from "../../../../../../hook/callback/HookCallbackSync";
import type { ResolveCurrentWorkspaceHookAsync } from "../../../../hooks/resolve-current-workspace/ResolveCurrentWorkspaceHookAsync";
import type { ResolveCurrentWorkspaceHookSync } from "../../../../hooks/resolve-current-workspace/ResolveCurrentWorkspaceHookSync";
import { WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_ASYNC } from "../../../../hooks/resolve-current-workspace/WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_ASYNC";
import { WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_SYNC } from "../../../../hooks/resolve-current-workspace/WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_SYNC";
import { createWorkspacePlugin } from "../../../createWorkspacePlugin";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "../../../SYSTEM_PLUGIN_UID_WORKSPACE";
import { WorkspacePlugin } from "../../../WorkspacePlugin";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "CurrentWorkspaceResolverFacet",
  () =>
  {
    describe(
      "resolve",
      () =>
      {
        it(
          "should resolve current workspace",
          async () =>
          {
            const currentWorkspaceHandlerMock = jest.fn<
              HookCallbackAsync<ResolveCurrentWorkspaceHookAsync>
            >().mockResolvedValue(undefined);

            const sampleExtension: ExtensionMaybeAsync = {
              $postBindExtensionHook(
                context,
                extension,
                hook,
              )
              {
                if (hook.name === WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_ASYNC)
                {
                  (hook as ResolveCurrentWorkspaceHookAsync).tapPromise(
                    {
                      name: "test:sample",
                    },
                    currentWorkspaceHandlerMock,
                  );
                }
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

            const currentWorkspace = await useExtensionAsync(
              context,
              SYSTEM_PLUGIN_UID_WORKSPACE,
              async (
                workspacePlugin: WorkspacePlugin,
              ) =>
              {
                return await workspacePlugin.resolveCurrentWorkspace(context);
              },
            );

            expect(currentWorkspace).toMatchObject(
              expect.objectContaining({
                name: CORE_PACKAGE.name,
                packageJSON: expect.objectContaining({
                  name: CORE_PACKAGE.name,
                }) as unknown,
              }),
            );

            expect(currentWorkspaceHandlerMock).toHaveBeenCalledTimes(1);
            expect(currentWorkspaceHandlerMock).toHaveBeenCalledWith(currentWorkspace);
          },
        );
      },
    );

    describe(
      "resolveSync",
      () =>
      {
        it(
          "should resolve current workspace synchronously",
          () =>
          {
            const currentWorkspaceHandlerMock = jest.fn<
              HookCallbackSync<ResolveCurrentWorkspaceHookSync>
            >();

            const sampleExtension: ExtensionSync = {
              $postBindExtensionHookSync(
                context,
                extension,
                hook,
              )
              {
                if (hook.name === WORKSPACE_HOOK_UID_RESOLVE_CURRENT_WORKSPACE_SYNC)
                {
                  (hook as ResolveCurrentWorkspaceHookSync).tap(
                    {
                      name: "test:sample",
                    },
                    currentWorkspaceHandlerMock,
                  );
                }
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

            const currentWorkspace = useExtensionSync(
              context,
              SYSTEM_PLUGIN_UID_WORKSPACE,
              (
                workspacePlugin: WorkspacePlugin,
              ) =>
              {
                return workspacePlugin.resolveCurrentWorkspaceSync(context);
              },
            );

            expect(currentWorkspace).toMatchObject(
              expect.objectContaining({
                name: CORE_PACKAGE.name,
                packageJSON: expect.objectContaining({
                  name: CORE_PACKAGE.name,
                }) as unknown,
              }),
            );

            expect(currentWorkspaceHandlerMock).toHaveBeenCalledTimes(1);
            expect(currentWorkspaceHandlerMock).toHaveBeenCalledWith(currentWorkspace);
          },
        );
      },
    );
  },
);
