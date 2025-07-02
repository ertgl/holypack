import { CONFIG_FIXTURES } from "../../../config/__tests__/constants/CONFIG_FIXTURES";
import { CONFIG_FIXTURES_DIRECTORY_PATH } from "../../../config/__tests__/constants/CONFIG_FIXTURES_DIRECTORY_PATH";
import { resolvePath } from "../../../lib/path/resolvePath";
import { resolveContextAsync } from "../../resolver/resolveContextAsync";
import { configureContextByFileAsync } from "../configureContextByFileAsync";

describe(
  "configureContextByFileAsync",
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

        const context = await resolveContextAsync({
          loadConfigFile: false,
        });

        const config = await configureContextByFileAsync(
          context,
          {
            cwd,
          },
        );

        expect(config).toBeDefined();

        expect(config).toMatchObject({
          fixture: data.fixture,
        });
      },
    );
  },
);
