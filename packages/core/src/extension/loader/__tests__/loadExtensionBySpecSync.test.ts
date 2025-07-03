import { EXTENSION_TESTS_FIXTURES_DIRECTORY_PATH } from "../../__tests__/constants/EXTENSION_TESTS_FIXTURES_DIRECTORY_PATH";
import { TEST_FIXTURE_EXTENSION_UID_CJS } from "../../__tests__/fixtures/cjs/TEST_FIXTURE_EXTENSION_UID_CJS.cjs";
import type { ConfigDefinitionContext } from "../../../config/context/ConfigDefinitionContext";
import { resolvePath } from "../../../lib/path/resolvePath";
import { loadExtensionBySpecSync } from "../loadExtensionBySpecSync";

describe(
  "loadExtensionBySpecSync",
  () =>
  {
    it(
      "should load an extension using a string",
      () =>
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

        const spec = "./cjs/object.cjs";

        const extension = loadExtensionBySpecSync(
          configDefinitionContext,
          spec,
        );

        expect(extension).toBeDefined();

        expect(extension).toMatchObject({
          $uid: TEST_FIXTURE_EXTENSION_UID_CJS,
        });
      },
    );

    it(
      "should load an extension using an array with a string",
      () =>
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
          "./cjs/object.cjs",
        ] as const;

        const extension = loadExtensionBySpecSync(
          configDefinitionContext,
          spec,
        );

        expect(extension).toBeDefined();

        expect(extension).toMatchObject({
          $uid: TEST_FIXTURE_EXTENSION_UID_CJS,
        });
      },
    );

    it(
      "should load an extension using an array with a string and an object",
      () =>
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
          "./cjs/initializer.cjs",
          options,
        ] as const;

        const extension = loadExtensionBySpecSync(
          configDefinitionContext,
          spec,
        );

        expect(extension).toBeDefined();

        expect(extension).toMatchObject({
          $uid: TEST_FIXTURE_EXTENSION_UID_CJS,
          options,
        });
      },
    );
  },
);
