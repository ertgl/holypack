import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { jest } from "@jest/globals";

import { resolveContextAsync } from "../../../../../../context/resolver/resolveContextAsync";
import { resolveContextSync } from "../../../../../../context/resolver/resolveContextSync";
import { useExtensionAsync } from "../../../../../../extension/interop/useExtensionAsync";
import { useExtensionSync } from "../../../../../../extension/interop/useExtensionSync";
import type { Workspace } from "../../../../models/Workspace";
import { createWorkspacePlugin } from "../../../createWorkspacePlugin";
import { SYSTEM_PLUGIN_UID_WORKSPACE } from "../../../SYSTEM_PLUGIN_UID_WORKSPACE";
import { WorkspacePlugin } from "../../../WorkspacePlugin";
import type { RecursiveSubWorkspaceResolverCallbackSync } from "../../recursive-sub-workspace-resolver/callbacks/RecursiveSubWorkspaceResolverCallbackSync";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "RecursiveSubWorkspaceResolverFacet",
  () =>
  {
    describe(
      "resolveByPath",
      () =>
      {
        it(
          "should resolve sub workspaces recursively",
          async () =>
          {
            const subWorkspaces: Workspace[] = [];

            const subWorkspaceHandlerMock = jest.fn<
              RecursiveSubWorkspaceResolverCallbackSync
            >(
              subWorkspaces.push.bind(subWorkspaces),
            );

            const context = await resolveContextAsync({
              config: {
                extensions: [
                  createWorkspacePlugin(),
                ],
              },
              cwd: __dirname,
              loadConfigFile: false,
            });

            await useExtensionAsync(
              context,
              SYSTEM_PLUGIN_UID_WORKSPACE,
              async (
                workspacePlugin: WorkspacePlugin,
              ) =>
              {
                const rootWorkspace = await workspacePlugin.resolveRootWorkspace(context);

                await workspacePlugin.resolveSubWorkspacesByPathRecursively(
                  context,
                  rootWorkspace.path,
                  subWorkspaceHandlerMock,
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
          "should resolve sub workspaces recursively synchronously",
          () =>
          {
            const subWorkspaces: Workspace[] = [];

            const subWorkspaceHandlerMock = jest.fn<
              RecursiveSubWorkspaceResolverCallbackSync
            >(
              subWorkspaces.push.bind(subWorkspaces),
            );

            const context = resolveContextSync({
              config: {
                extensions: [
                  createWorkspacePlugin(),
                ],
              },
              cwd: __dirname,
              loadConfigFile: false,
            });

            useExtensionSync(
              context,
              SYSTEM_PLUGIN_UID_WORKSPACE,
              (
                workspacePlugin: WorkspacePlugin,
              ) =>
              {
                const rootWorkspace = workspacePlugin.resolveRootWorkspaceSync(context);

                workspacePlugin.resolveSubWorkspacesByPathRecursivelySync(
                  context,
                  rootWorkspace.path,
                  subWorkspaceHandlerMock,
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
