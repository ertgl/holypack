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
import type { ResolveRootWorkspaceHookAsync } from "../../../../hooks/resolve-root-workspace/ResolveRootWorkspaceHookAsync";
import type { ResolveRootWorkspaceHookSync } from "../../../../hooks/resolve-root-workspace/ResolveRootWorkspaceHookSync";
import { WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_ASYNC } from "../../../../hooks/resolve-root-workspace/WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_ASYNC";
import { WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_SYNC } from "../../../../hooks/resolve-root-workspace/WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_SYNC";
import { createWorkspacePlugin } from "../../../createWorkspacePlugin";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "../../../SYSTEM_PLUGIN_UID_WORKSPACE";
import { WorkspacePlugin } from "../../../WorkspacePlugin";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "RootWorkspaceResolverFacet",
  () =>
  {
    describe(
      "resolve",
      () =>
      {
        it(
          "should resolve root workspace",
          async () =>
          {
            const rootWorkspaceHandlerMock = jest.fn<
              HookCallbackAsync<ResolveRootWorkspaceHookAsync>
            >().mockResolvedValue(undefined);

            const sampleExtension: ExtensionMaybeAsync = {
              $postBindExtensionHook(
                context,
                extension,
                hook,
              )
              {
                if (hook.name === WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_ASYNC)
                {
                  (hook as ResolveRootWorkspaceHookAsync).tapPromise(
                    {
                      name: "test:sample",
                    },
                    rootWorkspaceHandlerMock,
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

            const rootWorkspace = await useExtensionAsync(
              context,
              SYSTEM_PLUGIN_UID_WORKSPACE,
              async (
                workspacePlugin: WorkspacePlugin,
              ) =>
              {
                return await workspacePlugin.resolveRootWorkspace(context);
              },
            );

            expect(rootWorkspace).toMatchObject(
              expect.objectContaining({
                name: MONOREPO_PACKAGE.name,
                packageJSON: expect.objectContaining({
                  name: MONOREPO_PACKAGE.name,
                }) as unknown,
              }),
            );

            expect(rootWorkspaceHandlerMock).toHaveBeenCalledTimes(1);
            expect(rootWorkspaceHandlerMock).toHaveBeenCalledWith(rootWorkspace);
          },
        );
      },
    );

    describe(
      "resolveSync",
      () =>
      {
        it(
          "should resolve root workspace synchronously",
          () =>
          {
            const rootWorkspaceHandlerMock = jest.fn<
              HookCallbackSync<ResolveRootWorkspaceHookSync>
            >();

            const sampleExtension: ExtensionSync = {
              $postBindExtensionHookSync(
                context,
                extension,
                hook,
              )
              {
                if (hook.name === WORKSPACE_HOOK_UID_RESOLVE_ROOT_WORKSPACE_SYNC)
                {
                  (hook as ResolveRootWorkspaceHookSync).tap(
                    {
                      name: "test:sample",
                    },
                    rootWorkspaceHandlerMock,
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

            const rootWorkspace = useExtensionSync(
              context,
              SYSTEM_PLUGIN_UID_WORKSPACE,
              (
                workspacePlugin: WorkspacePlugin,
              ) =>
              {
                return workspacePlugin.resolveRootWorkspaceSync(context);
              },
            );

            expect(rootWorkspace).toMatchObject(
              expect.objectContaining({
                name: MONOREPO_PACKAGE.name,
                packageJSON: expect.objectContaining({
                  name: MONOREPO_PACKAGE.name,
                }) as unknown,
              }),
            );

            expect(rootWorkspaceHandlerMock).toHaveBeenCalledTimes(1);
            expect(rootWorkspaceHandlerMock).toHaveBeenCalledWith(rootWorkspace);
          },
        );
      },
    );
  },
);
