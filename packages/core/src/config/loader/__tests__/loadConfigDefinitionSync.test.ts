import { CONFIG_FIXTURES } from "../../__tests__/constants/CONFIG_FIXTURES";
import { CONFIG_FIXTURES_DIRECTORY_PATH } from "../../__tests__/constants/CONFIG_FIXTURES_DIRECTORY_PATH";
import { resolvePath } from "../../../lib/path/resolvePath";
import { loadConfigDefinitionSync } from "../loadConfigDefinitionSync";

describe(
  "loadConfigDefinitionSync",
  () =>
  {
    it.each(CONFIG_FIXTURES)(
      "should load the config definition - Fixture: $fixture",
      (data) =>
      {
        const cwd = resolvePath(
          CONFIG_FIXTURES_DIRECTORY_PATH,
          data.fixture,
        );

        const configFilePath = resolvePath(
          cwd,
          data.configFileName,
        );

        const configDefinition = loadConfigDefinitionSync(
          configFilePath,
          {
            cwd,
          },
        );

        expect(configDefinition).toBeDefined();

        expect(configDefinition).toMatchObject({
          fixture: data.fixture,
        });
      },
    );
  },
);
