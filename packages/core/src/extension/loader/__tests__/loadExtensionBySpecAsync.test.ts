import { EXTENSION_TESTS_FIXTURES_DIRECTORY_PATH } from "../../__tests__/constants/EXTENSION_TESTS_FIXTURES_DIRECTORY_PATH";
import { TEST_FIXTURE_EXTENSION_UID_ESM } from "../../__tests__/fixtures/esm/TEST_FIXTURE_EXTENSION_UID_ESM.mjs";
import type { ConfigDefinitionContext } from "../../../config/context/ConfigDefinitionContext";
import { resolvePath } from "../../../lib/path/resolvePath";
import { loadExtensionBySpecAsync } from "../loadExtensionBySpecAsync";

describe(
  "loadExtensionBySpecAsync",
  () =>
  {
    it(
      "should load an extension using a string",
      async () =>
      {
        const cwd = EXTENSION_TESTS_FIXTURES_DIRECTORY_PATH;

        const referrerPath = resolvePath(
          cwd,
          ":virtual:",
        );

        const configDefinitionContext: ConfigDefinitionContext = {
          cwd,
          referrerPath,
        };

        const spec = "./esm/object.mjs";

        const extension = await loadExtensionBySpecAsync(
          configDefinitionContext,
          spec,
        );

        expect(extension).toBeDefined();

        expect(extension).toMatchObject({
          $uid: TEST_FIXTURE_EXTENSION_UID_ESM,
        });
      },
    );

    it(
      "should load an extension using an array with a string",
      async () =>
      {
        const cwd = EXTENSION_TESTS_FIXTURES_DIRECTORY_PATH;

        const referrerPath = resolvePath(
          cwd,
          ":virtual:",
        );

        const configDefinitionContext: ConfigDefinitionContext = {
          cwd,
          referrerPath,
        };

        const spec = [
          "./esm/object.mjs",
        ] as const;

        const extension = await loadExtensionBySpecAsync(
          configDefinitionContext,
          spec,
        );

        expect(extension).toBeDefined();

        expect(extension).toMatchObject({
          $uid: TEST_FIXTURE_EXTENSION_UID_ESM,
        });
      },
    );

    it(
      "should load an extension using an array with a string and an object",
      async () =>
      {
        const cwd = EXTENSION_TESTS_FIXTURES_DIRECTORY_PATH;

        const referrerPath = resolvePath(
          cwd,
          ":virtual:",
        );

        const configDefinitionContext: ConfigDefinitionContext = {
          cwd,
          referrerPath,
        };

        const options = {
          key: "value",
        };

        const spec = [
          "./esm/initializer.mjs",
          options,
        ] as const;

        const extension = await loadExtensionBySpecAsync(
          configDefinitionContext,
          spec,
        );

        expect(extension).toBeDefined();

        expect(extension).toMatchObject({
          $uid: TEST_FIXTURE_EXTENSION_UID_ESM,
          options,
        });
      },
    );
  },
);
