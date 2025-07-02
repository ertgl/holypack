import { CONFIG_FIXTURES } from "../../../config/__tests__/constants/CONFIG_FIXTURES";
import { CONFIG_FIXTURES_DIRECTORY_PATH } from "../../../config/__tests__/constants/CONFIG_FIXTURES_DIRECTORY_PATH";
import { resolvePath } from "../../../lib/path/resolvePath";
import { resolveContextSync } from "../../resolver/resolveContextSync";
import { configureContextByFileSync } from "../configureContextByFileSync";

describe(
  "configureContextByFileSync",
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

        const context = resolveContextSync({
          loadConfigFile: false,
        });

        const config = configureContextByFileSync(
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
