import {
  dirname,
  sep as PATH_SEPARATOR,
} from "node:path";
import { fileURLToPath } from "node:url";

import { jest } from "@jest/globals";

import PROJECT_PACKAGE from "../../../../../../../../../package.json" with { type: "json" };
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
import { PROJECT_HOOK_UID_RESOLVE_PROJECT_ASYNC } from "../../../../hooks/resolve-project/PROJECT_HOOK_UID_RESOLVE_PROJECT_ASYNC";
import { PROJECT_HOOK_UID_RESOLVE_PROJECT_SYNC } from "../../../../hooks/resolve-project/PROJECT_HOOK_UID_RESOLVE_PROJECT_SYNC";
import type { ResolveProjectHookAsync } from "../../../../hooks/resolve-project/ResolveProjectHookAsync";
import type { ResolveProjectHookSync } from "../../../../hooks/resolve-project/ResolveProjectHookSync";
import { createProjectPlugin } from "../../../createProjectPlugin";
import { ProjectPlugin } from "../../../ProjectPlugin";
import { SYSTEM_PLUGIN_UID_PROJECT } from "../../../SYSTEM_PLUGIN_UID_PROJECT";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "ProjectResolverFacet",
  () =>
  {
    describe(
      "resolveByPath",
      () =>
      {
        it(
          "should resolve project by path",
          async () =>
          {
            const projectHandlerMock = jest.fn<
              HookCallbackAsync<ResolveProjectHookAsync>
            >().mockResolvedValue(undefined);

            const sampleExtension: ExtensionMaybeAsync = {
              async $setup(
                context,
              )
              {
                const projectPlugin = requireSystemExtension(
                  context,
                  SYSTEM_PLUGIN_UID_PROJECT,
                );

                await useExtensionHookAsync(
                  projectPlugin,
                  PROJECT_HOOK_UID_RESOLVE_PROJECT_ASYNC,
                  (
                    hook: ResolveProjectHookAsync,
                  ) =>
                  {
                    hook.tapPromise(
                      {
                        name: "test:sample",
                      },
                      projectHandlerMock,
                    );
                  },
                );
              },
              $uid: "test:sample",
            };

            const context = await resolveContextAsync({
              config: {
                extensions: [
                  createProjectPlugin(),
                  sampleExtension,
                ],
              },
              cwd: __dirname,
              loadConfigFile: false,
            });

            const project = await useExtensionAsync(
              context,
              SYSTEM_PLUGIN_UID_PROJECT,
              async (
                projectPlugin: ProjectPlugin,
              ) =>
              {
                return await projectPlugin.resolveCurrentProject(context);
              },
            );

            expect(project).toMatchObject(
              expect.objectContaining({
                name: PROJECT_PACKAGE.name,
                path: expect.stringContaining(`${PATH_SEPARATOR}holypack`) as unknown,
                workspace: expect.objectContaining({
                  packageJSON: expect.objectContaining({
                    name: PROJECT_PACKAGE.name,
                  }) as unknown,
                }) as unknown,
              }),
            );

            expect(projectHandlerMock).toHaveBeenCalledTimes(1);
            expect(projectHandlerMock).toHaveBeenCalledWith(project);
          },
        );
      },
    );

    describe(
      "resolveByPathSync",
      () =>
      {
        it(
          "should resolve project by path synchronously",
          () =>
          {
            const projectHandlerMock = jest.fn<
              HookCallbackSync<ResolveProjectHookSync>
            >();

            const sampleExtension: ExtensionSync = {
              $setupSync(
                context,
              )
              {
                const projectPlugin = requireExtension<ProjectPlugin>(
                  context,
                  SYSTEM_PLUGIN_UID_PROJECT,
                );

                useExtensionHookSync(
                  projectPlugin,
                  PROJECT_HOOK_UID_RESOLVE_PROJECT_SYNC,
                  (
                    hook: ResolveProjectHookSync,
                  ) =>
                  {
                    hook.tap(
                      {
                        name: "test:sample",
                      },
                      projectHandlerMock,
                    );
                  },
                );
              },
              $uid: "test:sample",
            };

            const context = resolveContextSync({
              config: {
                extensions: [
                  createProjectPlugin(),
                  sampleExtension,
                ],
              },
              cwd: __dirname,
              loadConfigFile: false,
            });

            const project = useExtensionSync(
              context,
              SYSTEM_PLUGIN_UID_PROJECT,
              (
                projectPlugin: ProjectPlugin,
              ) =>
              {
                return projectPlugin.resolveCurrentProjectSync(context);
              },
            );

            expect(project).toMatchObject(
              expect.objectContaining({
                name: PROJECT_PACKAGE.name,
                path: expect.stringContaining(`${PATH_SEPARATOR}holypack`) as unknown,
                workspace: expect.objectContaining({
                  packageJSON: expect.objectContaining({
                    name: PROJECT_PACKAGE.name,
                  }) as unknown,
                }) as unknown,
              }),
            );

            expect(projectHandlerMock).toHaveBeenCalledTimes(1);
            expect(projectHandlerMock).toHaveBeenCalledWith(project);
          },
        );
      },
    );
  },
);
