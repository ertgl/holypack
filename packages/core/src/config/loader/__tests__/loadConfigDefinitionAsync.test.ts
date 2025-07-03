import { CONFIG_FIXTURES } from "../../__tests__/constants/CONFIG_FIXTURES";
import { CONFIG_FIXTURES_DIRECTORY_PATH } from "../../__tests__/constants/CONFIG_FIXTURES_DIRECTORY_PATH";
import { resolvePath } from "../../../lib/path/resolvePath";
import { loadConfigDefinitionAsync } from "../loadConfigDefinitionAsync";

describe(
  "loadConfigDefinitionAsync",
  () =>
  {
    it.each(CONFIG_FIXTURES)(
      "should load the config definition - Fixture: $fixture",
      async (data) =>
      {
        const cwd = resolvePath(
          CONFIG_FIXTURES_DIRECTORY_PATH,
          data.fixture,
        );

        const configFilePath = resolvePath(
          cwd,
          data.configFileName,
        );

        const configDefinition = await loadConfigDefinitionAsync(
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
