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
import { useExtensionAsync } from "../../../../../../extension/interop/useExtensionAsync";
import { useExtensionSync } from "../../../../../../extension/interop/useExtensionSync";
import type { HookCallbackAsync } from "../../../../../../hook/callback/HookCallbackAsync";
import type { HookCallbackSync } from "../../../../../../hook/callback/HookCallbackSync";
import { PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_ASYNC } from "../../../../hooks/resolve-current-project/PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_ASYNC";
import { PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_SYNC } from "../../../../hooks/resolve-current-project/PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_SYNC";
import type { ResolveCurrentProjectHookAsync } from "../../../../hooks/resolve-current-project/ResolveCurrentProjectHookAsync";
import type { ResolveCurrentProjectHookSync } from "../../../../hooks/resolve-current-project/ResolveCurrentProjectHookSync";
import { createProjectPlugin } from "../../../createProjectPlugin";
import { ProjectPlugin } from "../../../ProjectPlugin";
import { SYSTEM_PLUGIN_UID_PROJECT } from "../../../SYSTEM_PLUGIN_UID_PROJECT";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

describe(
  "CurrentProjectResolverFacet",
  () =>
  {
    describe(
      "resolve",
      () =>
      {
        it(
          "should resolve current project",
          async () =>
          {
            const currentProjectHandlerMock = jest.fn<
              HookCallbackAsync<ResolveCurrentProjectHookAsync>
            >().mockResolvedValue(undefined);

            const sampleExtension: ExtensionMaybeAsync = {
              $postBindExtensionHook(
                context,
                extension,
                hook,
              )
              {
                if (hook.name === PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_ASYNC)
                {
                  (hook as ResolveCurrentProjectHookAsync).tapPromise(
                    {
                      name: "test:sample",
                    },
                    currentProjectHandlerMock,
                  );
                }
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

            const currentProject = await useExtensionAsync(
              context,
              SYSTEM_PLUGIN_UID_PROJECT,
              async (
                projectPlugin: ProjectPlugin,
              ) =>
              {
                return await projectPlugin.resolveCurrentProject(context);
              },
            );

            expect(currentProject).toMatchObject(
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

            expect(currentProjectHandlerMock).toHaveBeenCalledTimes(1);
            expect(currentProjectHandlerMock).toHaveBeenCalledWith(currentProject);
          },
        );
      },
    );

    describe(
      "resolveSync",
      () =>
      {
        it(
          "should resolve current project synchronously",
          () =>
          {
            const currentProjectHandlerMock = jest.fn<
              HookCallbackSync<ResolveCurrentProjectHookSync>
            >();

            const sampleExtension: ExtensionSync = {
              $postBindExtensionHookSync(
                context,
                extension,
                hook,
              )
              {
                if (hook.name === PROJECT_HOOK_UID_RESOLVE_CURRENT_PROJECT_SYNC)
                {
                  (hook as ResolveCurrentProjectHookSync).tap(
                    {
                      name: "test:sample",
                    },
                    currentProjectHandlerMock,
                  );
                }
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

            const currentProject = useExtensionSync(
              context,
              SYSTEM_PLUGIN_UID_PROJECT,
              (
                projectPlugin: ProjectPlugin,
              ) =>
              {
                return projectPlugin.resolveCurrentProjectSync(context);
              },
            );

            expect(currentProject).toMatchObject(
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

            expect(currentProjectHandlerMock).toHaveBeenCalledTimes(1);
            expect(currentProjectHandlerMock).toHaveBeenCalledWith(currentProject);
          },
        );
      },
    );
  },
);
