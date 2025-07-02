import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { jest } from "@jest/globals";

import { resolveContextAsync } from "../../../../../../context/resolver/resolveContextAsync";
import { resolveContextSync } from "../../../../../../context/resolver/resolveContextSync";
import { useExtensionAsync } from "../../../../../../extension/interop/useExtensionAsync";
import { useExtensionSync } from "../../../../../../extension/interop/useExtensionSync";
import type { RecursiveSubWorkspaceResolverCallbackSync } from "../../../../../workspace/extension/facets/recursive-sub-workspace-resolver/callbacks/RecursiveSubWorkspaceResolverCallbackSync";
import type { Workspace } from "../../../../../workspace/models/Workspace";
import { createProjectPlugin } from "../../../createProjectPlugin";
import type { ProjectPlugin } from "../../../ProjectPlugin";
import { SYSTEM_PLUGIN_UID_PROJECT } from "../../../SYSTEM_PLUGIN_UID_PROJECT";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "CurrentProjectRecursiveWorkspaceResolverFacet.test",
  () =>
  {
    describe(
      "resolve",
      () =>
      {
        it(
          "should resolve current project's workspaces recursively",
          async () =>
          {
            const workspaces: Workspace[] = [];

            const workspaceHandlerMock = jest.fn<
              RecursiveSubWorkspaceResolverCallbackSync
            >(
              workspaces.push.bind(workspaces),
            );

            const context = await resolveContextAsync({
              config: {
                extensions: [
                  createProjectPlugin(),
                ],
              },
              cwd: __dirname,
              loadConfigFile: false,
            });

            await useExtensionAsync(
              context,
              SYSTEM_PLUGIN_UID_PROJECT,
              async (
                projectPlugin: ProjectPlugin,
              ) =>
              {
                await projectPlugin.resolveWorkspacesByCurrentProjectRecursively(
                  context,
                  workspaceHandlerMock,
                );
              },
            );

            for (const workspace of workspaces)
            {
              expect(workspace).toMatchObject(
                expect.objectContaining({
                  name: expect.anything() as string,
                  packageJSON: expect.objectContaining({
                    name: expect.anything() as string,
                  }) as unknown,
                }),
              );
            }

            expect(workspaceHandlerMock.mock.calls.length).toBeGreaterThan(0);
            expect(workspaceHandlerMock.mock.calls.length).toBe(workspaces.length);
          },
        );
      },
    );

    describe(
      "resolveSync",
      () =>
      {
        it(
          "should resolve current project's workspaces recursively synchronously",
          () =>
          {
            const workspaces: Workspace[] = [];

            const workspaceHandlerMock = jest.fn<
              RecursiveSubWorkspaceResolverCallbackSync
            >(
              workspaces.push.bind(workspaces),
            );

            const context = resolveContextSync({
              config: {
                extensions: [
                  createProjectPlugin(),
                ],
              },
              cwd: __dirname,
              loadConfigFile: false,
            });

            useExtensionSync(
              context,
              SYSTEM_PLUGIN_UID_PROJECT,
              (
                projectPlugin: ProjectPlugin,
              ) =>
              {
                projectPlugin.resolveWorkspacesByCurrentProjectRecursivelySync(
                  context,
                  workspaceHandlerMock,
                );
              },
            );

            for (const workspace of workspaces)
            {
              expect(workspace).toMatchObject(
                expect.objectContaining({
                  name: expect.anything() as string,
                  packageJSON: expect.objectContaining({
                    name: expect.anything() as string,
                  }) as unknown,
                }),
              );
            }

            expect(workspaceHandlerMock.mock.calls.length).toBeGreaterThan(0);
            expect(workspaceHandlerMock.mock.calls.length).toBe(workspaces.length);
          },
        );
      },
    );
  },
);
