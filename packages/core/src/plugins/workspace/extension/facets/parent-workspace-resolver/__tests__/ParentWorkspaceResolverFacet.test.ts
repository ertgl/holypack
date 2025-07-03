import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { jest } from "@jest/globals";

import MONOREPO_PACKAGE from "../../../../../../../../../package.json" with { type: "json" };
import { resolveContextAsync } from "../../../../../../context/resolver/resolveContextAsync";
import { resolveContextSync } from "../../../../../../context/resolver/resolveContextSync";
import type { ExtensionMaybeAsync } from "../../../../../../extension/ExtensionMaybeAsync";
import type { ExtensionSync } from "../../../../../../extension/ExtensionSync";
import { useExtensionAsync } from "../../../../../../extension/interop/useExtensionAsync";
import { useExtensionSync } from "../../../../../../extension/interop/useExtensionSync";
import type { HookCallbackAsync } from "../../../../../../hook/callback/HookCallbackAsync";
import type { HookCallbackSync } from "../../../../../../hook/callback/HookCallbackSync";
import type { ResolveParentWorkspaceHookAsync } from "../../../../hooks/resolve-parent-workspace/ResolveParentWorkspaceHookAsync";
import type { ResolveParentWorkspaceHookSync } from "../../../../hooks/resolve-parent-workspace/ResolveParentWorkspaceHookSync";
import { WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_ASYNC } from "../../../../hooks/resolve-parent-workspace/WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_ASYNC";
import { WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_SYNC } from "../../../../hooks/resolve-parent-workspace/WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_SYNC";
import { createWorkspacePlugin } from "../../../createWorkspacePlugin";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "../../../SYSTEM_PLUGIN_UID_WORKSPACE";
import { WorkspacePlugin } from "../../../WorkspacePlugin";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "ParentWorkspaceResolverFacet",
  () =>
  {
    describe(
      "resolveByPath",
      () =>
      {
        it(
          "should resolve parent workspace",
          async () =>
          {
            const parentWorkspaceHandlerMock = jest.fn<
              HookCallbackAsync<ResolveParentWorkspaceHookAsync>
            >().mockResolvedValue(undefined);

            const sampleExtension: ExtensionMaybeAsync = {
              $postBindExtensionHook(
                context,
                extension,
                hook,
              )
              {
                if (hook.name === WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_ASYNC)
                {
                  (hook as ResolveParentWorkspaceHookAsync).tapPromise(
                    {
                      name: "test:sample",
                    },
                    parentWorkspaceHandlerMock,
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

            const {
              currentWorkspace,
              parentWorkspace,
            } = await useExtensionAsync(
              context,
              SYSTEM_PLUGIN_UID_WORKSPACE,
              async (
                workspacePlugin: WorkspacePlugin,
              ) =>
              {
                const currentWorkspace = await workspacePlugin.resolveCurrentWorkspace(context);
                const parentWorkspace = await workspacePlugin.resolveParentWorkspaceByPath(
                  context,
                  currentWorkspace.path,
                );

                return {
                  currentWorkspace,
                  parentWorkspace,
                };
              },
            );

            expect(parentWorkspace).toMatchObject(
              expect.objectContaining({
                name: MONOREPO_PACKAGE.name,
                packageJSON: expect.objectContaining({
                  name: MONOREPO_PACKAGE.name,
                }) as unknown,
              }),
            );

            expect(parentWorkspaceHandlerMock).toHaveBeenCalledTimes(1);

            expect(parentWorkspaceHandlerMock).toHaveBeenCalledWith(
              currentWorkspace,
              parentWorkspace,
            );
          },
        );
      },
    );

    describe(
      "resolveByPathSync",
      () =>
      {
        it(
          "should resolve parent workspace synchronously",
          () =>
          {
            const parentWorkspaceHandlerMock = jest.fn<
              HookCallbackSync<ResolveParentWorkspaceHookSync>
            >();

            const sampleExtension: ExtensionSync = {
              $postBindExtensionHookSync(
                context,
                extension,
                hook,
              )
              {
                if (hook.name === WORKSPACE_HOOK_UID_RESOLVE_PARENT_WORKSPACE_SYNC)
                {
                  (hook as ResolveParentWorkspaceHookSync).tap(
                    {
                      name: "test:sample",
                    },
                    parentWorkspaceHandlerMock,
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

            const {
              currentWorkspace,
              parentWorkspace,
            } = useExtensionSync(
              context,
              SYSTEM_PLUGIN_UID_WORKSPACE,
              (
                workspacePlugin: WorkspacePlugin,
              ) =>
              {
                const currentWorkspace = workspacePlugin.resolveCurrentWorkspaceSync(context);
                const parentWorkspace = workspacePlugin.resolveParentWorkspaceByPathSync(
                  context,
                  currentWorkspace.path,
                );

                return {
                  currentWorkspace,
                  parentWorkspace,
                };
              },
            );

            expect(parentWorkspace).toMatchObject(
              expect.objectContaining({
                name: MONOREPO_PACKAGE.name,
                packageJSON: expect.objectContaining({
                  name: MONOREPO_PACKAGE.name,
                }) as unknown,
              }),
            );

            expect(parentWorkspaceHandlerMock).toHaveBeenCalledTimes(1);

            expect(parentWorkspaceHandlerMock).toHaveBeenCalledWith(
              currentWorkspace,
              parentWorkspace,
            );
          },
        );
      },
    );
  },
);
