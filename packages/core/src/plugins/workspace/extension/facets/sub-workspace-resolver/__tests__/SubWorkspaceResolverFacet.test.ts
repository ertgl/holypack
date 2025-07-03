import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { jest } from "@jest/globals";

import { resolveContextAsync } from "../../../../../../context/resolver/resolveContextAsync";
import { resolveContextSync } from "../../../../../../context/resolver/resolveContextSync";
import type { ExtensionMaybeAsync } from "../../../../../../extension/ExtensionMaybeAsync";
import type { ExtensionSync } from "../../../../../../extension/ExtensionSync";
import { useExtensionAsync } from "../../../../../../extension/interop/useExtensionAsync";
import { useExtensionSync } from "../../../../../../extension/interop/useExtensionSync";
import type { HookCallbackAsync } from "../../../../../../hook/callback/HookCallbackAsync";
import type { HookCallbackSync } from "../../../../../../hook/callback/HookCallbackSync";
import type { ResolveSubWorkspaceHookAsync } from "../../../../hooks/resolve-sub-workspace/ResolveSubWorkspaceHookAsync";
import type { ResolveSubWorkspaceHookSync } from "../../../../hooks/resolve-sub-workspace/ResolveSubWorkspaceHookSync";
import { WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_ASYNC } from "../../../../hooks/resolve-sub-workspace/WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_ASYNC";
import { WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_SYNC } from "../../../../hooks/resolve-sub-workspace/WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_SYNC";
import { createWorkspacePlugin } from "../../../createWorkspacePlugin";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "../../../SYSTEM_PLUGIN_UID_WORKSPACE";
import { WorkspacePlugin } from "../../../WorkspacePlugin";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "SubWorkspaceResolverFacet",
  () =>
  {
    describe(
      "resolveByPath",
      () =>
      {
        it(
          "should resolve sub workspaces",
          async () =>
          {
            const subWorkspaceHandlerMock = jest.fn<
              HookCallbackAsync<ResolveSubWorkspaceHookAsync>
            >().mockResolvedValue(undefined);

            const sampleExtension: ExtensionMaybeAsync = {
              $postBindExtensionHook(
                context,
                extension,
                hook,
              )
              {
                if (hook.name === WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_ASYNC)
                {
                  (hook as ResolveSubWorkspaceHookAsync).tapPromise(
                    {
                      name: "test:sample",
                    },
                    subWorkspaceHandlerMock,
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

            const subWorkspaces = await useExtensionAsync(
              context,
              SYSTEM_PLUGIN_UID_WORKSPACE,
              async (
                workspacePlugin: WorkspacePlugin,
              ) =>
              {
                const rootWorkspace = await workspacePlugin.resolveRootWorkspace(context);

                return await workspacePlugin.resolveSubWorkspacesByPath(
                  context,
                  rootWorkspace.path,
                );
              },
            );

            for (const subWorkspace of subWorkspaces)
            {
              expect(subWorkspace).toMatchObject(
                expect.objectContaining({
                  name: expect.anything() as string,
                  packageJSON: expect.objectContaining({
                    name: expect.anything() as string,
                  }) as unknown,
                }),
              );
            }

            expect(subWorkspaceHandlerMock.mock.calls.length).toBeGreaterThan(0);
            expect(subWorkspaceHandlerMock.mock.calls.length).toBe(subWorkspaces.length);
          },
        );
      },
    );

    describe(
      "resolveByPathSync",
      () =>
      {
        it(
          "should resolve sub workspaces synchronously",
          () =>
          {
            const subWorkspaceHandlerMock = jest.fn<
              HookCallbackSync<ResolveSubWorkspaceHookSync>
            >();

            const sampleExtension: ExtensionSync = {
              $postBindExtensionHookSync(
                context,
                extension,
                hook,
              )
              {
                if (hook.name === WORKSPACE_HOOK_UID_RESOLVE_SUB_WORKSPACE_SYNC)
                {
                  (hook as ResolveSubWorkspaceHookSync).tap(
                    {
                      name: "test:sample",
                    },
                    subWorkspaceHandlerMock,
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

            const subWorkspaces = useExtensionSync(
              context,
              SYSTEM_PLUGIN_UID_WORKSPACE,
              (
                workspacePlugin: WorkspacePlugin,
              ) =>
              {
                const rootWorkspace = workspacePlugin.resolveRootWorkspaceSync(context);

                return workspacePlugin.resolveSubWorkspacesByPathSync(
                  context,
                  rootWorkspace.path,
                );
              },
            );

            for (const subWorkspace of subWorkspaces)
            {
              expect(subWorkspace).toMatchObject(
                expect.objectContaining({
                  name: expect.anything() as string,
                  packageJSON: expect.objectContaining({
                    name: expect.anything() as string,
                  }) as unknown,
                }),
              );
            }

            expect(subWorkspaceHandlerMock.mock.calls.length).toBeGreaterThan(0);
            expect(subWorkspaceHandlerMock.mock.calls.length).toBe(subWorkspaces.length);
          },
        );
      },
    );
  },
);
